import React, { useState, lazy, Suspense } from "react";
import {
    Box,
    Container,
    Typography,
    Modal,
    IconButton,
    CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ServicesCollectionCard = lazy(() =>
    import("../ServicesCollectionCard ")
);

//images

import Eagle001Image from "../../../assets/ElevationTiles300x450/Eagle001image.png";
import Eagle002image from "../../../assets/ElevationTiles300x450/Eagle002image.png";
import Eagle003image from "../../../assets/ElevationTiles300x450/Eagle003image.png";
import Eagle004image from "../../../assets/ElevationTiles300x450/Eagle004image.png";
import Eagle005images from "../../../assets/ElevationTiles300x450/Eagle005image.png";
import Eagle006image from "../../../assets/ElevationTiles300x450/Eagle006image.png";
import Eagle007image from "../../../assets/ElevationTiles300x450/Eagle007image.png";
import Eagle008image from "../../../assets/ElevationTiles300x450/Eagle008image.png";
import Eagle009image from "../../../assets/ElevationTiles300x450/Eagle009image.png";
import Eagle010image from "../../../assets/ElevationTiles300x450/Eagle010image.png";
import Eagle011image from "../../../assets/ElevationTiles300x450/Eagle011image.png";

//pdf
import Eagle001pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle001.pdf"
import Eagle002pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle002.pdf"
import Eagle003pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle003.pdf"
import Eagle004pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle004.pdf"
import Eagle005pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle005.pdf"
import Eagle006pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle006.pdf"
import Eagle007pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle007.pdf"
import Eagle008pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle008.pdf"
import Eagle009pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle009.pdf"
import Eagle010pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle010.pdf"
import Eagle011pdf from "../../../assets/pdf/ElevationTiles300x450/Eagle011.pdf"


const ElevationCollection = [
    {
        mainImage: Eagle001Image,
        hoverParagraph: "A premium range of 3D elevation wall tiles featuring high-depth punch (raised/embossed) designs with a strong nature-inspired theme — primarily golden maple leaves, stone textures, and geometric wood-like patterns. Designed for both interior feature walls and exterior elevations.",
        pdf: Eagle001pdf,
        title: "Eagle 001",
    },
    {
        mainImage: Eagle002image,
        hoverParagraph: "This is the second volume of Eagle Ceramic’s High Depth Elevation series, featuring a completely different set of designs compared to the first catalog. It focuses on 3D brick, stone, and abstract linear textures with ultra-realistic high-relief punching.",
        pdf: Eagle002pdf,
        title: "Eagle 002",
    },
    {
        mainImage: Eagle003image,
        hoverParagraph: "This is the third volume of Eagle Ceramic’s hugely popular High Depth Elevation series. It introduces fresh designs while continuing the signature 3D high-relief punch technology.",
        pdf: Eagle003pdf,
        title: "Eagle 003",
    },
    {
        mainImage: Eagle004image,
        hoverParagraph: "This is the fourth and largest catalog in Eagle Ceramic’s High Depth Elevation series. It acts as a complete master collection, combining all the best-selling designs from the previous three catalogs and introducing several brand-new series.",
        pdf: Eagle004pdf,
        title: "Eagle 004",
    },
    {
        mainImage: Eagle005images,
        hoverParagraph: "This is the latest and most curated volume (2024–2025 edition) of Eagle Ceramic’s High Depth Elevation series. It focuses only on the absolute best-sellers and most demanded designs from the previous four catalogs, presented in a clean, customer-friendly format with large application images.",
        pdf: Eagle005pdf,
        title: "Eagle 005",
    },

    {
        mainImage: Eagle006image,
        hoverParagraph: "This is the latest, most compact, and dealer-favorite catalog from Eagle Ceramic (released 2025). It contains only the top 10 absolute fastest-moving designs across all previous catalogs – the ones that sell out repeatedly in showrooms and projects.",
        pdf: Eagle006pdf,
        title: "Eagle 006",
    },

    {
        mainImage: Eagle007image,
        hoverParagraph: "This is the newest and most premium catalog launched by Eagle Ceramic in late 2025. It features all-new, never-seen-before designs developed with the latest 2025 digital punching technology. These are ultra-realistic, deeper-relief tiles that push the boundaries of 3D elevation ceramics.",
        pdf: Eagle007pdf,
        title: "Eagle 007",
    },
    {
        mainImage: Eagle008image,
        hoverParagraph: "This is the brand-new, just-released 2025–2026 catalog from Eagle Ceramic (launched end of 2025). It features all-new premium designs created with the most advanced deep-punch technology yet. Every design in this book is exclusive and has never appeared in any previous catalog (001–007).",
        pdf: Eagle008pdf,
        title: "Eagle 008",
    },
    {
        mainImage: Eagle009image,
        hoverParagraph: "This is the definitive, flagship master catalog of Eagle Ceramic’s High Depth Elevation series as of late 2025. It is the single most complete book in the series, combining the absolute best designs from all previous catalogs (001–008) along with several brand-new, never-seen-before designs created with the latest deep-punch technology.",
        pdf: Eagle009pdf,
        title: "Eagle 009",
    },
    {
        mainImage: Eagle010image,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of colors and textures, they offer endless possibilities for crafting a stunning space.",
        pdf: Eagle010pdf,
        title: "Eagle 010",

    },
    {
        mainImage: Eagle011image,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of colors and textures, they offer endless possibilities for crafting a stunning space.",
        pdf: Eagle011pdf,
        title: "Eagle 011",
    }

];

const ElevationTiles300x450 = () => {

    const [openPdf, setOpenPdf] = useState(false);
    const [currentPdf, setCurrentPdf] = useState("");

    const handleOpenPdf = (pdfFile) => {
        setCurrentPdf(pdfFile);
        setOpenPdf(true);
    };

    const handleClosePdf = () => {
        setOpenPdf(false);
        setCurrentPdf("");
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
                variant="h4"
                align="center"
                sx={{
                    color: "#658C58",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                }}
            >
                Elevation Tiles 300 x 450
            </Typography>

            {/* COLLECTION LOOP */}
            <Box>
                {ElevationCollection.map((item, index) => (
                    <Suspense
                        key={index}
                        fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
                    >
                        <ServicesCollectionCard
                            mainImage={item.mainImage}
                            title={item.title}
                            hoverParagraph={item.hoverParagraph}
                            subtitle={item.subtitle}
                            titleColor={item.titleColor}
                            subtitleColor="Explore More"
                            pdfFile={item.pdf}
                            onExploreClick={handleOpenPdf}
                        />
                    </Suspense>
                ))}

            </Box>

            {/* PDF VIEWER MODAL */}
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
                            title="PDF Viewer"
                            loading="lazy"
                        />
                    )}
                </Box>
            </Modal>
        </Container>
    );
};

export default ElevationTiles300x450;
