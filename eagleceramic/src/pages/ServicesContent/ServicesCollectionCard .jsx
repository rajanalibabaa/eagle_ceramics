import React from "react";
import { Box, Typography } from "@mui/material";

const ServicesCollectionCard = ({
  mainImage,
  hoverImage,
  title = "SIGNATURE COLLECTION",
  subtitle = "Explore Collections",
  titleColor = "#000",
  subtitleColor = "#b51a1a",
  overlayBg = "rgba(255,255,255,0.55)",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "500px",
          "& .mainImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
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
        <Box
          component="img"
          src={mainImage}
          alt={title}
          className="mainImage"
        />

        <Box
          component="img"
          src={hoverImage}
          alt={`${title} hover`}
          className="hoverImage"
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: overlayBg,
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
              color: titleColor,
              fontFamily: "serif",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Typography
            className="exploreText"
            sx={{
              mt: 1,
              fontSize: "18px",
              color: subtitleColor,
              opacity: 0,
              transform: "translateY(15px)",
              transition: "all 0.4s ease",
              fontWeight: 500,
            }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesCollectionCard;