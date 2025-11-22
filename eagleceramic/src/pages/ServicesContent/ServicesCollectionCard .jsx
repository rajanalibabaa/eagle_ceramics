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
  pdfFile,
  onExploreClick,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: "600px", md: "900px", lg: "1200px" },
        mx: "auto",
        mb:3,
        position: "relative",
        cursor: "pointer",
      }}
      onClick={() => onExploreClick && onExploreClick(pdfFile)}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          height: {
            xs: "260px",   
            sm: "320px",   
            md: "420px",   
            lg: "500px",   
          },
          "& .mainImage, & .hoverImage": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain", 
            transition: "all 0.5s ease",
          },
          "& .hoverImage": {
            opacity: 0,
          },
          "&:hover .mainImage": {
            opacity: 0,
            transform: "scale(1.06)",
          },
          "&:hover .hoverImage": {
            opacity: 1,
            transform: "scale(1.06)",
          },
          "&:hover .exploreText": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        }}
      >
        {/* Main Image */}
        <Box component="img" src={mainImage} alt={title} className="mainImage" />

        {/* Hover Image */}
        <Box
          component="img"
          src={hoverImage}
          alt={`${title} hover`}
          className="hoverImage"
        />

        {/* Bottom Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: overlayBg,
            py: { xs: 1.5, sm: 2.5, md: 3 },
            textAlign: "center",
            backdropFilter: "blur(4px)",
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "22px", md: "26px", lg: "28px" },
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
            onClick={(e) => {
              e.stopPropagation();
              onExploreClick && onExploreClick(pdfFile);
            }}
            sx={{
              mt: 1,
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              color: subtitleColor,
              opacity: 0,
              transform: "translateY(15px)",
              transition: "all 0.4s ease",
              fontWeight: 500,
              cursor: "pointer",
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