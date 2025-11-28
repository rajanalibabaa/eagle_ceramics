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
                Elevation Tiles 300 x 600
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

export default ElevationTiles300x600;
