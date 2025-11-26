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
  import("../ServicesCollectionCard ") // FIXED path (removed extra space)
);

import pdf from "../../../assets/pdf/EAGLE GLOSSY ENDLESS-V2-COLLECTION_600X1200MM_compressed.pdf";
import fishposter from "../../../assets/WallTiles/Fishposter.jpg";

// -----------------------------
// CORRECT DATA FOR THE NEW CARD
// -----------------------------
const goldenCollection = [
  {
    mainImage: fishposter,
    // title: "FISH POSTER",
    hoverParagraph: "This beautiful fish poster brings elegance to your walls.",
  },
];

const Walltiles = () => {
  // -------------------------
  // STATE FOR PDF MODAL
  // -------------------------
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
        FISH POSTER
      </Typography>

      {/* COLLECTION LOOP */}
      <Box>
        {goldenCollection.map((item, index) => (
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

export default Walltiles;
