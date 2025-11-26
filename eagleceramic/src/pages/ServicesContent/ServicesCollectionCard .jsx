import React from "react";
import { Box, Typography } from "@mui/material";

const ServicesCollectionCard = ({
  mainImage,
  // title = "SIGNATURE COLLECTION",
  hoverParagraph = "This is the paragraph that appears when hovering. Background image remains visible.",
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
          }}
        />

        {/* TOP TITLE */}
        {/* <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",
            textAlign: "center",
            py: { xs: 1, sm: 1.5, md: 2 },
            zIndex: 3,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", sm: "24px", md: "28px" },
              fontWeight: 700,
              color: titleColor,
            }}
          >
            {title}
          </Typography>
        </Box> */}

        {/* HOVER DARK OVERLAY */}
        <Box
          className="hoverOverlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.50)",
            backdropFilter: "blur(3px)",
            zIndex: 2,
          }}
        />

        {/* HOVER PARAGRAPH */}
        <Box
          className="hoverContent"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            maxWidth: "80%",
            zIndex: 3,
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            {hoverParagraph}
          </Typography>
        </Box>

        {/* BOTTOM BUTTON */}
        <Box
          className="hoverContent"
          sx={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            textAlign: "center",
            zIndex: 4,
          }}
        >
          <Box
            component="button"
            onClick={(e) => {
              e.stopPropagation();
              onExploreClick && onExploreClick(pdfFile);
            }}
            style={{
              padding: "10px 24px",
              background: "#ff0062",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              backdropFilter: "blur(5px)",
              transition: "0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#d60055")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#ff0062")}
          >
            {subtitle}
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default ServicesCollectionCard;
