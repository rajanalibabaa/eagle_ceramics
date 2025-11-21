import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import ThreeDimension from '../../assets/pdf/ThreeDimension.pdf';



import Belor from "../../assets/Belor.jpg";
import BelorHover from "../../assets/BelorHoWer.jpg";
import BlueFino from "../../assets/BlueFino.jpg";
import BlueFinoHover from "../../assets/BlueFinoHover.jpg";
import CornBrown from "../../assets/CornBrown.jpg";
import CornBrownHover from "../../assets/CornBrownHover.jpg";
import DaisySquare from "../../assets/DaisySquare.jpg";
import DaisySquareHover from "../../assets/DaisySquareHover.jpg";
import FloretBronze from "../../assets/FloretBronze.jpg";
import FloretBronzeHover from "../../assets/FloretBronzeHover.jpg";
import HaypeLili from "../../assets/HaypeLili.jpg";
import HaypeLiliHover from "../../assets/HaypeLiliHover.jpg";
import Melbon from "../../assets/Melbon.jpg";
import MelbonHover from "../../assets/MelbonHover.jpg";
import NicolaCubes from "../../assets/NicolaCubes.jpg";
import NicolaCubesHover from "../../assets/NicolaCubesHover.jpg";
import Orbis from "../../assets/Orbis.jpg";
import OrbisHover from "../../assets/OrbisHover.jpg";
import Polly from "../../assets/Polly.jpg";
import PollyHover from "../../assets/PollyHover.jpg";
import PrimeGold from "../../assets/PrimeGold.jpg";
import PrimeGoldHover from "../../assets/PrimeGoldHover.jpg";
import QulexGold from "../../assets/QulexGold.jpg";
import QulexGoldHover from "../../assets/QulexGoldHover.jpg";
import RootsAqua from "../../assets/RootsAqua.jpg";
import RootsAquaHover from "../../assets/RootsAquaHover.jpg";
import Tringle from "../../assets/Tringle.jpg";
import TringleHover from "../../assets/TringleHover.jpg";
import Vores from "../../assets/Vores.jpg";
import VoresHover from "../../assets/VoresHover.jpg";
import WinkGold from "../../assets/WinkGold.jpg";
import WinkGoldHover from "../../assets/WinkGoldHover.jpg";
import ServicesCollectionCard from './ServicesCollectionCard ';

const ThreeDimensionCollection = () => {

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
        { main: Belor, hover: BelorHover, title: "BELOR" },
        { main: BlueFino, hover: BlueFinoHover, title: "BLUE FINO" },
        { main: CornBrown, hover: CornBrownHover, title: "CORN BROWN" },
        { main: DaisySquare, hover: DaisySquareHover, title: "DAISY SQUARE" },
        { main: FloretBronze, hover: FloretBronzeHover, title: "FLORET BRONZE" },
        { main: HaypeLili, hover: HaypeLiliHover, title: "HAYPE LILI" },
        { main: Melbon, hover: MelbonHover, title: "MELBON" },
        { main: NicolaCubes, hover: NicolaCubesHover, title: "NICOLA CUBES" },
        { main: Orbis, hover: OrbisHover, title: "ORBIS" },
        { main: Polly, hover: PollyHover, title: "POLLY" },
        { main: PrimeGold, hover: PrimeGoldHover, title: "PRIME GOLD" },
        { main: QulexGold, hover: QulexGoldHover, title: "QULEX GOLD" },
        { main: RootsAqua, hover: RootsAquaHover, title: "ROOTS AQUA" },
        { main: Tringle, hover: TringleHover, title: "TRINGLE" },
        { main: Vores, hover: VoresHover, title: "VORES" },
        { main: WinkGold, hover: WinkGoldHover, title: "WINK GOLD" },

    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                align="center"
                sx={{ color: "#F87B1B", mb: 4 }}
            >
                3D Collection
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
                        pdfFile={ThreeDimension}
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

export default ThreeDimensionCollection;
