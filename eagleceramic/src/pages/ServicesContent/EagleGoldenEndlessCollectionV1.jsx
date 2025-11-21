import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


const ServicesCollectionCard = lazy(() =>
  import("../ServicesContent/ServicesCollectionCard ")
);

const EagleGoldenEndlessCollectionV1 = () => {
  return (
      <Container maxWidth="lg" sx={{ py: 4 }}>

      <Typography
        variant="h4"
        align="center"
        sx={{ color: "#F87B1B", mb: 4 }}
      >
        Golden Endless Collection - Version 1
      </Typography>

      {goldenCollection.map((item, index) => (
        <Box key={index} sx={{ mt: index === 0 ? 0 : 12 }}>
          <Suspense
            fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
          >
            <ServicesCollectionCard
              mainImage={item.main}
              hoverImage={item.hover}
              title={item.title}
              subtitle="Explore More"
              pdfFile={pdf}
              onExploreClick={handleOpenPdf}
            />
          </Suspense>
        </Box>
      ))}

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

export default EagleGoldenEndlessCollectionV1