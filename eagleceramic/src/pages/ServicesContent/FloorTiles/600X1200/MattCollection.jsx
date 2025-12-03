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

import pdf1 from "../../../../assets/pdf/Carvingcollection.pdf";
import pdf2 from "../../../../assets/pdf/Endlesscollection.pdf";
import carving from "../../../../assets/FloorTiles/Carvingcollection.jpg"
import endless from "../../../../assets/FloorTiles/Endlesscollection.jpg"
import BackgroundImage from "../../../../assets/BannerImage3.png";

const goldenCollection = [
{
   title: "CARVING COLLECTION",
         mainImage: carving,
         hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of colors and textures, they offer endless possibilities for crafting a stunning space.",
         pdf: pdf1,
},
{
    title: "ENDLESS COLLECTION",
        mainImage: endless,
        hoverParagraph: "Decorate your walls with the pristine, polished look of our surfaces, elevating your interiors to new heights of sophistication and luxury. Our surfaces provide the perfect backdrop for creating timeless, classic spaces. Ideal for both modern and traditional interiors, these wall tiles are highly practical and low-maintenance. Available in a variety of colors and textures, they offer endless possibilities for crafting a stunning space.",
        pdf: pdf2,
}

];

const MattCollection = () => {
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
            mb: 8,
            pt: 4,
            pb: 4,
            background: `
              linear-gradient(135deg, rgba(15,32,39,0.95) 0%, rgba(32,58,67,0.9) 50%, rgba(44,83,100,0.95) 100%),
              linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(1,107,97,0.2) 100%)
            `,
            backgroundImage: `url(${BackgroundImage})`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderImage: "linear-gradient(45deg, #FFD700, #016B61, #FFD700) 1",
            borderRadius: "25px",
            // boxShadow: `
            //   0 25px 50px rgba(0,0,0,0.5),
            //   0 0 0 1px rgba(255,215,0,0.3),
            //   inset 0 1px 0 rgba(255,255,255,0.2)
            // `,
            overflow: "hidden",
            "::before": {
              content: '""',
              position: "absolute",
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: "linear-gradient(45deg, transparent, rgba(255,215,0,0.1), transparent)",
              zIndex: -1,
              animation: "glowBorder 3s ease-in-out infinite alternate",
            },
            animation: "floatHeader 6s ease-in-out infinite",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#ffffffff",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
              lineHeight: 1,
              mb: 2,
              whiteSpace: "nowrap",
              fontSize: { xs: "2rem", sm: "3rem", md: "3.7rem", lg: "4.5rem" },
              textShadow: `
                0 0 10px rgba(255,215,0,0.8),
                0 2px 4px rgba(0,0,0,0.8)
              `,
              fontFamily: "'Montserrat', 'Roboto', sans-serif",
            }}
          >
            MATT COLLECTIONS
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#E8F4F8",
              fontWeight: 400,
              mb: 4,
              px: 4,
              fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" },
              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Durable, stylish, and suitable for heavy-traffic areas
          </Typography>
          <Box
            sx={{
              height: 4,
              background: "linear-gradient(90deg, #FFD700, #016B61, #FFD700)",
              borderRadius: 2,
              animation: "shineLine 2s ease-in-out infinite",
              boxShadow: "0 0 10px rgba(255,215,0,0.6)",
            }}
          />
        </Box>

        {/* COLLECTION CARDS */}
        <Box sx={{ marginTop: 10 }}>
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
};

export default MattCollection;