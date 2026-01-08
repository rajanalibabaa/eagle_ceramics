// ServicesCollectionCard.jsx remains exactly the same as your original
import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ContactFormModal from "./ContactFormModal";

const ServicesCollectionCard = ({
  imageUrl,
  title,
  description,
  buttonText,
  pdfFile,
  onExploreClick,
}) => {
  const theme = useTheme();

  // console.log("Rendering ServicesCollectionCard with imageUrl:", imageUrl);
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [openForm, setOpenForm] = React.useState(false);
  const [pendingPdf, setPendingPdf] = React.useState(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  // Responsive values
  const getResponsiveValues = () => {
    if (isMobile) {
      return {
        containerWidth: "100%",
        containerPadding: 0,
        height: "280px",
        titleFontSize: "18px",
        paragraphFontSize: "13px",
        paragraphLineHeight: 1.4,
        paragraphPadding: "16px",
        buttonPadding: "8px 20px",
        buttonFontSize: "13px",
        buttonBottom: "20px",
        titleTop: "15px",
        borderRadius: "8px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
      };
    }

    if (isTablet) {
      return {
        containerWidth: "85%",
        containerPadding: 1,
        height: "350px",
        titleFontSize: "22px",
        paragraphFontSize: "14px",
        paragraphLineHeight: 1.5,
        paragraphPadding: "20px",
        buttonPadding: "10px 24px",
        buttonFontSize: "14px",
        buttonBottom: "25px",
        titleTop: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.18)",
      };
    }

    if (isDesktop) {
      return {
        containerWidth: "80%",
        containerPadding: 2,
        height: "420px",
        titleFontSize: "26px",
        paragraphFontSize: "15px",
        paragraphLineHeight: 1.6,
        paragraphPadding: "24px",
        buttonPadding: "12px 28px",
        buttonFontSize: "15px",
        buttonBottom: "30px",
        titleTop: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
      };
    }

    // Large Desktop
    return {
      containerWidth: "70%",
      containerPadding: 3,
      height: "500px",
      titleFontSize: "32px",
      paragraphFontSize: "16px",
      paragraphLineHeight: 1.7,
      paragraphPadding: "28px",
      buttonPadding: "14px 32px",
      buttonFontSize: "16px",
      buttonBottom: "35px",
      titleTop: "30px",
      borderRadius: "14px",
      boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
    };
  };

  const responsive = getResponsiveValues();

  const handleButtonClick = (e) => {
    e.stopPropagation();
    const alreadySubmitted =
      localStorage.getItem("collection_form_submitted") === "true";
    if (alreadySubmitted) {
      window.open(pdfFile, "_blank");
      return;
    }
    setPendingPdf(pdfFile);
    setOpenForm(true);
  };

  const handleFormSubmit = () => {
    if (pendingPdf) {
      window.open(pendingPdf, "_blank");
    }
    setPendingPdf(null);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          px: { xs: 2, sm: 3, md: 4 },
          mb: { xs: 2.5, sm: 3, md: 4, lg: 5 },
        }}
      >
        <Box
          sx={{
            width: responsive.containerWidth,
            position: "relative",
            cursor: "pointer",
            maxWidth: { xs: "500px", sm: "600px", md: "700px", lg: "800px" },
            transition: "all 0.3s ease",
            "&:hover": {
              transform: isMobile ? "none" : "translateY(-5px)",
              boxShadow: isMobile
                ? responsive.boxShadow
                : "0 15px 35px rgba(0,0,0,0.3)",
            },
            ...(isMobile && {
              "&:active": {
                transform: "scale(0.98)",
                transition: "transform 0.1s ease",
              },
            }),
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: responsive.height,
              borderRadius: responsive.borderRadius,
              boxShadow: responsive.boxShadow,
              "& .hoverContent": {
                opacity: isMobile ? 0 : 0,
                transition: "opacity 0.45s ease",
              },
              "&:hover .hoverContent": {
                opacity: isMobile ? 0 : 1,
              },
              "& .hoverOverlay": {
                opacity: isMobile ? 0 : 0,
                transition: "opacity 0.45s ease",
              },
              "&:hover .hoverOverlay": {
                opacity: isMobile ? 0 : 1,
              },
            }}
          >
            <Box
              component="img"
              src={imageUrl}
              alt={title}
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transition: "transform 0.6s ease",
                "&:hover": {
                  transform: isMobile ? "none" : "scale(1.05)",
                },
              }}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageLoaded(true);
                setImageError(true);
              }}
            />

            {/* Loading Overlay */}
            {!imageLoaded && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.8)",
                  zIndex: 1,
                }}
              >
                <CircularProgress />
              </Box>
            )}

            {/* EXPLORE BUTTON – ALWAYS VISIBLE */}
            {isMobile && (
              <Box
                component="button"
                onClick={handleButtonClick}
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: responsive.buttonBottom,
                  transform: "translateX(-50%)",
                  padding: responsive.buttonPadding,
                  background:
                    "linear-gradient(135deg, #ff0062 0%, #d60055 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: responsive.buttonFontSize,
                  fontWeight: 600,
                  cursor: "pointer",
                  zIndex: 5,
                  boxShadow: "0 4px 15px rgba(255, 0, 98, 0.4)",
                  letterSpacing: "0.5px",
                  minWidth: "140px",
                  minHeight: "40px",
                  "&:active": {
                    transform: "translate(-50%, 0)",
                  },
                }}
              >
                {buttonText}
              </Box>
            )}

            {/* HOVER DARK OVERLAY */}
            <Box
              className="hoverOverlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: isMobile
                  ? "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)"
                  : "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)",
                backdropFilter: isMobile ? "blur(1px)" : "blur(2px)",
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
                padding: { xs: 2, sm: 2.5, md: 3, lg: 4 },
              }}
            >
              {/* TITLE AT TOP */}
              <Box
                sx={{
                  position: "absolute",
                  top: responsive.titleTop,
                  left: 0,
                  width: "100%",
                  textAlign: "center",
                  zIndex: 5,
                  px: { xs: 2, sm: 3, md: 4 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: responsive.titleFontSize,
                    fontWeight: { xs: 700, sm: 800, md: 900 },
                    color: "#fff",
                    textShadow: "0 2px 6px rgba(0,0,0,0.8)",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
              </Box>

              {/* PARAGRAPH */}
              <Box
                sx={{
                  textAlign: "justify",
                  width: "100%",
                  maxWidth: { xs: "95%", sm: "90%", md: "85%", lg: "100%" },
                  mb: { xs: 2, sm: 2.5, md: 2 },
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                  borderRadius: { xs: "8px", sm: "10px", md: "12px" },
                  padding: responsive.paragraphPadding,
                  border: "1px solid rgba(255,255,255,0.25)",
                  WebkitBackdropFilter: isMobile ? "blur(8px)" : "blur(12px)",
                  overflowY: "auto",
                  maxHeight: isMobile ? "150px" : isTablet ? "180px" : "280px",
                }}
              >
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: responsive.paragraphFontSize,
                    lineHeight: responsive.paragraphLineHeight,
                    fontWeight: { xs: 400, sm: 500 },
                    textAlign: "center",
                    textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                    letterSpacing: { xs: "0.2px", sm: "0.3px", md: "0.4px" },
                  }}
                >
                  {description}
                </Typography>
              </Box>

              {/* EXPLORE BUTTON */}
              <Box
                component="button"
                onClick={handleButtonClick}
                sx={{
                  position: "absolute",
                  left: "50%",
                  bottom: responsive.buttonBottom,
                  transform: "translateX(-50%)",
                  padding: responsive.buttonPadding,
                  background:
                    "linear-gradient(135deg, #ff0062 0%, #d60055 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: { xs: "25px", sm: "28px", md: "30px" },
                  fontSize: responsive.buttonFontSize,
                  fontWeight: 600,
                  cursor: "pointer",
                  backdropFilter: "blur(5px)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(255, 0, 98, 0.4)",
                  letterSpacing: "0.5px",
                  minWidth: { xs: "140px", sm: "160px", md: "180px" },
                  minHeight: { xs: "40px", sm: "44px", md: "48px" },
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #d60055 0%, #b30048 100%)",
                    transform: isMobile
                      ? "translateX(-50%)"
                      : "translate(-50%, -2px)",
                    boxShadow: "0 6px 20px rgba(255, 0, 98, 0.5)",
                  },
                  "&:active": {
                    transform: "translate(-50%, 0)",
                    transition: "transform 0.1s ease",
                  },
                }}
              >
                {buttonText}
              </Box>
            </Box>
          </Box>
        </Box>
        <ContactFormModal
          open={openForm}
          onClose={() => setOpenForm(false)}
          onSubmit={handleFormSubmit}
        />
      </Box>
    </>
  );
};

export default ServicesCollectionCard;
