import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import PlainCollection1 from "../../assets/PlainCollection/PlainCollection1.jpg"
import PlainCollection2 from "../../assets/PlainCollection/PlainCollection2.jpg"
import PlainCollection3 from "../../assets/PlainCollection/PlainCollection3.jpg"
import PlainCollection4 from "../../assets/PlainCollection/PlainCollection4.jpg"
import PlainCollection5 from "../../assets/PlainCollection/PlainCollection5.jpg"
import PlainCollection6 from "../../assets/PlainCollection/PlainCollection6.jpg"
import PlainCollection7 from "../../assets/PlainCollection/PlainCollection7.jpg"
import PlainCollection8 from "../../assets/PlainCollection/PlainCollection8.jpg"
import PlainCollection9 from "../../assets/PlainCollection/PlainCollection9.jpg"
import PlainCollection10 from "../../assets/PlainCollection/PlainCollection10.jpg"
import PlainCollection11 from "../../assets/PlainCollection/PlainCollection11.jpg"
import PlainCollection12 from "../../assets/PlainCollection/PlainCollection12.jpg"
import PlainCollection13 from "../../assets/PlainCollection/PlainCollection13.jpg"
import PlainCollection14 from "../../assets/PlainCollection/PlainCollection14.jpg"
import PlainCollection15 from "../../assets/PlainCollection/PlainCollection15.jpg"  
import PlainCollection16 from "../../assets/PlainCollection/PlainCollection16.jpg"
import PlainCollection17 from "../../assets/PlainCollection/PlainCollection17.jpg"
import PlainCollection18 from "../../assets/PlainCollection/PlainCollection18.jpg"
import PlainCollection19 from "../../assets/PlainCollection/PlainCollection19.jpg"
import PlainCollection20 from "../../assets/PlainCollection/PlainCollection20.jpg"



import Plain from "../../assets/pdf/Plain.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const PlainCollection = () => {

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
        { main: PlainCollection1, hover: PlainCollection1, title: "PLAIN COLLECTION 001" },
        { main: PlainCollection2, hover: PlainCollection2, title: "PLAIN COLLECTION 002" },
        { main: PlainCollection3, hover: PlainCollection3, title: "PLAIN COLLECTION 003" },
        { main: PlainCollection4, hover: PlainCollection4, title: "PLAIN COLLECTION 004" },
        { main: PlainCollection5, hover: PlainCollection5, title: "PLAIN COLLECTION 005" },
        { main: PlainCollection6, hover: PlainCollection6, title: "PLAIN COLLECTION 006" },
        { main: PlainCollection7, hover: PlainCollection7, title: "PLAIN COLLECTION 007" },
        { main: PlainCollection8, hover: PlainCollection8, title: "PLAIN COLLECTION 008" },
        { main: PlainCollection9, hover: PlainCollection9, title: "PLAIN COLLECTION 009" },
        { main: PlainCollection10, hover: PlainCollection10, title: "PLAIN COLLECTION 010"},
        { main: PlainCollection11, hover: PlainCollection11, title: "PLAIN COLLECTION 011"},
        { main: PlainCollection12, hover: PlainCollection12, title: "PLAIN COLLECTION 012"},
        { main: PlainCollection13, hover: PlainCollection13, title: "PLAIN COLLECTION 013"},
        { main: PlainCollection14, hover: PlainCollection14, title: "PLAIN COLLECTION 014"},
        { main: PlainCollection15, hover: PlainCollection15, title: "PLAIN COLLECTION 015"},
        { main: PlainCollection16, hover: PlainCollection16, title: "PLAIN COLLECTION 016"},
        { main: PlainCollection17, hover: PlainCollection17, title: "PLAIN COLLECTION 017"},
        { main: PlainCollection18, hover: PlainCollection18, title: "PLAIN COLLECTION 018"},
        { main: PlainCollection19, hover: PlainCollection19, title: "PLAIN COLLECTION 019"},
        { main: PlainCollection20, hover: PlainCollection20, title: "PLAIN COLLECTION 020"}
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
                Plain Collection
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

export default PlainCollection;


