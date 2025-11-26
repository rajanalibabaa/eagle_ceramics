import React from "react";
import { Box, Typography } from "@mui/material";

const ServicesCollectionCard = ({
  mainImage,
  title = "SIGNATURE COLLECTION",
  hoverParagraph = "This is the paragraph that appears when hovering. Background image remains visible.",
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
        maxWidth: "80%",
        mx: "auto",
        mb: 3,
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

          "& .hoverOverlay": {
            opacity: 0,
            background: "rgba(0, 0, 0, 0.45)", // Transparent black
            backdropFilter: "blur(2px)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "0.4s ease",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
          },

          "&:hover .hoverOverlay": {
            opacity: 1,
          },
        }}
      >
        {/* Main Image stays visible */}
        <Box
          component="img"
          src={mainImage}
          alt={title}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />

        {/* Hover Transparent Overlay With Text */}
        <Box className="hoverOverlay">
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              fontWeight: 400,
              lineHeight: 1.5,
            }}
          >
            {hoverParagraph}
          </Typography>
        </Box>

        {/* Bottom Title Section */}
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
            sx={{
              mt: 1,
              fontSize: { xs: "14px", sm: "16px", md: "18px" },
              color: subtitleColor,
              fontWeight: 500,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": { textDecoration: "underline" },
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
