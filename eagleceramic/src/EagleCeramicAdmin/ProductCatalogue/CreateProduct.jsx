import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import InventoryIcon from "@mui/icons-material/Inventory";
import RefreshIcon from "@mui/icons-material/Refresh";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CreateProductForm from "./CreateProductForm";
import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/v1/eagle-ceramic";

const CreateProductPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingProduct, setEditingProduct] = useState(null);
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [expanded, setExpanded] = useState(null); // Track expanded accordion

  // Modal handlers
  const handleOpenCreateModal = () => {
    setModalMode("create");
    setEditingProduct(null);
    setOpenModal(true);
  };
  
  const handleOpenUpdateModal = (product) => {
    console.log("Opening update modal with product:", product);
    console.log("Product fields:", {
      productName: product.productName,
      productSize: product.productSize,
      title: product.title,
      buttonText: product.buttonText,
      description: product.description,
      imageUrl: product.imageUrl,
      pdfUrl: product.pdfUrl,
    });
    
    setModalMode("update");
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingProduct(null);
  };

  // Accordion handler
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  // Fetch catalog data from API - ONLY catalogData, NOT filterdata
  const fetchCatalogData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/catalog/get-by-product`
      );
      
      console.log("API Response:", response.data);
      
      // Extract ONLY the catalogData array from the response
      let dataArray = [];
      
      if (response.data && response.data.data && response.data.data.catalogData && 
          Array.isArray(response.data.data.catalogData)) {
        dataArray = response.data.data.catalogData;
        console.log("Using catalogData array, found:", dataArray.length, "products");
      } else if (Array.isArray(response.data?.catalogData)) {
        // Alternative structure
        dataArray = response.data.catalogData;
        console.log("Using response.data.catalogData array, found:", dataArray.length, "products");
      }
      
      console.log("Catalog data to display (catalogData only):", dataArray);
      setCatalogData(dataArray);
      
      if (dataArray.length === 0) {
        showSnackbar("No catalog data found", "info");
      }
      
    } catch (error) {
      console.error("Error fetching catalog data:", error);
      
      let errorMessage = "Error fetching catalog data";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = "API endpoint not found. Check if server is running.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = error.response.data?.message || `Error ${error.response.status}`;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Check your connection.";
      }
      
      showSnackbar(errorMessage, "error");
      setCatalogData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  // Delete handlers
  const handleDeleteClick = (product, e) => {
    e.stopPropagation();
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/catalog/delete/${productToDelete.uuid || productToDelete._id}`
      );

      if (response.data.success) {
        showSnackbar("Product deleted successfully", "success");
        fetchCatalogData(); // Refresh the list
      } else {
        showSnackbar(response.data.message || "Failed to delete product", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showSnackbar(
        error.response?.data?.message || "Error deleting product",
        "error"
      );
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Snackbar handlers
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Handle form success
  const handleFormSuccess = () => {
    showSnackbar(
      modalMode === "update"
        ? "Product updated successfully"
        : "Product created successfully",
      "success"
    );
    fetchCatalogData(); // Refresh the list
    handleCloseModal();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Snackbar for notifications */}
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the product "
            {productToDelete?.productName || "this product"}"?
            This action cannot be undone and all associated data will be lost.
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
            {loading ? (
              <>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    mr: 1,
                    border: "2px solid",
                    borderColor: "white.transparent",
                    borderTopColor: "white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Header Row */}
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
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Product Catalogue
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
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
              background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Create New Catalogue
          </Button>
        </Box>
      </Box>

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress />
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 1 }}>
            Loading products...
          </Typography>
        </Box>
      )}

      {/* Catalog List - Displaying ONLY catalogData */}
      <Box sx={{ mt: 3 }}>
        {!loading && catalogData.length === 0 ? (
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
            <InventoryIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Product Catalogues Found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Start by creating your first product catalogue
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreateModal}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Create First Catalogue
            </Button>
          </Paper>
        ) : (
          catalogData.map((product, index) => {
            const panelId = product.uuid || `product-${index}`;
            return (
              <Accordion
                key={panelId}
                expanded={expanded === panelId}
                onChange={handleAccordionChange(panelId)}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  "&:before": { display: "none" },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  border: "1px solid #e0e0e0",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    backgroundColor: "#f8f9fa",
                    "&:hover": { backgroundColor: "#e9ecef" },
                    minHeight: 72,
                  }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between",
                    width: "100%",
                    pr: 2
                  }}>
                    <Box sx={{ display: "flex", alignItems: "center", }}>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {product.productName || `Product ${index + 1}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {product.uuid?.substring(0, 8) || "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Edit Product">
                        <IconButton
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenUpdateModal(product);
                          }}
                          sx={{
                            backgroundColor: "rgba(25, 118, 210, 0.08)",
                            "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.15)" },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Product">
                        <IconButton
                          color="error"
                          onClick={(e) => handleDeleteClick(product, e)}
                          sx={{
                            backgroundColor: "rgba(244, 67, 54, 0.08)",
                            "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.15)" },
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 3 }}>
                  {/* Row 1: Product Information Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 1,
                      color: "primary.main",
                      mb: 2
                    }}>
                      <InfoIcon fontSize="small" /> Product Information
                    </Typography>
                    
                    {/* First Line: Product Name, Size, Button Text, Title */}
                    <Box sx={{ 
                      display: "flex", 
                      flexWrap: "wrap", 
                      alignItems: "center",
                      gap: 3,
                      mb: 2,
                    }}>
                      {/* Product Name */}
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                          Product Name:
                        </Typography>
                        <Typography variant="body2" component="span">
                          {product.productName || "N/A"}
                        </Typography>
                      </Box>
                      
                      {/* Product Size */}
                      {product.productSize && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                            Size:
                          </Typography>
                          <Typography variant="body2" component="span">
                            {product.productSize}
                          </Typography>
                        </Box>
                      )}
                      
                      {/* Button Text */}
                      {product.buttonText && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                            Button Text:
                          </Typography>
                          <Typography variant="body2" component="span">
                            {product.buttonText}
                          </Typography>
                        </Box>
                      )}
                      
                      {/* Title */}
                      {product.title && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                            Title:
                          </Typography>
                          <Typography variant="body2" component="span">
                            {product.title}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    {/* Second Line: Description */}
                    {product.description && (
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Typography variant="body2" component="span" fontWeight="bold" sx={{ mr: 1, minWidth: "90px", mt: 0.5 }}>
                          Description:
                        </Typography>
                        <Typography variant="body2" component="span" sx={{ flex: 1 }}>
                          {product.description}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {/* Row 2: Media Files Section */}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 1,
                      color: "primary.main",
                      mb: 2
                    }}>
                      <CategoryIcon fontSize="small" /> Media Files
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {/* Image Column */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography variant="body2" component="span" fontWeight="bold" display="block" gutterBottom sx={{ mb: 1 }}>
                            Product Image:
                          </Typography>
                          
                          {product.imageUrl ? (
                            <>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: 150,
                                  borderRadius: 2,
                                  overflow: "hidden",
                                  border: "1px solid #e0e0e0",
                                  backgroundColor: "#fafafa",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  mb: 1.5
                                }}
                              >
                                <img
                                  src={product.imageUrl}
                                  alt={product.productName || "Product Image"}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                  }}
                                />
                              </Box>
                              <Button
                                size="small"
                                startIcon={<ImageIcon />}
                                href={product.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                fullWidth
                              >
                                Open Image in New Tab
                              </Button>
                            </>
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                height: 250,
                                borderRadius: 2,
                                border: "2px dashed #e0e0e0",
                                backgroundColor: "#fafafa",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 1
                              }}
                            >
                              <ImageIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">
                                No image uploaded
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>

                      {/* PDF Column */}
                      <Grid item xs={12} md={6}>
                        <Box>
                          <Typography variant="body2" component="span" fontWeight="bold" display="block" gutterBottom sx={{ mb: 1 }}>
                            Product PDF:
                          </Typography>
                          
                          {product.pdfUrl ? (
                            <>
                              <Box
                                sx={{
                                  width: "100%",
                                  height: 150,
                                  borderRadius: 2,
                                  border: "1px solid #e0e0e0",
                                  backgroundColor: "#fafafa",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "column",
                                  gap: 1.5,
                                  mb: 1.5
                                }}
                              >
                                <PictureAsPdfIcon sx={{ fontSize: 60, color: "error.main" }} />
                                <Typography variant="body2" color="text.secondary" textAlign="center">
                                  PDF Document Available
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Click button below to view
                                </Typography>
                              </Box>
                              <Button
                                size="small"
                                startIcon={<PictureAsPdfIcon />}
                                href={product.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                color="error"
                                fullWidth
                              >
                                View PDF Document
                              </Button>
                            </>
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                height: 250,
                                borderRadius: 2,
                                border: "2px dashed #e0e0e0",
                                backgroundColor: "#fafafa",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 1
                              }}
                            >
                              <PictureAsPdfIcon sx={{ fontSize: 60, color: "text.secondary" }} />
                              <Typography variant="body2" color="text.secondary">
                                No PDF uploaded
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Box>

      {/* Create/Update Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        scroll="paper"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
            overflow: "hidden",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            backgroundColor:
              modalMode === "update" ? "secondary.main" : "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2.5,
          }}
        >
          <Typography variant="h6" fontWeight="600">
            {modalMode === "update"
              ? "Update Product Catalogue"
              : "Create New Product Catalogue"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

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