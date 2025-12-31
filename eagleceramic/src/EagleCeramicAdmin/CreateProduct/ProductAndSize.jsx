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
    Modal,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Backdrop,
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
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const ProductAndSize = () => {
    // State for modal/popup
    const [openModal, setOpenModal] = useState(false);

    // Product creation states (moved from ProductCreate component)
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

    // Modal handlers
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        // Reset form when closing
        resetForm();
    };

    // Product creation handlers (from ProductCreate)
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

    const resetForm = () => {
        setProductData({
            productName: "",
            productSizes: [{ size: "", title: "", description: "" }],
        });
        setSavedSizes([]);
        setCurrentSize({ size: "", title: "", description: "" });
        setEditingIndex(null);
        setLoading(false);
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

            // Show success message
            setSuccessSnackbar(true);

            // Close modal after delay
            setTimeout(() => {
                handleCloseModal();
            }, 1500);

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
        <>
            {/* Main Page Content */}
            <Box sx={{ p: 1 }}>
                {/* Your existing content here */}
                <Box>
                    <Box>
                        <Button
                            variant="contained"
                            onClick={handleOpenModal}
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: "red",
                                color: "white",
                                '&:hover': {
                                    backgroundColor: "#d32f2f",
                                },
                                px: 3,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Create New Product
                        </Button>
                    </Box>
                </Box>

                {/* Add your other content here */}
            </Box>

            {/* Modal/Popup Dialog */}
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
                        maxHeight: '90vh',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,

                    backgroundColor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" fontWeight="600">
                        Create New Product
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            color: 'white',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers sx={{ p: 0 }}>
                    {/* Snackbars inside modal */}
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

                    <Fade in timeout={500}>
                        <Paper
                            sx={{
                                p: { xs: 3, md: 2 },
                                borderRadius: 0,
                                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                                minHeight: '400px',
                            }}
                        >
                            {loading && (
                                <LinearProgress
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                    }}
                                />
                            )}

                            {/* Form Header */}
                            <Box sx={{ mb: 0, textAlign: "center" }}>
                                <Typography variant="h5" fontWeight="600" gutterBottom>
                                    Product Information
                                </Typography>
                                <Divider
                                    sx={{

                                        mx: "auto",
                                        width: "100px",
                                        borderWidth: 1.5,
                                        borderColor: "primary.main",
                                    }}
                                />
                            </Box>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2} sx={{ display: "grid", }}>
                                    {/* Product Name */}
                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex' }}>
                                            <Card
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 600,
                                                    mt: 1,
                                                    border: "1px solid",
                                                    borderColor: "primary.light",
                                                    backgroundColor: "rgba(25, 118, 210, 0.03)",
                                                    borderRadius: 3,
                                                    ml: 'auto',
                                                    mr: 'auto',
                                                }}
                                            >
                                                <CardContent>
                                                    <Typography variant="body1" fontWeight="600" gutterBottom color="primary">
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
                                                                    <InventoryIcon color="primary" sx={{ fontSize: 20 }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: 2,
                                                                fontSize: "0.9rem",


                                                            },
                                                        }}
                                                    />
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>

                                    {/* Add Size Section */}
                                    <Grid item xs={12}>
                                        {/* <Box sx={{ mb: 4, textAlign: "center" }}>
                      <Typography variant="h5" fontWeight="600" gutterBottom color="primary">
                        Add Size Variation
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Fill in the details below and click "Save Size"
                      </Typography>
                    </Box> */}

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
                                            <Grid container spacing={3}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 2,


                                                }}>
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
                                                                    <AspectRatioIcon color="primary" sx={{ fontSize: 20 }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: 2,
                                                                fontSize: "0.9rem",
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
                                                                    <TitleIcon color="primary" sx={{ fontSize: 20 }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: 2,
                                                                fontSize: "0.9rem",
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
                                                                    <DescriptionIcon color="primary" sx={{ fontSize: 20 }} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        sx={{
                                                            "& .MuiOutlinedInput-root": {
                                                                borderRadius: 2,
                                                                fontSize: "0.9rem",
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
                                                                fontSize: "0.785rem",
                                                                minWidth: 120,
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
                                                        maxHeight: 300,
                                                        overflow: 'auto'
                                                    }}
                                                >
                                                    <Table stickyHeader>
                                                        <TableHead>
                                                            <TableRow sx={{ backgroundColor: "primary.light" }}>
                                                                <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>#</TableCell>
                                                                <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Size</TableCell>
                                                                <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Title</TableCell>
                                                                <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Description</TableCell>
                                                                <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem", textAlign: "center" }}>Actions</TableCell>
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
                                </Grid>
                            </form>
                        </Paper>
                    </Fade>
                </DialogContent>

                <DialogActions sx={{
                    p: 3,
                    justifyContent: 'space-between',
                    backgroundColor: 'grey.50'
                }}>
                    <Button
                        onClick={resetForm}
                        variant="outlined"
                        disabled={loading}
                        sx={{
                            px: 4,
                            py: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                        }}
                    >
                        Clear All
                    </Button>

                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={handleCloseModal}
                            variant="outlined"
                            disabled={loading}
                            sx={{
                                px: 4,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={loading || savedSizes.length === 0}
                            startIcon={!loading && <CheckCircleOutlineIcon />}
                            sx={{
                                px: 5,
                                py: 1,
                                borderRadius: 2,
                                fontWeight: 600,
                                minWidth: 200,
                                background: savedSizes.length === 0
                                    ? "grey.400"
                                    : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                                "&:hover": {
                                    background: savedSizes.length === 0
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
                                `Create Product (${savedSizes.length})`
                            )}
                        </Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductAndSize;