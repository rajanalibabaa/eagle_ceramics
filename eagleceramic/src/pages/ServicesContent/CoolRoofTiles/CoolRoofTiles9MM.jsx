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
                Cool Roof Tiles 9MM
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

export default CoolRoofTiles9MM;
