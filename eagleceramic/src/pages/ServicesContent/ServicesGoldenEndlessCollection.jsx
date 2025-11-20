import React from "react";
import { Box, Typography } from "@mui/material";
import img1 from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.jpg"
const ServicesGoldenEndlessCollection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "900px",
        mx: "auto",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* IMAGE WRAPPER */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          "&:hover .hoverText": {
            opacity: 1,
            transform: "translateY(0px)",
          },
        }}
      >
        {/* IMAGE */}
        <img
          src={img1}
          alt="Collection"
          style={{ width: "100%", display: "block" }}
        />

        {/* HOVER TEXT */}
        <Box
          className="hoverText"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 10px)",
            opacity: 0,
            transition: "0.4s ease",
            background: "rgba(255,255,255,0.9)",
            px: 2,
            py: 0.5,
            borderRadius: "4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            ADRESON BLUE
          </Typography>
        </Box>
      </Box>

      {/* BOTTOM TEXT SECTION */}
      <Box
        sx={{
          textAlign: "center",
          mt: -8,
          pb: 6,
          background: "rgba(255,255,255,0.6)",
          pt: 4,
        }}
      >
        {/* TITLE WITH LINES */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box sx={{ width: "50px", height: "2px", background: "#555" }} />
          <Typography
            sx={{
              fontSize: "28px",
              letterSpacing: "2px",
              fontWeight: 400,
              color: "#2a2a2a",
            }}
          >
            ADRESON BLUE
          </Typography>
          <Box sx={{ width: "50px", height: "2px", background: "#555" }} />
        </Box>

        {/* Explore link */}
        <Typography
          sx={{
            color: "red",
            fontSize: "18px",
            mt: 1.5,
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Explore Collection
        </Typography>
      </Box>
    </Box>
  );
};

export default ServicesGoldenEndlessCollection;
