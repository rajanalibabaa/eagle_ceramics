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
import BackgroundImage from "../../../assets/BannerImage3.png";

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
    <Box sx={{ 
      minHeight: "100vh",
      position: 'relative',
      overflow: 'hidden',
      py: {xs:0, md: 2 }
    }}>
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
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
  {/* TEXT CONTENT */}
  <Box sx={{ position: "relative", zIndex: 1, }}>
    <Typography
      variant="h1"
      sx={{
        fontWeight: 700,
        fontSize: { xs: "2.8rem", sm: "3.5rem" },
        color: { xs: "black", sm: "white" },
      }}
    >
      WALL TILES
    </Typography>

    <Typography
      variant="body1"
      sx={{
        mt: 1,
        fontSize: { xs: "0.95rem", sm: "1.2rem" },
        color: { xs: "black", sm: "white" }, 
      }}
    >
      Elegant designs for interiors, washrooms,
      kitchens, and façade applications.
    </Typography>
  </Box>
</Box>


        {/* COLLECTION CARDS */}
        <Box sx={{ marginTop: 4 }}>
          {goldenCollection.map((item, index) => (
            <Suspense
              key={index}
              fallback={
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  py: 2,
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

export default Walltiles;