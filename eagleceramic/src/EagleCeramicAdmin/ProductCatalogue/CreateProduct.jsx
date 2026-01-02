import React, { useState } from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateProductForm from "./CreateProductForm";

const CreateProductPage = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 4 }}>
                {/* Page Header */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
                        Product Catalogue Management
                    </Typography>
                   
                </Box>

               

           

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<AddIcon />}
                        onClick={handleOpenModal}
                        sx={{
                            px: 5,
                            py: 1.5,
                            borderRadius: 2,
                            fontSize: "1rem",
                            fontWeight: 600,
                            background: "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                            "&:hover": {
                                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 20px rgba(25, 118, 210, 0.3)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Create New Catalogue
                    </Button>

                 

                {/* Modal Form */}
                <CreateProductForm openModal={openModal} setOpenModal={setOpenModal} />
            </Box>
        </Container>
    );
};

export default CreateProductPage;