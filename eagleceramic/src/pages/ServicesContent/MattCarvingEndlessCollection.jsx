
import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";


import LuxeAlpino from "../../assets/LuxeAlpino.jpg";
import LuxeAlpinoHover from "../../assets/LuxeAlpinoHover.jpg";
import LuxeBrunoCrem from "../../assets/LuxeBrunoCrem.jpg";
import LuxeBrunoCremHover from "../../assets/LuxeBrunoCremHover.jpg";
import LuxeDefine from "../../assets/LuxeDefine.jpg";
import LuxeDefineHover from "../../assets/LuxeDefineHover.jpg";
import LuxeExoraStrom from "../../assets/LuxeExoraStrom.jpg";
import LuxeExoraStromHover from "../../assets/LuxeExoraStromHover.jpg";
import LuxeGrimMoon from "../../assets/LuxeGrimMoon.jpg";
import LuxeGrimMoonHover from "../../assets/LuxeGrimMoonHover.jpg";
import LuxeMarmitaBeige from "../../assets/LuxeMarmitaBeige.jpg";
import LuxeMarmitaBeigeHover from "../../assets/LuxeMarmitaBeigeHover.jpg";
import LuxeSira from "../../assets/LuxeSira.jpg";
import LuxeSiraHover from "../../assets/LuxeSiraHover.jpg";
import LuxetagasBrown from "../../assets/LuxetagasBrown.jpg";
import LuxetagasBrownHover from "../../assets/LuxetagasBrownHover.jpg";
import LuxeVenusBrown from "../../assets/LuxeVenusBrown.jpg";
import LuxeVenusBrownHover from "../../assets/LuxeVenusBrownHover.jpg";
import LuxeVernisRust from "../../assets/LuxeVernisRust.jpg";
import LuxeVernisRustHover from "../../assets/LuxeVernisRustHover.jpg";

import MattEndlessCarving from "../../assets/pdf/mattEndlessCarving.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const MattCarvingEndlessCollection = () => {

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
        { main: LuxeAlpino, hover: LuxeAlpinoHover, title: "LUXE ALPINO" },
        { main: LuxeBrunoCrem, hover: LuxeBrunoCremHover, title: "LUXE BRUNO CREM" },
        { main: LuxeDefine, hover: LuxeDefineHover, title: "LUXE DEFINE" },
        { main: LuxeExoraStrom, hover: LuxeExoraStromHover, title: "LUXE EXORA STROM" },
        { main: LuxeGrimMoon, hover: LuxeGrimMoonHover, title: "LUXE GRIM MOON" },
        { main: LuxeMarmitaBeige, hover: LuxeMarmitaBeigeHover, title: "LUXE MARMITA BEIGE" },
        { main: LuxeSira, hover: LuxeSiraHover, title: "LUXE SIRA" },
        { main: LuxetagasBrown, hover: LuxetagasBrownHover, title: "LUXE TAGAS BROWN" },
        { main: LuxeVenusBrown, hover: LuxeVenusBrownHover, title: "LUXE VENUS BROWN" },
        { main: LuxeVernisRust, hover: LuxeVernisRustHover, title: "LUXE VERNIS RUST" },

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
                Matt Carving Endless Collection
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
                        pdfFile={MattEndlessCarving}
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

export default MattCarvingEndlessCollection;
        