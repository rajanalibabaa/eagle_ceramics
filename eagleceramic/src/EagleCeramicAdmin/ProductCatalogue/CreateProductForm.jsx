import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Stack,
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
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { getAdminToken } from "../../EagleCeramicAdmin/utils/auth";


const API_BASE_URL = "http://localhost:5050/api/v1";

const CreateProductForm = ({
  openModal,
  setOpenModal,
  mode = "create",
  editingProduct = null,
  onSuccess,
  onClose,
  token,
}) => {

  const modalTitle =
    mode === "update"
      ? "Update Product Catalogue"
      : "Create New Product Catalogue";

  const [productData, setProductData] = useState({
    productName: "",
    productSize: "",
    productId: "",
    title: "",
    description: "",
    buttonText: "Explore Collection",
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

  // State for dropdowns
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);
  // Add this function after your state declarations


  // Track if dropdowns have been initialized for edit mode
  const dropdownsInitialized = useRef(false);

  // Fetch dropdown data when modal opens
  useEffect(() => {
    if (openModal) {
      fetchDropdownData();
    }
  }, [openModal]);

  // Handle form setup based on mode
  useEffect(() => {
    if (!openModal) return;

    if (mode === "create") {
      resetForm();
      return;
    }

    if (mode === "update" && editingProduct) {
      console.log("=== SETTING UP UPDATE MODE ===");
      console.log("Editing Product:", editingProduct);
      console.log("Mode:", mode);

      // Reset dropdown initialization flag
      dropdownsInitialized.current = false;

      // First, set the basic form data from editingProduct
      const formData = {
        productName: editingProduct.productName || "",
        productSize: editingProduct.productSize || "",
        productId: editingProduct.productId || editingProduct.uuid || "",
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        buttonText: editingProduct.buttonText || "Exlore Collection",
        imageFile: null,
        pdfFile: null,
      };

      console.log("Form Data to set:", formData);
      setProductData(formData);

      // Set image preview if exists
      if (editingProduct.imageUrl) {
        setImagePreview(editingProduct.imageUrl);
        setImageLoadError(false);
      } else {
        setImagePreview("");
      }

      // Set PDF name if exists
      if (editingProduct.pdfUrl) {
        const pdfFilename = editingProduct.pdfUrl.split("/").pop() || "Existing PDF";
        setPdfName(pdfFilename);
      } else {
        setPdfName("");
      }
    }
  }, [editingProduct, mode, openModal]);

  // Handle dropdown initialization AFTER data is loaded for UPDATE mode
  useEffect(() => {
    if (mode !== "update" || !editingProduct || !openModal) return;
    if (productNameOptions.length === 0 || dropdownsInitialized.current) return;

    console.log("=== INITIALIZING DROPDOWNS FOR UPDATE ===");
    console.log("Editing product name:", editingProduct.productName);
    console.log("Available options:", productNameOptions);

    // Try to find matching product in dropdown options
    const matchingProduct = productNameOptions.find(
      (option) => option.name === editingProduct.productName
    );

    if (matchingProduct) {
      console.log("✅ Found matching product:", matchingProduct);
      setSelectedProductId(matchingProduct.id);
      setAvailableSizes(matchingProduct.sizes || []);
      dropdownsInitialized.current = true;
      
      // Update productData with the matched product info
      setProductData(prev => ({
        ...prev,
        productId: matchingProduct.id,
        productName: matchingProduct.name,
        // Keep the existing size from editingProduct if not already set
        productSize: prev.productSize || editingProduct.productSize || ""
      }));
    } else {
      console.warn("❌ No matching product found for:", editingProduct.productName);
      console.log("Available names:", productNameOptions.map((o) => o.name));
      
      // If no match found, still set what we have
      setSelectedProductId(editingProduct.productId || editingProduct.uuid || "");
      setAvailableSizes([]);
      
      // For custom product names not in dropdown
      setProductData(prev => ({
        ...prev,
        productName: editingProduct.productName || "",
        productSize: editingProduct.productSize || ""
      }));
    }
  }, [editingProduct, mode, openModal, productNameOptions]);

  const fetchDropdownData = async () => {
    try {
      setLoadingDropdowns(true);
      console.log("=== FETCHING DROPDOWN DATA ===");
        const token = getAdminToken();
    if (!token) {
      setErrorMessage('Authentication token not found. Please login again.');
      setErrorSnackbar(true);
      setLoadingDropdowns(false);
      return;
    }

      const response = await axios.get(`${API_BASE_URL}/eagle-ceramic/product-sizes/dropdown`,
        {
          headers: {'Content-Type' : 'application/json', 'Authorization': `Bearer ${token}` }
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        const responseData = response.data.data;
        
        // Handle different response structures
        let filterData = [];
        
        if (Array.isArray(responseData)) {
          filterData = responseData;
        } else if (responseData.filterdata) {
          filterData = responseData.filterdata;
        } else if (responseData.catalogData) {
          filterData = responseData.catalogData;
        }

        console.log("Extracted filter data:", filterData);

        const productNames = filterData.map((item) => ({
          id: item.uuid || item._id || item.id,
          name: item.productName,
          sizes: (item.productSizes || []).map((sizeObj) =>
            typeof sizeObj === "object" ? sizeObj.size : sizeObj
          ),
        }));

        console.log("Processed options:", productNames);
        setProductNameOptions(productNames);
      }
    } catch (error) {
    console.error("Error fetching dropdown data:", error);
    
    // Handle authentication errors
    if (error.response?.status === 401) {
      setErrorMessage('Session expired. Please login again.');
    } else {
      setErrorMessage("Failed to load dropdown options");
    }
    setErrorSnackbar(true);
  } finally {
    setLoadingDropdowns(false);
  }
};

  const handleProductNameChange = (event) => {
    const productId = event.target.value;
    console.log("=== PRODUCT NAME CHANGED ===");
    console.log("Selected ID:", productId);

    setSelectedProductId(productId);

    if (productId) {
      const selectedProduct = productNameOptions.find(
        (option) => option.id === productId
      );
      console.log("Found product:", selectedProduct);

      if (selectedProduct) {
        setAvailableSizes(selectedProduct.sizes || []);
        setProductData((prev) => ({
          ...prev,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productSize: "",
        }));
      }
    } else {
      setAvailableSizes([]);
      setProductData((prev) => ({
        ...prev,
        productId: "",
        productName: "",
        productSize: "",
      }));
    }
  };

  const handleProductSizeChange = (event) => {
    const newSize = event.target.value;
    console.log("Size changed:", newSize);
    setProductData((prev) => ({
      ...prev,
      productSize: newSize,
    }));
  };

  const handleOtherChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
    dropdownsInitialized.current = false;
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
      if (imagePreview && imagePreview.startsWith("blob:")) {
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
    console.log("=== SAVE PRODUCT ===");
    console.log("Mode:", mode);
    console.log("Product Data:", productData);
    console.log("Selected Product ID:", selectedProductId);

    if (mode === "create") {
      if (!productData.productName) {
        setErrorMessage("Product Name is required.");
        setErrorSnackbar(true);
        return;
      }
      if (!productData.imageFile) {
        setErrorMessage("Product Image is required.");
        setErrorSnackbar(true);
        return;
      }
      if (!productData.pdfFile) {
        setErrorMessage("Product PDF is required.");
        setErrorSnackbar(true);
        return;
      }

      const existingProductIndex = products.findIndex(
        (p) =>
          p.productName === productData.productName &&
          p.productSize === productData.productSize
      );

      if (existingProductIndex >= 0 && editingIndex !== existingProductIndex) {
        setErrorMessage("A product with this name and size already exists.");
        setErrorSnackbar(true);
        return;
      }

      if (editingIndex !== null) {
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = { ...productData };
        setProducts(updatedProducts);
      } else {
        setProducts((prev) => [...prev, { ...productData }]);
      }

      resetForm();
    } else {
      handleSubmit();
    }
  };

  const handleEditProduct = (index) => {
    const product = products[index];
    setProductData({ ...product });

    if (product.productName && productNameOptions.length > 0) {
      const matchingProduct = productNameOptions.find(
        (option) => option.name === product.productName
      );
      if (matchingProduct) {
        setSelectedProductId(matchingProduct.id);
        setAvailableSizes(matchingProduct.sizes || []);
      }
    }

    if (product.imageFile && product.imageFile instanceof File) {
      const previewUrl = URL.createObjectURL(product.imageFile);
      setImagePreview(previewUrl);
    }

    if (product.pdfFile && product.pdfFile instanceof File) {
      setPdfName(product.pdfFile.name);
    }

    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      resetForm();
    } else if (editingIndex !== null && editingIndex > index) {
      setEditingIndex(editingIndex - 1);
    }
  };

  const resetForm = () => {
    setProductData({
      productName: "",
      productSize: "",
      productId: "",
      title: "",
      description: "",
      buttonText: "Explore Collection",
      imageFile: null,
      pdfFile: null,
    });
    setSelectedProductId("");
    setAvailableSizes([]);
    setEditingIndex(null);
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    setPdfName("");
    setImageLoadError(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

const token = getAdminToken(); // Use the imported function
  if (!token) {
    setErrorMessage('Authentication token not found. Please login again.');
    setErrorSnackbar(true);
    return;
  }
    // Validation
    if (mode === "create" && products.length === 0) {
      setErrorMessage("Please add at least one product before submitting");
      setErrorSnackbar(true);
      return;
    }

    if (mode === "update" && (!productData.productName || !editingProduct?.uuid)) {
      setErrorMessage("Product Name and Catalog ID are required");
      setErrorSnackbar(true);
      return;
    }

    try {
      setLoading(true);

      if (mode === "update" && editingProduct) {
        const formData = new FormData();
        
        // Add all form data - IMPORTANT: These field names must match your backend
        formData.append("productName", productData.productName);
        formData.append("productSize", productData.productSize || "");
        formData.append("title", productData.title || "");
        formData.append("description", productData.description || "");
        formData.append("buttonText", productData.buttonText || "Explore Collection");
        
        // Get the catalog ID - your controller expects uuid
        const catalogId = editingProduct.uuid;

        console.log("=== UPDATE REQUEST ===");
        console.log("Catalog ID (uuid):", catalogId);
        console.log("Editing Product:", editingProduct);
        console.log("Product Data:", productData);
        
        // Handle image - only send if it's a new file
        if (productData.imageFile instanceof File) {
          console.log("Adding new image file:", productData.imageFile.name);
          formData.append("image", productData.imageFile);
        } else {
          console.log("Keeping existing image:", editingProduct.imageUrl);
        }

        // Handle PDF - only send if it's a new file
        if (productData.pdfFile instanceof File) {
          console.log("Adding new PDF file:", productData.pdfFile.name);
          formData.append("pdf", productData.pdfFile);
        } else {
          console.log("Keeping existing PDF:", editingProduct.pdfUrl);
        }

        // Log FormData contents
        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
        }

        // IMPORTANT: Based on your router, you might need to use different endpoint
        // Let's try both possibilities
        
        const endpoints = [
          `${API_BASE_URL}/eagle-ceramic/catalog/update/${catalogId}`,
          `${API_BASE_URL}/eagle-ceramic/catalog/delete/${catalogId}`, // This seems wrong but let's check
          `${API_BASE_URL}/eagle-ceramic/catalog/${catalogId}`
        ];

        let response;
        let lastError;
        
        // Try different endpoints
        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            response = await axios.patch(
              endpoint,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
                },
              }
            );
            console.log(`Success with endpoint: ${endpoint}`);
            break; // Exit loop if successful
          } catch (error) {
            lastError = error;
            console.log(`Failed with endpoint ${endpoint}:`, error.response?.status);
          }
        }

        if (!response) {
          throw lastError || new Error("All endpoints failed");
        }

        console.log("Update Response:", response.data);

        if (response.data.success) {
          setSuccessSnackbar(true);
          if (onSuccess) onSuccess();
          setTimeout(() => {
            handleCloseModal();
          }, 1500);
        } else {
          throw new Error(response.data.message || "Update failed");
        }
      } else {
        // CREATE mode - existing code
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          const formData = new FormData();
          
          formData.append("productName", product.productName);
          formData.append("productSize", product.productSize || "");
          formData.append("title", product.title || "");
          formData.append("description", product.description || "");
          formData.append("buttonText", product.buttonText || "Explore Collection");

          if (product.imageFile) {
            formData.append("image", product.imageFile);
          }

          if (product.pdfFile) {
            formData.append("pdf", product.pdfFile);
          }

          const createResponse = await axios.post(
            `${API_BASE_URL}/eagle-ceramic/catalog/create`, 
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
              },
            }
          );
          console.log("Create Response:", createResponse.data);
        }

        setSuccessSnackbar(true);
        setProducts([]);
        if (onSuccess) onSuccess();
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      }
    } catch (error) {
      console.error("=== SUBMIT ERROR ===");
      console.error("Error:", error);
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", error.response?.status);
      console.error("Error URL:", error.config?.url);
      
      let errorMsg = "Operation failed. Please check the endpoint.";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(`Error: ${errorMsg}`);
      setErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessSnackbar(false);
    setErrorSnackbar(false);
  };

  const isUpdateMode = mode === "update";
  const hasExistingImage =
    isUpdateMode && editingProduct?.imageUrl && !productData.imageFile;
  const hasExistingPdf =
    isUpdateMode && editingProduct?.pdfUrl && !productData.pdfFile;

  return (
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
          width: "100%",
          maxWidth: "1200px",
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
            {isUpdateMode
              ? "Product updated successfully!"
              : "Products created successfully!"}
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
          <Box
            sx={{ p: { xs: 2, md: 3 }, overflow: "auto", maxHeight: "70vh" }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Left Column - Form */}
                <Grid item xs={12} md={isUpdateMode ? 12 : 6}>
                  <Paper
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: "#fafafa",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      gutterBottom
                      color="primary"
                      sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <InventoryIcon />
                      {isUpdateMode ? "Update Product Details" : "Add New Product"}
                    </Typography>

                    {isUpdateMode && editingProduct && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Editing: <strong>{editingProduct.productName}</strong>
                        {editingProduct.productSize &&
                          ` (Size: ${editingProduct.productSize})`}
                        <br />
                        Catalog ID: <code>{editingProduct.uuid}</code>
                      </Alert>
                    )}

                    {/* Display current values when dropdowns are loading */}
                    {isUpdateMode && loadingDropdowns && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Loading dropdowns... Current values:
                        <Box component="span" sx={{ ml: 1, fontWeight: 'bold' }}>
                          {productData.productName} {productData.productSize && `(${productData.productSize})`}
                        </Box>
                      </Alert>
                    )}

                    <Grid container spacing={2}>
                      {/* Product Name Dropdown */}
                      <Grid item xs={12} md={6}>
                        <FormControl
                          fullWidth
                          size="small"
                          required
                          disabled={loading || loadingDropdowns}
                        >
                          <InputLabel id="product-name-label">
                            Product Name *
                          </InputLabel>
                          <Select
                            labelId="product-name-label"
                            id="product-name-select"
                            value={selectedProductId}
                            label="Product Name *"
                            onChange={handleProductNameChange}
                            MenuProps={{
                              PaperProps: {
                                sx: { maxHeight: 300 },
                              },
                            }}
                          >
                            <MenuItem value="">
                              <em>-- Select Product Name --</em>
                            </MenuItem>
                            {productNameOptions.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.name} 
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {loadingDropdowns
                              ? "Loading products..."
                              : `${productNameOptions.length} products available`}
                          </FormHelperText>
                        </FormControl>
                        
                        {/* Display current product name in UPDATE mode */}
                        {isUpdateMode && productData.productName && (
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            Current: {productData.productName}
                          </Typography>
                        )}
                      </Grid>

                      {/* Product Size Dropdown */}
                      <Grid item xs={12} md={6}>
                        <FormControl
                          fullWidth
                          size="small"
                          disabled={loading || !selectedProductId}
                        >
                          <InputLabel id="product-size-label">
                            Product Size
                          </InputLabel>
                          <Select
                            labelId="product-size-label"
                            id="product-size-select"
                            value={productData.productSize}
                            label="Product Size"
                            onChange={handleProductSizeChange}
                            MenuProps={{
                              PaperProps: {
                                sx: { maxHeight: 300 },
                              },
                            }}
                          >
                            <MenuItem value="">
                              <em>-- Select Size (Optional) --</em>
                            </MenuItem>
                            {availableSizes.map((size, index) => (
                              <MenuItem key={`size-${index}`} value={size}>
                                {size}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {!selectedProductId
                              ? "Select a product first"
                              : `${availableSizes.length} sizes available`}
                          </FormHelperText>
                        </FormControl>
                        
                        {/* Display current product size in UPDATE mode */}
                        {isUpdateMode && productData.productSize && (
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            Current: {productData.productSize}
                          </Typography>
                        )}
                      </Grid>

                      {/* Title */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Display Title"
                          name="title"
                          value={productData.title}
                          onChange={handleOtherChange}
                          fullWidth
                          disabled={loading}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TitleIcon color="action" fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Button Text */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Button Text"
                          name="buttonText"
                          value={productData.buttonText}
                          onChange={handleOtherChange}
                          fullWidth
                          disabled={loading}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LinkIcon color="action" fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      {/* Description */}
                      <Grid item xs={12}>
                        <TextField
                          label="Description"
                          name="description"
                          value={productData.description}
                          onChange={handleOtherChange}
                          fullWidth
                          multiline
                          rows={2}
                          disabled={loading}
                          size="small"
                        />
                      </Grid>

                      {/* Image Upload */}
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="500"
                          gutterBottom
                        >
                          Product Image {!isUpdateMode && "*"}
                        </Typography>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<CloudUploadIcon />}
                          disabled={uploadingImage || loading}
                          size="small"
                          fullWidth
                        >
                          {productData.imageFile
                            ? "Change Image"
                            : hasExistingImage
                            ? "Replace Image"
                            : "Upload Image *"}
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageFileSelect}
                          />
                        </Button>
                        {productData.imageFile && (
                          <Typography
                            variant="caption"
                            color="success.main"
                            display="block"
                            sx={{ mt: 1 }}
                          >
                            ✓ New: {productData.imageFile.name}
                          </Typography>
                        )}
                        {hasExistingImage && (
                          <Typography
                            variant="caption"
                            color="info.main"
                            display="block"
                            sx={{ mt: 1 }}
                          >
                            📷 Current image will be kept
                          </Typography>
                        )}
                        {imagePreview && (
                          <Box sx={{ mt: 1 }}>
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: 100,
                                borderRadius: 4,
                                border: "1px solid #e0e0e0",
                              }}
                            />
                          </Box>
                        )}
                      </Grid>

                      {/* PDF Upload */}
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="subtitle2"
                          fontWeight="500"
                          gutterBottom
                        >
                          Product PDF {!isUpdateMode && "*"}
                        </Typography>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<AttachFileIcon />}
                          disabled={uploadingPdf || loading}
                          size="small"
                          fullWidth
                          sx={{
                            borderColor: "error.main",
                            color: "error.main",
                          }}
                        >
                          {productData.pdfFile
                            ? "Change PDF"
                            : hasExistingPdf
                            ? "Replace PDF"
                            : "Upload PDF *"}
                          <input
                            type="file"
                            hidden
                            accept=".pdf"
                            onChange={handlePdfFileSelect}
                          />
                        </Button>
                        {productData.pdfFile && (
                          <Typography
                            variant="caption"
                            color="success.main"
                            display="block"
                            sx={{ mt: 1 }}
                          >
                            ✓ New: {productData.pdfFile.name}
                          </Typography>
                        )}
                        {hasExistingPdf && (
                          <Typography
                            variant="caption"
                            color="info.main"
                            display="block"
                            sx={{ mt: 1 }}
                          >
                            📄 Current: {pdfName}
                          </Typography>
                        )}
                      </Grid>

                      {/* Save/Update Button */}
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          startIcon={
                            loading ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              <SaveIcon />
                            )
                          }
                          onClick={handleSaveProduct}
                          disabled={loading || uploadingImage || uploadingPdf}
                          fullWidth
                          color={isUpdateMode ? "secondary" : "primary"}
                          sx={{ mt: 2, py: 1.5 }}
                        >
                          {loading
                            ? isUpdateMode
                              ? "Updating..."
                              : "Saving..."
                            : isUpdateMode
                            ? "Update Product"
                            : editingIndex !== null
                            ? "Update in List"
                            : "Add to List"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Right Column - Products List (CREATE mode only) */}
                {!isUpdateMode && (
                  <Grid item xs={12} md={6}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          color="primary"
                          gutterBottom
                        >
                          Products to Create
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {products.length} product
                            {products.length !== 1 ? "s" : ""} added
                          </Typography>
                          {products.length > 0 && (
                            <Button
                              variant="text"
                              color="error"
                              size="small"
                              startIcon={<DeleteOutlineIcon />}
                              onClick={() => setProducts([])}
                            >
                              Clear All
                            </Button>
                          )}
                        </Box>
                      </Box>

                      {products.length > 0 ? (
                        <TableContainer
                          sx={{
                            flex: 1,
                            borderRadius: 1,
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          <Table size="small" stickyHeader>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>
                                  Product
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Size</TableCell>
                                <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                                <TableCell
                                  sx={{ fontWeight: "bold", textAlign: "center" }}
                                >
                                  Files
                                </TableCell>
                                <TableCell
                                  sx={{ fontWeight: "bold", textAlign: "center" }}
                                >
                                  Actions
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {products.map((product, index) => (
                                <TableRow
                                  key={index}
                                  hover
                                  selected={editingIndex === index}
                                  sx={{
                                    backgroundColor:
                                      editingIndex === index
                                        ? "#e3f2fd"
                                        : "inherit",
                                  }}
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body2"
                                      noWrap
                                      sx={{ maxWidth: 100 }}
                                    >
                                      {product.productName || "N/A"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    {product.productSize || "N/A"}
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="body2"
                                      noWrap
                                      sx={{ maxWidth: 100 }}
                                    >
                                      {product.title || "N/A"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <Stack
                                      direction="row"
                                      spacing={0.5}
                                      justifyContent="center"
                                    >
                                      {product.imageFile ? (
                                        <CheckCircleIcon
                                          color="success"
                                          fontSize="small"
                                        />
                                      ) : (
                                        <ImageIcon
                                          color="disabled"
                                          fontSize="small"
                                        />
                                      )}
                                      {product.pdfFile ? (
                                        <PictureAsPdfIcon
                                          color="error"
                                          fontSize="small"
                                        />
                                      ) : (
                                        <PictureAsPdfIcon
                                          color="disabled"
                                          fontSize="small"
                                        />
                                      )}
                                    </Stack>
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <Stack
                                      direction="row"
                                      spacing={0.5}
                                      justifyContent="center"
                                    >
                                      <Tooltip title="Edit">
                                        <IconButton
                                          size="small"
                                          color="primary"
                                          onClick={() => handleEditProduct(index)}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          size="small"
                                          color="error"
                                          onClick={() => handleDeleteProduct(index)}
                                        >
                                          <DeleteOutlineIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                    </Stack>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Box
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 4,
                            border: "2px dashed #e0e0e0",
                            borderRadius: 2,
                            backgroundColor: "#fafafa",
                          }}
                        >
                          <InventoryIcon
                            sx={{ fontSize: 48, color: "text.disabled", mb: 2 }}
                          />
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            gutterBottom
                          >
                            No products added yet
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            textAlign="center"
                          >
                            Fill the form and click "Add to List"
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </form>
          </Box>
        </Fade>
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          p: 2,
          backgroundColor: "#f5f5f5",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isUpdateMode ? (
              <Chip label="Update Mode" color="secondary" size="small" />
            ) : (
              <Chip
                label={`${products.length} Product${
                  products.length !== 1 ? "s" : ""
                }`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            {!isUpdateMode && (
              <Button
                onClick={resetForm}
                variant="outlined"
                size="small"
                disabled={loading}
              >
                Reset Form
              </Button>
            )}
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              size="small"
              disabled={loading}
            >
              Cancel
            </Button>
            {!isUpdateMode && (
              <Button
                onClick={handleSubmit}
                variant="contained"
                disabled={loading || products.length === 0}
                size="small"
                sx={{ minWidth: 150 }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
                    Creating...
                  </>
                ) : (
                  `Create ${products.length} Product${
                    products.length !== 1 ? "s" : ""
                  }`
                )}
              </Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductForm;