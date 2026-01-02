import React, { useState, useEffect, useRef } from "react";
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
    Avatar,
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
import ImageIcon from "@mui/icons-material/Image";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const ProductCreate = ({ 
    openModal, 
    setOpenModal, 
    mode = 'create', 
    editingProduct = null,
    onSuccess,
    onClose 
}) => {
    // State management
    const [productData, setProductData] = useState({
        productName: "",
        productSizes: [],
    });
    
    const [savedSizes, setSavedSizes] = useState([]);
    const [currentSize, setCurrentSize] = useState({ 
        _id: null, 
        size: "", 
        title: "", 
        description: "",
        image: null,
        imageFile: null,
        imagePreview: null
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sizesToDelete, setSizesToDelete] = useState([]);
    const fileInputRef = useRef(null);

    // Initialize form when modal opens or editingProduct changes
    useEffect(() => {
        console.log('Checkpoint: Initializing ProductCreate with mode:', mode, 'editingProduct:', editingProduct);
        if (mode === 'update' && editingProduct) {
            // Pre-fill form with existing product data
            setProductData({
                productName: editingProduct.productName || "",
                productSizes: editingProduct.productSizes || []
            });
            
            // Convert existing sizes to savedSizes format
            const initialSizes = editingProduct.productSizes?.map(size => ({
                _id: size._id,
                size: size.size || "",
                title: size.title || "",
                description: size.description || "",
                image: size.image || "", // Store image URL
                imagePreview: size.image || null
            })) || [];
            
            setSavedSizes(initialSizes);
            setSizesToDelete([]);
        } else {
            // Reset form for create mode
            resetForm();
        }
    }, [mode, editingProduct, openModal]);

    const resetForm = () => {
        console.log('Checkpoint: Resetting form');
        setProductData({
            productName: "",
            productSizes: []
        });
        setSavedSizes([]);
        setCurrentSize({ 
            _id: null, 
            size: "", 
            title: "", 
            description: "",
            image: null,
            imageFile: null,
            imagePreview: null
        });
        setEditingIndex(null);
        setSizesToDelete([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Checkpoint: Changing productData field:', name, 'to:', value);
        setProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCurrentSizeChange = (field, value) => {
        console.log('Checkpoint: Changing currentSize field:', field, 'to:', value);
        setCurrentSize(prev => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check file size (1MB = 1048576 bytes)
        if (file.size > 1048576) {
            alert("Image size must be less than 1MB");
            e.target.value = "";
            return;
        }

        // Check file type
        if (!file.type.match('image.*')) {
            alert("Please select an image file");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentSize(prev => ({
                ...prev,
                imageFile: file,
                imagePreview: reader.result
            }));
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setCurrentSize(prev => ({
            ...prev,
            imageFile: null,
            imagePreview: null,
            image: null
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSaveSize = () => {
        console.log('Checkpoint: Attempting to save size. Current size:', currentSize, 'Editing index:', editingIndex);
        
        // Validate required fields
        if (!currentSize.size || !currentSize.title || !currentSize.description) {
            alert("Please fill all size fields before saving");
            return;
        } 

        if (editingIndex !== null) {
            // Update existing size
            const updatedSizes = [...savedSizes];
            const updatedSize = {
                ...currentSize,
                // If we're updating with a new image file, reset the existing image URL
                image: currentSize.imageFile ? null : currentSize.image
            };
            updatedSizes[editingIndex] = updatedSize;
            setSavedSizes(updatedSizes);
            console.log('Checkpoint: Updated existing size at index', editingIndex, '. New savedSizes:', updatedSizes);
            setEditingIndex(null);
        } else {
            // Add new size (with temporary ID if not updating)
            const newSize = {
                ...currentSize,
                _id: currentSize._id || `temp-${Date.now()}-${Math.random()}`
            };
            setSavedSizes(prev => [...prev, newSize]);
            console.log('Checkpoint: Added new size. New savedSizes:', [...savedSizes, newSize]);
        }

        // Reset current size
        setCurrentSize({ 
            _id: null, 
            size: "", 
            title: "", 
            description: "",
            image: null,
            imageFile: null,
            imagePreview: null
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        console.log('Checkpoint: Reset currentSize after save');
    };

    const handleEditSize = (index) => {
        console.log('Checkpoint: Editing size at index:', index, 'Size data:', savedSizes[index]);
        const sizeToEdit = savedSizes[index];
        setCurrentSize({
            ...sizeToEdit,
            imageFile: null, // Reset file when editing
            imagePreview: sizeToEdit.image || null
        });
        setEditingIndex(index);
    };

    const handleDeleteSize = (index) => {
        console.log('Checkpoint: Deleting size at index:', index);
        const sizeToDelete = savedSizes[index];
        
        // If it's an existing size (has MongoDB _id), add to deletion list
        if (sizeToDelete._id && sizeToDelete._id.toString().length === 24) {
            setSizesToDelete(prev => [...prev, sizeToDelete._id]);
            console.log('Checkpoint: Added size to delete list:', sizeToDelete._id, 'New sizesToDelete:', [...sizesToDelete, sizeToDelete._id]);
        }
        
        // Remove from saved sizes
        setSavedSizes(prev => prev.filter((_, i) => i !== index));
        console.log('Checkpoint: Removed size from savedSizes. New savedSizes:', savedSizes.filter((_, i) => i !== index));
        
        if (editingIndex === index) {
            setCurrentSize({ 
                _id: null, 
                size: "", 
                title: "", 
                description: "",
                image: null,
                imageFile: null,
                imagePreview: null
            });
            setEditingIndex(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            console.log('Checkpoint: Cleared currentSize and editingIndex after delete');
        }
    };

    const handleAddNewSize = () => {
        console.log('Checkpoint: Adding new size - resetting currentSize');
        setCurrentSize({ 
            _id: null, 
            size: "", 
            title: "", 
            description: "",
            image: null,
            imageFile: null,
            imagePreview: null
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setEditingIndex(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Checkpoint: Submitting form. productData:', productData, 'savedSizes:', savedSizes, 'sizesToDelete:', sizesToDelete);

        if (savedSizes.length === 0) {
            alert("Please add at least one size before " + (mode === 'update' ? 'updating' : 'creating') + " the product");
            return;
        }

        try {
            setLoading(true);

            // Create FormData to handle file uploads
            const formData = new FormData();
            formData.append('productName', productData.productName.trim());

            // Add sizes data as JSON string
            const sizesData = savedSizes.map(size => ({
                _id: size._id && size._id.toString().length === 24 ? size._id : undefined,
                size: size.size.trim(),
                title: size.title.trim(),
                description: size.description.trim(),
                image: size.image || null // For existing images
            }));

            formData.append('productSizes', JSON.stringify(sizesData));

            // Append image files
            savedSizes.forEach((size, index) => {
                if (size.imageFile) {
                    formData.append(`image_${index}`, size.imageFile);
                }
            });

            // Add sizesToDelete for update mode
            if (mode === 'update' && editingProduct) {
                formData.append('sizesToDelete', JSON.stringify(sizesToDelete));
            }

            console.log("Checkpoint: Submitting form data");

            let response;
            if (mode === 'update' && editingProduct) {
                // Update existing product
                response = await axios.put(
                    `http://localhost:5050/api/v1/eagle-ceramic/product-sizes/update/${editingProduct.uuid}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            } else {
                // Create new product
                response = await axios.post(
                    "http://localhost:5050/api/v1/eagle-ceramic/product-sizes/create",
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
            }

            console.log(`Checkpoint: ${mode === 'update' ? 'Update' : 'Create'} response:`, response.data);

            // Show success message
            setSuccessSnackbar(true);
            
            // Notify parent component
            if (onSuccess) {
                onSuccess();
            }

            // Close modal after delay
            setTimeout(() => {
                handleCloseModal();
            }, 1500);

        } catch (error) {
            console.error(`Checkpoint: ${mode === 'update' ? 'Update' : 'Create'} Product Error:`, error);
            setErrorMessage(
                error?.response?.data?.message || 
                `Failed to ${mode === 'update' ? 'update' : 'create'} product`
            );
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
        <Fade in={openModal} timeout={500}>
            <Paper
                sx={{
                    p: { xs: 3, md: 4 },
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
                        Product {mode === 'update' ? 'updated' : 'created'} successfully!
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

                {/* Form Header */}
                <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Typography variant="h5" fontWeight="600" gutterBottom>
                        {mode === 'update' ? 'Update Product' : 'Create New Product'}
                    </Typography>
                    <Divider
                        sx={{
                            mx: "auto",
                            width: "100px",
                            borderWidth: 1.5,
                            borderColor: mode === 'update' ? "secondary.main" : "primary.main",
                        }}
                    />
                </Box>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Product Name */}
                        <Grid item xs={12} sx={{ml:'auto', mr:'auto', width: '100%', maxWidth: 600}}>
                            <Card
                                sx={{
                                    width: "100%",
                                    maxWidth: 600,
                                    mt: 1,
                                    mx: 'auto',
                                    border: "1px solid",
                                    borderColor: mode === 'update' ? "secondary.light" : "primary.light",
                                    backgroundColor: mode === 'update' 
                                        ? "rgba(156, 39, 176, 0.03)" 
                                        : "rgba(25, 118, 210, 0.03)",
                                    borderRadius: 3,
                                }}
                            >
                                <CardContent>
                                    <Typography variant="body1" fontWeight="600" gutterBottom 
                                        color={mode === 'update' ? "secondary" : "primary"}>
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
                                                    <InventoryIcon 
                                                        color={mode === 'update' ? "secondary" : "primary"} 
                                                        sx={{ fontSize: 20 }} 
                                                    />
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
                        </Grid>

                        {/* Add/Edit Size Section */}
                        <Grid item xs={12} >
                            <Card
                                elevation={2}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    mb: 2,
                                    border: "2px solid",
                                    borderColor: mode === 'update' ? "secondary.light" : "primary.light",
                                }}
                            >
                                <Typography variant="h6" fontWeight="600" gutterBottom 
                                    color={mode === 'update' ? "secondary" : "primary"}>
                                    {editingIndex !== null ? 'Edit Size' : 'Add New Size'}
                                </Typography>
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            label="Size"
                                            placeholder="e.g., 12x24"
                                            value={currentSize.size}
                                            onChange={(e) => handleCurrentSizeChange("size", e.target.value)}
                                            fullWidth
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AspectRatioIcon 
                                                            color={mode === 'update' ? "secondary" : "primary"} 
                                                            sx={{ fontSize: 20 }} 
                                                        />
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

                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            label="Title"
                                            placeholder="e.g., Medium Tile"
                                            value={currentSize.title}
                                            onChange={(e) => handleCurrentSizeChange("title", e.target.value)}
                                            fullWidth
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <TitleIcon 
                                                            color={mode === 'update' ? "secondary" : "primary"} 
                                                            sx={{ fontSize: 20 }} 
                                                        />
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

                                    <Grid item xs={12} md={3}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                id="image-upload"
                                            />
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                htmlFor="image-upload"
                                                startIcon={<CloudUploadIcon />}
                                                disabled={loading}
                                                sx={{
                                                    height: '56px',
                                                    borderRadius: 2,
                                                    fontSize: "0.9rem",
                                                    gap:1
                                                }}
                                            >
                                                Upload Image
                                                <Typography variant="overline" display="block" color="text.secondary" >
                                                    Max 1MB
                                                </Typography>
                                            </Button>
                                            
                                            {currentSize.imagePreview && (
                                                <Box sx={{ mt: 1, textAlign: 'center' }}>
                                                    <Avatar
                                                        src={currentSize.imagePreview}
                                                        alt="Preview"
                                                        sx={{ 
                                                            width: 70, 
                                                            height: 70, 
                                                            mx: 'auto',
                                                            border: '2px solid',
                                                            borderRadius: 0
                                                        }}
                                                    />
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        onClick={removeImage}
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>
                                    
                                    <Grid item xs={12} >
                                        <TextField
                                            label="Description"
                                            placeholder="e.g., Perfect for kitchen backsplash"
                                            value={currentSize.description}
                                            onChange={(e) => handleCurrentSizeChange("description", e.target.value)}
                                            fullWidth
                                            disabled={loading}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <DescriptionIcon 
                                                            color={mode === 'update' ? "secondary" : "primary"} 
                                                            sx={{ fontSize: 20 }} 
                                                        />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2,
                                                    fontSize: "0.9rem",
                                                    width:'300px'
                                                   
                                                },
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, ml: 8 }}>
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
                                                    background: mode === 'update' 
                                                        ? "linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)"
                                                        : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                                                }}
                                            >
                                                {editingIndex !== null ? "Update Size" : "Save Size"}
                                            </Button>
                                            {editingIndex !== null && (
                                                <Button
                                                    variant="outlined"
                                                    onClick={handleAddNewSize}
                                                    disabled={loading}
                                                    sx={{
                                                        px: 4,
                                                        py: 1.5,
                                                        borderRadius: 2,
                                                        fontSize: "0.785rem",
                                                    }}
                                                >
                                                    Cancel Edit
                                                </Button>
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>

                        {/* Saved Sizes Table */}
                        {savedSizes.length > 0 && (
                            <Grid item xs={12} sx={{ml:'auto', mr:'auto', width: '100%'}}>
                                <Box sx={{ mb: 4 }}>
                                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
                                        <Box>
                                            <Typography variant="h5" fontWeight="600" gutterBottom>
                                                {mode === 'update' ? 'Current Sizes' : 'Saved Sizes'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {savedSizes.length} size{savedSizes.length !== 1 ? "s" : ""} added
                                                {sizesToDelete.length > 0 && ` (${sizesToDelete.length} marked for deletion)`}
                                            </Typography>
                                        </Box>
                                        <Chip
                                            label={`${savedSizes.length} Size${savedSizes.length !== 1 ? "s" : ""}`}
                                            color={mode === 'update' ? "secondary" : "primary"}
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
                                                <TableRow sx={{ 
                                                    backgroundColor: mode === 'update' ? "secondary.light" : "primary.light" 
                                                }}>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>#</TableCell>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Size</TableCell>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Title</TableCell>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Description</TableCell>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem" }}>Image</TableCell>
                                                    <TableCell sx={{ color: "black", fontWeight: 600, fontSize: "1rem", textAlign: "center" }}>
                                                        Actions
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {savedSizes.map((size, index) => {
                                                    const isMarkedForDeletion = size._id && 
                                                        sizesToDelete.includes(size._id);
                                                    return (
                                                        <TableRow
                                                            key={index}
                                                            hover
                                                            sx={{
                                                                '&:last-child td, &:last-child th': { border: 0 },
                                                                backgroundColor: editingIndex === index 
                                                                    ? "action.hover" 
                                                                    : isMarkedForDeletion
                                                                    ? "error.light"
                                                                    : "inherit",
                                                                opacity: isMarkedForDeletion ? 0.7 : 1,
                                                            }}
                                                        >
                                                            <TableCell sx={{ fontWeight: 600 }}>
                                                                {index + 1}
                                                                {isMarkedForDeletion && " (Will be deleted)"}
                                                            </TableCell>
                                                            <TableCell sx={{ fontWeight: 500 }}>{size.size}</TableCell>
                                                            <TableCell>{size.title}</TableCell>
                                                            <TableCell>{size.description}</TableCell>
                                                            <TableCell>
                                                                {size.imagePreview || size.image ? (
                                                                    <Avatar
                                                                        src={size.imagePreview || size.image}
                                                                        alt={`${size.size} image`}
                                                                        sx={{ 
                                                                            width: 50, 
                                                                            height: 50,
                                                                            border: '1px solid #ddd'
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <Box sx={{ 
                                                                        display: 'flex', 
                                                                        alignItems: 'center', 
                                                                        gap: 1,
                                                                        color: 'text.secondary'
                                                                    }}>
                                                                        <ImageIcon />
                                                                        <Typography variant="caption">
                                                                            No image
                                                                        </Typography>
                                                                    </Box>
                                                                )}
                                                            </TableCell>
                                                            <TableCell sx={{ textAlign: "center" }}>
                                                                <Stack direction="row" spacing={1} justifyContent="center">
                                                                    <Tooltip title="Edit">
                                                                        <IconButton
                                                                            color="primary"
                                                                            onClick={() => handleEditSize(index)}
                                                                            size="small"
                                                                            disabled={isMarkedForDeletion}
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
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Grid>
                        )}
                    </Grid>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
                                type="submit"
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
                                        : mode === 'update'
                                        ? "linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)"
                                        : "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                                    "&:hover": {
                                        background: savedSizes.length === 0
                                            ? "grey.400"
                                            : mode === 'update'
                                            ? "linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)"
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
                                        {mode === 'update' ? 'Updating...' : 'Creating...'}
                                    </>
                                ) : (
                                    `${mode === 'update' ? 'Update' : 'Create'} Product (${savedSizes.length})`
                                )}
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </Paper>
        </Fade>
    );
};

export default ProductCreate;