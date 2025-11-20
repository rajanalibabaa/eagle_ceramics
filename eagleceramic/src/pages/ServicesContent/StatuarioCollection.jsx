import React from 'react'
import { Box, Typography } from "@mui/material";
import AdisonWhite from "../../assets/AdisonWhite.jpg";
import AdisonWhiteHover from "../../assets/AdisonWhiteHover.jpg";

const StatuarioCollection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        position: "relative",
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 4,
        cursor: "pointer",
      }}
    >
      {/* IMAGE WRAPPER */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "500px",

          // INITIAL STATES for your images
          "& .mainImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            transition: "all 0.5s ease",
          },
          "& .hoverImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0,
            transition: "all 0.5s ease",
          },

          // HOVER STATES
          "&:hover .mainImage": {
            opacity: 0,
            transform: "scale(1.08)",
          },
          "&:hover .hoverImage": {
            opacity: 1,
            transform: "scale(1.08)",
          },
          "&:hover .exploreText": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        }}
      >
        {/* MAIN IMAGE */}
        <Box
          component="img"
          src={AdisonWhite}
          alt="Adison White Collection"
          className="mainImage"
        />

        {/* HOVER IMAGE */}
        <Box
          component="img"
          src={AdisonWhiteHover}
          alt="Adison White Collection Hover"
          className="hoverImage"
        />

        {/* TITLE OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: "rgba(255,255,255,0.55)",
            py: 3,
            textAlign: "center",
            backdropFilter: "blur(3px)",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              letterSpacing: "2px",
              color: "#000",
              fontFamily: "serif",
              fontWeight: 600,
            }}
          >
            Adison White 
          </Typography>

          <Typography
            className="exploreText"
            sx={{
              mt: 1,
              fontSize: "18px",
              color: "#b51a1a",
              opacity: 0,
              transform: "translateY(15px)",
              transition: "all 0.4s ease",
              fontWeight: 500,
            }}
          >
            Explore Collections
          </Typography>
        </Box>
      </Box>
          {/* IMAGE WRAPPER */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "500px",

          // INITIAL STATES for your images
          "& .mainImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
            transition: "all 0.5s ease",
          },
          "& .hoverImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: 0,
            transition: "all 0.5s ease",
          },

          // HOVER STATES
          "&:hover .mainImage": {
            opacity: 0,
            transform: "scale(1.08)",
          },
          "&:hover .hoverImage": {
            opacity: 1,
            transform: "scale(1.08)",
          },
          "&:hover .exploreText": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        }}
      >
        {/* MAIN IMAGE */}
        <Box
          component="img"
          src={AdisonWhite}
          alt="Adison White Collection"
          className="mainImage"
        />

        {/* HOVER IMAGE */}
        <Box
          component="img"
          src={AdisonWhiteHover}
          alt="Adison White Collection Hover"
          className="hoverImage"
        />

        {/* TITLE OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: "rgba(255,255,255,0.55)",
            py: 3,
            textAlign: "center",
            backdropFilter: "blur(3px)",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "28px",
              letterSpacing: "2px",
              color: "#000",
              fontFamily: "serif",
              fontWeight: 600,
            }}
          >
            Adison White 
          </Typography>

          <Typography
            className="exploreText"
            sx={{
              mt: 1,
              fontSize: "18px",
              color: "#b51a1a",
              opacity: 0,
              transform: "translateY(15px)",
              transition: "all 0.4s ease",
              fontWeight: 500,
            }}
          >
            Explore Collections
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};


export default StatuarioCollection