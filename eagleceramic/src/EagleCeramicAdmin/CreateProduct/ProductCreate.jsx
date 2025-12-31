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
  CardContent,
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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import TitleIcon from "@mui/icons-material/Title";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import InventoryIcon from "@mui/icons-material/Inventory";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const ProductCreate = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productSizes: [{ size: "", title: "", description: "" }],
  });

  const [savedSizes, setSavedSizes] = useState([]);
  const [currentSize, setCurrentSize] = useState({ size: "", title: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrentSizeChange = (field, value) => {
    setCurrentSize(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSize = () => {
    if (!currentSize.size || !currentSize.title || !currentSize.description) {
      alert("Please fill all size fields before saving");
      return;
    }

    if (editingIndex !== null) {
      // Update existing size
      const updatedSizes = [...savedSizes];
      updatedSizes[editingIndex] = currentSize;
      setSavedSizes(updatedSizes);
      setEditingIndex(null);
    } else {
      // Add new size
      setSavedSizes(prev => [...prev, currentSize]);
    }
    
    // Reset current size
    setCurrentSize({ size: "", title: "", description: "" });
  };

  const handleEditSize = (index) => {
    setCurrentSize(savedSizes[index]);
    setEditingIndex(index);
  };

  const handleDeleteSize = (index) => {
    setSavedSizes(prev => prev.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setCurrentSize({ size: "", title: "", description: "" });
      setEditingIndex(null);
    }
  };

  const handleAddNewSize = () => {
    setCurrentSize({ size: "", title: "", description: "" });
    setEditingIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (savedSizes.length === 0) {
      alert("Please add at least one size before creating the product");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/eagle-ceramic/product-sizes/create",
        {
          productName: productData.productName,
          productSizes: savedSizes
        }
      );

      console.log("Product Created:", response.data);

      // Reset form after success
      setProductData({
        productName: "",
        productSizes: [{ size: "", title: "", description: "" }],
      });
      setSavedSizes([]);
      setCurrentSize({ size: "", title: "", description: "" });
      setEditingIndex(null);

      setSuccessSnackbar(true);
    } catch (error) {
      console.error("Create Product Error:", error);
      setErrorMessage(error?.response?.data?.message || "Failed to create product");
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
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: -10,
        mb: 6,
        px: { xs: 2, sm: 3 },
      }}
    >
      {/* Snackbars */}
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
          Product created successfully!
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

      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 1 }}>
          <InventoryIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Typography variant="h4" fontWeight="700" color="primary">
            Create New Product
          </Typography>
        </Stack>
        <Typography variant="h6" color="text.secondary">
          Add product details and manage size variations
        </Typography>
      </Box>

      <Fade in timeout={500}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 3,
              }}
            />
          )}

          {/* Form Header */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography variant="h4" fontWeight="600" gutterBottom>
              Product Information
            </Typography>
            <Divider
              sx={{
                mt: 2,
                mx: "auto",
                width: "100px",
                borderWidth: 2,
                borderColor: "primary.main",
              }}
            />
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Product Name */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      width: "100%",
                      maxWidth: 600,
                      border: "2px solid",
                      borderColor: "primary.light",
                      backgroundColor: "rgba(25, 118, 210, 0.03)",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" fontWeight="600" gutterBottom color="primary">
                        Product Name *
                      </Typography>
                      <TextField
                        placeholder="Enter product name"
                        name="productName"
                        value={productData.productName}
                        onChange={handleChange}
                        fullWidth
                        required
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <InventoryIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            fontSize: "1.1rem",
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </Box>
              </Grid>

              {/* Add Size Section */}
              <Grid item xs={12}>
                <Box sx={{ mb: 4, textAlign: "center" }}>
                  <Typography variant="h5" fontWeight="600" gutterBottom color="primary">
                    Add Size Variation
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Fill in the details below and click "Save Size"
                  </Typography>
                </Box>

                <Card
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    mb: 4,
                    border: "2px solid",
                    borderColor: "primary.light",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Size"
                        placeholder="e.g., 12x24"
                        value={currentSize.size}
                        onChange={(e) => handleCurrentSizeChange("size", e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AspectRatioIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Title"
                        placeholder="e.g., Medium Tile"
                        value={currentSize.title}
                        onChange={(e) => handleCurrentSizeChange("title", e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TitleIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <TextField
                        label="Description"
                        placeholder="e.g., Perfect for kitchen backsplash"
                        value={currentSize.description}
                        onChange={(e) => handleCurrentSizeChange("description", e.target.value)}
                        fullWidth
                        required
                        disabled={loading}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <DescriptionIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveSize}
                          disabled={loading}
                          sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: "1rem",
                            minWidth: 150,
                            background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                          }}
                        >
                          {editingIndex !== null ? "Update Size" : "Save Size"}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              {/* Saved Sizes Table */}
              {savedSizes.length > 0 && (
                <Grid item xs={12}>
                  <Box sx={{ mb: 4 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                      <Box>
                        <Typography variant="h5" fontWeight="600" gutterBottom>
                          Saved Size Variations
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {savedSizes.length} size{savedSizes.length !== 1 ? "s" : ""} added
                        </Typography>
                      </Box>
                      <Chip
                        label={`${savedSizes.length} Size${savedSizes.length !== 1 ? "s" : ""}`}
                        color="primary"
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      />
                    </Stack>

                    <TableContainer 
                      component={Paper} 
                      elevation={2}
                      sx={{ 
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "primary.light" }}>
                            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>#</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Size</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Title</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Description</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: 600, fontSize: "1rem", textAlign: "center" }}>Actions</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {savedSizes.map((size, index) => (
                            <TableRow 
                              key={index}
                              hover
                              sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                backgroundColor: editingIndex === index ? "action.hover" : "inherit"
                              }}
                            >
                              <TableCell sx={{ fontWeight: 600 }}>{index + 1}</TableCell>
                              <TableCell sx={{ fontWeight: 500 }}>{size.size}</TableCell>
                              <TableCell>{size.title}</TableCell>
                              <TableCell>{size.description}</TableCell>
                              <TableCell sx={{ textAlign: "center" }}>
                                <Stack direction="row" spacing={1} justifyContent="center">
                                  <Tooltip title="Edit">
                                    <IconButton
                                      color="primary"
                                      onClick={() => handleEditSize(index)}
                                      size="small"
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete">
                                    <IconButton
                                      color="error"
                                      onClick={() => handleDeleteSize(index)}
                                      size="small"
                                    >
                                      <DeleteOutlineIcon />
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

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box sx={{ 
                  mt: 4, 
                  pt: 4, 
                  borderTop: "2px solid", 
                  borderColor: "divider",
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
                    <Button
                      type="button"
                      variant="outlined"
                      size="large"
                      onClick={() => {
                        setProductData({
                          productName: "",
                          productSizes: [{ size: "", title: "", description: "" }],
                        });
                        setSavedSizes([]);
                        setCurrentSize({ size: "", title: "", description: "" });
                        setEditingIndex(null);
                      }}
                      disabled={loading}
                      sx={{
                        px: 5,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1.1rem",
                        minWidth: 180,
                      }}
                    >
                      Clear All
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading || savedSizes.length === 0}
                      startIcon={!loading && <CheckCircleOutlineIcon />}
                      sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: "1.1rem",
                        minWidth: 220,
                        background: savedSizes.length === 0 
                          ? "grey.400" 
                          : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                        "&:hover": {
                          background: savedSizes.length === 0 
                            ? "grey.400" 
                            : "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                          transform: savedSizes.length > 0 ? "translateY(-2px)" : "none",
                          boxShadow: savedSizes.length > 0 ? 4 : "none",
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
                          Creating Product...
                        </>
                      ) : (
                        `Create Product (${savedSizes.length} size${savedSizes.length !== 1 ? "s" : ""})`
                      )}
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Fade>
    </Box>
  );
};

export default ProductCreate;