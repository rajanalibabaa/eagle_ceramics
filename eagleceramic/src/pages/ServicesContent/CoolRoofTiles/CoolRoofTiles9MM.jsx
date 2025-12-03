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
import RoofTiles9mm from '../../../assets/RoofTilesImages/RoofTiles9MM.PNG';

//pdf
import CoolRoofTiles9mm from "../../../assets/pdf/CoolRoofTilesCollection/CoolRoofTiles9MM.pdf";
import BackgroundImage from "../../../assets/BannerImage3.png";

const ElevationCollection = [
    {
        mainImage: RoofTiles9mm,
        hoverParagraph: "cool-roof-rated 12×12-inch ceramic roof tiles built for Indian homes and extreme weather.High solar-reflective Index (SRI) surfaces in light ivory, beige, grey, terracotta reds, and rustic browns that keep roofs cooler and cut summer heat gain.Textured Plain Matt, Hexa Matt, Plain SG & Hexa SG finishes with anti-skid grip, water-repellent strength, and classic interlocking design for sloped roofs.",
        pdf: CoolRoofTiles9mm,
        title: "EC - Cube",
    }
];

const CoolRoofTiles9MM = () => {

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
            position: 'relative',
            overflow: 'hidden',
            py: { xs: 4, md: 6 }
        }}>
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
                {/* Enhanced HERO HEADER */}
                <Box
                    sx={{
                        position: "relative",
                        textAlign: "center",
                        mb: 8,
                        pt: 6,
                        pb: 8,
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
                        // boxShadow: `
                        //     0 25px 50px rgba(0,0,0,0.5),
                        //     0 0 0 1px rgba(255,215,0,0.3),
                        //     inset 0 1px 0 rgba(255,255,255,0.2)
                        // `,
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
                            fontWeight: 800,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            lineHeight: 1,
                            mb: 2,
                            whiteSpace: "nowrap",
                            fontSize: { xs: "2rem", sm: "3rem", md: "3.7rem", lg: "4.5rem" },
                            textShadow: `
                                0 0 10px rgba(255,215,0,0.8),
                                0 2px 4px rgba(0,0,0,0.8)
                            `,
                            fontFamily: "'Montserrat', 'Roboto', sans-serif",
                        }}
                    >
                        COOL ROOF TILES 9MM
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

                {/* COLLECTION CARDS */}
                <Box>
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
                </Box>

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
                            border: "2px solid",
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
            `}</style>
        </Box>
    );
};

export default CoolRoofTiles9MM;