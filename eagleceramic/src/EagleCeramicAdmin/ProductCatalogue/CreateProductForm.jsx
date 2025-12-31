import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Stack,
  Chip,
  Card,
  LinearProgress,
  InputAdornment,
  Alert,
  Snackbar,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Backdrop,
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

const CreateProductForm = ({ openModal, setOpenModal }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  const handleImageFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select an image file");
        setErrorSnackbar(true);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setProductData((prev) => ({ ...prev, imageFile: file }));
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
    if (
      !productData.productName ||
      !productData.imageFile ||
      !productData.pdfFile
    ) {
      setErrorMessage(
        "Please fill all required fields (Product Name, Image, PDF)"
      );
      setErrorSnackbar(true);
      return;
    }

    if (editingIndex !== null) {
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = productData;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      setProducts((prev) => [...prev, productData]);
    }

    resetForm();
  };

  const handleEditProduct = (index) => {
    const product = products[index];
    setProductData(product);

    if (product.imageFile && product.imageFile instanceof File) {
      const previewUrl = URL.createObjectURL(product.imageFile);
      setImagePreview(previewUrl);
    } else if (typeof product.imageFile === "string") {
      setImagePreview(product.imageFile);
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
    setImagePreview("");
    setPdfName("");

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (products.length === 0) {
      setErrorMessage("Please add at least one product before submitting");
      setErrorSnackbar(true);
      return;
    }

    try {
      setLoading(true);

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
          "http://localhost:5050/api/v1/eagle-ceramic/catalog/create",
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

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Create Products Error:", error);

      if (error.response?.data?.message) {
        setErrorMessage(`Server error: ${error.response.data.message}`);
      } else if (error.message.includes("Unexpected field")) {
        setErrorMessage(
          "File upload error: Field names don't match backend expectations."
        );
      } else {
        setErrorMessage(error?.message || "Failed to create products");
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
            backgroundColor: "primary.main",
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
              Create Product Catalog
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
              Products created successfully!
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
                    <Box
                    //   elevation={1}
                      sx={{
                        p: 0,
                        // borderRadius: 3,
                        mb: 3,
                        // border: "1px solid",
                        // borderColor: "divider",
                        // backgroundColor: "white",
                      }}
                    >
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
                        {editingIndex !== null ? (
                          <>
                            <EditIcon /> Edit Product
                          </>
                        ) : (
                          <>
                            <InventoryIcon /> Add New Product
                          </>
                        )}
                      </Typography>

                      <Box
                        container
                        spacing={4}
                      >
                        <Grid gridTemplateColumns="4fr 1fr" container spacing={2}  sx={{ display: "flex", justifyContent: "center" }} >
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
                            // fullWidth
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
       
              </Box>            
                        


<Box item xs={12} mt={4}>
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
                        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent='space-evenly'  width='100%' mt={4}>
                        {/* Row 4: Image Upload and PDF Upload (2 fields) */}
                        <Box >
                          <Box width={'70vh'}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="500"
                              gutterBottom
                              color="primary"
                            >
                              Product Image *
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
                              }}
                            >
                              {imagePreview ? (
                                <>
                                  <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "120px",
                                      objectFit: "contain",
                                      borderRadius: "8px",
                                    }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                    sx={{ mt: 1 }}
                                  >
                                    Image Preview
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
                                    No image selected
                                  </Typography>
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
                                  ✓ {productData.imageFile.name}
                                </span>
                              ) : (
                                "Select an image file (JPG, PNG, etc.)"
                              )}
                            </Typography>
                          </Box>
                        </Box>

                        <Box >
                          <Box width={'70vh'}>
                            <Typography
                              variant="subtitle2"
                              fontWeight="500"
                              gutterBottom
                              color="primary"
                            >
                              Product PDF *
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
                                  ✓ {productData.pdfFile.name}
                                </span>
                              ) : (
                                "Select a PDF file for specifications"
                              )}
                            </Typography>
                          </Box>
                        </Box>
</Box>
                        {/* Row 5: Action Buttons (centered) */}
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 2,
                              mt: 2,
                              pt: 2,
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
                              {editingIndex !== null
                                ? "Update Product"
                                : "Save Product"}
                            </Button>

                            {editingIndex !== null && (
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
                                Cancel Edit
                              </Button>
                            )}
                          </Box>
                        </Grid>
                     
                    </Box>
                  </Grid>

                  {products.length > 0 && (
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

                        <TableContainer
                          component={Paper}
                          elevation={0}
                          sx={{
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            maxHeight: 300,
                            overflow: "auto",
                            "& .MuiTableCell-root": {
                              py: 1.5,
                            },
                          }}
                        >
                          <Table stickyHeader size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor: "grey.50" }}>
                                <TableCell sx={{ fontWeight: 600, width: 60 }}>
                                  #
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  Product
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  Size
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  Image
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  PDF
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontWeight: 600,
                                    width: 120,
                                    textAlign: "center",
                                  }}
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
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                    backgroundColor:
                                      editingIndex === index
                                        ? "action.selected"
                                        : "inherit",
                                    "&:hover": {
                                      backgroundColor: "action.hover",
                                    },
                                  }}
                                >
                                  <TableCell sx={{ fontWeight: 600 }}>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="subtitle2"
                                      fontWeight="500"
                                    >
                                      {product.productName}
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      display="block"
                                    >
                                      {product.description?.substring(0, 50)}...
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    {product.productSize || "-"}
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {product.imageFile
                                        ? product.imageFile.name
                                        : "No image"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      {product.pdfFile
                                        ? product.pdfFile.name
                                        : "No PDF"}
                                    </Typography>
                                  </TableCell>
                                  <TableCell sx={{ textAlign: "center" }}>
                                    <Stack
                                      direction="row"
                                      spacing={0.5}
                                      justifyContent="center"
                                    >
                                      <Tooltip title="Edit">
                                        <IconButton
                                          color="primary"
                                          onClick={() =>
                                            handleEditProduct(index)
                                          }
                                          size="small"
                                          sx={{
                                            backgroundColor: "primary.light",
                                            "&:hover": {
                                              backgroundColor: "primary.main",
                                              color: "white",
                                            },
                                          }}
                                        >
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </Tooltip>
                                      <Tooltip title="Delete">
                                        <IconButton
                                          color="error"
                                          onClick={() =>
                                            handleDeleteProduct(index)
                                          }
                                          size="small"
                                          sx={{
                                            backgroundColor: "error.light",
                                            "&:hover": {
                                              backgroundColor: "error.main",
                                              color: "white",
                                            },
                                          }}
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
            disabled={loading || products.length === 0}
            startIcon={!loading && <CheckCircleOutlineIcon />}
            sx={{
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              minWidth: 200,
              background:
                products.length === 0
                  ? "grey.400"
                  : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
              "&:hover": {
                background:
                  products.length === 0
                    ? "grey.400"
                    : "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
              },
            }}
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
                Creating...
              </>
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