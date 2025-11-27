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

import pdf1 from "../../../assets/pdf/FISH & POSTER.pdf";
import pdf2 from "../../../assets/pdf/GLITTER SERIES.pdf";
import pdf3 from "../../../assets/pdf/GLOSSY-1.pdf";
import pdf4 from "../../../assets/pdf/GLOSSY-2.pdf"
import pdf5 from "../../../assets/pdf/GLOSSY-3.pdf"
import pdf6 from "../../../assets/pdf/GLOSSY-4.pdf"
import pdf7 from "../../../assets/pdf/GOLDEN SERIES.pdf"
import pdf8 from "../../../assets/pdf/KITCHEN.pdf"
import pdf9 from "../../../assets/pdf/MATT.pdf"
import pdf10 from "../../../assets/pdf/NATURE.pdf"
import pdf11 from "../../../assets/pdf/NEW GLOSSY.pdf"
import pdf12 from "../../../assets/pdf/NEWKITCHEN.pdf"
import pdf13 from "../../../assets/pdf/POOJA ROOM.pdf"
import pdf14 from "../../../assets/pdf/SPECIAL GLOSSY COLOUR.pdf"
import fishposter from "../../../assets/WallTiles/Fishposter.jpg";
import glitterseries from "../../../assets/WallTiles/Glitterseries.jpg";
import glossy1 from "../../../assets/WallTiles/Glossy1.jpg";
import glossy2 from "../../../assets/WallTiles/Glossy2.jpg";
import glossy3 from "../../../assets/WallTiles/Glossy3.jpg";
import glossy4 from "../../../assets/WallTiles/Glossy4.jpg";
import golden from "../../../assets/WallTiles/GoldenSeries.jpg";
import kitchen from "../../../assets/WallTiles/Kitchen.jpg";
import matt from "../../../assets/WallTiles/Matt.jpg";
import nature from "../../../assets/WallTiles/Nature.jpg";
import newglossy from "../../../assets/WallTiles/NewGlossy.jpg";
import newkitchen from "../../../assets/WallTiles/NewKitchen.jpg";
import poojaroom from "../../../assets/WallTiles/PoojaRoom.jpg";
import specialglossycolour from "../../../assets/WallTiles/SpecialGlossyColor.jpg";

const goldenCollection = [
  {
     title: "FISH POSTER",
    mainImage: fishposter,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf1,
  },
  {
    title: "GLITTER SERIES",
    mainImage: glitterseries,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf2,
  },
  {
    title: "GLOSSY-1",
    mainImage: glossy1,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf3,
  },
  {
    title: "GLOSSY-2",
    mainImage: glossy2,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf4,
  },
    {
    title: "GLOSSY-3",
    mainImage: glossy3,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf5,
  },
  {
    title: "GLOSSY-4",
    mainImage: glossy4,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf6,
  },
    {
    title: "GOLDEN SERIES",
    mainImage: golden,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf7,
  },
  {
    title: "KITCHEN",
    mainImage: kitchen,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf8,
  },
    {
    title: "MATT",
    mainImage: matt,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf9,
  },
  {
    title: "NATURE",
    mainImage: nature,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf10,
  },
    {
    title: "NEW GLOSSY",
    mainImage: newglossy,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf11,
  },
  {
    title: "NEW KITCHEN",
    mainImage: newkitchen,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf12,
  },
  {
    title: "POOJA ROOM",
    mainImage: poojaroom,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf13,
  },
    {
    title: "SPECIAL GLOSSY COLOUR",
    mainImage: specialglossycolour,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf14,
  },
];

const Walltiles = () => {

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
        WALL TILES
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
  );
};

export default Walltiles;