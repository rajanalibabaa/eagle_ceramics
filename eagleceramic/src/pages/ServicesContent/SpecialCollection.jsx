import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import SpecialCollection1 from "../../assets/SpecialCollection1.jpg"
import SpecialCollection2 from "../../assets/SpecialCollection2.jpg"
import SpecialCollection3 from "../../assets/SpecialCollection3.jpg"
import SpecialCollection4 from "../../assets/SpecialCollection4.jpg"
import SpecialCollection5 from "../../assets/SpecialCollection5.jpg"
import SpecialCollection6 from "../../assets/SpecialCollection6.jpg"
import SpecialCollection7 from "../../assets/SpecialCollection7.jpg"
import SpecialCollection8 from "../../assets/SpecialCollection8.jpg"
import SpecialCollection9 from "../../assets/SpecialCollection9.jpg"
import SpecialCollection10 from "../../assets/SpecialCollection10.jpg"
import SpecialCollection11 from "../../assets/SpecialCollection11.jpg"
import SpecialCollection12 from "../../assets/SpecialCollection12.jpg"




import Plain from "../../assets/pdf/Plain.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const SpecialCollection = () => {

    const [openPdf, setOpenPdf] = useState(false);
    const [currentPdf, setCurrentPdf] = useState("");

    const handleOpenPdf = useCallback((pdfFile) => {
        setCurrentPdf(pdfFile);
        setOpenPdf(true);
    }, []);

    const handleClosePdf = useCallback(() => {
        setOpenPdf(false);
        setCurrentPdf("");
    }, []);

    // ⭐ Array of objects to simplify the cards
    const cardData = [
        { main: SpecialCollection1, hover: SpecialCollection1, title: "SPECIAL COLLECTION 001" },
        { main: SpecialCollection2, hover: SpecialCollection2, title: "SPECIAL COLLECTION 002" },
        { main: SpecialCollection3, hover: SpecialCollection3, title: "SPECIAL COLLECTION 003" },
        { main: SpecialCollection4, hover: SpecialCollection4, title: "SPECIAL COLLECTION 004" },
        { main: SpecialCollection5, hover: SpecialCollection5, title: "SPECIAL COLLECTION 005" },
        { main: SpecialCollection6, hover: SpecialCollection6, title: "SPECIAL COLLECTION 006" },
        { main: SpecialCollection7, hover: SpecialCollection7, title: "SPECIAL COLLECTION 007" },
        { main: SpecialCollection8, hover: SpecialCollection8, title: "SPECIAL COLLECTION 008" },
        { main: SpecialCollection9, hover: SpecialCollection9, title: "SPECIAL COLLECTION 009" },
        { main: SpecialCollection10, hover: SpecialCollection10, title: "SPECIAL COLLECTION 010"},
        { main: SpecialCollection11, hover: SpecialCollection11, title: "SPECIAL COLLECTION 011"},
        { main: SpecialCollection12, hover: SpecialCollection12, title: "SPECIAL COLLECTION 012"}
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                sx={{ color: "#F87B1B", mb: 4 }}
            >
                Special Collection
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 4,
                    maxWidth: "1200px",
                    mx: "auto",
                }}
            >
                {/* ⭐ Render all cards using map */}
                {cardData.map((item, index) => (
                    <ServicesCollectionCard
                        key={index}
                        mainImage={item.main}
                        hoverImage={item.hover}
                        title={item.title}
                        subtitle="Explore Collections"
                        pdfFile={Plain}
                        onExploreClick={handleOpenPdf}
                    />
                ))}
            </Box>

            {/* PDF MODAL */}
            <Modal
                open={openPdf}
                onClose={handleClosePdf}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "90%",
                        height: "95%",
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 1,
                    }}
                >
                    <IconButton
                        onClick={handleClosePdf}
                        sx={{
                            position: "absolute",
                            right: -8,
                            top: -13,
                            bgcolor: "background.paper",
                            "&:hover": { bgcolor: "grey.200" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {openPdf && (
                        <iframe
                            src={currentPdf}
                            width="100%"
                            height="100%"
                            style={{ border: "none", borderRadius: 8 }}
                        />
                    )}
                </Box>
            </Modal>

        </Container>
    );
};

export default SpecialCollection;


