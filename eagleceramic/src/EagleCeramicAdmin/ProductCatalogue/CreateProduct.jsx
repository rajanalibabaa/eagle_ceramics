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
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
import { getAdminToken } from "../../EagleCeramicAdmin/utils/auth";

import CreateProductForm from "./CreateProductForm";
import axios from "axios";

const API_BASE_URL = "https://clientbackend.cholabiz.com/api/v1/eagle-ceramic";

const CreateProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
const [expandedDescriptions, setExpandedDescriptions] = useState({});

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
  const [expandedSizes, setExpandedSizes] = useState({}); // Track expanded sizes

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
const toggleDescription = (itemId) => {
  setExpandedDescriptions(prev => ({
    ...prev,
    [itemId]: !prev[itemId]
  }));
};

// Add this function to check if description needs truncation
const isDescriptionLong = (description) => {
  if (!description) return false;
  // Check if description is longer than 150 characters (adjust as needed)
  return description.length > 150;
};

// Add this function to truncate description
const truncateDescription = (description, isExpanded) => {
  if (!description) return '';
  if (isExpanded || !isDescriptionLong(description)) {
    return description;
  }
  // Show first 150 characters + ellipsis
  return description.substring(0, 150) + '...';
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
      setCatalogData(catArr);
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
    console.log("=== FETCH CATALOG ===");
    console.log("Product:", productName);
    console.log("Size:", productSize);
    
    const cacheKey = productSize 
      ? `${productName}::${productSize}` 
      : `${productName}::all`;
    
    // Check cache
    if (catalogCache[cacheKey]) {
      console.log("Using cached data for:", cacheKey);
      return catalogCache[cacheKey];
    }
    
    let url = `${API_BASE_URL}/catalog/get-by-product`;
    const params = new URLSearchParams();
    
    if (productName) {
      params.append('productName', productName);
    }
    
    if (productSize && productSize.trim().length > 0) {
      params.append('productSize', productSize.trim());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    console.log("🌐 API URL:", url);
    
    try {
      // Set loading state for this specific fetch
      setLoadingCatalog(prev => ({ ...prev, [cacheKey]: true }));
      
      const response = await axios.get(url);
      const catalogItems = response?.data?.data?.catalogData || [];
      
      console.log(`📦 Retrieved ${catalogItems.length} items for ${cacheKey}`);
      
      // Cache it
      setCatalogCache(prev => ({ 
        ...prev, 
        [cacheKey]: catalogItems 
      }));
      
      return catalogItems;
    } catch (error) {
      console.error("❌ Fetch error:", error);
      return [];
    } finally {
      // Clear loading state
      setLoadingCatalog(prev => {
        const newState = { ...prev };
        delete newState[cacheKey];
        return newState;
      });
    }
  };

  const handleAccordionChange = (panel, product) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);

    if (isExpanded && product?.productName) {
      setExpandedSizes({});
    }
  };

  const handleSizeAccordionChange = (productName, sizeLabel) => async (event, isExpanded) => {
    event.stopPropagation(); 
    
    console.log(`Size accordion: ${productName} - ${sizeLabel}`, isExpanded);
    
    setExpandedSizes(prev => ({
      ...prev,
      [`${productName}-${sizeLabel}`]: isExpanded
    }));

    if (isExpanded && productName && sizeLabel) {
      // Fetch catalog data for this specific product and size
      console.log(`Fetching data for ${productName} - ${sizeLabel}`);
      await fetchCatalogForProduct(productName, sizeLabel);
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

  // Get sizes for a product from filterData
  const getSizesForProduct = (productName) => {
    if (!productName) return [];
    
    const product = filterData.find((p) => p.productName === productName);
    const groups = Array.isArray(product?.productSizes)
      ? product.productSizes
      : [];
    const sizes = groups.map((g) => g.size).filter(Boolean).sort();
    console.log(`Sizes for ${productName}:`, sizes);
    return sizes;
  };

  // Get catalog items for specific product and size
  const getCatalogItemsForProductAndSize = (productName, productSize = null) => {
    const cacheKey = productSize 
      ? `${productName}::${productSize}` 
      : `${productName}::all`;
    
    return catalogCache[cacheKey] || [];
  };

  const handleProductNameChange = async (value) => {
    console.log("Product name changed to:", value);
    
    setSearchInput((prev) => ({
      ...prev,
      productName: value,
      productSize: "",
    }));

    if (value) {
      const sizes = getSizesForProduct(value);
      console.log("Setting available sizes:", sizes);
      setAvailableSizes(sizes);
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

  // Get product sizes from filterData (static data)
  const getProductSizesFromFilterData = (productName) => {
    const product = filterData.find((p) => p.productName === productName);
    if (!product || !product.productSizes) return [];
    
    return product.productSizes.map(sizeGroup => ({
      size: sizeGroup.size
    }));
  };

  // ADD THIS MISSING FUNCTION
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
    
    // Get the token for authorization
    const token = getAdminToken();
    if (!token) {
      showSnackbar('Authentication token not found. Please login again.', 'error');
      setLoading(false);
      return;
    }

    // Create axios config with authorization header
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    if (deleteTarget.type === "item") {
      const deleteUrl = `${API_BASE_URL}/catalog/delete/${deleteTarget.itemId}`;
      console.log("DELETE request URL:", deleteUrl);
      console.log("Authorization token:", token ? "Present" : "Missing");
      
      const res = await axios.delete(deleteUrl, axiosConfig);

      if (res?.data?.success) {
        showSnackbar("Item deleted successfully", "success");
        
        const productName = deleteTarget.product.productName;
        const size = deleteTarget.size;
        
        // Clear cache for this specific product and size
        const cacheKey = `${productName}::${size}`;
        setCatalogCache(prev => {
          const newCache = { ...prev };
          delete newCache[cacheKey];
          return newCache;
        });
        
        // Also clear the "all" cache for this product
        const allCacheKey = `${productName}::all`;
        setCatalogCache(prev => {
          const newCache = { ...prev };
          delete newCache[allCacheKey];
          return newCache;
        });
        
        await fetchFilterData();
        
        // Re-fetch if this size is currently expanded
        if (expandedSizes[`${productName}-${size}`]) {
          await fetchCatalogForProduct(productName, size);
        }
      } else {
        showSnackbar(res?.data?.message || "Failed to delete item", "error");
      }
    } else if (deleteTarget.type === "size") {
      const productName = deleteTarget.product.productName;
      const size = deleteTarget.size;
      
      // Get items for this size from cache
      const cacheKey = `${productName}::${size}`;
      const catalogItems = catalogCache[cacheKey] || [];

      if (catalogItems.length === 0) {
        showSnackbar("No items found to delete", "warning");
        setLoading(false);
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
        return;
      }

      const deletePromises = catalogItems.map((item) =>
        axios.delete(`${API_BASE_URL}/catalog/delete/${item.uuid}`, axiosConfig)
      );

      const results = await Promise.allSettled(deletePromises);

      const successCount = results.filter(
        (r) => r.status === "fulfilled" && r.value?.data?.success
      ).length;
      const failCount = catalogItems.length - successCount;

      if (failCount === 0) {
        showSnackbar(
          `Successfully deleted size "${size}" with ${successCount} item${
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

      // Clear cache for this product and size
      setCatalogCache(prev => {
        const newCache = { ...prev };
        delete newCache[cacheKey];
        
        // Also clear the "all" cache
        const allCacheKey = `${productName}::all`;
        delete newCache[allCacheKey];
        
        return newCache;
      });

      await fetchFilterData();
      
      // Remove this size from expanded state
      setExpandedSizes(prev => {
        const newState = { ...prev };
        delete newState[`${productName}-${size}`];
        return newState;
      });
    } else if (deleteTarget.type === "product") {
      const productName = deleteTarget.product.productName;
      
      // Get all catalog items for this product from all cache entries
      const allItems = Object.entries(catalogCache)
        .filter(([key]) => key.startsWith(productName))
        .flatMap(([_, items]) => items);

      if (allItems.length === 0) {
        showSnackbar("No items found to delete", "warning");
        setLoading(false);
        setDeleteDialogOpen(false);
        setDeleteTarget(null);
        return;
      }

      const deletePromises = allItems.map((item) =>
        axios.delete(`${API_BASE_URL}/catalog/delete/${item.uuid}`, axiosConfig)
      );

      const results = await Promise.allSettled(deletePromises);

      const successCount = results.filter(
        (r) => r.status === "fulfilled" && r.value?.data?.success
      ).length;
      const failCount = allItems.length - successCount;

      if (failCount === 0) {
        showSnackbar(
          `Successfully deleted product "${productName}" with ${successCount} item${
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

      // Clear all cache entries for this product
      setCatalogCache(prev => {
        const newCache = { ...prev };
        Object.keys(newCache).forEach(key => {
          if (key.startsWith(productName)) {
            delete newCache[key];
          }
        });
        return newCache;
      });

      await fetchFilterData();
      
      // Clear expanded state for this product
      setExpandedSizes(prev => {
        const newState = { ...prev };
        Object.keys(newState).forEach(key => {
          if (key.startsWith(productName)) {
            delete newState[key];
          }
        });
        return newState;
      });
      
      // Collapse the product accordion
      setExpanded(null);
    } else {
      throw new Error("Unknown delete type");
    }
  } catch (error) {
    console.error("Delete error:", error);
    console.error("Error status:", error.response?.status);
    console.error("Error data:", error.response?.data);
    
    if (error.response?.status === 401) {
      showSnackbar('Session expired. Please login again.', 'error');
    } else if (error.response?.data?.message) {
      showSnackbar(error.response.data.message, "error");
    } else {
      showSnackbar(error.message || "Error deleting", "error");
    }
  } finally {
    setLoading(false);
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
  }
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
      // Get the specific catalog item
      const items = getCatalogItemsForProductAndSize(
        product.productName, 
        payload.size
      );
      const item = items.find((item) => item.uuid === payload.itemId);
      
      setEditingProduct({
        uuid: item.uuid,
        productName: item.productName || product.productName,
        productSize: item.productSize || payload.size || "",
        title: item.title || "",
        description: item.description || "",
        buttonText: item.buttonText || "View Details",
        imageUrl: item.imageUrl || "",
        pdfUrl: item.pdfUrl || "",
        editingSingleItem: true,
        targetSize: payload.size || item.productSize || "",
        itemId: payload.itemId,
      });
    } else {
      setEditingProduct({
        productName: product.productName,
        editingSingleItem: false,
      });
    }

    setModalMode("update");
    setOpenModal(true);
  };

  const handleFormSuccess = async () => {
  showSnackbar(
    modalMode === "update" ? "Updated successfully" : "Created successfully",
    "success"
  );

  if (!editingProduct?.productName) {
    handleCloseModal();
    return;
  }

  const productName = editingProduct.productName;
  const targetSize = editingProduct.targetSize; // Size of the updated item (if single-item edit)

  // 1️⃣ Clear ALL cache entries for this product
  setCatalogCache(prev => {
    const newCache = { ...prev };
    Object.keys(newCache).forEach(key => {
      if (key.startsWith(productName)) delete newCache[key];
    });
    return newCache;
  });

  // 2️⃣ Re‑fetch filter data (product list)
  await fetchFilterData();

  try {
    if (editingProduct.editingSingleItem && targetSize) {
      await fetchCatalogForProduct(productName, targetSize);
    } else {
      await fetchCatalogForProduct(productName);
    }

    const productPanelId = filteredData.find(p => p.productName === productName)?.uuid || "";
    
    if (expanded === productPanelId) {
      // Get all sizes currently expanded for this product
      const expandedSizeKeys = Object.keys(expandedSizes).filter(
        key => key.startsWith(productName) && expandedSizes[key]
      );

      // Re‑fetch data for each expanded size
      const fetchPromises = expandedSizeKeys.map(key => {
        const size = key.split('-')[1];
        return fetchCatalogForProduct(productName, size);
      });

      await Promise.all(fetchPromises);
    }
  } catch (error) {
    console.error("❌ Error refreshing catalogue:", error);
    showSnackbar("Failed to refresh data", "error");
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
            mt={{xs:3,sm:3}}
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Product Catalogue
          </Typography>
          
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
            
            // Get product sizes from filterData
            const productSizes = getProductSizesFromFilterData(product.productName);
            
            // Filter sizes if needed
            const filteredSizes = (searchInput.productSize && isFilterApplied)
              ? productSizes.filter(g => g.size === searchInput.productSize)
              : productSizes;

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
                      
                      </Box>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  {filteredSizes.length === 0 ? (
                    <Box sx={{ p: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        No sizes match your filter criteria for <strong>{product.productName}</strong>.
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ p: 2 }}>
                      {filteredSizes.map((sizeGroup, sizeIndex) => {
                        const sizeLabel = sizeGroup.size;
                        const sizeAccordionId = `${product.productName}-${sizeLabel}`;
                        const isSizeExpanded = expandedSizes[sizeAccordionId] || false;
                        
                        // Get items for this specific size (will be empty until fetched)
                        const items = getCatalogItemsForProductAndSize(
                          product.productName, 
                          sizeLabel
                        );
                        
                        const isLoading = loadingCatalog[`${product.productName}::${sizeLabel}`] || false;

                        return (
                          <Box 
                            key={`size-${sizeIndex}`} 
                            sx={{ 
                              mb: 2,
                              "&:last-child": { mb: 0 }
                            }}
                          >
                            <Accordion
                              expanded={isSizeExpanded}
                              onChange={handleSizeAccordionChange(product.productName, sizeLabel)}
                              sx={{
                                boxShadow: 'none',
                                border: '1px solid #e0e0e0',
                                '&:before': { display: 'none' },
                                borderRadius: 1,
                              }}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                  backgroundColor: '#f9f9f9',
                                  minHeight: 56,
                                  '&:hover': { backgroundColor: '#f0f0f0' },
                                }}
                              >
                                <Box
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                  }}
                                >
                                  <Typography variant="subtitle1" fontWeight="medium">
                                    Size: {sizeLabel}
                                  </Typography>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {isLoading && (
                                      <CircularProgress size={20} />
                                    )}
                                  
                                  </Box>
                                </Box>
                              </AccordionSummary>
                              <AccordionDetails>
                                {isLoading ? (
                                  <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <CircularProgress />
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                      Loading items for {product.productName} - {sizeLabel}...
                                    </Typography>
                                  </Box>
                                ) : items.length === 0 ? (
                                  <Box sx={{ textAlign: 'center', py: 3 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      No catalog items found for this size.
                                    </Typography>
                                   
                                  </Box>
                                ) : (
                                  <Box>
<Box sx={{ 
    display: 'grid', 
    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' },
    gap: 2
}}>                                      {items.map((item, itemIndex) => (
                                        <Grid item xs={12} sm={6} md={4} key={item.uuid}>
                                          <Paper
                                            elevation={2}
                                            sx={{
                                              p: 2,
                                              borderRadius: 2,
                                              border: '1px solid #e0e0e0',
                                              height: '100%',
                                            }}
                                          >
                                            {item.imageUrl && (
                                              <Box
                                                sx={{
                                                  width: '100%',
                                                  height: 120,
                                                  mb: 2,
                                                  borderRadius: 1,
                                                  overflow: 'hidden',
                                                  backgroundColor: '#f5f5f5',
                                                }}
                                              >
                                                <img
                                                  src={item.imageUrl}
                                                  alt={item.title}
                                                  style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                  }}
                                                />
                                              </Box>
                                            )}
                                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                              {item.title}
                                            </Typography>
                                         <Box sx={{ mb: 2 }}>
  <Typography 
    variant="body2" 
    color="text.secondary"
    sx={{
      display: '-webkit-box',
      WebkitLineClamp: expandedDescriptions[item.uuid] ? 'unset' : 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      lineHeight: 1.5,
    }}
  >
    {item.description}
  </Typography>
  {isDescriptionLong(item.description) && (
    <Button
      size="small"
      onClick={() => toggleDescription(item.uuid)}
      sx={{
        mt: 0.5,
        minWidth: 'auto',
        padding: 0,
        fontSize: '0.75rem',
        textTransform: 'none',
        color: 'primary.main',
        fontWeight: 500,
        '&:hover': {
          backgroundColor: 'transparent',
          textDecoration: 'underline',
        }
      }}
    >
      {expandedDescriptions[item.uuid] ? 'Show Less' : 'Read More'}
    </Button>
  )}
</Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                              <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => {
                                                  if (item.pdfUrl) {
                                                    window.open(item.pdfUrl, '_blank');
                                                  }
                                                }}
                                                disabled={!item.pdfUrl}
                                              >
                                                {item.buttonText || 'View Details'}
                                              </Button>
                                              <Box>
                                                <IconButton
                                                  size="small"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleOpenUpdateModal(product, {
                                                      itemId: item.uuid,
                                                      size: sizeLabel,
                                                    });
                                                  }}
                                                >
                                                  <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                  size="small"
                                                  color="error"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick({
                                                      type: 'item',
                                                      product,
                                                      size: sizeLabel,
                                                      itemId: item.uuid,
                                                    }, e);
                                                  }}
                                                >
                                                  <DeleteOutlineIcon fontSize="small" />
                                                </IconButton>
                                              </Box>
                                            </Box>
                                          </Paper>
                                        </Grid>
                                      ))}
                                    </Box>
                                    
                                  
                                  </Box>
                                )}
                              </AccordionDetails>
                            </Accordion>
                          </Box>
                        );
                      })}
                    </Box>
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
        <DialogTitle>
          {modalMode === "create" ? "Create New Catalogue" : "Update Catalogue"}
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <CreateProductForm
            openModal={openModal}
            setOpenModal={setOpenModal}
            mode={modalMode}
            editingProduct={editingProduct}
            onSuccess={handleFormSuccess}
            onClose={handleCloseModal}
            token={getAdminToken()}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default CreateProductPage;