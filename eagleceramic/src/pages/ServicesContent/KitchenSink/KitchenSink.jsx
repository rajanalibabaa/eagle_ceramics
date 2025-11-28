import React, { useState, lazy, Suspense } from "react";
import {
    Box,
    Container,
    Typography,
    Modal,
    IconButton,
    CircularProgress,
    Grid,
    Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ServicesCollectionCard = lazy(() => import("../ServicesCollectionCard"));

// Assets
import KitchenSinkImage from "../../../assets/KitchenSinkCollection/KitchenSink.PNG";
import kitchensinkPdf from "../../../assets/pdf/KitchenSinkCollection/KitchenSink.pdf";
import KitchenSinkVideo from "../../../assets/KitchenSinkCollection/KitchenSinkVideo.mp4";

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
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 2 } }}>
            {/* Page Title */}
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    color: "#658C58",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    mb: 2,
                }}
            >
                Kitchen Sink Collection
            </Typography>

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
                        <CircularProgress sx={{ display: "block", mx: "auto", my: 10 }} />
                    }
                >
                    <ServicesCollectionCard
                        mainImage={KitchenSinkImage}
                        title="Kitchen Sink Series"
                        hoverParagraph="Discover Duraq Quartz Kitchen Sinks — Swiss-engineered in India with 80% natural quartz crystal and premium acrylic resin, delivering unmatched strength and beauty. Scratch-proof, stain-resistant, heat-resistant up to 280°C, 100% non-porous & antibacterial, these ultra-durable sinks feature 10–14 mm solid thickness, deep modern bowls, and advanced sound-dampening technology."
                        subtitle="Explore Collection"
                        subtitleColor="#658C58"
                        pdfFile={kitchensinkPdf}
                        onExploreClick={handleOpenPdf}
                    />
                </Suspense>
            </Box>

            {/* PDF Modal */}
            <Modal
                open={openPdf}
                onClose={handleClosePdf}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: { xs: "98%", md: "90%" },
                        height: "92vh",
                        bgcolor: "white",
                        borderRadius: 3,
                        boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
                        overflow: "hidden",
                    }}
                >
                    <IconButton
                        onClick={handleClosePdf}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 10,
                            bgcolor: "rgba(255,255,255,0.95)",
                            "&:hover": { bgcolor: "white" },
                        }}
                    >
                        <CloseIcon sx={{ fontSize: 32 }} />
                    </IconButton>

                    <iframe
                        src={currentPdf}
                        title="Kitchen Sink Catalog"
                        width="100%"
                        height="100%"
                        style={{ border: "none" }}
                    />
                </Box>
            </Modal>
        </Container>
    );
};

export default KitchenSink;