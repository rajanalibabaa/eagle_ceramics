import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

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
import ServicesCollectionCard from './ServicesCollectionCard ';


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

    // ⭐ Array of objects to simplify the cards
    const cardData = [
        { main: AkotaBrown, hover: AkotaBrownHover, title: "AKOTA BROWN" },
        { main: AkotaGris, hover: AkotaGrisHover, title: "AKOTA GRIS" },
        { main: BrecciaGold, hover: BrecciaGoldHover, title: "BRECCIA GOLD" },
        { main: DolloGrey, hover: DolloGreyHover, title: "DOLLO GREY" },
        { main: EnduraCafe, hover: EnduraCafeHover, title: "ENDURA CAFE" },
        { main: Givok, hover: GivokHover, title: "GIVOK" },
        { main: ItalioGrey, hover: ItalioGreyHover, title: "ITALIO GREY" },
        { main: KraftonBianco, hover: KraftonBiancoHover, title: "KRAFTON BIANCO" },
        { main: KraftonGrey, hover: KraftonGreyHover, title: "KRAFTON GREY" },
        { main: NulicoMid, hover: NulicoMidHover, title: "NULICO MID" },
        { main: Pentago, hover: PentagoHover, title: "PENTAGO" },
        { main: TeslaGrey, hover: TeslaGreyHover, title: "TESLA GREY" },
        { main: UrecoWhite, hover: UrecoWhiteHover, title: "URECO WHITE" },
        { main: AlureGold, hover: AlureGoldHover, title: "ALURE GOLD" },
        { main: TeraaBrown, hover: TeraaBrownHover, title: "TERAA BROWN" },
        { main: LoganHoney, hover: LoganHoneyHover, title: "LOGAN HONEY" },
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
                {/* ⭐ Render all cards using map */}
                {cardData.map((item, index) => (
                    <ServicesCollectionCard
                        key={index}
                        mainImage={item.main}
                        hoverImage={item.hover}
                        title={item.title}
                        subtitle="Explore Collections"
                        pdfFile={Glossy}
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

export default GlossyCollection;
