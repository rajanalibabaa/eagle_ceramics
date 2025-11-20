import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ServicesCollectionCard = lazy(() =>
  import("../ServicesContent/ServicesCollectionCard ")
);

import goldenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.jpg";
import goldenHover from "../../assets/EAGLE GOLDEN AdersonBlue.jpg";
import aliceMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey.jpg";
import aliceHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey2.jpg";
import bentonMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonMain.jpg";
import bentonHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonSub.jpg";

import pdf from "../../assets/pdf/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.pdf";

const EagleGoldenEndlessCollection = memo(() => {
  const [openPdf, setOpenPdf] = useState(false);
  const [currentPdf, setCurrentPdf] = useState("");

  const handleOpenPdf = useCallback((pdfFile) => {
    setCurrentPdf(pdfFile);
    setOpenPdf(true);
  }, []);

  const handleClosePdf = useCallback(() => {
    setOpenPdf(false);
    setCurrentPdf("");
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      
    <Box >
      <Typography
        variant="h4"
        align="center"
        sx={{ color: "#F87B1B", mb: 4 }}
      >
        Golden Endless Collection - Version 1
      </Typography>

      <Suspense fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}>
        <ServicesCollectionCard
          mainImage={goldenMain}
          hoverImage={goldenHover}
          title="ADRESON BLUE"
          subtitle="Explore More"
          pdfFile={pdf}
          onExploreClick={handleOpenPdf}
        />
      </Suspense>
      </Box>

      <Box sx={{ mt: 12 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#F87B1B", mb: 4 }}
        >
          Golden Endless Collection - Version 2
        </Typography>

        <Suspense fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}>
          <ServicesCollectionCard
            mainImage={aliceMain}
            hoverImage={aliceHover}
            title="ALICE GREY"
            subtitle="Explore More"
            pdfFile={pdf}
            onExploreClick={handleOpenPdf}
          />
        </Suspense>
      </Box>

      <Box sx={{ mt: 12 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#F87B1B", mb: 4 }}
        >
          Golden Endless Collection - Version 3
        </Typography>

        <Suspense fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}>
          <ServicesCollectionCard
            mainImage={bentonMain}
            hoverImage={bentonHover}
            title="BENTON GREEN"
            subtitle="Explore More"
            pdfFile={pdf}
            onExploreClick={handleOpenPdf}
          />
        </Suspense>
      </Box>

      {/* PDF Modal */}
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
});

export default EagleGoldenEndlessCollection;
