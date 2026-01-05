import React, { useEffect, useState } from "react";
import ProductCreate from './ProductCreate';
import AddIcon from "@mui/icons-material/Add";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Backdrop,
    Card,
    Grid,
    Avatar,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";

const ProductAndSize = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); 
    const [editingProduct, setEditingProduct] = useState(null);
    const [getData, setGetData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [expandedAccordion, setExpandedAccordion] = useState(null);
     const handleAccordionChange = (panelId) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panelId : null);
    };
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleOpenCreateModal = () => {
        console.log('Checkpoint: Opening create modal');
        setModalMode('create');
        setEditingProduct(null);
        setOpenModal(true);
    };

    const handleOpenUpdateModal = (product) => {
        console.log('Checkpoint: Opening update modal for product:', product);
        setModalMode('update');
        setEditingProduct(product);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        console.log('Checkpoint: Closing modal');
        setOpenModal(false);
        setEditingProduct(null);
    };

    const fetchData = async () => {
        console.log('Checkpoint: Fetching product data');
        try {
            const response = await fetch('http://localhost:5050/api/v1/eagle-ceramic/product-sizes/get-all');
            const res = await response.json();
            console.log('Checkpoint: Fetched data:', res.data);
            setGetData(res.data);
        } catch (error) {
            console.error('Checkpoint: Error fetching data:', error);
            showSnackbar('Error fetching products', 'error');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (product, e) => {
        console.log('Checkpoint: Delete clicked for product:', product);
        e.stopPropagation();
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        console.log('Checkpoint: Confirming delete for product:', productToDelete);
        if (!productToDelete) return;

        try {
            setLoading(true);
            const response = await axios.delete(
                `http://localhost:5050/api/v1/eagle-ceramic/product-sizes/deletebyID/${productToDelete.uuid}`
            );

            console.log('Checkpoint: Delete response:', response.data);

            if (response.data.success) {
                showSnackbar('Product deleted successfully', 'success');
                fetchData(); // Refresh the list
            } else {
                showSnackbar(response.data.message || 'Failed to delete product', 'error');
            }
        } catch (error) {
            console.error('Checkpoint: Delete error:', error);
            showSnackbar(error.response?.data?.message || 'Error deleting product', 'error');
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setProductToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        console.log('Checkpoint: Cancel delete');
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    const showSnackbar = (message, severity = 'success') => {
        console.log('Checkpoint: Showing snackbar:', message, severity);
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleUpdateSuccess = () => {
        console.log('Checkpoint: Update success - refreshing data');
        showSnackbar('Product updated successfully', 'success');
        fetchData(); // Refresh the list
    };

    return (
        <div>
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
                        Are you sure you want to delete the product "{productToDelete?.productName}"?
                        This action cannot be undone.
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
                            'Delete'
                        )}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Header and Create Button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight={600}>Product Sizes</Typography>
                <Button
                    variant="contained"
                    onClick={handleOpenCreateModal}
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "primary.main",
                        '&:hover': {
                            backgroundColor: "primary.dark",
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

            {/* Product List */}
            <Box sx={{ mt: '20px' }}>
                {getData.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            No products found. Create your first product!
                        </Typography>
                    </Box>
                ) : (
                    getData.map((item) => (
                        <Accordion key={item._id} sx={{ mt: '15px', borderRadius: '5px' }}expanded={expandedAccordion === item._id}
        onChange={handleAccordionChange(item._id)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${item._id}-content`}
                                id={`panel-${item._id}-header`}
                                sx={{
                                    '& .MuiAccordionSummary-content': {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        margin: 0
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                    {item.productName}
                                </Typography>
                                <Stack direction="row" spacing={1} sx={{ ml: 'auto', mr: 1 }}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenUpdateModal(item);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            size="small"
                                            onClick={(e) => handleDeleteClick(item, e)}
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography component="div">
                                    {item.productSizes && item.productSizes.length > 0 ? (
                                        <Grid container spacing={2}>
                                            {item.productSizes.map((data, index) => (
                                                <Grid item xs={12} sm={6} md={4} key={index}>
                                                    <Card
                                                        sx={{
                                                            height: '100%',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            transition: 'transform 0.2s',
                                                            '&:hover': {
                                                                transform: 'translateY(-4px)',
                                                                boxShadow: 3
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ p: 2, textAlign: 'center', flexGrow: 1 }}>
                                                            {data.image ? (
                                                                <Avatar
                                                                    src={data.image}
                                                                    alt={data.title}
                                                                    sx={{
                                                                        width: 100,
                                                                        height: 100,
                                                                        mx: 'auto',
                                                                        mb: 2,
                                                                        border: '2px solid',
                                                                        borderColor: 'primary.light'
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Box
                                                                    sx={{
                                                                        width: 100,
                                                                        height: 100,
                                                                        mx: 'auto',
                                                                        mb: 2,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        backgroundColor: 'grey.100',
                                                                        borderRadius: '50%',
                                                                        border: '2px dashed',
                                                                        borderColor: 'grey.400'
                                                                    }}
                                                                >
                                                                    <ImageIcon sx={{ fontSize: 40, color: 'grey.500' }} />
                                                                </Box>
                                                            )}
                                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                                Size: {data.size}
                                                            </Typography>
                                                            <Typography variant="body1" fontWeight="bold" color="primary" gutterBottom>
                                                                {data.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {data.description}
                                                            </Typography>
                                                        </Box>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    ) : (
                                        <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                                            No sizes added for this product
                                        </Typography>
                                    )}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
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
                        maxHeight: '90vh',
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{
                    m: 0,
                    backgroundColor: modalMode === 'update' ? 'secondary.main' : 'primary.main',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Typography variant="h6" fontWeight="600">
                        {modalMode === 'update' ? 'Update Product' : 'Create New Product'}
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
                    {openModal && (
                        <ProductCreate
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            mode={modalMode}
                            editingProduct={editingProduct}
                            onSuccess={handleUpdateSuccess}
                            onClose={handleCloseModal}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductAndSize;