import React, { useState, lazy, Suspense } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";

const ServicesCollectionCard = lazy(() =>
    import("../ServicesCollectionCard ")
);

// Assets
import KitchenSinkImage from "../../../assets/KitchenSinkCollection/KitchenSink.PNG";
import kitchensinkPdf from "../../../assets/pdf/KitchenSinkCollection/KitchenSink.pdf";
import KitchenSinkVideo from "../../../assets/KitchenSinkCollection/KitchenSinkVideo.mp4";
import BackgroundImage from "../../../assets/BannerImage3.png";

const KitchenSink = () => {
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
            py: { xs: 1, md: 3 }
        }}>
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
                {/* Enhanced HERO HEADER */}
                 <Box
                                   sx={{
                                    position: "relative",
                                    textAlign: "center",
                                    mb: {xs: 0, sm: 4},
                                    pt: 1,
                                    pb: {xs: 0, sm: 4},
                                  
                                    backgroundImage: {
                                      xs: "none",               
                                      sm: `url(${BackgroundImage})`, 
                                    },
                                    backgroundBlendMode: "overlay",
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "25px",
                                  
                                    overflow: "hidden",
                                    "::before": {
                                      content: '""',
                                      position: "absolute",
                                      top: -2,
                                      left: -2,
                                      right: -2,
                                      bottom: -2,
                                      background: {xs: "none", sm:"linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.84))"},
                                      zIndex: -1,
                                      animation: "glowBorder 3s ease-in-out infinite alternate",
                                    },
                                    animation: "floatHeader 6s ease-in-out infinite",
                                  }}
                                  
                                  >
                                           <Typography
                                                variant="h3"
                                                sx={{
                                                 mt:{xs: 0, sm: 2},
                                                  fontWeight: 700,
                                                  fontSize: { xs: "2.8rem", sm: "3.5rem" },
                                                  color: { xs: "black", sm: "white" },
                                                }}
                                              >
                        KITCHEN SINK COLLECTION
                    </Typography>
                 
                </Box>

                {/* Video (Left) + Content (Right) */}
                {/* 2-Column Layout using PURE CSS GRID */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "30% 70%" }, // Mobile: 1 col, Desktop: Video ~43%, Content ~57%
                        gap: { xs: 5, md: 5 },
                        alignItems: "center",
                        my: { xs: 8, md: 12 },
                        mt: { xs: 4, md: 3 }
                    }}
                >
                    {/* LEFT: Video */}
                    <Box
                        sx={{
                            justifySelf: { xs: "center", md: "end" }, // Center on mobile, right-align on desktop
                            maxWidth: { xs: "100%", sm: 500 },
                        }}
                    >
                        <Box
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: "0 15px 45px rgba(0,0,0,0.2)",
                                bgcolor: "#000",
                            }}
                        >
                            <video
                                src={KitchenSinkVideo}
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                    borderRadius: "12px",
                                }}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </Box>
                    </Box>

                    {/* RIGHT: Content Card */}
                    <Box
                        sx={{
                            bgcolor: "white",
                            py: { xs: 4, sm: 6, md: 9 },
                            px: { xs: 4, sm: 6, md: 7 },
                            borderRadius: 3,
                            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                            border: "1px solid #f0f0f0",
                            height: "fit-content",
                        }}
                    >
                        <Typography
                            variant="h4"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                color: "#658C58",
                                mb: 3,
                                fontSize: { xs: "2rem", md: "2.4rem" },
                                lineHeight: 1.1,
                            }}
                        >
                            Premium Quartz Kitchen Sinks
                        </Typography>

                        <Typography variant="body1" paragraph sx={{ fontSize: "1.08rem", lineHeight: 2, color: "#333", mb: 3 }}>
                            Experience the future of kitchen design with our <strong>Swiss-engineered Quartz Composite Sinks</strong> —
                            where unmatched durability meets timeless elegance.
                        </Typography>

                        <Typography variant="body1" paragraph sx={{ fontSize: "1.08rem", lineHeight: 2, color: "#333", mb: 4 }}>
                            Available in stunning <strong>Granite & Metallic finishes</strong> — Black, Snow Sand, Red Moon, Mosaic Slate, Peach Ivory and more —
                            with ultra-smooth surfaces that never fade and are incredibly easy to clean.
                        </Typography>

                    </Box>
                </Box>

                {/* Full Width Image Card Below */}
                <Box sx={{ mt: { xs: 10, md: 16 } }}>
                    <Suspense
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
                            mainImage={KitchenSinkImage}
                            title="Kitchen Sink Series"
                            hoverParagraph="Discover Duraq Quartz Kitchen Sinks — Swiss-engineered in India with 80% natural quartz crystal and premium acrylic resin, delivering unmatched strength and beauty. Scratch-proof, stain-resistant, heat-resistant up to 280°C, 100% non-porous & antibacterial, these ultra-durable sinks feature 10–14 mm solid thickness, deep modern bowls, and advanced sound-dampening technology."
                            subtitle="Explore Collection"
                            subtitleColor="#FFD700"
                            pdfFile={kitchensinkPdf}
                            onExploreClick={handleOpenPdf}
                        />
                    </Suspense>
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

export default KitchenSink;