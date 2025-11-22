import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import PunchSeriesVersionTwo1 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo1.jpg"
import PunchSeriesVersionTwo2 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo2.jpg"
import PunchSeriesVersionTwo3 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo3.jpg"
import PunchSeriesVersionTwo4 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo4.jpg"
import PunchSeriesVersionTwo5 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo5.jpg"
import PunchSeriesVersionTwo6 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo6.jpg"
import PunchSeriesVersionTwo7 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo7.jpg"
import PunchSeriesVersionTwo8 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo8.jpg"
import PunchSeriesVersionTwo9 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo9.jpg"
import PunchSeriesVersionTwo10 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo10.jpg"
import PunchSeriesVersionTwo11 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo11.jpg"
import PunchSeriesVersionTwo12 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo12.jpg"  
import PunchSeriesVersionTwo13 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo13.jpg"
import PunchSeriesVersionTwo14 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo14.jpg"
import PunchSeriesVersionTwo15 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo15.jpg"
import PunchSeriesVersionTwo16 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo16.jpg"
import PunchSeriesVersionTwo17 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo17.jpg"
import PunchSeriesVersionTwo18 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo18.jpg"
import PunchSeriesVersionTwo19 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo19.jpg"
import PunchSeriesVersionTwo20 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo20.jpg"
import PunchSeriesVersionTwo21 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo21.jpg"
import PunchSeriesVersionTwo22 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo22.jpg"
import PunchSeriesVersionTwo23 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo23.jpg"
import PunchSeriesVersionTwo24 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo24.jpg"
import PunchSeriesVersionTwo25 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo25.jpg"
import PunchSeriesVersionTwo26 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo26.jpg"
import PunchSeriesVersionTwo27 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo27.jpg"
import PunchSeriesVersionTwo28 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo28.jpg"
import PunchSeriesVersionTwo29 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo29.jpg"
import PunchSeriesVersionTwo30 from "../../assets/PunchSeriesVersionTwo/PunchSeriesVersionTwo30.jpg"

import PunchSeriesV2 from "../../assets/pdf/PunchSeriesV2.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const PunchSeriesCollectionV2 = () => {

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
        { main: PunchSeriesVersionTwo1, hover: PunchSeriesVersionTwo1, title: "Punch Series V2-001" },
        { main: PunchSeriesVersionTwo2, hover: PunchSeriesVersionTwo2, title: "Punch Series V2-002" },
        { main: PunchSeriesVersionTwo3, hover: PunchSeriesVersionTwo3, title: "Punch Series V2-003" },
        { main: PunchSeriesVersionTwo4, hover: PunchSeriesVersionTwo4, title: "Punch Series V2-004" },
        { main: PunchSeriesVersionTwo5, hover: PunchSeriesVersionTwo5, title: "Punch Series V2-005" },
        { main: PunchSeriesVersionTwo6, hover: PunchSeriesVersionTwo6, title: "Punch Series V2-006" },
        { main: PunchSeriesVersionTwo7, hover: PunchSeriesVersionTwo7, title: "Punch Series V2-007" },
        { main: PunchSeriesVersionTwo8, hover: PunchSeriesVersionTwo8, title: "Punch Series V2-008" },
        { main: PunchSeriesVersionTwo9, hover: PunchSeriesVersionTwo9, title: "Punch Series V2-009" },
        { main: PunchSeriesVersionTwo10, hover: PunchSeriesVersionTwo10, title: "Punch Series V2-010"},
        { main: PunchSeriesVersionTwo11, hover: PunchSeriesVersionTwo11, title: "Punch Series V2-011"},
        { main: PunchSeriesVersionTwo12, hover: PunchSeriesVersionTwo12, title: "Punch Series V2-012"},
        { main: PunchSeriesVersionTwo13, hover: PunchSeriesVersionTwo13, title: "Punch Series V2-013"},
        { main: PunchSeriesVersionTwo14, hover: PunchSeriesVersionTwo14, title: "Punch Series V2-014"},
        { main: PunchSeriesVersionTwo15, hover: PunchSeriesVersionTwo15, title: "Punch Series V2-015"},
        { main: PunchSeriesVersionTwo16, hover: PunchSeriesVersionTwo16, title: "Punch Series V2-016"},
        { main: PunchSeriesVersionTwo17, hover: PunchSeriesVersionTwo17, title: "Punch Series V2-017"},
        { main: PunchSeriesVersionTwo18, hover: PunchSeriesVersionTwo18, title: "Punch Series V2-018"},
        { main: PunchSeriesVersionTwo19, hover: PunchSeriesVersionTwo19, title: "Punch Series V2-019"},
        { main: PunchSeriesVersionTwo20, hover: PunchSeriesVersionTwo20, title: "Punch Series V2-020"},
        { main: PunchSeriesVersionTwo21, hover: PunchSeriesVersionTwo21, title: "Punch Series V2-021"},
        { main: PunchSeriesVersionTwo22, hover: PunchSeriesVersionTwo22, title: "Punch Series V2-022"},
        { main: PunchSeriesVersionTwo23, hover: PunchSeriesVersionTwo23, title: "Punch Series V2-023"},
        { main: PunchSeriesVersionTwo24, hover: PunchSeriesVersionTwo24, title: "Punch Series V2-024"},
        { main: PunchSeriesVersionTwo25, hover: PunchSeriesVersionTwo25, title: "Punch Series V2-025"},
        { main: PunchSeriesVersionTwo26, hover: PunchSeriesVersionTwo26, title: "Punch Series V2-026"},
        { main: PunchSeriesVersionTwo27, hover: PunchSeriesVersionTwo27, title: "Punch Series V2-027"},
        { main: PunchSeriesVersionTwo28, hover: PunchSeriesVersionTwo28, title: "Punch Series V2-028"},
        { main: PunchSeriesVersionTwo29, hover: PunchSeriesVersionTwo29, title: "Punch Series V2-029"},
        { main: PunchSeriesVersionTwo30, hover: PunchSeriesVersionTwo30, title: "Punch Series V2-030"}

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
                Punch Series Collection V2
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
                        pdfFile={PunchSeriesV2}
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

export default PunchSeriesCollectionV2;


