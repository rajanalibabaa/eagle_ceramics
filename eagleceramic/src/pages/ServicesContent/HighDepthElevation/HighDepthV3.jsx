import React, { useState, useCallback, lazy, Suspense } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";


import ThumbnailRow from "./ThumbnailRow";

const ServicesCollectionCard = lazy(() =>
  import("../ServicesCollectionCard ")
);

const HighDepthV3 = () => {

  const [selectedImages, setSelectedImages] = useState(
      setsData.map((set) => set.default)
    );
  
    const handleImageChange = useCallback((setIndex, img) => {
      if (!img?.src) return;
  
      setSelectedImages((prev) => {
        const updated = [...prev];
        updated[setIndex] = img.src;
        return updated;
      });
    }, []);
  return (
  <Container maxWidth="lg" >
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
        High Depth Elevation - Version 1
      </Typography>

      {/* LOOP THROUGH ALL SETS */}
      {setsData.map((set, index) => (
        <Box key={index} sx={{ mt: index === 0 ? 3 : 6 }}>
          <Suspense
            fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 1000,
                mx: "auto",
                height: { xs: 300, sm: 420, md: 400 },
                overflow: "hidden",
                borderRadius: 2,
              }}
            >
              <ServicesCollectionCard
                mainImage={selectedImages[index]}
                hoverImage={selectedImages[index]}
                title={set.title}
                subtitle="Explore More"
              />
            </Box>

            <Typography align="center" sx={{ mt: 1, fontWeight: 600 }}>
              {set.title}
            </Typography>
          </Suspense>

          {/* THUMBNAILS */}
          <ThumbnailRow
            images={set.thumbnails}
            selectedSrc={selectedImages[index]}
            onImageClick={(img) => handleImageChange(index, img)}
          />
        </Box>
      ))}
    </Container>
    )
}

export default HighDepthV3