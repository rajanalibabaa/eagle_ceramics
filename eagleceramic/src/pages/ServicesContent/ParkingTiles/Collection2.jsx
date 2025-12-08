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
import img1 from "../../../assets/ParkingTiles/PlainCollection1.jpg";
import img2 from "../../../assets/ParkingTiles/PlainCollection2.jpg";
import img3 from "../../../assets/ParkingTiles/PlainCollection3.jpg";
import img4 from "../../../assets/ParkingTiles/PunchCollection1.jpg";
import img5 from "../../../assets/ParkingTiles/PunchCollection2.jpg";
import img6 from "../../../assets/ParkingTiles/PunchCollection3.jpg";
import img7 from "../../../assets/ParkingTiles/PunchCollection4.jpg";
import img8 from "../../../assets/ParkingTiles/PunchCollection5.jpg";
import pdf1 from "../../../assets/pdf/PLAIN COLLECTION-1.pdf"
import pdf2 from "../../../assets/pdf/PLAIN COLLECTION-2.pdf"
import pdf3 from "../../../assets/pdf/PLAIN COLLECTION-3.pdf"
import pdf4 from "../../../assets/pdf/PUNCH COLLECTION-1.pdf"
import pdf5 from "../../../assets/pdf/PUNCH COLLECTION-2.pdf"
import pdf6 from "../../../assets/pdf/PUNCH COLLECTION-3.pdf"
import pdf7 from "../../../assets/pdf/PUNCH COLLECTION-4.pdf"
import pdf8 from "../../../assets/pdf/PUNCH COLLECTION-5.pdf"
import BackgroundImage from "../../../assets/BannerImage3.png";

const goldenCollection = [
  {
    title: "FISH POSTER",
    mainImage: img1,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf1,
  },
  {
    title: "GLITTER SERIES",
    mainImage: img2,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf2,
  },
  {
    title: "GLOSSY 1",
    mainImage: img3,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf3,
  },
  {
    title: "PUNCH COLLECTION 1",
    mainImage: img4,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf4,
  },
  {
    title: "PUNCH COLLECTION 2",
    mainImage: img5,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf5,
  },
  {
    title: "PUNCH COLLECTION 3",
    mainImage: img6,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf6,

  },
  {
    title: "PUNCH COLLECTION 4",
    mainImage: img7,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf7,
  },
  {
    title: "PUNCH COLLECTION 5",
    mainImage: img8,
    hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of cooors and textures, they offer endless possiblilites for crafting a stunning space. ",
    pdf: pdf8,
  }
];
const Collection2 = () => {
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
      py: { xs: 4, md: 6 }
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
            400X400 PARKING TILES
          </Typography>
  
                   <Typography
                                           variant="body1"
                                           sx={{
                                             mt: 1,
                                             fontSize: { xs: "0.95rem", sm: "1.2rem" },
                                             color: { xs: "black", sm: "white" }, 
                                           }}
                                         >
            Anti-skid, weather-resistant tiles for outdoor projects.
          </Typography>
          
        </Box>

        {/* COLLECTION CARDS */}
        <Box sx={{ marginTop: 3 }}>
          {goldenCollection.map((item, index) => (
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
      `}</style>
    </Box>
  );
}

export default Collection2;