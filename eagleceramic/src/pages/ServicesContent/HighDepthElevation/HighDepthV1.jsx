import React, { useState, useCallback, lazy, Suspense } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";

import pola from "../../../assets/PolaV1.jpg";
import pola201 from "../../../assets/Polo201.jpg";
import pola202 from "../../../assets/Polo202.jpg";
import pola203 from "../../../assets/Polo203.jpg";
import pola204 from "../../../assets/Pola204.jpg";
import pol0205 from "../../../assets/Polo205.jpg";
import polo206 from "../../../assets/Polo206.jpg";
import polo207 from "../../../assets/Polo207.jpg";
import polo208 from "../../../assets/Polo208.jpg";
import polo209 from "../../../assets/Polo209.jpg";
import polo210 from "../../../assets/Polo210.jpg";

import jet from "../../../assets/Jet.jpg";
import jet201 from "../../../assets/Jet201.jpg";
import jet202 from "../../../assets/Jet202.jpg";
import jet203 from "../../../assets/Jet203.jpg";
import jet204 from "../../../assets/Jet204.jpg";
import jet205 from "../../../assets/Jet205.jpg";
import jet206 from "../../../assets/Jet206.jpg";
import jet207 from "../../../assets/Jet207.jpg";
import jet208 from "../../../assets/Jet208.jpg";
import jet209 from "../../../assets/Jet209.jpg";
import jet210 from "../../../assets/Jet210.jpg";

import ferro from "../../../assets/Ferro.jpg";
import ferro201 from "../../../assets/Ferro201.jpg";
import ferro202 from "../../../assets/Ferro202.jpg";
import ferro203 from "../../../assets/Ferro203.jpg";
import ferro204 from "../../../assets/Ferro204.jpg";
import ferro205 from "../../../assets/Ferro205.jpg";
import ferro206 from "../../../assets/Ferro206.jpg";
import ferro207 from "../../../assets/Ferro207.jpg";
import ferro208 from "../../../assets/Ferro208.jpg";

import Sigma from "../../../assets/Sigma.jpg";
import Sigma202 from "../../../assets/Sigma202.jpg";
import Sigma203 from "../../../assets/Sigma203.jpg";
import Sigma204 from "../../../assets/Sigma204.jpg";
import Sigma205 from "../../../assets/Sigma205.jpg";
import Sigma206 from "../../../assets/Sigma206.jpg";
import Sigma207 from "../../../assets/Sigma207.jpg";
import Sigma208 from "../../../assets/Sigma208.jpg";

import aura from "../../../assets/Aura.jpg";
import aura201 from "../../../assets/Aura201.jpg";
import aura202 from "../../../assets/Aura202.jpg";
import aura203 from "../../../assets/Aura203.jpg";
import aura204 from "../../../assets/Aura204.jpg";
import aura205 from "../../../assets/Aura205.jpg";
import aura206 from "../../../assets/Aura206.jpg";

import star from "../../../assets/Star.jpg";
import star201 from "../../../assets/Star201.jpg";
import star202 from "../../../assets/Star202.jpg";
import star203 from "../../../assets/Star203.jpg";
import star204 from "../../../assets/Star204.jpg";
import star205 from "../../../assets/Star205.jpg";
import star206 from "../../../assets/Star206.jpg";
import star207 from "../../../assets/Star207.jpg";
import star208 from "../../../assets/Star208.jpg";
import star209 from "../../../assets/Star209.jpg";


import ThumbnailRow from "./ThumbnailRow";

const ServicesCollectionCard = lazy(() =>
  import("../ServicesCollectionCard ")
);

const HighDepthV1 = () => {
  const setsData = [
    {
      title: "POLA",
      default: pola,
      thumbnails: [
        { src: pola201 }, { src: pola202 }, { src: pola203 },
        { src: pola204 }, { src: pol0205 }, { src: polo206 },
        { src: polo207 }, { src: polo208 }, { src: polo209 }, { src: polo210 },
      ],
    },
    {
      title: "JET",
      default: jet,
      thumbnails: [
        { src: jet201 }, { src: jet202 }, { src: jet203 },
        { src: jet204 }, { src: jet205 }, { src: jet206 },
        { src: jet207 }, { src: jet208 }, { src: jet209 }, { src: jet210 },
      ],
    },
    {
      title: "FERRO",
      default: ferro,
      thumbnails: [
        { src: ferro201 }, { src: ferro202 }, { src: ferro203 },
        { src: ferro204 }, { src: ferro205 }, { src: ferro206 },
        { src: ferro207 }, { src: ferro208 },
      ],
    },
    {
      title: "SIGMA",
      default: Sigma,
      thumbnails: [

        { src: Sigma }, { src: Sigma202 }, { src: Sigma203 }, { src: Sigma204 },
        { src: Sigma205 }, { src: Sigma206 }, { src: Sigma207 },
        { src: Sigma208 },
      ],
    },
    {
      title: "AURA",
      default: aura,
      thumbnails: [
        { src: aura201 }, { src: aura202 }, { src: aura203 },
        { src: aura204 }, { src: aura205 }, { src: aura206 },
      ],
    },
    {
      title: "STAR",
      default: star,
      thumbnails: [
        { src: star201 }, { src: star202 }, { src: star203 },
        { src: star204 }, { src: star205 }, { src: star206 },
        { src: star207 }, { src: star208 }, { src: star209 },
      ],
    },
  ];

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
  );
};

export default HighDepthV1;
