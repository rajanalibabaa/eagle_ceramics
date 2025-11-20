import React, { useState, useCallback } from 'react';
import { Box, Container, Typography, Modal, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import StatuarioCollectionCard from './StatuarioCollectionCard';

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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
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
                {/* Now each card has PDF support */}
                <StatuarioCollectionCard
                    mainImage={AdisonWhite}
                    hoverImage={AdisonWhiteHover}
                    title="ADISON WHITE"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={AristoRed}
                    hoverImage={AristoRedHover}
                    title="ARISTO RED"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={BeldiaGold}
                    hoverImage={BeldiaGoldHover}
                    title="BELDIA GOLD"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={BronzoMix}
                    hoverImage={BronzoMixHover}
                    title="BRONZO MIX"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={Cava}
                    hoverImage={CavaHover}
                    title="CAVA"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={Fliton}
                    hoverImage={FlitonHover}
                    title="FLITON"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={LaparetNashira}
                    hoverImage={LaparetNashiraHover}
                    title="LAPARET NASHIRA"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={Maxero}
                    hoverImage={MaxeroHover}
                    title="MAXERO"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={NaturalStatuario}
                    hoverImage={NaturalStatuarioHover}
                    title="NATURAL STATUARIO"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={Rectangle}
                    hoverImage={RectangleHover}
                    title="RECTANGLE"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={StatuarioPhntom}
                    hoverImage={StatuarioPhntomHover}
                    title="STATUARIO PHANTOM"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={VenatoOro}
                    hoverImage={VenatoOroHover}
                    title="VENATO ORO"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={LipoonWhite}
                    hoverImage={LipoonWhiteHover}
                    title="LIPOON WHITE"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
                    onExploreClick={handleOpenPdf}
                />

                <StatuarioCollectionCard
                    mainImage={Morgan}
                    hoverImage={MorganHover}
                    title="MORGAN"
                    subtitle="Explore Collections"
                    pdfFile={Statuario}
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

export default StatuarioCollection;
