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
       400 X 400
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
    </Container>  )
}

export default Collection2