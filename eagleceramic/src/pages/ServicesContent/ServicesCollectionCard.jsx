import React from "react";
import { Box, Typography } from "@mui/material";

const ServicesCollectionCard = ({
  mainImage,
  title = "Collection Title",
  hoverParagraph = "This is the paragraph that appears when hovering.",
  subtitle = "Explore More",
  titleColor = "black",
  subtitleColor = "#b51a1a",
  overlayBg = "rgba(255,255,255,0.55)",
  pdfFile,
  onExploreClick,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "70%",
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
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

          "& .hoverContent": {
            opacity: 0,
            transition: "opacity 0.45s ease",
          },

          "&:hover .hoverContent": {
            opacity: 1,
          },

          "& .hoverOverlay": {
            opacity: 0,
            transition: "opacity 0.45s ease",
          },

          "&:hover .hoverOverlay": {
            opacity: 1,
          },
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={mainImage}
          sx={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            transition: "transform 0.45s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* HOVER DARK OVERLAY */}
        <Box
          className="hoverOverlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)",
            backdropFilter: "blur(2px)",
            zIndex: 2,
          }}
        />

        {/* HOVER CONTENT */}
        <Box
          className="hoverContent"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
            padding: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {/* TITLE AT TOP */}
          <Box
            sx={{
              position: "absolute",
              top: 20,
              left: 0,
              width: "100%",
              textAlign: "center",
              zIndex: 5,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "18px", sm: "24px", md: "28px" },
                fontWeight: 700,
                color: "#fff",
                textShadow: "0 2px 6px rgba(0,0,0,0.6)",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* PARAGRAPH */}
          <Box
            sx={{
              textAlign: "justify",
              maxWidth: "90%",
              mb: 3,
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "12px",
              padding: { xs: 2, sm: 3 },
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >

            <Typography
              sx={{
                color: "#fff",
                fontSize: {
                  xs: "10px",
                  sm: "16px",
                  md: "18px",
                },
                lineHeight: {
                  xs: 1.5,
                  sm: 1.6,
                  md: 1.7,
                },
                fontWeight: 400,
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                letterSpacing: "0.3px",
              }}
            >
              {hoverParagraph}
            </Typography>
          </Box>

          {/* EXPLORE BUTTON — NOW PROPERLY CENTERED */}
          <Box
            component="button"
            onClick={(e) => {
              e.stopPropagation();
              onExploreClick && onExploreClick(pdfFile);
            }}
            sx={{
              position: "absolute",
              left: "50%",
              bottom: 30,
              transform: "translateX(-50%)",
              padding: {
                xs: "8px 20px",
                sm: "10px 24px",
                md: "12px 28px",
              },
              background:
                "linear-gradient(135deg, #ff0062 0%, #d60055 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontSize: {
                xs: "14px",
                sm: "15px",
                md: "16px",
              },
              fontWeight: 600,
              cursor: "pointer",
              backdropFilter: "blur(5px)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(255, 0, 98, 0.3)",
              letterSpacing: "0.5px",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #d60055 0%, #b30048 100%)",
                transform: "translate(-50%, -2px)",
                boxShadow: "0 6px 20px rgba(255, 0, 98, 0.4)",
              },
              "&:active": {
                transform: "translate(-50%, 0)",
              },
            }}
          >
            {subtitle}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesCollectionCard;
