import React, { useState, useCallback, lazy, Suspense } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
const ServicesCollectionCard = lazy(() =>
  import("../ServicesCollectionCard ")
);
import ThumbnailRow from "./ThumbnailRow";

import vintage  from "../../../assets/Vintage.jpg";
import vintage201 from "../../../assets/Vintage201.jpg";
import vintage202 from "../../../assets/Vintage202.jpg";
import vintage203 from "../../../assets/Vintage203.jpg";
import vintage204 from "../../../assets/Vintage204.jpg";
import vintage205 from "../../../assets/Vintage205.jpg";
import vintage206 from "../../../assets/Vintage206.jpg";
import vintage207 from "../../../assets/Vintage207.jpg";

import marvel from "../../../assets/MARVEL.jpg";
import marvel201 from "../../../assets/MARVEL201.jpg";
import marvel202 from "../../../assets/MARVEL202.jpg";
import marvel203 from "../../../assets/MARVEL203.jpg";
import marvel204 from "../../../assets/MARVEL204.jpg";
import marvel205 from "../../../assets/MARVEL205.jpg";
import marvel206 from "../../../assets/MARVEL206.jpg";
import marvel207 from "../../../assets/MARVEL207.jpg";
import marvel208 from "../../../assets/MARVEL208.jpg";
import marvel209 from "../../../assets/MARVEL209.jpg";

import linex from "../../../assets/linex.jpg";
import linex201 from "../../../assets/Linex201.jpg";
import linex202 from "../../../assets/Linex202.jpg";
import linex203 from "../../../assets/Linex203.jpg";
import linex204 from "../../../assets/Linex204.jpg";
import linex205 from "../../../assets/Linex205.jpg";
import linex206 from "../../../assets/Linex206.jpg";
import linex207 from "../../../assets/Linex207.jpg";
import linex208 from "../../../assets/Linex208.jpg";
import linex209 from "../../../assets/Linex209.jpg";

import europa201 from "../../../assets/Europa201.jpg";
import europa202 from "../../../assets/Europa202.jpg";
import europa203 from "../../../assets/Europa203.jpg";
import europa204 from "../../../assets/Europa204.jpg";
import europa205 from "../../../assets/Europa205.jpg";
import europa206 from "../../../assets/Europa206.jpg";
import europa207 from "../../../assets/Europa207.jpg";
import europa208 from "../../../assets/Europa208.jpg";

import fossil from "../../../assets/Fossil.jpg";
import fossil201 from "../../../assets/Fossil201.jpg";
import fossil202 from "../../../assets/Fossil202.jpg";
import fossil203 from "../../../assets/Fossil203.jpg";
import fossil204 from "../../../assets/Fossil204.jpg";
import fossil205 from "../../../assets/Fossil205.jpg";
import fossil206 from "../../../assets/Fossil206.jpg";
import fossil207 from "../../../assets/Fossil207.jpg";
import fossil208 from "../../../assets/Fossil208.jpg";
import fossil209 from "../../../assets/Fossil209.jpg";

import onyx from "../../../assets/Onyx.jpg";
import onyx201 from "../../../assets/Onyx201.jpg";
import onyx202 from "../../../assets/Onyx202.jpg";
import onyx203 from "../../../assets/Onyx203.jpg";
import onyx204 from "../../../assets/Onyx204.jpg";
import onyx205 from "../../../assets/Onyx205.jpg";
import onyx206 from "../../../assets/Onyx206.jpg";
import onyx207 from "../../../assets/Onyx207.jpg";
import onyx208 from "../../../assets/Onyx208.jpg";
import onyx209 from "../../../assets/Onyx209.jpg";
import onyx210 from "../../../assets/Onyx210.jpg";

import travo from "../../../assets/Travo.jpg";
import travo201 from "../../../assets/Travo201.jpg";
import travo202 from "../../../assets/Travo202.jpg";
import travo203 from "../../../assets/Travo203.jpg";
import travo204 from "../../../assets/Travo204.jpg";
import travo205 from "../../../assets/Travo205.jpg";
import travo206 from "../../../assets/Travo206.jpg";
import travo207 from "../../../assets/Travo207.jpg";
import travo208 from "../../../assets/Travo208.jpg";

const HighDepthV2 = () => {

  const setsData = [
      {
        title: "VINTAGE",
        default: vintage, 
        thumbnails: [
          { src: vintage201 }, { src: vintage202 }, { src: vintage203 },
          { src: vintage204 }, { src: vintage205 }, { src: vintage206 },
          { src: vintage207 }
        ],
      },
      {
        title: "MARVEL",
        default: marvel,
        thumbnails: [
          { src: marvel201 }, { src: marvel202 }, { src: marvel203 },
          { src: marvel204 }, { src: marvel205 }, { src: marvel206 },
          { src: marvel207 }, { src: marvel208 }, { src: marvel209 }
        ],
      },
      {
        title: "LINEX",
        default: linex,
        thumbnails: [
          { src: linex201 }, { src: linex202 }, { src: linex203 },
          { src: linex204 }, { src: linex205 }, { src: linex206 },
          { src: linex207 }, { src: linex208 }, { src: linex209 },
        ],
      },
      {
        title: "EUROPA",
        default: europa201,
        thumbnails: [
  
          { src: europa201 }, { src: europa202 }, { src: europa203 }, { src: europa204 }, { src: europa205 }, { src: europa206 }, { src: europa207 }, { src: europa208 },
        ],
      },
      {
        title: "FOSSIL",
        default: fossil,
        thumbnails: [
          { src: fossil201 }, { src: fossil202 }, { src: fossil203 },
          { src: fossil204 }, { src: fossil205 }, { src: fossil206 }, { src: fossil207 }, { src: fossil208 }, { src: fossil209 },
        ],
      },
      {
        title: "ONYX",
        default: onyx,
        thumbnails: [
          { src: onyx201 }, { src:   onyx202 }, { src: onyx203 },
          { src: onyx204 }, { src: onyx205 }, { src: onyx206 },
          { src: onyx207 }, { src: onyx208 }, { src: onyx209 }, { src: onyx210 },
        ],
      },
       {
        title: "TRAVO",
        default: travo,
        thumbnails: [
          { src: travo201 }, { src:   travo202 }, { src: travo203 },
          { src: travo204 }, { src: travo205 }, { src: travo206 },
          { src: travo207 }, { src: travo208 }
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
        High Depth Elevation - Version 2
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

export default HighDepthV2