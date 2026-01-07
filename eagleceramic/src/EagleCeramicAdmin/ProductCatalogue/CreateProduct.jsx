import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Stack,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Backdrop,
  LinearProgress,
  Paper,
  Grid,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Divider,
  CircularProgress,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";

import CreateProductForm from "./CreateProductForm";import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/v1/eagle-ceramic";

const CreateProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);

  const [filterData, setFilterData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  const [catalogCache, setCatalogCache] = useState({});
  const [loadingCatalog, setLoadingCatalog] = useState({});

  const [loading, setLoading] = useState(true);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [expanded, setExpanded] = useState(null);

  const [searchInput, setSearchInput] = useState({
    productName: "",
    productSize: "",
  });
  const [availableSizes, setAvailableSizes] = useState([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchFilterData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/catalog/get-by-product`
      );
      console.log("=== INITIAL FETCH ===");
      console.log("API Response:", response.data);

      let arr = [];
      if (
        response?.data?.data?.filterdata &&
        Array.isArray(response.data.data.filterdata)
      ) {
        arr = response.data.data.filterdata;
      }

      console.log("Products loaded:", arr.map(p => p.productName));

      setFilterData(arr);
      setFilteredData(arr);
      setIsFilterApplied(false);

      if (arr.length === 0) {
        showSnackbar("No products found in the database", "info");
      } else {
        showSnackbar(`Loaded ${arr.length} products`, "success");
      }
    } catch (error) {
      console.error("Error fetching filter data:", error);
      setFilterData([]);
      setFilteredData([]);
      showSnackbar("Failed to load products from server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  const fetchCatalogForProduct = async (productName, productSize = null) => {
    console.log("=== DEBUG ===");
    console.log("productName received:", productName);
    console.log("productSize received:", productSize);
    console.log("Type of productSize:", typeof productSize);
    
    // Create cache key
    const cacheKey = productSize ? `${productName}::${productSize}` : `${productName}::all`;
    
    // Check cache
    if (catalogCache[cacheKey]) {
      return catalogCache[cacheKey];
    }
    
    // Build the URL
    let url = `${API_BASE_URL}/catalog/get-by-product?productName=${encodeURIComponent(productName)}`;
    
    // ADD productSize parameter only if it's provided and not empty
    if (productSize && typeof productSize === 'string' && productSize.trim().length > 0) {
      url += `&productSize=${encodeURIComponent(productSize.trim())}`;
    }
    
    console.log("🌐 API CALL:", url);
    console.log("🔗 Human readable:", decodeURIComponent(url));
    
    try {
      const response = await axios.get(url);
      const catalogItems = response?.data?.data?.catalogData || [];
      
      // Cache it
      setCatalogCache(prev => ({ ...prev, [cacheKey]: catalogItems }));
      
      return catalogItems;
    } catch (error) {
      console.error("❌ Fetch error:", error);
      return [];
    }
  };

  const handleAccordionChange = (panel, product) => async (event, isExpanded) => {
    console.log("🔍 === xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx === :",product);

    setExpanded(isExpanded ? panel : null);

    if (isExpanded && product?.productName) {
      // Determine what size to fetch
      let sizeToFetch = null;

      // ONLY use size filter if:
      // 1. Filter is applied (user clicked "Apply Filter")
      // 2. AND we have a product size selected
      // 3. AND the product matches the filtered product
      if (isFilterApplied && 
          searchInput.productSize && 
          searchInput.productSize.trim().length > 0 &&
          searchInput.productName === product.productName) {
        sizeToFetch = searchInput.productSize;
        // console.log("✅ Using applied filter size:", sizeToFetch);
      } else {
        // When no filter is applied OR viewing different product, fetch ALL sizes
        // console.log("🌐 No filter applied - fetching ALL sizes");
      }

      // Make the API call
      await fetchCatalogForProduct(product.productName, product);
    }
  };

  const productNames = useMemo(() => {
    const set = new Set();
    filterData.forEach((p) => {
      if (p?.productName) set.add(p.productName);
    });
    const names = Array.from(set).sort();
    console.log("Available product names:", names);
    return names;
  }, [filterData]);

  // Get sizes for a product from catalogCache or fetch
  const getSizesForProduct = (productName) => {
    if (!productName) return [];
    
    console.log(`Getting sizes for: ${productName}`);
    
    // Check all cache entries for this product
    const allCachedItems = Object.entries(catalogCache)
      .filter(([key]) => key.startsWith(productName))
      .flatMap(([_, items]) => items);
    
    console.log(`Found ${allCachedItems.length} cached items for ${productName}`);
    
    if (allCachedItems.length > 0) {
      const sizes = [...new Set(allCachedItems.map(item => item.productSize))].filter(Boolean);
      console.log(`Sizes from cache:`, sizes);
      return sizes.sort();
    }
    
    // Fallback to filterData structure
    const product = filterData.find((p) => p.productName === productName);
    const groups = Array.isArray(product?.productSizes)
      ? product.productSizes
      : [];
    const sizes = groups.map((g) => g.size).filter(Boolean).sort();
    console.log(`Sizes from filterData:`, sizes);
    return sizes;
  };

  const handleProductNameChange = async (value) => {
    console.log("Product name changed to:", value);
    
    setSearchInput((prev) => ({
      ...prev,
      productName: value,
      productSize: "",
    }));

    if (value) {
      // Fetch catalog to get available sizes
      await fetchCatalogForProduct(value);
      
      // Update available sizes
      setTimeout(() => {
        const sizes = getSizesForProduct(value);
        console.log("Setting available sizes:", sizes);
        setAvailableSizes(sizes);
      }, 100);
    } else {
      setAvailableSizes([]);
    }
  };

  const handleSearchChange = (field, value) => {
    setSearchInput((prev) => ({ ...prev, [field]: value }));
    if (field === "productName" && value === "") {
      setSearchInput((prev) => ({ ...prev, productSize: "" }));
      setAvailableSizes([]);
    }
  };

  const handleApplyFilter = () => {
    if (!searchInput.productName && !searchInput.productSize) {
      showSnackbar("Please select at least one filter option", "warning");
      return;
    }

    console.log("Applying filter:", searchInput);
    setLoading(true);

    try {
      let arr = [...filterData];

      if (searchInput.productName) {
        arr = arr.filter((p) => p.productName === searchInput.productName);
      }

      setFilteredData(arr);
      
      // Set isFilterApplied to TRUE when user clicks Apply Filter
      setIsFilterApplied(true);

      if (arr.length === 0) {
        showSnackbar("No products found for selected filters", "info");
      } else {
        showSnackbar(
          `Found ${arr.length} product(s) matching your filter`,
          "success"
        );
      }
    } catch (error) {
      console.error("Error applying filter:", error);
      setFilteredData(filterData);
      setIsFilterApplied(false);
      showSnackbar("Error applying filter", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setSearchInput({ productName: "", productSize: "" });
    setAvailableSizes([]);
    setIsFilterApplied(false);
    setFilteredData(filterData);
    showSnackbar("Showing all products", "info");
  };

  const getCatalogItemsForProduct = (productName) => {
    // Get all catalog items for this product from all cache entries
    const items = Object.entries(catalogCache)
      .filter(([key]) => key.startsWith(productName))
      .flatMap(([_, items]) => items);
    
    console.log(`Getting catalog items for ${productName}:`, items.length);
    return items;
  };

  // Get unique sizes from catalog items
  const getSizeGroupsFromCatalog = (productName) => {
    const catalogItems = getCatalogItemsForProduct(productName);
    const sizes = [...new Set(catalogItems.map(item => item.productSize))].filter(Boolean);
    const sizeGroups = sizes.sort().map(size => ({ size }));
    
    console.log(`Size groups for ${productName}:`, sizeGroups);
    return sizeGroups;
  };

  const productCount = filteredData.length;
  const totalItems = Object.values(catalogCache).reduce((sum, items) => {
    return sum + (Array.isArray(items) ? items.length : 0);
  }, 0);

  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  const handleOpenUpdateModal = (product, payload = null) => {
  console.log("📝 Opening update modal...");
  console.log("Product:", product);
  console.log("Payload:", payload);
  
  if (payload?.itemId) {
    // Editing a single catalog item
    const catalogItems = getCatalogItemsForProduct(product.productName);
    console.log("Catalog items found:", catalogItems.length);
    
    // Find the item in catalog cache
    const item = catalogItems.find((item) => item.uuid === payload.itemId);
    console.log("Found item to edit:", item);
    
    // Format the data for CreateProductForm
    setEditingProduct({
      // IMPORTANT: Pass the catalog item's ID, not the product's ID
      uuid: item.uuid, // Catalog item ID
      productName: item.productName || product.productName,
      productSize: item.productSize || payload.size || "",
      title: item.title || "",
      description: item.description || "",
      buttonText: item.buttonText || "View Details",
      imageUrl: item.imageUrl || "",
      pdfUrl: item.pdfUrl || "",
      // Add these fields if your CreateProductForm needs them
      editingSingleItem: true,
      targetSize: payload.size || item.productSize || "",
      itemId: payload.itemId,
    });
  } else {
    // Editing the entire product (creating a new catalog item)
    console.log("Creating new catalog item for product:", product);
    
    setEditingProduct({
      productName: product.productName,
      // For creating new catalog items, we don't need existing data
      editingSingleItem: false,
    });
  }

  setModalMode("update");
  setOpenModal(true);
};

  const handleDeleteClick = (target, e) => {
    e.stopPropagation();
    setDeleteTarget(target);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    try {
      setLoading(true);

      if (deleteTarget.type === "item") {
        const deleteUrl = `${API_BASE_URL}/catalog/delete/${deleteTarget.itemId}`;
        const res = await axios.delete(deleteUrl);

        if (res?.data?.success) {
          showSnackbar("Item deleted successfully", "success");
          
          const productName = deleteTarget.product.productName;
          
          // Clear all cache entries for this product
          setCatalogCache((prev) => {
            const newCache = { ...prev };
            Object.keys(newCache).forEach(key => {
              if (key.startsWith(productName)) {
                delete newCache[key];
              }
            });
            return newCache;
          });
          
          await fetchFilterData();
          if (expanded) {
            await fetchCatalogForProduct(productName);
          }
        } else {
          showSnackbar(res?.data?.message || "Failed to delete item", "error");
        }
      } else if (deleteTarget.type === "size") {
        const catalogItems = getCatalogItemsForProduct(
          deleteTarget.product.productName
        ).filter((item) => item.productSize === deleteTarget.size);

        if (catalogItems.length === 0) {
          showSnackbar("No items found to delete", "warning");
          setLoading(false);
          setDeleteDialogOpen(false);
          setDeleteTarget(null);
          return;
        }

        const deletePromises = catalogItems.map((item) =>
          axios.delete(`${API_BASE_URL}/catalog/delete/${item.uuid}`)
        );

        const results = await Promise.allSettled(deletePromises);

        const successCount = results.filter(
          (r) => r.status === "fulfilled" && r.value?.data?.success
        ).length;
        const failCount = catalogItems.length - successCount;

        if (failCount === 0) {
          showSnackbar(
            `Successfully deleted size "${deleteTarget.size}" with ${successCount} item${
              successCount !== 1 ? "s" : ""
            }`,
            "success"
          );
        } else if (successCount > 0) {
          showSnackbar(
            `Partially deleted: ${successCount} succeeded, ${failCount} failed`,
            "warning"
          );
        } else {
          showSnackbar("Failed to delete items", "error");
        }

        const productName = deleteTarget.product.productName;
        
        // Clear all cache entries for this product
        setCatalogCache((prev) => {
          const newCache = { ...prev };
          Object.keys(newCache).forEach(key => {
            if (key.startsWith(productName)) {
              delete newCache[key];
            }
          });
          return newCache;
        });

        await fetchFilterData();
        if (expanded) {
          await fetchCatalogForProduct(productName);
        }
      } else if (deleteTarget.type === "product") {
        const catalogItems = getCatalogItemsForProduct(
          deleteTarget.product.productName
        );

        if (catalogItems.length === 0) {
          showSnackbar("No items found to delete", "warning");
          setLoading(false);
          setDeleteDialogOpen(false);
          setDeleteTarget(null);
          return;
        }

        const deletePromises = catalogItems.map((item) =>
          axios.delete(`${API_BASE_URL}/catalog/delete/${item.uuid}`)
        );

        const results = await Promise.allSettled(deletePromises);

        const successCount = results.filter(
          (r) => r.status === "fulfilled" && r.value?.data?.success
        ).length;
        const failCount = catalogItems.length - successCount;

        if (failCount === 0) {
          showSnackbar(
            `Successfully deleted product "${deleteTarget.product.productName}" with ${successCount} item${
              successCount !== 1 ? "s" : ""
            }`,
            "success"
          );
        } else if (successCount > 0) {
          showSnackbar(
            `Partially deleted: ${successCount} succeeded, ${failCount} failed`,
            "warning"
          );
        } else {
          showSnackbar("Failed to delete product", "error");
        }

        const productName = deleteTarget.product.productName;
        
        // Clear all cache entries for this product
        setCatalogCache((prev) => {
          const newCache = { ...prev };
          Object.keys(newCache).forEach(key => {
            if (key.startsWith(productName)) {
              delete newCache[key];
            }
          });
          return newCache;
        });

        await fetchFilterData();
      } else {
        throw new Error("Unknown delete type");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showSnackbar(error.response?.data?.message || "Error deleting", "error");
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleFormSuccess = async () => {
    showSnackbar(
      modalMode === "update" ? "Updated successfully" : "Created successfully",
      "success"
    );
    
    if (editingProduct?.productName) {
      // Clear all cache entries for this product
      setCatalogCache((prev) => {
        const newCache = { ...prev };
        Object.keys(newCache).forEach(key => {
          if (key.startsWith(editingProduct.productName)) {
            delete newCache[key];
          }
        });
        return newCache;
      });
    }
    
    await fetchFilterData();
    
    if (expanded && editingProduct?.productName) {
      await fetchCatalogForProduct(editingProduct.productName);
    }
    
    handleCloseModal();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            {deleteTarget?.type === "product" && (
              <>
                Are you sure you want to delete the entire product "
                <strong>{deleteTarget.product.productName}</strong>"?
                <br />
                <br />
                This action cannot be undone.
              </>
            )}

            {deleteTarget?.type === "size" && (
              <>
                Are you sure you want to delete size "
                <strong>{deleteTarget.size}</strong>" from product "
                <strong>{deleteTarget.product.productName}</strong>"?
                <br />
                <br />
                This action cannot be undone.
              </>
            )}

            {deleteTarget?.type === "item" && (
              <>
                Are you sure you want to delete this item from size "
                <strong>{deleteTarget.size}</strong>" in product "
                <strong>{deleteTarget.product.productName}</strong>"?
                <br />
                <br />
                This action cannot be undone.
              </>
            )}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
            startIcon={loading ? null : <DeleteOutlineIcon />}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Product Catalogue
          </Typography>
          {!loading && (
            <Typography variant="body2" color="text.secondary">
              Showing {productCount} product{productCount !== 1 ? "s" : ""} with{" "}
              {totalItems} loaded item{totalItems !== 1 ? "s" : ""}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
          disabled={loading}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Create New Catalogue
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        {!loading && filteredData.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              border: "2px dashed #e0e0e0",
              borderRadius: 3,
              backgroundColor: "#fafafa",
            }}
          >
            <InventoryIcon
              sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {isFilterApplied
                ? "No Products Found"
                : "No Product Catalogues Found"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {isFilterApplied
                ? "No products found for selected filters"
                : "Start by creating your first product catalogue"}
            </Typography>

            {isFilterApplied ? (
              <Button
                variant="outlined"
                startIcon={<ClearIcon />}
                onClick={handleClearFilter}
              >
                Clear Filter & Show All
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal}
              >
                Create First Catalogue
              </Button>
            )}
          </Paper>
        ) : (
          !loading &&
          filteredData.map((product, productIndex) => {
            const panelId = product.uuid || `product-${productIndex}`;
            
            const catalogItems = getCatalogItemsForProduct(product.productName);
            const isLoadingCatalog = Object.keys(loadingCatalog).some(key => 
              key.startsWith(product.productName)
            );
            
            // Get size groups from catalog items (dynamic)
            const groups = getSizeGroupsFromCatalog(product.productName);
            
            // Filter by search if productSize is selected AND filter is applied
            const filteredGroups = (searchInput.productSize && isFilterApplied)
              ? groups.filter(g => g.size === searchInput.productSize)
              : groups;

            return (
              <Accordion
                key={panelId}
                expanded={expanded === panelId}
                onChange={handleAccordionChange(panelId, product)}
                sx={{
                  mb: 3,
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: isFilterApplied ? "#e8f5e9" : "#f8f9fa",
                    "&:hover": {
                      backgroundColor: isFilterApplied ? "#d4edda" : "#e9ecef",
                    },
                    minHeight: 80,
                    borderLeft: isFilterApplied
                      ? "6px solid #4caf50"
                      : "6px solid #1976d2",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      pr: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {product.productName}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {groups.length} size group
                          {groups.length !== 1 ? "s" : ""} • {catalogItems.length} item
                          {catalogItems.length !== 1 ? "s" : ""}
                        </Typography>
                        {isFilterApplied && (
                          <Chip
                            label="Filtered"
                            size="small"
                            color="success"
                            variant="filled"
                            sx={{ fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title={`${groups.length} size group(s)`}>
                        <Chip
                          label={`${groups.length} Size${
                            groups.length !== 1 ? "s" : ""
                          }`}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </Tooltip>

                      <Stack direction="row" spacing={0.5}>
                        <Tooltip title="Edit Entire Product">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenUpdateModal(product, null);
                            }}
                            sx={{
                              backgroundColor: "rgba(25, 118, 210, 0.08)",
                              "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.15)",
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete Entire Product">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={(e) =>
                              handleDeleteClick({ type: "product", product }, e)
                            }
                            sx={{
                              backgroundColor: "rgba(244, 67, 54, 0.08)",
                              "&:hover": {
                                backgroundColor: "rgba(244, 67, 54, 0.15)",
                              },
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  {isLoadingCatalog ? (
                    <Box sx={{ p: 5, textAlign: "center" }}>
                      <CircularProgress />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Loading catalog items for {product.productName}...
                      </Typography>
                    </Box>
                  ) : catalogItems.length === 0 ? (
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        No catalog items found for <strong>{product.productName}</strong>. Click "Add First Item" to create one.
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalMode("create");
                          setEditingProduct({
                            uuid: product.uuid,
                            productName: product.productName,
                            addItemToExistingSize: false,
                          });
                          setOpenModal(true);
                        }}
                      >
                        Add First Item
                      </Button>
                    </Box>
                  ) : filteredGroups.length === 0 ? (
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No sizes match your filter criteria for <strong>{product.productName}</strong>.
                      </Typography>
                    </Box>
                  ) : (
                    filteredGroups.map((sizeGroup, sizeIndex) => {
                      const sizeLabel = sizeGroup.size;
                      const items = catalogItems.filter(
                        (item) => item.productSize === sizeLabel
                      );

                      return (
                        <Box key={`${product.uuid}-${sizeLabel}-${sizeIndex}`}>
                          <Box
                            sx={{
                              p: 3,
                              backgroundColor: "#f5f5f5",
                              borderBottom: "1px solid #e0e0e0",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              gap: 2,
                            }}
                          >
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h6"
                                color="primary"
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  mb: 1,
                                }}
                              >
                                <span style={{ fontWeight: "bold" }}>Size:</span>{" "}
                                {sizeLabel}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {items.length} item{items.length !== 1 ? "s" : ""}{" "}
                                in this size
                              </Typography>
                            </Box>

                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<AddIcon />}
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalMode("create");
                                setEditingProduct({
                                  uuid: product.uuid,
                                  productName: product.productName,
                                  addItemToExistingSize: true,
                                  targetSize: sizeLabel,
                                });
                                setOpenModal(true);
                              }}
                            >
                              Add Item
                            </Button>

                            <Tooltip title={`Delete size ${sizeLabel}`}>
                              <IconButton
                                size="small"
                                color="error"
                                onClick={(e) =>
                                  handleDeleteClick(
                                    { type: "size", product, size: sizeLabel },
                                    e
                                  )
                                }
                                sx={{
                                  backgroundColor: "rgba(244, 67, 54, 0.08)",
                                  "&:hover": {
                                    backgroundColor: "rgba(244, 67, 54, 0.15)",
                                  },
                                  height: 36,
                                  width: 36,
                                }}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>

                          <Box sx={{ p: 3 }}>
                            {items.length === 0 ? (
                              <Typography variant="body2" color="text.secondary">
                                No items in this size.
                              </Typography>
                            ) : (
                              <Grid container spacing={2}>
                                {items.map((item) => {
                                  const itemId = item.uuid;
                                  return (
                                    <Grid item xs={12} key={itemId}>
                                      <Paper
                                        variant="outlined"
                                        sx={{ p: 2, borderRadius: 2 }}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            gap: 2,
                                          }}
                                        >
                                          <Box sx={{ flex: 1 }}>
                                            <Typography
                                              variant="subtitle1"
                                              fontWeight="bold"
                                            >
                                              {item.title || "Untitled"}
                                            </Typography>

                                            <Typography
                                              variant="body2"
                                              sx={{
                                                mt: 1,
                                                display: "flex",
                                                gap: 1,
                                                alignItems: "center",
                                              }}
                                            >
                                              <InfoIcon fontSize="small" />
                                              {item.description ||
                                                "No description available"}
                                            </Typography>

                                            <Typography
                                              variant="body2"
                                              sx={{
                                                mt: 1,
                                                display: "flex",
                                                gap: 1,
                                                alignItems: "center",
                                              }}
                                            >
                                              <CategoryIcon fontSize="small" />
                                              <strong>Product:</strong>{" "}
                                              {product.productName} &nbsp;|&nbsp;
                                              <strong>Size:</strong> {sizeLabel}
                                            </Typography>

                                            {item.pdfUrl && (
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  mt: 1,
                                                  display: "flex",
                                                  gap: 1,
                                                  alignItems: "center",
                                                }}
                                              >
                                                <CategoryIcon fontSize="small" />
                                                <strong>PDF:</strong>{" "}
                                                <a
                                                  href={item.pdfUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  View PDF
                                                </a>
                                              </Typography>
                                            )}

                                            <Box sx={{ mt: 2 }}>
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 1,
                                                  fontWeight: 600,
                                                  color: "primary.main",
                                                  mb: 1,
                                                }}
                                              >
                                                <ImageIcon fontSize="small" />{" "}
                                                Image
                                              </Typography>

                                              {item.imageUrl ? (
                                                <Box
                                                  sx={{
                                                    width: "100%",
                                                    maxWidth: 520,
                                                    height: 220,
                                                    borderRadius: 2,
                                                    overflow: "hidden",
                                                    border: "1px solid #e0e0e0",
                                                    backgroundColor: "#fafafa",
                                                  }}
                                                >
                                                  <img
                                                    src={item.imageUrl}
                                                    alt={`${product.productName}-${sizeLabel}`}
                                                    style={{
                                                      width: "100%",
                                                      height: "100%",
                                                      objectFit: "cover",
                                                    }}
                                                    onError={(e) => {
                                                      e.currentTarget.src =
                                                        "https://via.placeholder.com/520x220?text=Image+Not+Found";
                                                    }}
                                                  />
                                                </Box>
                                              ) : (
                                                <Typography
                                                  variant="body2"
                                                  color="text.secondary"
                                                >
                                                  No image available
                                                </Typography>
                                              )}
                                            </Box>
                                          </Box>

                                          <Stack direction="row" spacing={1}>
                                            <Tooltip title="Edit item">
                                              <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  console.log("Edit item clicked:", item);
                                                  handleOpenUpdateModal(product, {
                                                    size: sizeLabel,
                                                    itemId: item.uuid,
                                                    title: item.title,
                                                    description: item.description,
                                                    imageUrl: item.imageUrl,
                                                    pdfUrl: item.pdfUrl,
                                                    // Pass the entire item object
                                                    ...item
                                                  });
                                                }}
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(25, 118, 210, 0.08)",
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "rgba(25, 118, 210, 0.15)",
                                                  },
                                                }}
                                              >
                                                <EditIcon fontSize="small" />
                                              </IconButton>
                                            </Tooltip>

                                            <Tooltip title="Delete item">
                                              <IconButton
                                                size="small"
                                                color="error"
                                                onClick={(e) =>
                                                  handleDeleteClick(
                                                    {
                                                      type: "item",
                                                      product,
                                                      size: sizeLabel,
                                                      itemId: item.uuid,
                                                    },
                                                    e
                                                  )
                                                }
                                                sx={{
                                                  backgroundColor:
                                                    "rgba(244, 67, 54, 0.08)",
                                                  "&:hover": {
                                                    backgroundColor:
                                                      "rgba(244, 67, 54, 0.15)",
                                                  },
                                                }}
                                              >
                                                <DeleteOutlineIcon fontSize="small" />
                                              </IconButton>
                                            </Tooltip>
                                          </Stack>
                                        </Box>
                                      </Paper>
                                    </Grid>
                                  );
                                })}
                              </Grid>
                            )}
                          </Box>

                          {sizeIndex < filteredGroups.length - 1 && (
                            <Divider
                              sx={{
                                my: 0,
                                borderColor: "#1976d2",
                                borderWidth: 1,
                              }}
                            />
                          )}
                        </Box>
                      );
                    })
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Box>

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        scroll="paper"
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        PaperProps={{
          sx: { borderRadius: 3, maxHeight: "90vh", overflow: "hidden" },
        }}
      >
        DialogTitle

        <DialogContent dividers sx={{ p: 0 }}>
  <CreateProductForm
    openModal={openModal}
    setOpenModal={setOpenModal}
    mode={modalMode}
    editingProduct={editingProduct}
    onSuccess={handleFormSuccess}
    onClose={handleCloseModal}
  />
</DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateProductPage;