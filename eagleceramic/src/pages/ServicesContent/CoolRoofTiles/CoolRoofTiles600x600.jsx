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
import RoofTiles600x600 from '../../../assets/RoofTilesImages/RoofTiles600x600.PNG';

//pdf
import CoolRoofTiles600 from "../../../assets/pdf/CoolRoofTilesCollection/CoolRoofTiles600x600.pdf";


const ElevationCollection = [
    {
        mainImage: RoofTiles600x600,
        hoverParagraph: "showcase of 600×600 mm porcelain tiles engineered for heat-reflective “cool roof” performance.High-albedo, light-colored surfaces (whites, ivories, soft greys, and pastel beiges) designed to reduce roof temperatures, lower cooling costs, and extend roof life.Durable, matt-finish, large-format tiles with realistic marble, travertine, and subtle stone patterns that combine eco-efficiency with premium aesthetics for modern terraces and rooftops.“We Print What You Think!!!” – now in cool, energy-saving style.",
        pdf: CoolRoofTiles600,
        title: "Porcelain",
    }
];

const CoolRoofTiles600x600 = () => {

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
                Cool Roof Tiles 600x600
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

export default CoolRoofTiles600x600;
