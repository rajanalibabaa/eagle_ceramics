
import {Typography,Box} from "@mui/material";
import BackgroundImage from "../../assets/BannerImage2.png";
import ServicesCollectionCard from './ServicesCollectionCard ';

export default function CatalogPage() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          mb: { xs: 0, sm: 4 },
          pt: 1,
          // pb: {xs: 0, sm: 2},

          backgroundImage: {
            xs: "none",
            sm: `url(${BackgroundImage})`,
          },
          backgroundBlendMode: "overlay",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "25px",

          overflow: "hidden",
          "::before": {
            content: '""',
            position: "absolute",
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: {
              xs: "none",
              sm: "linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.84))",
            },
            zIndex: -1,
            animation: "glowBorder 3s ease-in-out infinite alternate",
          },
          animation: "floatHeader 6s ease-in-out infinite",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            mt: { xs: 0, sm: 3 },

            fontWeight: 700,
            fontSize: { xs: "2.8rem", sm: "3.5rem" },
            color: { xs: "black", sm: "white" },
          }}
        >
          ELEVATION TILES
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: 1,
            mb: 3,
            fontSize: { xs: "0.95rem", sm: "1.2rem" },
            color: { xs: "black", sm: "white" },
          }}
        >
          Premium 300 x 450 mm | High-Depth 3D Elevation Series
        </Typography>
      </Box>
      
      {/* <ServicesCollectionCard/> */}



    </>
  );
}
