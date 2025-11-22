import React, { useState, useCallback } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";




import DallasCoco from "../../assets/DallasCoco.jpg";
import DallasCocoHover from "../../assets/DallasCocoHover.jpg";
import Granite from "../../assets/Granite.jpg";
import GraniteHover from "../../assets/GraniteHover.jpg";
import HexaWhite from "../../assets/HexaWhite.jpg";
import HexaWhiteHover from "../../assets/HexaWhiteHover.jpg";
import LosivaBlack from "../../assets/LosivaBlack.jpg";
import LosivaBlackHover from "../../assets/LosivaBlackHover.jpg";
import MegaBeige from "../../assets/MegaBeige.jpg";
import MegaBeigeHover from "../../assets/MegaBeigeHover.jpg";
import Miscort from "../../assets/Miscort.jpg";
import MiscortHover from "../../assets/MiscortHover.jpg";
import RealStone from "../../assets/RealStone.jpg";
import RealStoneHover from "../../assets/RealStoneHover.jpg";
import TurkisBlack from "../../assets/TurkisBlack.jpg"
import TurkisBlackHover from "../../assets/TurkisBlackHover.jpg"
import VinosBrown from "../../assets/VinosBrown.jpg"
import VinosBrownHover from "../../assets/VinosBrownHover.jpg"
import VinosMagic from "../../assets/VinosMagic.jpg"
import VinosMagicHover from "../../assets/VinosMagicHover.jpg"
import VolgaStrom from "../../assets/VolgaStrom.jpg"
import VolgaStromHover from "../../assets/VolgaStromHover.jpg"
import AmazonBlue from "../../assets/AmazonBlue.jpg"
import AmazonBlueHover from "../../assets/AmazonBlueHover.jpg"




import DoubleCharge from "../../assets/pdf/DoubleCharge.pdf";
import ServicesCollectionCard from './ServicesCollectionCard ';

const DoubleChargeCollection = () => {

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
        { main: DallasCoco, hover: DallasCocoHover, title: "DALLAS COCO" },
        { main: Granite, hover: GraniteHover, title: "GRANITE" },
        { main: HexaWhite, hover: HexaWhiteHover, title: "HEXA WHITE" },
        { main: LosivaBlack, hover: LosivaBlackHover, title: "LOSIVA BLACK" },
        { main: MegaBeige, hover: MegaBeigeHover, title: "MEGA BEIGE" },
        { main: Miscort, hover: MiscortHover, title: "MISCORT" },
        { main: RealStone, hover: RealStoneHover, title: "REAL STONE" },
        { main: TurkisBlack, hover: TurkisBlackHover, title: "TURKIS BLACK" },
        { main : VinosBrown , hover: VinosBrownHover , title: "VINOS BROWN" },
        { main : VinosMagic , hover: VinosMagicHover , title: "VINOS MAGIC" },
        { main : VolgaStrom , hover: VolgaStromHover , title: "VOLGA STROM" },
        { main : AmazonBlue , hover: AmazonBlueHover , title: "AMAZON BLUE" },

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
              Double Charge Collection
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
                        pdfFile={DoubleCharge}
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

export default DoubleChargeCollection;
        