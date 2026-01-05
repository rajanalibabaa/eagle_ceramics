import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Stack,
  LinearProgress,
  InputAdornment,
  Alert,
  Snackbar,
  Fade,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
  CircularProgress,
  Chip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import InventoryIcon from "@mui/icons-material/Inventory";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";

const API_BASE_URL = "http://localhost:5050/api/v1/eagle-ceramic";

const CreateProductForm = ({ 
  openModal, 
  setOpenModal, 
  mode = "create", 
  editingProduct = null,
  onSuccess,
  onClose 
}) => {
  // Define modalTitle at the beginning to fix the error
  const modalTitle = mode === "update" ? "Update Product Catalogue" : "Create New Product Catalogue";
  
  const [productData, setProductData] = useState({
    productName: "",
    productSize: "",
    title: "",
    description: "",
    buttonText: "View Details",
    imageFile: null,
    pdfFile: null,
  });

  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [imagePreview, setImagePreview] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    resetForm();

    if (mode === "update" && editingProduct && openModal) {
      setProductData({
        productName: editingProduct.productName || "",
        productSize: editingProduct.productSize || "",
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        buttonText: editingProduct.buttonText || "View Details",
        imageFile: null, 
        pdfFile: null,  
      });

      if (editingProduct.imageUrl) {
        const img = new Image();
        img.onload = () => {
          setImagePreview(editingProduct.imageUrl); // Set preview ONLY on success
          setImageLoadError(false);
        };
        img.onerror = () => {
          console.error("Image failed to load from URL:", editingProduct.imageUrl);
          setImageLoadError(true);
          setImagePreview(""); // Prevent rendering a broken image link
        };
        img.src = editingProduct.imageUrl;
      }

      // Set PDF name from existing URL
      if (editingProduct.pdfUrl) {
        const pdfFilename = editingProduct.pdfUrl.split('/').pop() || "Existing PDF";
        setPdfName(pdfFilename);
      }
    }
  }, [editingProduct, mode, openModal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    if (onClose) onClose();
  };

  const handleImageFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select a valid image file.");
        setErrorSnackbar(true);
        return;
      }
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setProductData((prev) => ({ ...prev, imageFile: file }));
      setImageLoadError(false);
    }
  };

  const handlePdfFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrorMessage("Please select a PDF file");
        setErrorSnackbar(true);
        return;
      }

      setPdfName(file.name);
      setProductData((prev) => ({ ...prev, pdfFile: file }));
    }
  };

  const handleSaveProduct = () => {
    if (mode === "create") {
      if (!productData.productName || !productData.imageFile || !productData.pdfFile) {
        setErrorMessage("Product Name, Image, and PDF are required to save.");
        setErrorSnackbar(true);
        return;
      }
      if (editingIndex !== null) {
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = productData;
        setProducts(updatedProducts);
      } else {
        setProducts((prev) => [...prev, productData]);
      }
      resetForm();
    } else {
      handleSubmit();
    }
  };

  const handleEditProduct = (index) => {
    const product = products[index];
    setProductData(product);

    if (product.imageFile && product.imageFile instanceof File) {
      const previewUrl = URL.createObjectURL(product.imageFile);
      setImagePreview(previewUrl);
      setImageLoadError(false);
    } else if (typeof product.imageFile === "string") {
      setImagePreview(product.imageFile);
      setImageLoadError(false);
    }

    if (product.pdfFile && product.pdfFile instanceof File) {
      setPdfName(product.pdfFile.name);
    } else if (typeof product.pdfFile === "string") {
      setPdfName("Uploaded PDF");
    }

    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      resetForm();
      setEditingIndex(null);
    }
  };

  const resetForm = () => {
    setProductData({
      productName: "",
      productSize: "",
      title: "",
      description: "",
      buttonText: "View Details",
      imageFile: null,
      pdfFile: null,
    });
    setEditingIndex(null);
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    setPdfName("");
    setImageLoadError(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (mode === "create" && products.length === 0) {
      setErrorMessage("Please add at least one product before submitting");
      setErrorSnackbar(true);
      return;
    }

    try {
      setLoading(true);

      if (mode === "update" && editingProduct) {
        // UPDATE MODE: Update single product
        const formData = new FormData();

        formData.append("productName", productData.productName);
        formData.append("productSize", productData.productSize || "");
        formData.append("title", productData.title || "");
        formData.append("description", productData.description || "");
        formData.append("buttonText", productData.buttonText || "View Details");

        // Only append image if it's a new file (not the URL string)
        if (productData.imageFile && productData.imageFile instanceof File) {
          formData.append("image", productData.imageFile);
        }

        // Only append PDF if it's a new file (not the URL string)
        if (productData.pdfFile && productData.pdfFile instanceof File) {
          formData.append("pdf", productData.pdfFile);
        }

        console.log("Updating product with form data:", {
          productName: productData.productName,
          hasNewImage: productData.imageFile instanceof File,
          hasNewPdf: productData.pdfFile instanceof File
        });

        const response = await axios.put(
          `${API_BASE_URL}/catalog/update/${editingProduct.uuid || editingProduct._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          setSuccessSnackbar(true);
          if (onSuccess) onSuccess();
          
          setTimeout(() => {
            handleCloseModal();
          }, 1500);
        }
      } else {
        // CREATE MODE: Create multiple products
        const results = [];

        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          const formData = new FormData();

          formData.append("productName", product.productName);
          formData.append("productSize", product.productSize || "");
          formData.append("title", product.title || "");
          formData.append("description", product.description || "");
          formData.append("buttonText", product.buttonText || "View Details");

          if (product.imageFile) {
            formData.append("image", product.imageFile);
          }

          if (product.pdfFile) {
            formData.append("pdf", product.pdfFile);
          }

          const response = await axios.post(
            `${API_BASE_URL}/catalog/create`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          results.push(response.data);
        }

        setSuccessSnackbar(true);
        if (onSuccess) onSuccess();

        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      }
    } catch (error) {
      console.error(`${mode === "update" ? "Update" : "Create"} Product Error:`, error);

      if (error.response?.data?.message) {
        setErrorMessage(`Server error: ${error.response.data.message}`);
      } else if (error.message.includes("Unexpected field")) {
        setErrorMessage(
          "File upload error: Field names don't match backend expectations."
        );
      } else {
        setErrorMessage(error?.message || `Failed to ${mode === "update" ? "update" : "create"} product`);
      }
      setErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false);
    setErrorSnackbar(false);
  };

  const handleImageError = () => {
    console.log("Image failed to load:", imagePreview);
    setImageLoadError(true);
  };

  const isUpdateMode = mode === "update";
  const hasExistingImage = isUpdateMode && editingProduct?.imageUrl && !productData.imageFile;
  const hasExistingPdf = isUpdateMode && editingProduct?.pdfUrl && !productData.pdfFile;

  return (
    <>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
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
            backgroundColor: isUpdateMode ? "secondary.main" : "primary.main",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <InventoryIcon />
            <Typography variant="h6" fontWeight="600">
              {modalTitle}
            </Typography>
          </Stack>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 0 }}>
          <Snackbar
            open={successSnackbar}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              icon={<CheckCircleOutlineIcon />}
              sx={{ width: "100%" }}
            >
              {isUpdateMode ? "Product updated successfully!" : "Products created successfully!"}
            </Alert>
          </Snackbar>

          <Snackbar
            open={errorSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMessage}
            </Alert>
          </Snackbar>

          <Fade in timeout={500}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 0,
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                minHeight: "400px",
                position: "relative",
              }}
            >
              {loading && (
                <LinearProgress
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                  }}
                />
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Box sx={{ p: 0, mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        gutterBottom
                        color="primary"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 1,
                          mb: 5,
                        }}
                      >
                        {isUpdateMode ? (
                          <>
                            <EditIcon /> Update Product
                          </>
                        ) : editingIndex !== null ? (
                          <>
                            <EditIcon /> Edit Product
                          </>
                        ) : (
                          <>
                            <InventoryIcon /> {isUpdateMode ? "Update" : "Add New"} Product
                          </>
                        )}
                      </Typography>

                      <Box>
                        <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                          {/* Row 1: Product Name and Product Size (2 fields) */}
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Product Name *"
                              name="productName"
                              value={productData.productName}
                              onChange={handleChange}
                              fullWidth
                              required
                              disabled={loading}
                              placeholder="e.g., Marble Tile"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <InventoryIcon color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                              helperText="Enter the product name"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Product Size"
                              name="productSize"
                              value={productData.productSize}
                              onChange={handleChange}
                              fullWidth
                              disabled={loading}
                              placeholder="e.g., 24x24 inches"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AspectRatioIcon color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                              helperText="Enter product dimensions"
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Display Title"
                              name="title"
                              value={productData.title}
                              onChange={handleChange}
                              fullWidth
                              disabled={loading}
                              placeholder="e.g., Premium Marble Collection"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <TitleIcon color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                              helperText="Title to display on product card"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Button Text"
                              name="buttonText"
                              value={productData.buttonText}
                              onChange={handleChange}
                              fullWidth
                              disabled={loading}
                              placeholder="e.g., View Details"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LinkIcon color="action" />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  borderRadius: 2,
                                },
                              }}
                              helperText="Text for the action button"
                            />
                          </Grid>
                        </Grid>

                        <Box sx={{ mt: 4 }}>
                          <TextField
                            label="Description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            disabled={loading}
                            placeholder="Describe the product features, benefits, and specifications..."
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <DescriptionIcon
                                    color="action"
                                    sx={{ mt: 1.5, alignSelf: "flex-start" }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                              "& .MuiInputBase-root": {
                                alignItems: "flex-start",
                              },
                            }}
                            helperText="Detailed product description"
                          />
                        </Box>
                        <Box
                          display="flex"
                          flexDirection={{ xs: "column", md: "row" }}
                          justifyContent="space-evenly"
                          width="100%"
                          mt={4}
                          gap={3}
                        >
                          {/* Image Upload */}
                          <Box width={{ xs: "100%", md: "45%" }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="500"
                              gutterBottom
                              color="primary"
                            >
                              Product Image *
                              {hasExistingImage && (
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Current image will be replaced if you upload a new one
                                </Typography>
                              )}
                            </Typography>
                            <Box
                              sx={{
                                mb: 2,
                                p: 2,
                                border: "1px dashed",
                                borderColor: "primary.light",
                                borderRadius: 2,
                                textAlign: "center",
                                backgroundColor: "grey.50",
                                minHeight: "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                overflow: 'hidden'
                              }}
                            >
                              {imagePreview && !imageLoadError ? (
                                <>
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                      maxHeight: "120px",
                                      borderRadius: "8px",
                                    }}
                                    onError={handleImageError}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                    sx={{ mt: 1 }}
                                  >
                                    {hasExistingImage ? "Current Image" : "Image Preview"}
                                  </Typography>
                                </>
                              ) : (
                                <Box sx={{ py: 2 }}>
                                  <ImageIcon
                                    sx={{
                                      fontSize: 48,
                                      color: "text.disabled",
                                      mb: 1,
                                    }}
                                  />
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {imageLoadError && hasExistingImage 
                                      ? "Unable to load image from URL" 
                                      : "No image selected"}
                                  </Typography>
                                  {imageLoadError && hasExistingImage && (
                                    <Typography
                                      variant="caption"
                                      color="error"
                                      sx={{ mt: 1 }}
                                    >
                                      URL: {editingProduct?.imageUrl?.substring(0, 50)}...
                                    </Typography>
                                  )}
                                </Box>
                              )}
                            </Box>
                            <Button
                              variant="outlined"
                              component="label"
                              startIcon={<CloudUploadIcon />}
                              disabled={uploadingImage}
                              size="medium"
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                borderColor: "primary.main",
                                "&:hover": {
                                  borderColor: "primary.dark",
                                  backgroundColor: "primary.light",
                                },
                              }}
                            >
                              {productData.imageFile
                                ? "Change Image"
                                : "Upload Image *"}
                              <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageFileSelect}
                              />
                            </Button>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ mt: 1 }}
                            >
                              {productData.imageFile ? (
                                <span
                                  style={{ color: "green", fontWeight: "500" }}
                                >
                                  ✓ {productData.imageFile instanceof File 
                                    ? productData.imageFile.name 
                                    : "Existing image"}
                                </span>
                              ) : hasExistingImage ? (
                                <span style={{ color: "blue", fontWeight: "500" }}>
                                  {imageLoadError ? "Image URL exists but failed to load" : "Using existing image from database"}
                                </span>
                              ) : (
                                "Select an image file (JPG, PNG, etc.)"
                              )}
                            </Typography>
                          </Box>

                          {/* PDF Upload */}
                          <Box width={{ xs: "100%", md: "45%" }}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="500"
                              gutterBottom
                              color="primary"
                            >
                              Product PDF *
                              {hasExistingPdf && (
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Current PDF will be replaced if you upload a new one
                                </Typography>
                              )}
                            </Typography>
                            <Box
                              sx={{
                                mb: 2,
                                p: 2,
                                border: "1px dashed",
                                borderColor: "error.light",
                                borderRadius: 2,
                                textAlign: "center",
                                backgroundColor: "grey.50",
                                minHeight: "150px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <PictureAsPdfIcon
                                sx={{
                                  fontSize: 48,
                                  color: "error.main",
                                  mb: 1,
                                }}
                              />
                              {pdfName ? (
                                <Typography
                                  variant="body2"
                                  color="text.primary"
                                  sx={{ mt: 1, fontWeight: "500" }}
                                >
                                  {pdfName}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No PDF selected
                                </Typography>
                              )}
                            </Box>
                            <Button
                              variant="outlined"
                              component="label"
                              startIcon={<AttachFileIcon />}
                              disabled={uploadingPdf}
                              size="medium"
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                borderColor: "error.main",
                                color: "error.main",
                                "&:hover": {
                                  borderColor: "error.dark",
                                  backgroundColor: "error.light",
                                },
                              }}
                            >
                              {productData.pdfFile
                                ? "Change PDF"
                                : "Upload PDF *"}
                              <input
                                type="file"
                                hidden
                                accept=".pdf"
                                onChange={handlePdfFileSelect}
                              />
                            </Button>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="block"
                              sx={{ mt: 1 }}
                            >
                              {productData.pdfFile ? (
                                <span
                                  style={{ color: "green", fontWeight: "500" }}
                                >
                                  ✓ {productData.pdfFile instanceof File
                                    ? productData.pdfFile.name
                                    : "Existing PDF"}
                                </span>
                              ) : hasExistingPdf ? (
                                <span style={{ color: "blue", fontWeight: "500" }}>
                                  Using existing PDF from database
                                </span>
                              ) : (
                                "Select a PDF file for specifications"
                              )}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Action Buttons */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 2,
                            mt: 4,
                            pt: 3,
                            borderTop: "1px dashed",
                            borderColor: "divider",
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveProduct}
                            disabled={
                              loading || uploadingImage || uploadingPdf
                            }
                            sx={{
                              px: 4,
                              py: 1.5,
                              borderRadius: 2,
                              fontSize: "1rem",
                              minWidth: 200,
                              fontWeight: 600,
                              background:
                                "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                                transform: "translateY(-2px)",
                                boxShadow: 3,
                              },
                            }}
                          >
                            {isUpdateMode 
                              ? "Update Product" 
                              : editingIndex !== null
                              ? "Update Product"
                              : "Save Product"}
                          </Button>

                          {(editingIndex !== null || isUpdateMode) && (
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                resetForm();
                                setEditingIndex(null);
                              }}
                              sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                                fontSize: "1rem",
                                fontWeight: 600,
                                "&:hover": {
                                  transform: "translateY(-2px)",
                                  boxShadow: 1,
                                },
                              }}
                            >
                              Cancel
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Products Table - Only show in CREATE mode */}
                  {!isUpdateMode && products.length > 0 && (
                    <Grid item xs={12}>
                      <Box sx={{ mb: 4 }}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mb: 3 }}
                        >
                          <Box>
                            <Typography
                              variant="h5"
                              fontWeight="600"
                              gutterBottom
                            >
                              Products Ready for Submission
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {products.length} product
                              {products.length !== 1 ? "s" : ""} added to
                              catalog
                            </Typography>
                          </Box>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Chip
                              label={`${products.length} Item${
                                products.length !== 1 ? "s" : ""
                              }`}
                              color="primary"
                              variant="outlined"
                              sx={{ fontWeight: 600 }}
                            />
                            <Button
                              variant="text"
                              color="error"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => setProducts([])}
                              size="small"
                            >
                              Clear All
                            </Button>
                          </Stack>
                        </Stack>

                        {/* Products table - you can add your table code here if needed */}
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Paper>
          </Fade>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            justifyContent: "space-between",
            backgroundColor: "grey.50",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              onClick={resetForm}
              variant="outlined"
              color="inherit"
              disabled={loading}
              startIcon={<CloseIcon />}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              Reset Form
            </Button>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              disabled={loading}
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
          </Stack>

          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || (!isUpdateMode && products.length === 0)}
            startIcon={!loading && <CheckCircleOutlineIcon />}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              minWidth: 200,
              background:
                (!isUpdateMode && products.length === 0)
                  ? "grey.400"
                  : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              "&:hover": {
                background:
                  (!isUpdateMode && products.length === 0)
                    ? "grey.400"
                    : "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
              },
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                {isUpdateMode ? "Updating..." : "Creating..."}
              </>
            ) : isUpdateMode ? (
              "Update Product"
            ) : (
              `Create Catalog (${products.length})`
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateProductForm;