import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  LinearProgress,
  Paper,
  Grid,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Stack,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Collapse
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InventoryIcon from "@mui/icons-material/Inventory";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FolderIcon from "@mui/icons-material/Folder";
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateProductForm from "./CreateProductForm";
import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/v1/eagle-ceramic";

const CreateProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Grouped products data
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Filter States - These will be used as query parameters
  const [filters, setFilters] = useState({
    productName: "",
    productSize: ""
  });
  
  // Applied filters (only updates on search button click or explicit action)
  const [appliedFilters, setAppliedFilters] = useState({
    productName: "",
    productSize: ""
  });
  
  // Filter options (populated from API or static)
  const [filterOptions, setFilterOptions] = useState({
    productNames: [],
    productSizes: []
  });
  
  // Show/Hide filter panel
  const [showFilters, setShowFilters] = useState(false);
  
  // State for Delete Dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  
  // State for Notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // ---------------------------------------------------------
  // 1. DATA GROUPING LOGIC
  // ---------------------------------------------------------
  const processDataHierarchy = (data) => {
    const hierarchy = {};

    data.forEach((item) => {
      const pName = item.productName || "Uncategorized";
      const pSize = item.productSize || "Standard";

      if (!hierarchy[pName]) {
        hierarchy[pName] = {};
      }

      if (!hierarchy[pName][pSize]) {
        hierarchy[pName][pSize] = [];
      }

      hierarchy[pName][pSize].push(item);
    });

    return hierarchy;
  };

  // ---------------------------------------------------------
  // 2. BUILD QUERY PARAMS
  // ---------------------------------------------------------
  const buildQueryParams = useCallback((filterValues) => {
    const params = new URLSearchParams();
    
    if (filterValues.productName && filterValues.productName.trim() !== "") {
      params.append("productName", filterValues.productName.trim());
    }
    
    if (filterValues.productSize && filterValues.productSize.trim() !== "") {
      params.append("productSize", filterValues.productSize.trim());
    }
    
    return params.toString();
  }, []);

  // ---------------------------------------------------------
  // 3. FETCH DATA WITH QUERY PARAMS
  // ---------------------------------------------------------
  const fetchCatalogData = useCallback(async (filterValues = appliedFilters) => {
    setLoading(true);
    try {
      // Build query string from filters
      const queryString = buildQueryParams(filterValues);
      
      // Construct URL with query parameters
      const url = queryString 
        ? `${API_BASE_URL}/catalog/get-by-product?${queryString}`
        : `${API_BASE_URL}/catalog/get-by-product`;
      
      console.log("Fetching with URL:", url); // Debug log
      
      const response = await axios.get(url);
      
      let dataArray = [];
      if (response.data?.data?.catalogData && Array.isArray(response.data.data.catalogData)) {
        dataArray = response.data.data.catalogData;
      }

      // Group the data
      const structuredData = processDataHierarchy(dataArray);
      setGroupedProducts(structuredData);

    } catch (error) {
      console.error("Error fetching catalog:", error);
      showSnackbar("Failed to load catalog data", "error");
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, buildQueryParams]);

  // ---------------------------------------------------------
  // 4. FETCH FILTER OPTIONS (Product Names & Sizes)
  // ---------------------------------------------------------
  const fetchFilterOptions = async () => {
    try {
      // Option 1: Fetch from dedicated endpoints
      const [namesResponse, sizesResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/catalog/product-names`).catch(() => ({ data: { data: [] } })),
        axios.get(`${API_BASE_URL}/catalog/product-sizes`).catch(() => ({ data: { data: [] } }))
      ]);
      
      setFilterOptions({
        productNames: namesResponse.data?.data || [],
        productSizes: sizesResponse.data?.data || []
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
      
      // Option 2: Fallback - Extract from all data
      try {
        const response = await axios.get(`${API_BASE_URL}/catalog/get-by-product`);
        const dataArray = response.data?.data?.catalogData || [];
        
        const uniqueNames = [...new Set(dataArray.map(item => item.productName).filter(Boolean))];
        const uniqueSizes = [...new Set(dataArray.map(item => item.productSize).filter(Boolean))];
        
        setFilterOptions({
          productNames: uniqueNames,
          productSizes: uniqueSizes
        });
      } catch (fallbackError) {
        console.error("Fallback fetch failed:", fallbackError);
      }
    }
  };

  // ---------------------------------------------------------
  // 5. EFFECTS
  // ---------------------------------------------------------
  useEffect(() => {
    fetchCatalogData();
    fetchFilterOptions();
  }, []);

  // Refetch when applied filters change
  useEffect(() => {
    fetchCatalogData(appliedFilters);
  }, [appliedFilters]);

  // ---------------------------------------------------------
  // 6. FILTER HANDLERS
  // ---------------------------------------------------------
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
  };

  const handleClearFilters = () => {
    const clearedFilters = { productName: "", productSize: "" };
    setFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
  };

  const handleQuickFilter = (productName, productSize = "") => {
    const newFilters = { productName, productSize };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
  };

  // ---------------------------------------------------------
  // 7. MODAL & DELETE HANDLERS
  // ---------------------------------------------------------
  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleOpenUpdateModal = (product) => {
    setModalMode("update");
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${API_BASE_URL}/catalog/delete/${productToDelete.uuid}`);
      showSnackbar("Deleted successfully", "success");
      fetchCatalogData();
    } catch (error) {
      showSnackbar("Delete failed", "error");
    }
    setDeleteDialogOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  // Check if any filters are applied
  const hasActiveFilters = appliedFilters.productName || appliedFilters.productSize;

  // ---------------------------------------------------------
  // 8. RENDER UI
  // ---------------------------------------------------------
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* --- Header --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Product Catalog
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Grouped by Name & Size
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            color={hasActiveFilters ? "primary" : "inherit"}
          >
            Filters {hasActiveFilters && `(${[appliedFilters.productName, appliedFilters.productSize].filter(Boolean).length})`}
          </Button>
          <Button 
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => fetchCatalogData()}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            onClick={handleOpenCreateModal}
          >
            Add New Product
          </Button>
        </Stack>
      </Box>

      {/* --- Filter Panel --- */}
      <Collapse in={showFilters}>
        <Paper sx={{ p: 3, mb: 3, bgcolor: "#f8f9fa" }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Filter Products
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {/* Product Name Filter */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Product Name</InputLabel>
                <Select
                  value={filters.productName}
                  label="Product Name"
                  onChange={(e) => handleFilterChange("productName", e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Names</em>
                  </MenuItem>
                  {filterOptions.productNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Product Size Filter */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Product Size</InputLabel>
                <Select
                  value={filters.productSize}
                  label="Product Size"
                  onChange={(e) => handleFilterChange("productSize", e.target.value)}
                >
                  <MenuItem value="">
                    <em>All Sizes</em>
                  </MenuItem>
                  {filterOptions.productSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Or use Text Fields for free-form input */}
            {/* 
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                size="small"
                label="Product Name"
                value={filters.productName}
                onChange={(e) => handleFilterChange("productName", e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            */}

            {/* Action Buttons */}
            <Grid item xs={12} sm={4}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  onClick={handleApplyFilters}
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  startIcon={<ClearIcon />}
                  disabled={!filters.productName && !filters.productSize}
                >
                  Clear
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" color="text.secondary">
                Active Filters:
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                {appliedFilters.productName && (
                  <Chip
                    label={`Name: ${appliedFilters.productName}`}
                    size="small"
                    onDelete={() => {
                      const newFilters = { ...appliedFilters, productName: "" };
                      setFilters(newFilters);
                      setAppliedFilters(newFilters);
                    }}
                    color="primary"
                  />
                )}
                {appliedFilters.productSize && (
                  <Chip
                    label={`Size: ${appliedFilters.productSize}`}
                    size="small"
                    onDelete={() => {
                      const newFilters = { ...appliedFilters, productSize: "" };
                      setFilters(newFilters);
                      setAppliedFilters(newFilters);
                    }}
                    color="primary"
                  />
                )}
              </Stack>
            </Box>
          )}
        </Paper>
      </Collapse>

      {/* --- Loading State --- */}
      {loading && <LinearProgress sx={{ mb: 3 }} />}
      
      {/* --- Empty State --- */}
      {!loading && Object.keys(groupedProducts).length === 0 && (
        <Paper sx={{ p: 5, textAlign: "center", border: "2px dashed #ddd" }}>
          <InventoryIcon sx={{ fontSize: 60, color: "#ddd", mb: 2 }} />
          <Typography color="text.secondary">
            {hasActiveFilters 
              ? "No products found matching your filters." 
              : "No products found."}
          </Typography>
          {hasActiveFilters && (
            <Button 
              sx={{ mt: 2 }} 
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
            >
              Clear Filters
            </Button>
          )}
        </Paper>
      )}

      {/* --- Results Summary --- */}
      {!loading && Object.keys(groupedProducts).length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {Object.keys(groupedProducts).length} product group(s)
            {hasActiveFilters && " (filtered)"}
          </Typography>
        </Box>
      )}

      {/* --- Main Content: Level 1 Loop (Product Name) --- */}
      {Object.keys(groupedProducts).map((productName) => {
        const sizesObj = groupedProducts[productName];
        
        return (
          <Accordion 
            key={productName} 
            defaultExpanded={Object.keys(groupedProducts).length === 1}
            sx={{ 
              mb: 2, 
              border: "1px solid #e0e0e0", 
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              borderRadius: "8px !important",
              overflow: "hidden"
            }}
          >
            {/* Level 1 Header: Product Name */}
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: "#f8f9fa" }}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                <FolderIcon color="primary" />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {productName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {Object.keys(sizesObj).length} Size Variant(s) • 
                    {Object.values(sizesObj).reduce((acc, arr) => acc + arr.length, 0)} Total Items
                  </Typography>
                </Box>
                {/* Quick filter button */}
                <Tooltip title="Filter by this product">
                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickFilter(productName);
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              {/* --- Level 2 Loop (Product Size) --- */}
              {Object.keys(sizesObj).map((sizeKey) => {
                const productsList = sizesObj[sizeKey];

                return (
                  <Box key={sizeKey} sx={{ borderBottom: "1px solid #eee" }}>
                    {/* Level 2 Header: Size */}
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: "#fff", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 1.5,
                      borderBottom: "1px dashed #eee"
                    }}>
                      <FormatSizeIcon fontSize="small" color="action" />
                      <Typography variant="subtitle1" fontWeight="bold">
                        Size: {sizeKey}
                      </Typography>
                      <Chip 
                        label={`${productsList.length} item(s)`} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                      {/* Quick filter for this size */}
                      <Tooltip title="Filter by this size">
                        <IconButton 
                          size="small" 
                          onClick={() => handleQuickFilter(productName, sizeKey)}
                        >
                          <FilterListIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* --- Level 3 Loop (The Grid of Items) --- */}
                    <Box sx={{ p: 2, bgcolor: "#fafafa" }}>
                      <Grid container spacing={2}>
                        {productsList.map((product) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={product.uuid || product._id}>
                            <Card 
                              variant="outlined" 
                              sx={{ 
                                height: "100%", 
                                display: "flex", 
                                flexDirection: "column",
                                transition: "0.2s",
                                "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }
                              }}
                            >
                              {/* Product Image */}
                              <Box sx={{ position: "relative", height: 160, bgcolor: "#eee" }}>
                                {product.imageUrl ? (
                                  <CardMedia
                                    component="img"
                                    height="160"
                                    image={product.imageUrl}
                                    alt={product.title}
                                    sx={{ objectFit: "cover" }}
                                  />
                                ) : (
                                  <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <ImageIcon sx={{ color: "#ccc", fontSize: 40 }} />
                                  </Box>
                                )}
                                {/* Action Buttons overlay */}
                                <Box sx={{ position: "absolute", top: 5, right: 5, bgcolor: "rgba(255,255,255,0.9)", borderRadius: 1 }}>
                                  <IconButton size="small" onClick={() => handleOpenUpdateModal(product)}>
                                    <EditIcon fontSize="small" color="primary" />
                                  </IconButton>
                                  <IconButton size="small" onClick={() => handleDeleteClick(product)}>
                                    <DeleteOutlineIcon fontSize="small" color="error" />
                                  </IconButton>
                                </Box>
                              </Box>

                              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                                <Typography variant="subtitle2" fontWeight="bold" noWrap title={product.title}>
                                  {product.title || "No Title"}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary" 
                                  sx={{ 
                                    fontSize: "0.8rem",
                                    mt: 1,
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden"
                                  }}
                                >
                                  {product.description || "No description"}
                                </Typography>
                              </CardContent>

                              <Divider />

                              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                                <Tooltip title="View Image">
                                  <span>
                                    <IconButton 
                                      size="small" 
                                      disabled={!product.imageUrl}
                                      href={product.imageUrl} 
                                      target="_blank"
                                    >
                                      <ImageIcon fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                                
                                <Chip label={product.buttonText || "View"} size="small" variant="outlined" />

                                <Tooltip title="View PDF">
                                  <span>
                                    <IconButton 
                                      size="small" 
                                      color="error"
                                      disabled={!product.pdfUrl}
                                      href={product.pdfUrl} 
                                      target="_blank"
                                    >
                                      <PictureAsPdfIcon fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* --- Create/Edit Modal --- */}
      <CreateProductForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        mode={modalMode}
        editingProduct={editingProduct}
        onSuccess={() => {
          showSnackbar(modalMode === "create" ? "Created!" : "Updated!", "success");
          fetchCatalogData();
          setOpenModal(false);
        }}
        onClose={() => setOpenModal(false)}
      />

      {/* --- Snackbar Notifications --- */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
      </Snackbar>

      {/* --- Delete Confirmation Dialog --- */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this item?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CreateProductPage;