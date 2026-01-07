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



    console.log("currentSize",currentSize);

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
                image: size.image || "", // Store the image URL from database
                imageFile: null, // No file initially
                imagePreview: size.image || null // Use URL for preview
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
        // UPDATE EXISTING SIZE
        const updatedSizes = [...savedSizes];
        
        // Create updated size object - CRITICAL: Preserve existing image if no new file
        const updatedSize = {
            _id: currentSize._id,
            size: currentSize.size.trim(),
            title: currentSize.title.trim(),
            description: currentSize.description.trim(),
            // Preserve existing image URL if no new file is uploaded
            image: currentSize.image || updatedSizes[editingIndex].image,
            // Track new image file if uploaded
            imageFile: currentSize.imageFile || null,
            // Use new preview or existing image for display
            imagePreview: currentSize.imagePreview || currentSize.image || updatedSizes[editingIndex].imagePreview || updatedSizes[editingIndex].image
        };
        
        // Special handling for update mode
        if (mode === 'update') {
            // If we're not uploading a new file, make sure we keep the existing image
            if (!currentSize.imageFile) {
                // Ensure the image field has the URL from the original size
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
};
   const handleEditSize = (index) => {
    console.log('Checkpoint: Editing size at index:', index, 'Size data:', savedSizes[index]);
    const sizeToEdit = savedSizes[index];
    
    setCurrentSize({
        _id: sizeToEdit._id,
        size: sizeToEdit.size || "",
        title: sizeToEdit.title || "",
        description: sizeToEdit.description || "",
        image: sizeToEdit.image || null, // Preserve existing image URL
        imageFile: sizeToEdit.imageFile || null, // Keep any existing file
        imagePreview: sizeToEdit.imagePreview || sizeToEdit.image || null
    });
    
    setEditingIndex(index);
    
    // Debug log
    console.log('Current size after edit:', {
        _id: sizeToEdit._id,
        size: sizeToEdit.size,
        image: sizeToEdit.image,
        hasImageFile: !!sizeToEdit.imageFile,
        hasImagePreview: !!sizeToEdit.imagePreview
    });
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

    try {
        setLoading(true);

        const formData = new FormData();
        formData.append('productName', productData.productName.trim());

        if (mode === 'create') {
            // FOR CREATE MODE - No changes needed
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
            // FOR UPDATE MODE - Fixed version
            const productSizesData = savedSizes.map((size, index) => {
                const sizeData = {
                    size: size.size.trim(),
                    title: size.title.trim(),
                    description: size.description.trim(),
                    hasNewImage: !!size.imageFile, // ✅ Flag to indicate new image
                };
                
                // Include _id only for existing sizes (MongoDB ObjectId is 24 chars)
                if (size._id && typeof size._id === 'string' && size._id.length === 24) {
                    sizeData._id = size._id;
                } else if (size._id && typeof size._id === 'object') {
                    sizeData._id = size._id.toString();
                }
                
                // ✅ If no new image file, include existing image URL
                if (!size.imageFile && size.image) {
                    sizeData.existingImage = size.image;
                }
                
                return sizeData;
            });
            
            formData.append('productSizes', JSON.stringify(productSizesData));
            
            // ✅ Append only NEW image files (in order)
            savedSizes.forEach((size) => {
                if (size.imageFile) {
                    formData.append('image', size.imageFile);
                }
            });
            
            // Append sizesToDelete if any
            if (sizesToDelete.length > 0) {
                formData.append('sizesToDelete', JSON.stringify(sizesToDelete));
            }
        }

        // Debug logging
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
                console.log(key + ': ', value.name);
            } else {
                console.log(key + ': ', value);
            }
        }
        console.log("=========================");

        let response;
        if (mode === 'update' && editingProduct) {
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

<Grid item xs={12} md={6}>
  <Typography
    variant="subtitle2"
    fontWeight="500"
    gutterBottom
  >
    Product Image {mode === "create" && "*"}
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
      : imagePreview
      ? "Replace Image"
      : mode === "create"
      ? "Upload Image *"
      : "Upload New Image (Optional)"}
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
  {imagePreview && !productData.imageFile && mode === "update" && (
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