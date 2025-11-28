import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/system";
import carving from "../assets/FloorTiles/Carvingcollection.jpg";

// Smooth rotation
const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AboutUs = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 4, md: 8 },
        flexDirection: { xs: "column", md: "row" },
        py: 8,
        px: { xs: 2, md: 6 }
      }}
    >
      {/* Left Image Section */}
      <Box sx={{ position: "relative", width: { xs: "100%", md: "50%" } }}>
        <Box
          component="img"
          src={carving}
          alt="Exhibition Center"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />

        {/* Rotating Outer Circle */}
       <Box
  sx={{
    position: "absolute",
    right: "-90px",
    bottom: "130px",
    width: { xs: "150px", md: "200px" },
    height: { xs: "150px", md: "200px" },
    animation: `${rotateAnim} 12s linear infinite`,
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 10,
  }}
>
  {/* Dashed Border */}
  <Box
    sx={{
      position: "absolute",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "2px dashed #b5b5b5",
    }}
  />

  {/* Curved Text */}
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 200 200"
    style={{ position: "absolute" }}
  >
    <defs>
      <path
        id="circlePath"
        d="
          M 100, 100
          m -60, 0
          a 60,60 0 1,1 120,0
          a 60,60 0 1,1 -120,0
        "
      />
    </defs>

    <text fill="#757575" fontSize="13" fontWeight="500" letterSpacing="2px">
      <textPath href="#circlePath" startOffset="0%">
        EXPERIENCE IN INDUSTRY   •   EXPERIENCE IN INDUSTRY   •
      </textPath>
    </text>
  </svg>
</Box>

        {/* Inner Circle (Static) */}
      <Box
  sx={{
    position: "absolute",
    right: "-90px",
    bottom: "130px",
    width: { xs: "150px", md: "200px" },
    height: { xs: "150px", md: "200px" },
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  }}
>
  <Box
    sx={{
      width: "50%",
      height: "50%",
      background: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    }}
  >
    <Typography sx={{ fontSize: { xs: "20px", md: "28px" }, fontWeight: "700" }}>
      20+
    </Typography>
    <Typography sx={{ fontSize: "12px", letterSpacing: "2px" }}>
      YEARS
    </Typography>
  </Box>
</Box>
      </Box>

      {/* Right Content Section */}
      <Box sx={{ width: { xs: "100%", md: "50%" }, ml: { xs: 0, md: 5 } }}>
        <Typography
          sx={{
            fontSize: { xs: "26px", md: "34px" },
            fontWeight: 700,
            mb: 2,
            lineHeight: 1.3
          }}
        >
          About Eagle Ceramics: The Leading Vitrified Tiles Company in India
        </Typography>

        <Typography
          sx={{
            fontSize: "16px",
            color: "#555",
            lineHeight: 1.7,
            mb: 3
          }}
        >
          At Eagle Ceramics, we curate collections that bring together beauty,
          innovation, and strength Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus tenetur ducimus fuga temporibus, sint error, impedit eos, laboriosam modi officiis dolorem non obcaecati asperiores iste qui cum vel saepe sit!
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: "black",
            color: "white",
            px: 4,
            py: 1.5,
            borderRadius: 0,
            "&:hover": { background: "#333" }
          }}
        >
          KNOW MORE
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
