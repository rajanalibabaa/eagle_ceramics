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

// Enhanced Background Images - Premium Design Collection
import BackgroundImage from "../../../assets/BannerImage2.png";
// import OverlayPattern from "../../../assets/BannerImage4.png"; 
// import GradientOverlay from "../../../assets//BannerImage3.png";

// Images
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

// PDFs
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
        hoverParagraph: "This is the second volume of Eagle Ceramic's High Depth Elevation series, featuring a completely different set of designs compared to the first catalog. It focuses on 3D brick, stone, and abstract linear textures with ultra-realistic high-relief punching.",
        pdf: Eagle002pdf,
        title: "Eagle 002",
    },
    {
        mainImage: Eagle003image,
        hoverParagraph: "This is the third volume of Eagle Ceramic's hugely popular High Depth Elevation series. It introduces fresh designs while continuing the signature 3D high-relief punch technology.",
        pdf: Eagle003pdf,
        title: "Eagle 003",
    },
    {
        mainImage: Eagle004image,
        hoverParagraph: "This is the fourth and largest catalog in Eagle Ceramic's High Depth Elevation series. It acts as a complete master collection, combining all the best-selling designs from the previous three catalogs and introducing several brand-new series.",
        pdf: Eagle004pdf,
        title: "Eagle 004",
    },
    {
        mainImage: Eagle005images,
        hoverParagraph: "This is the latest and most curated volume (2024–2025 edition) of Eagle Ceramic's High Depth Elevation series. It focuses only on the absolute best-sellers and most demanded designs from the previous four catalogs, presented in a clean, customer-friendly format with large application images.",
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
        hoverParagraph: "This is the definitive, flagship master catalog of Eagle Ceramic's High Depth Elevation series as of late 2025. It is the single most complete book in the series, combining the absolute best designs from all previous catalogs (001–008) along with several brand-new, never-seen-before designs created with the latest deep-punch technology.",
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
        <Box sx={{ 
            minHeight: "100vh",
            // background: `
            //     radial-gradient(circle at 20% 80%, rgba(255,215,0,0.15) 0%, transparent 50%),
            //     radial-gradient(circle at 80% 20%, rgba(1,107,97,0.12) 0%, transparent 50%),
            //     radial-gradient(circle at 40% 40%, rgba(255,182,193,0.08) 0%, transparent 50%),
            //     linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)
            // `,
            position: "relative",
            overflow: "hidden",
            "::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.3,
                zIndex: 1,
            },
            "::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    linear-gradient(45deg, rgba(255,215,0,0.03) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(1,107,97,0.03) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(255,215,0,0.03) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(1,107,97,0.03) 75%)
                `,
                backgroundSize: "40px 40px",
                animation: "movePattern 20s linear infinite",
                zIndex: 2,
            }
        }}>
            <Container maxWidth="lg" sx={{ py: 4, position: "relative", zIndex: 10 }}>
                {/* HERO HEADER - Premium Design for Team Lead */}
                <Box
                    sx={{
                        position: "relative",
                        textAlign: "center",
                        mb: 8,
                        pt: 4,
                        pb: 4 ,
                        background: `
                            linear-gradient(135deg, rgba(15,32,39,0.95) 0%, rgba(32,58,67,0.9) 50%, rgba(44,83,100,0.95) 100%),
                            linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(1,107,97,0.2) 100%)
                        `,
                        backgroundImage: `url(${BackgroundImage})`,
                        backgroundBlendMode: "overlay",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderImage: "linear-gradient(45deg, #FFD700, #016B61, #FFD700) 1",
                        borderRadius: "25px",
                        boxShadow: `
                            0 25px 50px rgba(0,0,0,0.5),
                            0 0 0 1px rgba(255,215,0,0.3),
                            inset 0 1px 0 rgba(255,255,255,0.2)
                        `,
                        overflow: "hidden",
                        "::before": {
                            content: '""',
                            position: "absolute",
                            top: -2,
                            left: -2,
                            right: -2,
                            bottom: -2,
                            background: "linear-gradient(45deg, transparent, rgba(255,215,0,0.1), transparent)",
                            zIndex: -1,
                            animation: "glowBorder 3s ease-in-out infinite alternate",
                        },
                        animation: "floatHeader 6s ease-in-out infinite",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            color: "#ffffffff",
                            fontWeight: 900,
                            textTransform: "uppercase",
                            letterSpacing: 6,
                            lineHeight: 1.1,
                            mb: 2,
                            fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                            textShadow: `
                                0 0 10px rgba(255,215,0,0.8),
                                0 2px 4px rgba(0,0,0,0.8)
                            `,
                            fontFamily: "'Montserrat', 'Roboto', sans-serif",
                        }}
                    >
                        ELEVATION TILES
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: "#E8F4F8",
                            fontWeight: 400,
                            mb: 4,
                            px: 4,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                            fontFamily: "'Roboto', sans-serif",
                        }}
                    >
                        Premium 300 x 450 mm | High-Depth 3D Elevation Series
                    </Typography>
                    <Box
                        sx={{
                            height: 4,
                            background: "linear-gradient(90deg, #FFD700, #016B61, #FFD700)",
                            borderRadius: 2,
                            animation: "shineLine 2s ease-in-out infinite",
                            boxShadow: "0 0 10px rgba(255,215,0,0.6)",
                        }}
                    />
                </Box>

                {/* COLLECTION CARDS - Enhanced Background */}
                
                    {ElevationCollection.map((item, index) => (
                        <Suspense
                            key={index}
                            fallback={
                                <Box sx={{ 
                                    display: "flex", 
                                    justifyContent: "center", 
                                    py: 8,
                                    background: "linear-gradient(45deg, rgba(255,215,0,0.1), rgba(1,107,97,0.1))"
                                }}>
                                    <CircularProgress 
                                        size={60} 
                                        thickness={4}
                                        sx={{ color: "#FFD700" }} 
                                    />
                                </Box>
                            }
                        >
                            <ServicesCollectionCard
                                mainImage={item.mainImage}
                                title={item.title}
                                hoverParagraph={item.hoverParagraph}
                                subtitle={item.subtitle}
                                titleColor={item.titleColor}
                                subtitleColor="#FFD700"
                                pdfFile={item.pdf}
                                onExploreClick={handleOpenPdf}
                            />
                        </Suspense>
                    ))}
                

                {/* Enhanced PDF VIEWER MODAL */}
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
                            width: { xs: "95%", sm: "90%", md: "85%" },
                            height: { xs: "80%", sm: "85%", md: "90%" },
                            bgcolor: "background.paper",
                            borderRadius: 4,
                            p: 2,
                            overflow: "hidden",
                            "::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                height: 4,
                            }
                        }}
                    >
                        <IconButton
                            onClick={handleClosePdf}
                            sx={{
                                position: "absolute",
                                right: 12,
                                top: 12,
                                bgcolor: "rgba(255,255,255,0.95)",
                                color: "#016B61",
                                backdropFilter: "blur(10px)",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                                "&:hover": { 
                                    color: "#016B61",
                                    transform: "scale(1.1)",
                                },
                                zIndex: 1000,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {openPdf && (
                            <iframe
                                src={currentPdf}
                                width="100%"
                                height="100%"
                                style={{ 
                                    border: "none", 
                                    borderRadius: "16px",
                                    boxShadow: "inset 0 4px 20px rgba(0,0,0,0.3)"
                                }}
                                title="PDF Viewer"
                                loading="lazy"
                            />
                        )}
                    </Box>
                </Modal>
            </Container>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes glowBorder {
                    0% { box-shadow: 0 0 5px rgba(255,215,0,0.3); }
                    100% { box-shadow: 0 0 20px rgba(255,215,0,0.8); }
                }
                @keyframes floatHeader {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes shineLine {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(1); }
                    100% { transform: scaleX(0); }
                }
                @keyframes movePattern {
                    0% { transform: translateX(0) translateY(0); }
                    100% { transform: translateX(-40px) translateY(-40px); }
                }
            `}</style>
        </Box>
    );
};

export default ElevationTiles300x450;
