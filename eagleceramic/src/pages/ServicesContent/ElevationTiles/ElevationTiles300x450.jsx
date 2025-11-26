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

import pdf from "../../../assets/pdf/EAGLE GLOSSY ENDLESS-V2-COLLECTION_600X1200MM_compressed.pdf";

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


const ElevationCollection = [
    {
        mainImage: Eagle001Image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle002image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle003image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle004image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle005images,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },

    {
        mainImage: Eagle006image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },

    {
        mainImage: Eagle007image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle008image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle009image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle010image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
    },
    {
        mainImage: Eagle011image,
        hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
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
                            //   title={item.title}
                            hoverParagraph={item.hoverParagraph}
                            subtitle={item.subtitle}
                            titleColor={item.titleColor}
                            subtitleColor="Explore More"
                            pdfFile={pdf}
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
