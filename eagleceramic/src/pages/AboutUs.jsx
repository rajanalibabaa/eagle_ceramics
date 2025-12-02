import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import carving from "../assets/FloorTiles/Carvingcollection.jpg";

// Rotation animation
const rotateAnim = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const AboutUs = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 9, md: 8 },
        flexDirection: { xs: "column", md: "row" },
        py: { xs: 6, sm: 7, md: 8 },
        px: { xs: 2, sm: 3, md: 6, lg: 10 },
      }}
    >
      <Box sx={{ position: "relative", width: { xs: "100%", md: "50%" } }}>
        <Box
          component="img"
          src={carving}
          alt="Exhibition Center"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: { xs: "31%",sm: "300px", md: "-90px" },
            bottom: { xs: "-60px",sm: "-60px", md: "130px" },
            transform: {
              xs: "translateX(50%)",
              sm: "translateX(50%)",
              md: "none",
            },
            width: { xs: 140, sm: 160, md: 200 },
            height: { xs: 140, sm: 160, md: 200 },
            animation: `${rotateAnim} 12s linear infinite`,
            borderRadius: "50%",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 4, sm: 6, md: 10 },
            zIndex: 3,
          }}
        >
          {/* Dashed Border */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px dashed #b5b5b5",
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

      <Box sx={{ width: { xs: "100%", md: "50%" } ,ml:{md:5}}}>
        <Typography
          sx={{
            fontSize: { xs: 20, sm: 28, md: 34 },
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            lineHeight: 1.3,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          About Eagle Ceramics: The Leading Tiles Company in India
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13, sm: 15, md: 16 },
            color: "#555",
            lineHeight: 1.7,
            mb: { xs: 3, sm: 3.5 },
            textAlign: { xs: "justify", md: "justify" },
          }}
        >
         At <strong>Eagle Ceramics</strong> and Gaurada Ceramics, we bring over three decades of expertise in supplying high-quality tiles and ceramic products to builders, contractors, architects, interior designers, and commercial project developers. With a strong B2B supply chain and an unmatched product portfolio, we ensure consistent quality, timely delivery, and value-driven pricing for every project.
        </Typography>

        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d11f25",
              color: "white",
              px: { xs: 3, sm: 4 },
              py: 1.5,
              borderRadius: 0,
               "&:hover": {
                      background: "linear-gradient(135deg, #E55A2B, #E57C3B)",
                    }
            }}
          >
            KNOW MORE
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
  );
};

export default AboutUs;
