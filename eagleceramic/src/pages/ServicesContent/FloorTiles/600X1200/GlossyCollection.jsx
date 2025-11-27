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
  import("../../ServicesCollectionCard ") 
);

import pdf1 from "../../../../assets/pdf/3DCollection.pdf"
import pdf2 from "../../../../assets/pdf/BookMatch.pdf"
import pdf3 from "../../../../assets/pdf/DoubleCharge.pdf"
import pdf4 from "../../../../assets/pdf/Glossyendlessv1.pdf"
import pdf5 from "../../../../assets/pdf/Glossyendlessv2.pdf"
import pdf6 from "../../../../assets/pdf/RandomCollection.pdf"
import pdf7 from "../../../../assets/pdf/Goldenendlesscollection.pdf"
import pdf8 from "../../../../assets/pdf/Snpcollection.pdf"
import pdf9 from "../../../../assets/pdf/Staturio.pdf"
import three from "../../../../assets/FloorTiles/3dimension.jpg"
import bookmatch from "../../../../assets/FloorTiles/BookMatch.png"
import doublecharge from "../../../../assets/FloorTiles/DoubleCharge.jpg"
import glossyendlessv1 from "../../../../assets/FloorTiles/Glossyendlessv1.jpg"
import glossyendlessv2 from "../../../../assets/FloorTiles/Glossyendlessv2.png"
import random from "../../../../assets/FloorTiles/Random.png"
import goldenendless from "../../../../assets/FloorTiles/Goldenendless.jpg"
import snp from "../../../../assets/FloorTiles/Snp.jpg"
import statuario from "../../../../assets/FloorTiles/Statuario.jpg"
const goldenCollection = [
    {
     title: "3 D COLLECTION",
        mainImage: three,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf1,
    },
    {
        title: "BOOK MATCH COLLECTION",
        mainImage: bookmatch,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf2,
    },
    {
        title: "DOUBLE CHARGE COLLECTION",
        mainImage: doublecharge,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf3,
    },
    {
        title: "GLOSSY ENDLESS V1 COLLECTION",
        mainImage: glossyendlessv1,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf4,
    },
    {
        title: "GLOSSY ENDLESS V2 COLLECTION",
        mainImage: glossyendlessv2,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf5,
    },
    {
        title: "GLOSSY RANDOM COLLECTION",
        mainImage: random,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf6,
    },
    {
        title: "GOLDEN ENDLESS COLLECTION",
        mainImage: goldenendless,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf7,
    },
    {
        title: "SNP COLLECTION",
        mainImage: snp,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf8,
    },
    {
        title: "STATURIO COLLECTION",
        mainImage: statuario,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
        pdf: pdf9,
    }
];

const GlossyCollection = () => {
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
          mb:2
        }}
      >
       GLOSSY COLLECTIONS
      </Typography>

      {/* COLLECTION LOOP */}
      <Box sx={{marginTop:10}}>
        {goldenCollection.map((item, index) => (
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
  )
}

export default GlossyCollection