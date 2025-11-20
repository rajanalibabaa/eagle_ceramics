// import React from 'react'

// const GlossyCollection = () => {
//   return (
//     <div>GlossyCollection</div>
//   )
// }

// export default GlossyCollection

import React, { useState, useCallback } from 'react';
import { Box, Container, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import GlossyCollectionCard from './GlossyCollectionCard';

import AkotaBrown from "../../assets/AkotaBrown.jpg";
import AkotaBrownHover from "../../assets/AkotaBrownHover.jpg";
import AkotaGris from "../../assets/AkotaGris.jpg";
import AkotaGrisHover from "../../assets/AkotaGrisHover.jpg";
import BrecciaGold from "../../assets/BrecciaGold.jpg";
import BrecciaGoldHover from "../../assets/BrecciaGoldHover.jpg";
import DolloGrey from "../../assets/DolloGrey.jpg";
import DolloGreyHover from "../../assets/DolloGreyHover.jpg";
import EnduraCafe from "../../assets/EnduraCafe.jpg";
import EnduraCafeHover from "../../assets/EnduraCafeHover.jpg";
import Givok from '../../assets/Givok.jpg';
import GivokHover from '../../assets/GivokHover.jpg';
import ItalioGrey from "../../assets/ItalioGrey.jpg";
import ItalioGreyHover from "../../assets/ItalioGreyHover.jpg";
import KraftonBianco from "../../assets/KraftonBianco.jpg";
import KraftonBiancoHover from "../../assets/KraftonBiancoHover.jpg";
import KraftonGrey from "../../assets/KraftonGrey.jpg";
import KraftonGreyHover from "../../assets/KraftonGreyHover.jpg";
import NulicoMid from "../../assets/NulicoMid.jpg";
import NulicoMidHover from "../../assets/NulicoMidHover.jpg";
import Pentago from "../../assets/Pentago.jpg";
import PentagoHover from "../../assets/PentagoHover.jpg";
import TeslaGrey from "../../assets/TeslaGrey.jpg";
import TeslaGreyHover from "../../assets/TeslaGreyHover.jpg";
import UrecoWhite from "../../assets/UrecoWhite.jpg";
import UrecoWhiteHover from "../../assets/UrecoWhiteHover.jpg";
import AlureGold from "../../assets/AlureGold.jpg";
import AlureGoldHover from "../../assets/AlureGoldHover.jpg";
import TeraaBrown from "../../assets/TeraaBrown.jpg";
import TeraaBrownHover from "../../assets/TeraaBrownHover.jpg";
import LoganHoney from "../../assets/LoganHoney.jpg";
import LoganHoneyHover from "../../assets/LoganHoneyHover.jpg";




import Glossy from "../../assets/pdf/Glossy.pdf";

const GlossyCollection = () => {

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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                align="center"
                sx={{ color: "#F87B1B", mb: 4 }}
            >
                Glossy Collection
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
                {/* Now each card has PDF support */}
                <GlossyCollectionCard
                    mainImage={AkotaBrown}
                    hoverImage={AkotaBrownHover}
                    title="AKOTA BROWN"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                 <GlossyCollectionCard
                    mainImage={AkotaGris}
                    hoverImage={AkotaGrisHover}
                    title="AKOTA GRIS"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                 <GlossyCollectionCard
                    mainImage={BrecciaGold}
                    hoverImage={BrecciaGoldHover}
                    title="BRECCIA GOLD"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                
                 <GlossyCollectionCard
                    mainImage={DolloGrey}
                    hoverImage={DolloGreyHover}
                    title="DOLLO GREY"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={EnduraCafe}
                    hoverImage={EnduraCafeHover}
                    title="ENDURA CAFE"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={Givok}
                    hoverImage={GivokHover}
                    title="GIVOK"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={ItalioGrey}
                    hoverImage={ItalioGreyHover}
                    title="ITALIO GREY"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={KraftonBianco}
                    hoverImage={KraftonBiancoHover}
                    title="KRAFTON BIANCO"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={KraftonGrey}
                    hoverImage={KraftonGreyHover}
                    title="KRAFTON GREY"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={NulicoMid}
                    hoverImage={NulicoMidHover}
                    title="NULICO MID"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={Pentago}
                    hoverImage={PentagoHover}
                    title="PENTAGO"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={TeslaGrey}
                    hoverImage={TeslaGreyHover}
                    title="TESLA GREY"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                 <GlossyCollectionCard
                    mainImage={UrecoWhite}
                    hoverImage={UrecoWhiteHover}
                    title="URECO WHITE"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                 <GlossyCollectionCard
                    mainImage={AlureGold}
                    hoverImage={AlureGoldHover}
                    title="ALURE GOLD"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                   <GlossyCollectionCard
                    mainImage={TeraaBrown}
                    hoverImage={TeraaBrownHover}
                    title="TERAA BROWN"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />

                <GlossyCollectionCard
                    mainImage={LoganHoney}
                    hoverImage={LoganHoneyHover}
                    title="LOGAN HONEY"
                    subtitle="Explore Collections"
                    pdfFile={Glossy}
                    onExploreClick={handleOpenPdf}
                />
                
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

export default GlossyCollection;
