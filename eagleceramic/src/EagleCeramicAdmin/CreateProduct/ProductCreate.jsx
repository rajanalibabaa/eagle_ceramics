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
import {getAdminToken} from "../../EagleCeramicAdmin/utils/auth";


const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ProductCreate = ({ 
    openModal, 
    setOpenModal, 
    mode = 'create', 
    editingProduct = null,
    onSuccess,
    onClose ,
    token
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
    const [currentImageError, setCurrentImageError] = useState(""); // For inline image validation errors
    const [editingIndex, setEditingIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successSnackbar, setSuccessSnackbar] = useState(false);
    const [errorSnackbar, setErrorSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [sizesToDelete, setSizesToDelete] = useState([]);
    const fileInputRef = useRef(null);
const modalRef = useRef(null);

    console.log("currentSize",currentSize);
const scrollToTop = () => {
    if (modalRef.current) { 
        modalRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

   useEffect(() => {
    console.log('Checkpoint: Initializing ProductCreate with mode:', mode, 'editingProduct:', editingProduct);
    if (mode === 'update' && editingProduct) {
        // Clear current form first
        setCurrentSize({ 
            _id: null, 
            size: "", 
            title: "", 
            description: "",
            image: null,
            imageFile: null,
            imagePreview: null
        });
        setCurrentImageError("");
        
        // Pre-fill form with existing product data
        setProductData({
            productName: editingProduct.productName || "",
            productSizes: editingProduct.productSizes || []
        });
        
        // Convert existing sizes to savedSizes format
        const initialSizes = editingProduct.productSizes?.map(size => {
            console.log('Loading size from DB:', {
                _id: size._id,
                size: size.size,
                image: size.image
            });
            
            return {
                _id: size._id,
                size: size.size || "",
                title: size.title || "",
                description: size.description || "",
                image: size.image || "",
                imageFile: null,
                imagePreview: size.image || null
            };
        }) || [];
        
        console.log('Initial sizes loaded:', initialSizes);
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
        setCurrentImageError("");
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

        // Validate file size (3MB)
        if (file.size > MAX_IMAGE_SIZE) {
            setCurrentImageError(`Image size must be less than ${formatFileSize(MAX_IMAGE_SIZE)}. Current size: ${formatFileSize(file.size)}`);
            e.target.value = "";
            return;
        }

        // Validate file type
        if (!file.type.match(/^image\/(jpeg|jpg|png|gif|webp)$/i)) {
            setCurrentImageError("Please select a valid image file (JPEG, PNG, GIF, WebP)");
            e.target.value = "";
            return;
        }

        setCurrentImageError(""); // Clear error on success

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
        setCurrentImageError(""); // Clear error when removing
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSaveSize = () => {
        if (!currentSize.size || !currentSize.title || !currentSize.description) {
            alert("Please fill all size fields before saving");
            return;
        }

        if (mode === 'create' && !currentSize.imageFile) {
            alert("Image is required for size in create mode");
            return;
        }

        if (editingIndex !== null) {
            const updatedSizes = [...savedSizes];
            
            const updatedSize = {
                _id: currentSize._id,
                size: currentSize.size.trim(),
                title: currentSize.title.trim(),
                description: currentSize.description.trim(),
                image: currentSize.image || updatedSizes[editingIndex].image,
                imageFile: currentSize.imageFile || null,
                imagePreview: currentSize.imagePreview || currentSize.image || updatedSizes[editingIndex].imagePreview || updatedSizes[editingIndex].image
            };
            
            if (mode === 'update') {
                if (!currentSize.imageFile) {
                    updatedSize.image = currentSize.image || updatedSizes[editingIndex].image;
                }
            }
            
            updatedSizes[editingIndex] = updatedSize;
            setSavedSizes(updatedSizes);
            console.log('Updated existing size at index', editingIndex, 'New size data:', updatedSize);
            setEditingIndex(null);
        } else {
            // ADD NEW SIZE
            const newSize = {
                ...currentSize,
                _id: currentSize._id || (mode === 'update' ? `temp-${Date.now()}-${Math.random()}` : null)
            };
            
            setSavedSizes(prev => [...prev, newSize]);
            console.log('Added new size:', newSize);
        }

        // Reset current size and error
        setCurrentSize({ 
            _id: null, 
            size: "", 
            title: "", 
            description: "",
            image: null,
            imageFile: null,
            imagePreview: null
        });
        setCurrentImageError("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleEditSize = (index) => {
        console.log('Checkpoint: Editing size at index:', index, 'Size data:', savedSizes[index]);
        const sizeToEdit = savedSizes[index];
        
        setCurrentSize({
            _id: sizeToEdit._id,
            size: sizeToEdit.size || "",
            title: sizeToEdit.title || "",
            description: sizeToEdit.description || "",
            image: sizeToEdit.image || null,
            imageFile: sizeToEdit.imageFile || null,
            imagePreview: sizeToEdit.imagePreview || sizeToEdit.image || null
        });
        
        setCurrentImageError(""); // Clear any previous validation errors
        setEditingIndex(index);
         scrollToTop();
        
       
    };

    const handleDeleteSize = (index) => {
        console.log('Checkpoint: Deleting size at index:', index);
        const sizeToDelete = savedSizes[index];
        
        if (sizeToDelete._id && sizeToDelete._id.toString().length === 24) {
            setSizesToDelete(prev => [...prev, sizeToDelete._id]);
            console.log('Checkpoint: Added size to delete list:', sizeToDelete._id, 'New sizesToDelete:', [...sizesToDelete, sizeToDelete._id]);
        }
        
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
            setCurrentImageError("");
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
        setCurrentImageError(""); // Clear validation error
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setEditingIndex(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            
            const token = getAdminToken();
            console.log('Checkpoint: Retrieved admin token for submission:', token);
            if (!token) {
                setErrorMessage('Authentication token not found. Please login again.');
                setErrorSnackbar(true);
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('productName', productData.productName.trim());

            if (mode === 'create') {
                savedSizes.forEach((size, index) => {
                    formData.append(`productSizes[${index}][size]`, size.size.trim());
                    formData.append(`productSizes[${index}][title]`, size.title.trim());
                    formData.append(`productSizes[${index}][description]`, size.description.trim());
                    
                    if (size.imageFile) {
                        formData.append('image', size.imageFile);
                    }
                });
            } 
            else if (mode === 'update' && editingProduct) {
                const productSizesData = savedSizes.map((size, index) => {
                    const sizeData = {
                        size: size.size.trim(),
                        title: size.title.trim(),
                        description: size.description.trim(),
                        hasNewImage: !!size.imageFile,
                    };
                    
                    if (size._id && typeof size._id === 'string' && size._id.length === 24) {
                        sizeData._id = size._id;
                    } else if (size._id && typeof size._id === 'object') {
                        sizeData._id = size._id.toString();
                    }
                    
                    if (!size.imageFile && size.image) {
                        sizeData.existingImage = size.image;
                    }
                    
                    return sizeData;
                });
                
                formData.append('productSizes', JSON.stringify(productSizesData));
                
                savedSizes.forEach((size) => {
                    if (size.imageFile) {
                        formData.append('image', size.imageFile);
                    }
                });
                
                if (sizesToDelete.length > 0) {
                    formData.append('sizesToDelete', JSON.stringify(sizesToDelete));
                }
            }

            console.log("=== FormData Contents ===");
            for (let pair of formData.entries()) {
                const key = pair[0];
                const value = pair[1];
                if (key === 'productSizes' || key === 'sizesToDelete') {
                    try {
                        console.log(key + ': ', JSON.parse(value));
                    } catch {
                        console.log(key + ': ', value);
                    }
                } else if (value instanceof File) {
                    console.log(key + ': ', value.name, `(${formatFileSize(value.size)})`);
                } else {
                    console.log(key + ': ', value);
                }
            }
            console.log("=========================");

            let response;
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            };

            if (mode === 'update' && editingProduct) {
                response = await axios.put(
                    `https://clientbackend.cholabiz.com/api/v1/eagle-ceramic/product-sizes/update/${editingProduct.uuid}`,
                    formData,
                    config
                );
            } else {
                response = await axios.post(
                    "https://clientbackend.cholabiz.com/api/v1/eagle-ceramic/product-sizes/create",
                    formData,
                    config
                );
            }

            console.log(`Response:`, response.data);
            setSuccessSnackbar(true);
            
            if (onSuccess) {
                onSuccess();
            }

            setTimeout(() => {
                handleCloseModal();
            }, 1500);

        } catch (error) {
            console.error(`Error:`, error);
            console.error('Error details:', error.response?.data);
            
            if (error.response?.status === 401) {
                setErrorMessage('Session expired. Please login again.');
            } else {
                setErrorMessage(
                    error?.response?.data?.message || 
                    `Failed to ${mode === 'update' ? 'update' : 'create'} product`
                );
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
        <Fade in={openModal} timeout={500}>
            <Paper
            ref={modalRef}
                sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 0,
                    background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    minHeight: '400px',
                     maxHeight: '90vh',
        overflowY: 'auto',
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

                                    {/* Image Upload - Neat UI with 3MB validation */}
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight="500"
                                                gutterBottom
                                            >
                                                Product Image {mode === "create" && "*"}
                                                <Typography 
                                                    component="span" 
                                                    variant="caption" 
                                                    color="text.secondary" 
                                                    sx={{ ml: 1 }}
                                                >
                                                    (Max {formatFileSize(MAX_IMAGE_SIZE)})
                                                </Typography>
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<CloudUploadIcon />}
                                                disabled={loading}
                                                size="small"
                                                fullWidth
                                            >
                                                {currentSize.imageFile
                                                    ? "Change Image"
                                                    : (currentSize.imagePreview || currentSize.image)
                                                    ? "Replace Image"
                                                    : mode === "create"
                                                    ? "Upload Image *"
                                                    : "Upload New Image (Optional)"}
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                    ref={fileInputRef}
                                                    onChange={handleImageChange}
                                                />
                                            </Button>
                                            
                                            {/* Validation Error */}
                                            {currentImageError && (
                                                <Typography
                                                    variant="caption"
                                                    color="error"
                                                    display="block"
                                                    sx={{ mt: 0.5 }}
                                                >
                                                    {currentImageError}
                                                </Typography>
                                            )}
                                            
                                            {/* File Info */}
                                            {currentSize.imageFile && (
                                                <Typography
                                                    variant="caption"
                                                    color="success.main"
                                                    display="block"
                                                    sx={{ mt: 0.5 }}
                                                >
                                                    ✓ Selected: {currentSize.imageFile.name} ({formatFileSize(currentSize.imageFile.size)})
                                                </Typography>
                                            )}
                                            
                                            {/* Existing Image Info */}
                                            {((currentSize.imagePreview || currentSize.image) && !currentSize.imageFile && mode === "update") && (
                                                <Typography
                                                    variant="caption"
                                                    color="info.main"
                                                    display="block"
                                                    sx={{ mt: 0.5 }}
                                                >
                                                    📷 Current image will be kept
                                                </Typography>
                                            )}
                                            
                                            {/* Preview */}
                                            {currentSize.imagePreview && (
                                                <Box sx={{ mt: 1 }}>
                                                    <img
                                                        src={currentSize.imagePreview}
                                                        alt="Preview"
                                                        style={{
                                                            maxWidth: "100%",
                                                            maxHeight: 100,
                                                            borderRadius: 4,
                                                            border: "1px solid #e0e0e0"
                                                        }}
                                                    />
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        onClick={removeImage}
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Remove Image
                                                    </Button>
                                                </Box>
                                            )}
                                        </Box>
                                    </Grid>

                                    {/* Description - Fixed alignment (removed width:300px constraint) */}
                                    <Grid item xs={12}>
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
                                                    // REMOVED: width:'300px' - was breaking alignment
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