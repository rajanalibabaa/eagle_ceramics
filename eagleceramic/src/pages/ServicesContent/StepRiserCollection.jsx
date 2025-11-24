import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import StepRiserCollection1 from "../../assets/StepRiserCollection1.jpg"
import StepRiserCollection2 from "../../assets/StepRiserCollection2.jpg"
import StepRiserCollection3 from "../../assets/StepRiserCollection3.jpg"
import StepRiserCollection4 from "../../assets/StepRiserCollection4.jpg"
import StepRiserCollection5 from "../../assets/StepRiserCollection5.jpg"
import StepRiserCollection6 from "../../assets/StepRiserCollection6.jpg"
import StepRiserCollection7 from "../../assets/StepRiserCollection7.jpg"
import StepRiserCollection8 from "../../assets/StepRiserCollection8.jpg"
import StepRiserCollection9 from "../../assets/StepRiserCollection9.jpg"
import StepRiserCollection10 from "../../assets/StepRiserCollection10.jpg"
import StepRiserCollection11 from "../../assets/StepRiserCollection11.jpg"
import StepRiserCollection12 from "../../assets/StepRiserCollection12.jpg"
import StepRiserCollection13 from "../../assets/StepRiserCollection13.jpg"
import StepRiserCollection14 from "../../assets/StepRiserCollection14.jpg"
import StepRiserCollection15 from "../../assets/StepRiserCollection15.jpg"
import StepRiserCollection16 from "../../assets/StepRiserCollection16.jpg"
import StepRiserCollection17 from "../../assets/StepRiserCollection17.jpg"
import StepRiserCollection18 from "../../assets/StepRiserCollection18.jpg"
import StepRiserCollection19 from "../../assets/StepRiserCollection19.jpg"
import StepRiserCollection20 from "../../assets/StepRiserCollection20.jpg"
import StepRiserCollection21 from "../../assets/StepRiserCollection21.jpg"
import StepRiserCollection22 from "../../assets/StepRiserCollection22.jpg"
import StepRiserCollection23 from "../../assets/StepRiserCollection23.jpg"
import StepRiserCollection24 from "../../assets/StepRiserCollection24.jpg"
import StepRiserCollection25 from "../../assets/StepRiserCollection25.jpg"
import StepRiserCollection26 from "../../assets/StepRiserCollection26.jpg"
import StepRiserCollection27 from "../../assets/StepRiserCollection27.jpg"
import StepRiserCollection28 from "../../assets/StepRiserCollection28.jpg"

import StepRiser from "../../assets/pdf/StepRiser.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const StepRiserCollection = () => {

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
        { main: StepRiserCollection1, hover: StepRiserCollection1, title: "STEP RISER COLLECTION 001" },
        { main: StepRiserCollection2, hover: StepRiserCollection2, title: "STEP RISER COLLECTION 002" },
        { main: StepRiserCollection3, hover: StepRiserCollection3, title: "STEP RISER COLLECTION 003" },
        { main: StepRiserCollection4, hover: StepRiserCollection4, title: "STEP RISER COLLECTION 004" },
        { main: StepRiserCollection5, hover: StepRiserCollection5, title: "STEP RISER COLLECTION 005" },
        { main: StepRiserCollection6, hover: StepRiserCollection6, title: "STEP RISER COLLECTION 006" },
        { main: StepRiserCollection7, hover: StepRiserCollection7, title: "STEP RISER COLLECTION 007" },
        { main: StepRiserCollection8, hover: StepRiserCollection8, title: "STEP RISER COLLECTION 008" },
        { main: StepRiserCollection9, hover: StepRiserCollection9, title: "STEP RISER COLLECTION 009" },
        { main: StepRiserCollection10, hover: StepRiserCollection10, title: "STEP RISER COLLECTION 010"},
        { main: StepRiserCollection11, hover: StepRiserCollection11, title: "STEP RISER COLLECTION 011"},
        { main: StepRiserCollection12, hover: StepRiserCollection12, title: "STEP RISER COLLECTION 012"},
        { main: StepRiserCollection13, hover: StepRiserCollection13, title: "STEP RISER COLLECTION 013"},
        { main: StepRiserCollection14, hover: StepRiserCollection14, title: "STEP RISER COLLECTION 014"},
        { main: StepRiserCollection15, hover: StepRiserCollection15, title: "STEP RISER COLLECTION 015"},
        { main: StepRiserCollection16, hover: StepRiserCollection16, title: "STEP RISER COLLECTION 016"},
        { main: StepRiserCollection17, hover: StepRiserCollection17, title: "STEP RISER COLLECTION 017"},
        { main: StepRiserCollection18, hover: StepRiserCollection18, title: "STEP RISER COLLECTION 018"},
        { main: StepRiserCollection19, hover: StepRiserCollection19, title: "STEP RISER COLLECTION 019"},
        { main: StepRiserCollection20, hover: StepRiserCollection20, title: "STEP RISER COLLECTION 020"},
        { main: StepRiserCollection21, hover: StepRiserCollection21, title: "STEP RISER COLLECTION 021"},
        { main: StepRiserCollection22, hover: StepRiserCollection22, title: "STEP RISER COLLECTION 022"},
        { main: StepRiserCollection23, hover: StepRiserCollection23, title: "STEP RISER COLLECTION 023"},
        { main: StepRiserCollection24, hover: StepRiserCollection24, title: "STEP RISER COLLECTION 024"},
        { main: StepRiserCollection25, hover: StepRiserCollection25, title: "STEP RISER COLLECTION 025"},
        { main: StepRiserCollection26, hover: StepRiserCollection26, title: "STEP RISER COLLECTION 026"},
        { main: StepRiserCollection27, hover: StepRiserCollection27, title: "STEP RISER COLLECTION 027"},
        { main: StepRiserCollection28, hover: StepRiserCollection28, title: "STEP RISER COLLECTION 028"}
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
                 Step Riser Collection
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
                        pdfFile={StepRiser}
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

export default StepRiserCollection;


