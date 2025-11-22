import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import AetliBianco from "../../assets/AetliBianco.jpg";
import AetliBiancoHover from "../../assets/AetliBiancoHover.jpg";
import AetliGris from "../../assets/AetliGris.jpg";
import AetliGrisHover from "../../assets/AetliGrisHover.jpg";
import AlzyCrema from "../../assets/AlzyCrema.jpg";
import AlzyCremaHover from "../../assets/AlzyCremaHover.jpg";
import BonyGrey from "../../assets/BonyGrey.jpg";
import BonyGreyHover from "../../assets/BonyGreyHover.jpg";
import ColasoMud from "../../assets/ColasoMud.jpg";
import ColasoMudHover from "../../assets/ColasoMudHover.jpg";
import Crimson from "../../assets/Crimson.jpg";
import CrimsonHover from "../../assets/CrimsonHover.jpg";
import JecopGlory from "../../assets/JecopGlory.jpg"; 
import JecopGloryHover from "../../assets/JecopGloryHover.jpg";
import MiltonAmeber from "../../assets/MiltonAmeber.jpg";
import MiltonAmberHover from "../../assets/MiltonAmberHover.jpg";
import PeritonNero from "../../assets/PeritonNero.jpg";
import PeritonNeroHover from "../../assets/PeritonNeroHover.jpg";
import PisaAsh from "../../assets/PisaAsh.jpg";
import PisaAshHover from "../../assets/PisaAshHover.jpg";



import SNP from "../../assets/pdf/SNP.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const SnpCollection = () => {

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
        { main: AetliBianco, hover: AetliBiancoHover, title: "AETLI BIANCO" },
        { main: AetliGris, hover: AetliGrisHover, title: "AETLI GRIS" },
        { main: AlzyCrema, hover: AlzyCremaHover, title: "ALZY CREMA" },
        { main: BonyGrey, hover: BonyGreyHover, title: "BONY GREY" },
        { main: ColasoMud, hover: ColasoMudHover, title: "COLASO MUD" },
        { main: Crimson, hover: CrimsonHover, title: "CRIMSON" },
        { main: JecopGlory, hover: JecopGloryHover, title: "JECOP GLORY" },
        { main: MiltonAmeber, hover: MiltonAmberHover, title: "MILTON AMBER" },
        { main: PeritonNero, hover: PeritonNeroHover, title: "PERITON NERO" },
        { main: PisaAsh, hover: PisaAshHover, title: "PISA ASH" },
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
                SNP COLLECTION
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
                        pdfFile={SNP}
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

export default SnpCollection;
        