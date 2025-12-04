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
import BackgroundImage from "../../../assets/BannerImage3.png";


//images
import Eagle001_300x600image from "../../../assets/ElevationTiles300x600/Eagle001x600image.PNG";
import Eagle002_300x600image from "../../../assets/ElevationTiles300x600/Eagle002x600image.PNG";
import Eagle003_300x600image from "../../../assets/ElevationTiles300x600/Eagle003x600image.PNG";
import Eagle004_300x600image from "../../../assets/ElevationTiles300x600/Eagle004x600image.PNG";
import Eagle005_300x600image from "../../../assets/ElevationTiles300x600/Eagle005x600image.PNG";
import Eagle006_300x600image from "../../../assets/ElevationTiles300x600/Eagle006x600image.PNG";

//pdf
import Eagle001_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle001_300x600.pdf";
import Eagle002_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle002_300x600.pdf";
import Eagle003_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle003_300x600.pdf";
import Eagle004_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle004_300x600.pdf";
import Eagle005_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle005_300x600.pdf";
import Eagle006_300x600 from "../../../assets/pdf/ElevationTiles300x600/Eagle006_300x600.pdf";

const ElevationCollection = [
    {
        mainImage: Eagle001_300x600image,
        hoverParagraph: "It showcases a collection of ceramic wall tiles designed specifically for elevation/feature wall use, featuring highly textured, 3D \"high-depth\" stone-look designs with a matte finish. The tiles are presented in a random, irregular broken-stone (crazy paving) pattern that gives a strong natural stone effect.",
        pdf: Eagle001_300x600,
        title: "Polo",
    },
    {
        mainImage: Eagle002_300x600image,
        hoverParagraph: "The collection includes the rugged, irregular stone-look POLO series in natural greys, beiges and multi-tones, plus the decorative VINTAGE brick series with embossed leaf motifs in earthy shades.Random-face, high-relief ceramic tiles that deliver a strong natural stone or weathered brick aesthetic for modern-rustic interiors.",
        pdf: Eagle002_300x600,
        title: "Eagle 002",
    },
    {
        mainImage: Eagle003_300x600image,
        hoverParagraph: "The expansive collection features the rugged irregular stone POLO series, decorative leaf-embossed VINTAGE brick series, plus diverse stone, slate, and brick patterns in earthy greys, beiges, rusts, and multi-tones..Random-face, high-relief ceramic tiles perfect for bold, natural, modern-rustic accent walls in homes and commercial spaces.",
        pdf: Eagle003_300x600,
        title: "Eagle 003",
    },
    {
        mainImage: Eagle004_300x600image,
        hoverParagraph: "This comprehensive collection showcases rugged POLO broken-stone, decorative VINTAGE leaf-embossed bricks, stacked slate, wood-strip, and mixed stone-brick designs in rich greys, beiges, rusts, and earthy tones..Random-face, high-relief ceramic tiles perfect for dramatic natural and vintage-rustic accent walls in modern interiors.",
        pdf: Eagle004_300x600,
        title: "Eagle 004",
    },
    {
        mainImage: Eagle005_300x600image,
        hoverParagraph: "This collection showcases rugged broken-stone, stacked slate, vintage brick, wood-strip, and geometric high-relief designs in earthy greys, beiges, rusts, and multi-tones.Random-face ceramic tiles ideal for bold, natural, and modern-rustic accent walls in residential and commercial spaces.",
        pdf: Eagle005_300x600,
        title: "Eagle 005",
    },
    {
        mainImage: Eagle006_300x600image,
        hoverParagraph: "“We Print What You Think!!!” – Bold 3D ceramic tiles with Sugar Matt Varnish finish that turn walls into raw, touchable art.From chaotic broken-stone POLO and leaf-etched VINTAGE bricks to geometric weaves, rusted metal strips, and weathered wood stacks in fearless greys, blues, rusts, and earth tones.Random-face, high-relief masterpieces that scream character and craft dramatic, one-of-a-kind feature walls.",
        pdf: Eagle006_300x600,
        title: "Eagle 006",
    },
];

const ElevationTiles300x600 = () => {
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
            minHeight: "100vh"
        }}>
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
                {/* HERO HEADER - Premium Design for Team Lead */}
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
                                          variant="h1"
                                          sx={{
                                                    mt:{xs:0, sm:2},

                                            fontWeight: 700,
                                            fontSize: { xs: "2.8rem", sm: "3.5rem" },
                                            color: { xs: "black", sm: "white" },
                                          }}
                                        >
                        ELEVATION TILES
                    </Typography>
                     <Typography
                                             variant="body1"
                                             sx={{
                                               mt: 1,
                                               mb:1,
                                               fontSize: { xs: "0.95rem", sm: "1.2rem" },
                                               color: { xs: "black", sm: "white" }, 
                                             }}
                                           >
                        Premium 300 x 600 mm | High-Depth 3D Elevation Series
                    </Typography>
                    {/* <Box
                        sx={{
                            height: 4,
                            background: "linear-gradient(90deg, #FFD700, #016B61, #FFD700)",
                            borderRadius: 2,
                            animation: "shineLine 2s ease-in-out infinite",
                            boxShadow: "0 0 10px rgba(255,215,0,0.6)",
                        }}
                    /> */}
                </Box>

                {/* COLLECTION CARDS - Enhanced Background */}
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
                @keyframes movePattern {
                    0% { transform: translateX(0) translateY(0); }
                    100% { transform: translateX(-40px) translateY(-40px); }
                }
            `}</style>
        </Box>
    );
};

export default ElevationTiles300x600;