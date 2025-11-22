import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import AdisonWhite from "../../assets/AdisonWhite.jpg";
import AdisonWhiteHover from "../../assets/AdisonWhiteHover.jpg";
import AristoRed from "../../assets/AristoRed.jpg";
import AristoRedHover from "../../assets/AristoRedHover.jpg";
import BeldiaGold from "../../assets/BeldiaGold.jpg";
import BeldiaGoldHover from "../../assets/BeldiaGoldHover.jpg";
import BronzoMix from "../../assets/BronzoMix.jpg";
import BronzoMixHover from "../../assets/BronzoMixHover.jpg";
import Cava from "../../assets/Cava.jpg";
import CavaHover from "../../assets/CavaHover.jpg";
import Fliton from "../../assets/Fliton.jpg";
import FlitonHover from "../../assets/FiltonHover.jpg";
import LaparetNashira from "../../assets/LaparetNashira.jpg";
import LaparetNashiraHover from "../../assets/LaparetNashiraHover.jpg";
import Maxero from "../../assets/Maxero.jpg";
import MaxeroHover from "../../assets/MaxeroHover.jpg";
import NaturalStatuario from "../../assets/NaturalStatuario.jpg";
import NaturalStatuarioHover from "../../assets/NaturalStatuarioHover.jpg";
import Rectangle from "../../assets/Rectangle.jpg";
import RectangleHover from "../../assets/RectangleHover.jpg";
import StatuarioPhntom from "../../assets/StatuarioPhntom.jpg";
import StatuarioPhntomHover from "../../assets/StatuarioPhntomHover.jpg";
import VenatoOro from "../../assets/VenatoOro.jpg";
import VenatoOroHover from "../../assets/VenatoOroHover.jpg";
import LipoonWhite from "../../assets/LipoonWhite.jpg";
import LipoonWhiteHover from "../../assets/LipoonWhiteHover.jpg";
import Morgan from "../../assets/Morgan.jpg";
import MorganHover from "../../assets/MorganHover.jpg";

import Statuario from "../../assets/pdf/Statuario.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';


const StatuarioCollection = () => {

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
        { main: AdisonWhite, hover: AdisonWhiteHover, title: "ADISON WHITE" },
        { main: AristoRed, hover: AristoRedHover, title: "ARISTO RED" },
        { main: BeldiaGold, hover: BeldiaGoldHover, title: "BELDIA GOLD" },
        { main: BronzoMix, hover: BronzoMixHover, title: "BRONZO MIX" },
        { main: Cava, hover: CavaHover, title: "CAVA" },
        { main: Fliton, hover: FlitonHover, title: "FLITON" },
        { main: LaparetNashira, hover: LaparetNashiraHover, title: "LAPARET NASHIRA" },
        { main: Maxero, hover: MaxeroHover, title: "MAXERO" },
        { main: NaturalStatuario, hover: NaturalStatuarioHover, title: "NATURAL STATUARIO" },
        { main: Rectangle, hover: RectangleHover, title: "RECTANGLE" },
        { main: StatuarioPhntom, hover: StatuarioPhntomHover, title: "STATUARIO PHANTOM" },
        { main: VenatoOro, hover: VenatoOroHover, title: "VENATO ORO" },
        { main: LipoonWhite, hover: LipoonWhiteHover, title: "LIPOON WHITE" },
        { main: Morgan, hover: MorganHover, title: "MORGAN" },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{ color: "#F87B1B", mb: 4 }}
            >
                Statuario Collection
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
                {cardData.map((item, index) => (
                    <ServicesCollectionCard
                        key={index}
                        mainImage={item.main}
                        hoverImage={item.hover}
                        title={item.title}
                        subtitle="Explore Collections"
                        pdfFile={Statuario}
                        onExploreClick={handleOpenPdf}
                    />
                ))}
            </Box>

            <Modal
                open={openPdf}
                onClose={handleClosePdf}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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

export default StatuarioCollection;
