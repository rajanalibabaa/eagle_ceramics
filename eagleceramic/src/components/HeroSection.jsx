import React, { useState, useEffect, useMemo, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";

import Banner from "../assets/BannerImage.jpg";
import Banner2 from "../assets/BannerImage2.jpg";
import Banner3 from "../assets/BannerImage3.jpg";
import Banner4 from "../assets/BannerImage4.jpg";

// Define animation variants for cleaner code
const backgroundVariants = {
  initial: { opacity: 0, scale: 1 },
  animate: {
    opacity: 1,
    scale: 1.1, 
    transition: {
      opacity: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: 32, ease: "easeOut" }, 
    },
  },
  exit: {
    opacity: 0,
    transition: {
      opacity: { duration: 1.5, ease: "easeInOut" },
    },
  },
};

const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2, 
    },
  },
};

const textChildVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};


const HeroSection = () => {
  const images = useMemo(() => [Banner, Banner2, Banner3, Banner4], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 70000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      component="section" // Use a more semantic tag
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
      <AnimatePresence initial={false}> {/* `initial={false}` prevents animation on first load */}
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
            // This hint helps the browser optimize animations
            willChange: "transform, opacity", 
          }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      />
   
      <Box
        component={motion.div} // Attach motion directly to the Box
        variants={textContainerVariants}
        initial="initial"
        animate="animate"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          px: { xs: 2, sm: 3 },
          maxWidth: "900px",
        }}
      >
        {/* Heading Animation */}
        <motion.div variants={textChildVariants}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "28px", sm: "34px", md: "42px", lg: "48px" },
            }}
          >
            Welcome to Our <strong>Eagle Ceramics</strong>
          </Typography>
        </motion.div>

        {/* Subheading Animation */}
        <motion.div variants={textChildVariants}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              mt: 1,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              px: { xs: 1, sm: 4 },
            }}
          >
            Grow your business with the best opportunities
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default memo(HeroSection);
