import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
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
import TitleIcon from "@mui/icons-material/Title";
import InventoryIcon from "@mui/icons-material/Inventory";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import LinkIcon from "@mui/icons-material/Link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { getAdminToken } from "../../EagleCeramicAdmin/utils/auth";

const API_BASE_URL = "https://clientbackend.cholabiz.com/api/v1";


// File size constants (in bytes)
const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
const MAX_PDF_SIZE = 7 * 1024 * 1024; // 7MB

// Valid image MIME types
const isValidImageType = (file) => {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];
  return validTypes.includes(file.type);
};

// Valid PDF MIME type
const isValidPdfType = (file) => {
  return file.type === "application/pdf";
};

// Format file size for display
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Validate image file (type + size)
const validateImageFile = (file) => {
  const errors = [];

  if (!isValidImageType(file)) {
    errors.push(
      "Please select a valid image file (JPEG, PNG, GIF, WebP, SVG)"
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    errors.push(
      `Image size must be less than ${formatFileSize(
        MAX_IMAGE_SIZE
      )}. Current size: ${formatFileSize(file.size)}`
    );
  }

  return errors;
};

// Validate PDF file (type + size)
const validatePdfFile = (file) => {
  const errors = [];

  if (!isValidPdfType(file)) {
    errors.push("Please select a valid PDF file");
  }

  if (file.size > MAX_PDF_SIZE) {
    errors.push(
      `PDF size must be less than ${formatFileSize(
        MAX_PDF_SIZE
      )}. Current size: ${formatFileSize(file.size)}`
    );
  }

  return errors;
};

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

  // products / editingIndex kept but no longer used in UI for create mode
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

  // For per-field file validation error messages
  const [fileValidationErrors, setFileValidationErrors] = useState({
    image: "",
    pdf: "",
  });

  // State for dropdowns
  const [productNameOptions, setProductNameOptions] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(false);

  // Track if dropdowns have been initialized for edit mode
  const dropdownsInitialized = useRef(false);

  const isUpdateMode = mode === "update";

  // Clear validation errors when component unmounts or modal closes
  useEffect(() => {
    return () => {
      setFileValidationErrors({ image: "", pdf: "" });
    };
  }, []);

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

      const formData = {
        productName: editingProduct.productName || "",
        productSize: editingProduct.productSize || "",
        productId: editingProduct.productId || editingProduct.uuid || "",
        title: editingProduct.title || "",
        description: editingProduct.description || "",
        buttonText: editingProduct.buttonText || "Explore Collection",
        imageFile: null,
        pdfFile: null,
      };

      console.log("Form Data to set:", formData);
      setProductData(formData);

      if (editingProduct.imageUrl) {
        setImagePreview(editingProduct.imageUrl);
        setImageLoadError(false);
      } else {
        setImagePreview("");
      }

      if (editingProduct.pdfUrl) {
        const pdfFilename =
          editingProduct.pdfUrl.split("/").pop() || "Existing PDF";
        setPdfName(pdfFilename);
      } else {
        setPdfName("");
      }

      setFileValidationErrors({ image: "", pdf: "" });
    }
  }, [editingProduct, mode, openModal]);

  // Handle dropdown initialization AFTER data is loaded for UPDATE mode
  useEffect(() => {
    if (mode !== "update" || !editingProduct || !openModal) return;
    if (productNameOptions.length === 0 || dropdownsInitialized.current) return;

    console.log("=== INITIALIZING DROPDOWNS FOR UPDATE ===");
    console.log("Editing product name:", editingProduct.productName);
    console.log("Available options:", productNameOptions);

    const matchingProduct = productNameOptions.find(
      (option) => option.name === editingProduct.productName
    );

    if (matchingProduct) {
      console.log("✅ Found matching product:", matchingProduct);
      setSelectedProductId(matchingProduct.id);
      setAvailableSizes(matchingProduct.sizes || []);
      dropdownsInitialized.current = true;

      setProductData((prev) => ({
        ...prev,
        productId: matchingProduct.id,
        productName: matchingProduct.name,
        productSize: prev.productSize || editingProduct.productSize || "",
      }));
    } else {
      console.warn(
        "❌ No matching product found for:",
        editingProduct.productName
      );
      console.log(
        "Available names:",
        productNameOptions.map((o) => o.name)
      );

      setSelectedProductId(
        editingProduct.productId || editingProduct.uuid || ""
      );
      setAvailableSizes([]);

      setProductData((prev) => ({
        ...prev,
        productName: editingProduct.productName || "",
        productSize: editingProduct.productSize || "",
      }));
    }
  }, [editingProduct, mode, openModal, productNameOptions]);

  const fetchDropdownData = async () => {
    try {
      setLoadingDropdowns(true);
      console.log("=== FETCHING DROPDOWN DATA ===");
      const token = getAdminToken();
      if (!token) {
        setErrorMessage("Authentication token not found. Please login again.");
        setErrorSnackbar(true);
        setLoadingDropdowns(false);
        return;
      }

      const response = await axios.get(
        `${API_BASE_URL}/eagle-ceramic/product-sizes/dropdown`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        const responseData = response.data.data;

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

      if (error.response?.status === 401) {
        setErrorMessage("Session expired. Please login again.");
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

  // ==========================
  // IMAGE FILE SELECT + VALIDATION
  // ==========================
  const handleImageFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous validation error
    setFileValidationErrors((prev) => ({ ...prev, image: "" }));

    // Validate image file (type + size)
    const imageErrors = validateImageFile(file);

    if (imageErrors.length > 0) {
      const message = imageErrors.join(". ");
      setFileValidationErrors((prev) => ({
        ...prev,
        image: message,
      }));
      setErrorMessage(message);
      setErrorSnackbar(true);
      e.target.value = ""; // Clear file input
      return;
    }

    // Clean up previous preview if blob
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setProductData((prev) => ({ ...prev, imageFile: file }));
    setImageLoadError(false);

    setErrorMessage("");
    setFileValidationErrors((prev) => ({ ...prev, image: "" }));
  };

  // ==========================
  // PDF FILE SELECT + VALIDATION
  // ==========================
  const handlePdfFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous validation error
    setFileValidationErrors((prev) => ({ ...prev, pdf: "" }));

    // Validate PDF file (type + size)
    const pdfErrors = validatePdfFile(file);

    if (pdfErrors.length > 0) {
      const message = pdfErrors.join(". ");
      setFileValidationErrors((prev) => ({
        ...prev,
        pdf: message,
      }));
      setErrorMessage(message);
      setErrorSnackbar(true);
      e.target.value = ""; // Clear file input
      return;
    }

    setPdfName(file.name);
    setProductData((prev) => ({ ...prev, pdfFile: file }));

    setErrorMessage("");
    setFileValidationErrors((prev) => ({ ...prev, pdf: "" }));
  };

  const removeImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview("");
    setProductData((prev) => ({
      ...prev,
      imageFile: null,
    }));
    setFileValidationErrors((prev) => ({ ...prev, image: "" }));
  };

  const removePdf = () => {
    setPdfName("");
    setProductData((prev) => ({
      ...prev,
      pdfFile: null,
    }));
    setFileValidationErrors((prev) => ({ ...prev, pdf: "" }));
  };

  // ==========================
  // SAVE PRODUCT (CREATE/UPDATE) + VALIDATION
  // ==========================
  const handleSaveProduct = () => {
    console.log("=== SAVE PRODUCT ===");
    console.log("Mode:", mode);
    console.log("Product Data:", productData);
    console.log("Selected Product ID:", selectedProductId);

    if (mode === "create") {
      // Clear validation errors
      setFileValidationErrors({ image: "", pdf: "" });

      if (!productData.productName) {
        setErrorMessage("Product Name is required.");
        setErrorSnackbar(true);
        return;
      }

      // IMAGE VALIDATION (required + size)
      if (!productData.imageFile) {
        setErrorMessage("Product Image is required.");
        setErrorSnackbar(true);
        setFileValidationErrors((prev) => ({
          ...prev,
          image: "Image is required",
        }));
        return;
      } else {
        const imageErrors = validateImageFile(productData.imageFile);
        if (imageErrors.length > 0) {
          const message = imageErrors.join(". ");
          setErrorMessage(message);
          setErrorSnackbar(true);
          setFileValidationErrors((prev) => ({
            ...prev,
            image: message,
          }));
          return;
        }
      }

      // PDF VALIDATION (required + size)
      if (!productData.pdfFile) {
        setErrorMessage("Product PDF is required.");
        setErrorSnackbar(true);
        setFileValidationErrors((prev) => ({
          ...prev,
          pdf: "PDF is required",
        }));
        return;
      } else {
        const pdfErrors = validatePdfFile(productData.pdfFile);
        if (pdfErrors.length > 0) {
          const message = pdfErrors.join(". ");
          setErrorMessage(message);
          setErrorSnackbar(true);
          setFileValidationErrors((prev) => ({
            ...prev,
            pdf: message,
          }));
          return;
        }
      }

      // All good -> create directly
      handleSubmit();
    } else {
      // UPDATE MODE: validate only if new files are provided
      if (productData.imageFile) {
        const imageErrors = validateImageFile(productData.imageFile);
        if (imageErrors.length > 0) {
          const message = imageErrors.join(". ");
          setErrorMessage(message);
          setErrorSnackbar(true);
          setFileValidationErrors((prev) => ({
            ...prev,
            image: message,
          }));
          return;
        }
      }

      if (productData.pdfFile) {
        const pdfErrors = validatePdfFile(productData.pdfFile);
        if (pdfErrors.length > 0) {
          const message = pdfErrors.join(". ");
          setErrorMessage(message);
          setErrorSnackbar(true);
          setFileValidationErrors((prev) => ({
            ...prev,
            pdf: message,
          }));
          return;
        }
      }

      // Proceed to submit update
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
    setFileValidationErrors({ image: "", pdf: "" });
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
    setFileValidationErrors({ image: "", pdf: "" });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const token = getAdminToken();
    if (!token) {
      setErrorMessage("Authentication token not found. Please login again.");
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
        formData.append("productName", productData.productName);
        formData.append("productSize", productData.productSize || "");
        formData.append("title", productData.title || "");
        formData.append("description", productData.description || "");
        formData.append("buttonText", productData.buttonText || "Explore Collection");

        const catalogId = editingProduct.uuid;

        console.log("=== UPDATE REQUEST ===");
        console.log("Catalog ID (uuid):", catalogId);
        console.log("Editing Product:", editingProduct);
        console.log("Product Data:", productData);

        if (productData.imageFile instanceof File) {
          console.log("Adding new image file:", productData.imageFile.name);
          console.log("Image size:", formatFileSize(productData.imageFile.size));
          formData.append("image", productData.imageFile);
        } else {
          console.log("Keeping existing image:", editingProduct.imageUrl);
        }

        if (productData.pdfFile instanceof File) {
          console.log("Adding new PDF file:", productData.pdfFile.name);
          console.log("PDF size:", formatFileSize(productData.pdfFile.size));
          formData.append("pdf", productData.pdfFile);
        } else {
          console.log("Keeping existing PDF:", editingProduct.pdfUrl);
        }

        console.log("FormData contents:");
        for (let [key, value] of formData.entries()) {
          console.log(
            `${key}:`,
            value instanceof File
              ? `File: ${value.name} (${formatFileSize(value.size)})`
              : value
          );
        }

        const endpoints = [
          `${API_BASE_URL}/eagle-ceramic/catalog/update/${catalogId}`,
          `${API_BASE_URL}/eagle-ceramic/catalog/delete/${catalogId}`,
          `${API_BASE_URL}/eagle-ceramic/catalog/${catalogId}`,
        ];

        let response;
        let lastError;

        for (const endpoint of endpoints) {
          try {
            console.log(`Trying endpoint: ${endpoint}`);
            response = await axios.patch(endpoint, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(`Success with endpoint: ${endpoint}`);
            break;
          } catch (error) {
            lastError = error;
            console.log(
              `Failed with endpoint ${endpoint}:`,
              error.response?.status
            );
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
        // CREATE MODE - single product from productData
        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("productSize", productData.productSize || "");
        formData.append("title", productData.title || "");
        formData.append("description", productData.description || "");
        formData.append(
          "buttonText",
          productData.buttonText || "Explore Collection"
        );

        if (productData.imageFile) {
          console.log(
            `Image size:`,
            formatFileSize(productData.imageFile.size)
          );
          formData.append("image", productData.imageFile);
        }

        if (productData.pdfFile) {
          console.log(`PDF size:`, formatFileSize(productData.pdfFile.size));
          formData.append("pdf", productData.pdfFile);
        }

        const createResponse = await axios.post(
          `${API_BASE_URL}/eagle-ceramic/catalog/create`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Create Response:", createResponse.data);

        if (createResponse.data.success) {
          setSuccessSnackbar(true);
          if (onSuccess) onSuccess();
          setTimeout(() => {
            handleCloseModal();
          }, 1500);
        } else {
          throw new Error(createResponse.data.message || "Create failed");
        }
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

  const hasExistingImage =
    isUpdateMode && editingProduct?.imageUrl && !productData.imageFile;
  const hasExistingPdf =
    isUpdateMode && editingProduct?.pdfUrl && !productData.pdfFile;

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      maxWidth="md"
      fullWidth
      scroll="paper"
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
          overflow: "hidden",
          // width: "100%",
          // maxWidth: "1200px",
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
              : "Product created successfully!"}
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
            {/* IMPORTANT: submit goes through handleSaveProduct (validations) */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveProduct();
              }}
            >
              <Grid container spacing={3} >
                {/* Single Column - Form (full width for both create & update) */}
               <Grid item xs={12} sx={{
      width: "100%",
    }} >
  <Box
    
  >
    
         

                    {isUpdateMode && loadingDropdowns && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Loading dropdowns... Current values:
                        <Box
                          component="span"
                          sx={{ ml: 1, fontWeight: "bold" }}
                        >
                          {productData.productName}{" "}
                          {productData.productSize &&
                            `(${productData.productSize})`}
                        </Box>
                      </Alert>
                    )}

<Box
  sx={{
    width: "100%",
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, // 1 column for mobile, 2 for desktop
    gap: 2,
    alignItems: "center",
  }}
>

  {/* Row 1: Product Name - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <FormControl
      fullWidth
      size="small"
      required
      disabled={loading || loadingDropdowns}
    >
      <InputLabel>Product Name *</InputLabel>
      <Select
        value={selectedProductId}
        label="Product Name *"
        onChange={handleProductNameChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
      >
        {productNameOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>

  {/* Row 2: Product Size - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <FormControl
      fullWidth
      size="small"
      disabled={loading || !selectedProductId}
    >
      <InputLabel>Product Size</InputLabel>
      <Select
        value={productData.productSize}
        label="Product Size"
        onChange={handleProductSizeChange}
      >
        {availableSizes.map((size, index) => (
          <MenuItem key={index} value={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>

  {/* Row 3: Title - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <TextField
      label="Display Title"
      name="title"
      value={productData.title}
      onChange={handleOtherChange}
      fullWidth
      size="small"
      disabled={loading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <TitleIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  </Box>

  {/* Row 4: Button Text - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <TextField
      label="Button Text"
      name="buttonText"
      value={productData.buttonText}
      onChange={handleOtherChange}
      fullWidth
      size="small"
      disabled={loading}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  </Box>

  {/* Row 5: Description - Always full width */}
  <Box sx={{ gridColumn: "1 / -1" }}>
    <TextField
      label="Description"
      name="description"
      value={productData.description}
      onChange={handleOtherChange}
      fullWidth
      multiline
      rows={4}
      size="small"
      disabled={loading}
    />
  </Box>

  {/* Row 6: Image Upload - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight="500"
        gutterBottom
      >
        Product Image {!isUpdateMode && "*"}
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
          sx={{ ml: 1 }}
        >
          (Max {formatFileSize(MAX_IMAGE_SIZE)})
        </Typography>
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={uploadingImage || loading}
          size="small"
          sx={{ flex: 1 }}
        >
          {productData.imageFile
            ? "Change Image"
            : hasExistingImage
            ? "Replace Image"
            : "Upload Image *"}
          <input
            type="file"
            hidden
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
            onChange={handleImageFileSelect}
          />
        </Button>

        {productData.imageFile && (
          <Tooltip title="Remove image">
            <IconButton
              size="small"
              color="error"
              onClick={removeImage}
              disabled={loading}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* File validation error */}
      {fileValidationErrors.image && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          sx={{ mt: 0.5 }}
        >
          {fileValidationErrors.image}
        </Typography>
      )}

      {/* File info */}
      {productData.imageFile && (
        <Typography
          variant="caption"
          color="success.main"
          display="block"
          sx={{ mt: 0.5 }}
        >
          ✓ Selected: {productData.imageFile.name} (
          {formatFileSize(productData.imageFile.size)})
        </Typography>
      )}

      {hasExistingImage && (
        <Typography
          variant="caption"
          color="info.main"
          display="block"
          sx={{ mt: 0.5 }}
        >
          📷 Current image will be kept
        </Typography>
      )}

      {/* Image preview */}
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
    </Box>
  </Box>

  {/* Row 7: PDF Upload - Full width on mobile */}
  <Box sx={{ gridColumn: { xs: "1 / -1", md: "span 1" } }}>
    <Box>
      <Typography
        variant="subtitle2"
        fontWeight="500"
        gutterBottom
      >
        Product PDF {!isUpdateMode && "*"}
        <Typography
          component="span"
          variant="caption"
          color="text.secondary"
          sx={{ ml: 1 }}
        >
          (Max {formatFileSize(MAX_PDF_SIZE)})
        </Typography>
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          component="label"
          startIcon={<AttachFileIcon />}
          disabled={uploadingPdf || loading}
          size="small"
          sx={{
            flex: 1,
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
            accept=".pdf,application/pdf"
            onChange={handlePdfFileSelect}
          />
        </Button>

        {productData.pdfFile && (
          <Tooltip title="Remove PDF">
            <IconButton
              size="small"
              color="error"
              onClick={removePdf}
              disabled={loading}
            >
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* File validation error */}
      {fileValidationErrors.pdf && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          sx={{ mt: 0.5 }}
        >
          {fileValidationErrors.pdf}
        </Typography>
      )}

      {/* File info */}
      {productData.pdfFile && (
        <Typography
          variant="caption"
          color="success.main"
          display="block"
          sx={{ mt: 0.5 }}
        >
          ✓ Selected: {productData.pdfFile.name} (
          {formatFileSize(productData.pdfFile.size)})
        </Typography>
      )}

      {hasExistingPdf && (
        <Typography
          variant="caption"
          color="info.main"
          display="block"
          sx={{ mt: 0.5 }}
        >
          📄 Current PDF: {pdfName}
        </Typography>
      )}
    </Box>
  </Box>

  {/* Save/Update Button - Always full width */}
  <Box sx={{ gridColumn: "1 / -1" }}>
    <Button
      variant="contained"
      fullWidth
      startIcon={
        loading ? <CircularProgress size={16} /> : <SaveIcon />
      }
      onClick={handleSaveProduct}
      disabled={loading || uploadingImage || uploadingPdf}
      color={isUpdateMode ? "secondary" : "primary"}
      sx={{ py: 1.5 }}
    >
      {loading
        ? isUpdateMode
          ? "Updating..."
          : "Creating..."
        : isUpdateMode
        ? "Update Product"
        : "Create Product"}
    </Button>
  </Box>
</Box>
                
          </Box>      </Grid>
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
       

         
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductForm;