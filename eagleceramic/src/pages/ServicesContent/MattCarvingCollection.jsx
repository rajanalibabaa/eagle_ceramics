import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



import LuxAdmistAsh from "../../assets/LuxAdmistAsh.jpg";
import LuxAdmistAshHover from "../../assets/LuxAdmistAshHover.jpg";
import LuxeBistro from "../../assets/LuxeBistro.jpg";
import LuxeBistroHover from "../../assets/LuxeBistroHover.jpg";
import LuceFlashIce from "../../assets/LuceFlashIce.jpg";
import LuceFlashIceHover from "../../assets/LuceFlashIceHover.jpg";
import LuxeHemronBeign from "../../assets/LuxeHemronBeign.jpg";
import LuxeHemronBeignHover from "../../assets/LuxeHemronBeignHover.jpg";
import LuxeJuraBon from "../../assets/LuxeJuraBon.jpg";
import LuxeJuraBonHover from "../../assets/LuxeJuraBonHover.jpg";
import LuxeLapisNikos from "../../assets/LuxeLapisNikos.jpg";
import LuxeLapisNikosHover from "../../assets/LuxeLapisNikosHover.jpg";
import LuxeRespo from "../../assets/LuxeRespo.jpg";
import LuxeRespoHover from "../../assets/LuxeRespoHover.jpg";
import LuxeTorano from "../../assets/LuxeTorano.jpg";
import LuxeToranoHover from "../../assets/LuxeToranoHover.jpg";
import LuxeTravoGrey from "../../assets/LuxeTravoGrey.jpg";
import LuxeTravoGreyHover from "../../assets/LuxeTravoGreyHover.jpg";
import LuxeTurinGris from "../../assets/LuxeTurinGris.jpg";
import LuxeTurinGrisHover from "../../assets/LuxeTurinGrisHover.jpg";

import MattCarving from "../../assets/pdf/MattCarving.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';


const MattCarvingCollection = () => {

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


    const cardData = [
        { main: LuxAdmistAsh, hover: LuxAdmistAshHover, title: "LUX ADMIST ASH" },
        { main: LuxeBistro, hover: LuxeBistroHover, title: "LUXE BISTRO" },
        { main: LuceFlashIce, hover: LuceFlashIceHover, title: "LUCE FLASH ICE" },
        { main: LuxeHemronBeign, hover: LuxeHemronBeignHover, title: "LUXE HEMRON BEIGN" },
        { main: LuxeJuraBon, hover: LuxeJuraBonHover, title: "LUXE JURA BON" },
        { main: LuxeLapisNikos, hover: LuxeLapisNikosHover, title: "LUXE LAPIS NIKOS" },
        { main: LuxeRespo, hover: LuxeRespoHover, title: "LUXE RESPO" },
        { main: LuxeTorano, hover: LuxeToranoHover, title: "LUXE TORANO" },
        { main: LuxeTravoGrey, hover: LuxeTravoGreyHover, title: "LUXE TRAVO GREY" },
        { main: LuxeTurinGris, hover: LuxeTurinGrisHover, title: "LUXE TURIN GRIS" },

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
              Matt Carving Collection
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
                        pdfFile={MattCarving}
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

export default MattCarvingCollection;
        