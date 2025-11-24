import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import PunchSeriesVersionOne1 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne1.jpg"
import PunchSeriesVersionOne2 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne2.jpg"
import PunchSeriesVersionOne3 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne3.jpg"
import PunchSeriesVersionOne4 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne4.jpg"
import PunchSeriesVersionOne5 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne5.jpg"
import PunchSeriesVersionOne6 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne6.jpg"
import PunchSeriesVersionOne7 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne7.jpg"
import PunchSeriesVersionOne8 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne8.jpg"
import PunchSeriesVersionOne9 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne9.jpg"
import PunchSeriesVersionOne10 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne10.jpg"
import PunchSeriesVersionOne11 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne11.jpg"
import PunchSeriesVersionOne12 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne12.jpg"  
import PunchSeriesVersionOne13 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne13.jpg"
import PunchSeriesVersionOne14 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne14.jpg"
import PunchSeriesVersionOne15 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne15.jpg"
import PunchSeriesVersionOne16 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne16.jpg"  
import PunchSeriesVersionOne17 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne17.jpg"
import PunchSeriesVersionOne18 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne18.jpg"
import PunchSeriesVersionOne19 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne19.jpg"
import PunchSeriesVersionOne20 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne20.jpg"
import PunchSeriesVersionOne21 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne21.jpg"
import PunchSeriesVersionOne22 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne22.jpg"
import PunchSeriesVersionOne23 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne23.jpg"
import PunchSeriesVersionOne24 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne24.jpg"
import PunchSeriesVersionOne25 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne25.jpg"
import PunchSeriesVersionOne26 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne26.jpg"
import PunchSeriesVersionOne27 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne27.jpg"
import PunchSeriesVersionOne28 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne28.jpg"
import PunchSeriesVersionOne29 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne29.jpg"
import PunchSeriesVersionOne30 from "../../assets/PunchSeriesVersionOne/PunchSeriesVersionOne30.jpg"


import PunchSeriesV1 from "../../assets/pdf/PunchSeriesV1.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const PunchSeriesCollectionV1 = () => {

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
        { main: PunchSeriesVersionOne1, hover: PunchSeriesVersionOne1, title: "Punch Series V1-001" },
        { main: PunchSeriesVersionOne2, hover: PunchSeriesVersionOne2, title: "Punch Series V1-002" },
        { main: PunchSeriesVersionOne3, hover: PunchSeriesVersionOne3, title: "Punch Series V1-003" },
        { main: PunchSeriesVersionOne4, hover: PunchSeriesVersionOne4, title: "Punch Series V1-004" },
        { main: PunchSeriesVersionOne5, hover: PunchSeriesVersionOne5, title: "Punch Series V1-005" },
        { main: PunchSeriesVersionOne6, hover: PunchSeriesVersionOne6, title: "Punch Series V1-006" },
        { main: PunchSeriesVersionOne7, hover: PunchSeriesVersionOne7, title: "Punch Series V1-007" },
        { main: PunchSeriesVersionOne8, hover: PunchSeriesVersionOne8, title: "Punch Series V1-008" },
        { main: PunchSeriesVersionOne9, hover: PunchSeriesVersionOne9, title: "Punch Series V1-009" },
        { main: PunchSeriesVersionOne10, hover: PunchSeriesVersionOne10, title: "Punch Series V1-010"},
        { main: PunchSeriesVersionOne11, hover: PunchSeriesVersionOne11, title: "Punch Series V1-011"},
        { main: PunchSeriesVersionOne12, hover: PunchSeriesVersionOne12, title: "Punch Series V1-012"},
        { main: PunchSeriesVersionOne13, hover: PunchSeriesVersionOne13, title: "Punch Series V1-013"},
        { main: PunchSeriesVersionOne14, hover: PunchSeriesVersionOne14, title: "Punch Series V1-014"},
        { main: PunchSeriesVersionOne15, hover: PunchSeriesVersionOne15, title: "Punch Series V1-015"},
        { main: PunchSeriesVersionOne16, hover: PunchSeriesVersionOne16, title: "Punch Series V1-016"},
        { main: PunchSeriesVersionOne17, hover: PunchSeriesVersionOne17, title: "Punch Series V1-017"},
        { main: PunchSeriesVersionOne18, hover: PunchSeriesVersionOne18, title: "Punch Series V1-018"},
        { main: PunchSeriesVersionOne19, hover: PunchSeriesVersionOne19, title: "Punch Series V1-019"},
        { main: PunchSeriesVersionOne20, hover: PunchSeriesVersionOne20, title: "Punch Series V1-020"},
        { main: PunchSeriesVersionOne21, hover: PunchSeriesVersionOne21, title: "Punch Series V1-021"},
        { main: PunchSeriesVersionOne22, hover: PunchSeriesVersionOne22, title: "Punch Series V1-022"},
        { main: PunchSeriesVersionOne23, hover: PunchSeriesVersionOne23, title: "Punch Series V1-023"},
        { main: PunchSeriesVersionOne24, hover: PunchSeriesVersionOne24, title: "Punch Series V1-024"},
        { main: PunchSeriesVersionOne25, hover: PunchSeriesVersionOne25, title: "Punch Series V1-025"},
        { main: PunchSeriesVersionOne26, hover: PunchSeriesVersionOne26, title: "Punch Series V1-026"},
        { main: PunchSeriesVersionOne27, hover: PunchSeriesVersionOne27, title: "Punch Series V1-027"},
        { main: PunchSeriesVersionOne28, hover: PunchSeriesVersionOne28, title: "Punch Series V1-028"},
        { main: PunchSeriesVersionOne29, hover: PunchSeriesVersionOne29, title: "Punch Series V1-029"},
        { main: PunchSeriesVersionOne30, hover: PunchSeriesVersionOne30, title: "Punch Series V1-030"}

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
                Punch Series Collection V1
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
                        pdfFile={PunchSeriesV1}
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

export default PunchSeriesCollectionV1;


