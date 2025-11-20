import React, { useState, useEffect, useMemo, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";

import Banner from "../assets/BannerImage.png";
import Banner2 from "../assets/BannerImage2.png";
import Banner3 from "../assets/BannerImage3.png";
import Banner4 from "../assets/BannerImage4.png";
import Banner5 from "../assets/BannerImage5.png";

const preloadImages = (imageUrls) => {
  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 2, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const textContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
};

const textChildVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const images = useMemo(() => [Banner, Banner2, Banner3, Banner4, Banner5], []);

  const heroTexts = useMemo(
    () => [
      {
        title: "Transform Your Space with Premium Tiles",
        subtitle: "Elegance, durability and design — crafted for modern living.",
      },
      {
        title: "Luxury Ceramic Collections for Every Interior",
        subtitle: "Create stunning floors and walls with world-class craftsmanship.",
      },
      {
        title: "Redefining Homes with Stylish Tile Designs",
        subtitle: "Experience textures, colors and finishes made to inspire.",
      },
      {
        title: "Crafting Beautiful Spaces, One Tile at a Time",
        subtitle: "Quality tiles engineered to last, designed to impress.",
      },
      {
        title: "Modern Tiles for Modern Architecture",
        subtitle: "Enhance every room with our premium ceramic innovation.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const intervalRef = React.useRef(null);

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 9000);
  };

  useEffect(() => {
    preloadImages(images);
  }, [images]);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const currentText = heroTexts[index];

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "60vh", sm: "65vh", md: "70vh", lg: "80vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
          zIndex: 1,
        }}
      />

      <Box
        component={motion.div}
        key={`text-${index}`}
        initial="initial"
        animate="animate"
        variants={textContainerVariants}
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          px: 2,
          maxWidth: "1200px",
        }}
      >
        <motion.div variants={textChildVariants}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            {currentText.title}
          </Typography>
        </motion.div>

        <motion.div variants={textChildVariants}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.25rem" },
            }}
          >
            {currentText.subtitle}
          </Typography>
        </motion.div>
      </Box>

      {/* 🌟 Bottom Dots Navigation */}

<Box
  sx={{
    position: "absolute",
    bottom: 25,
    zIndex: 3,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  }}
>
 
  
  <Box sx={{ display: "flex", gap: 0.5 }}>
    {images.map((_, i) => (
      <Box
        key={i}
        onClick={() => {
          setIndex(i);
          startAutoSlide();
        }}
        sx={{
          width: i === index ? 24 : 8,
          height: 8,
          borderRadius: "4px",
          backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.4)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.8)",
          },
        }}
      />
    ))}
  </Box>
  
 
</Box>
    </Box>
  );
};

export default memo(HeroSection);