
import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import MoroccanCollection1 from "../../assets/MoroccanCollection1.jpg"
import MoroccanCollection2 from "../../assets/MoroccanCollection2.jpg"
import MoroccanCollection3 from "../../assets/MoroccanCollection3.jpg"
import MoroccanCollection4 from "../../assets/MoroccanCollection4.jpg"
import MoroccanCollection5 from "../../assets/MoroccanCollection5.jpg"
import MoroccanCollection6 from "../../assets/MoroccanCollection6.jpg"
import MoroccanCollection7 from "../../assets/MoroccanCollection7.jpg"
import MoroccanCollection8 from "../../assets/MoroccanCollection8.jpg"
import MoroccanCollection9 from "../../assets/MoroccanCollection9.jpg"
import MoroccanCollection10 from "../../assets/MoroccanCollection10.jpg"
import MoroccanCollection11 from "../../assets/MoroccanCollection11.jpg"
import MoroccanCollection12 from "../../assets/MoroccanCollection12.jpg"


import Moroccan from "../../assets/pdf/Moroccan.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const MoroccanCollection = () => {

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
        { main: MoroccanCollection1, hover: MoroccanCollection1, title: "MORACCAN COLLECTION 001" },
        { main: MoroccanCollection2, hover: MoroccanCollection2, title: "MORACCAN COLLECTION 002" },
        { main: MoroccanCollection3, hover: MoroccanCollection3, title: "MORACCAN COLLECTION 003" },
        { main: MoroccanCollection4, hover: MoroccanCollection4, title: "MORACCAN COLLECTION 004" },
        { main: MoroccanCollection5, hover: MoroccanCollection5, title: "MORACCAN COLLECTION 005" },
        { main: MoroccanCollection6, hover: MoroccanCollection6, title: "MORACCAN COLLECTION 006" },
        { main: MoroccanCollection7, hover: MoroccanCollection7, title: "MORACCAN COLLECTION 007" },
        { main: MoroccanCollection8, hover: MoroccanCollection8, title: "MORACCAN COLLECTION 008" },
        { main: MoroccanCollection9, hover: MoroccanCollection9, title: "MORACCAN COLLECTION 009" },
        { main: MoroccanCollection10, hover: MoroccanCollection10, title: "MORACCAN COLLECTION 010"},
        { main: MoroccanCollection11, hover: MoroccanCollection11, title: "MORACCAN COLLECTION 011"},
        { main: MoroccanCollection12, hover: MoroccanCollection12, title: "MORACCAN COLLECTION 012"}
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
                Moroccan Collection
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
                        pdfFile={Moroccan}
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

export default MoroccanCollection;
