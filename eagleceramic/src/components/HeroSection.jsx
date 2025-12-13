import React, { useState, useEffect, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Banner from "../assets/BannerImage.png";
import Banner2 from "../assets/BannerImage2.png";
import Banner3 from "../assets/BannerImage3.png";
import Banner4 from "../assets/BannerImage4.jpeg";
import Banner5 from "../assets/BannerImage5.jpeg";

const preloadImages = (imageUrls) => {
  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

// Enhanced Animation Variants
const backgroundVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const textChildrenVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 100, rotateY: 10 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      delay: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

const fieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.6,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const successPopupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3 },
  },
};

const HeroSection = () => {
  const navigate = useNavigate();
  const images = useMemo(
    () => [Banner, Banner2, Banner3, Banner4, Banner5],
    []
  );

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const intervalRef = React.useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    setShowPopup(true);

    // Auto-hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("message", formData.message);
    submissionData.append("_subject", "New Hero Section Form Submission");
    submissionData.append("_captcha", "false");
    submissionData.append("_template", "table");
    submissionData.append(
      "_autoresponse",
      `Thank you ${formData.fullName}! We will contact you shortly.`
    );

    fetch("https://formsubmit.co/info@eagleceramic.com", {
      method: "POST",
      body: submissionData,
    })
      .then((res) => {
        if (res.ok) {
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  const slide = (newDirection) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setDirection(newDirection);

    setIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });

    setTimeout(() => setIsAnimating(false), 800);
    startAutoSlide();
  };

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      slide(1);
    }, 9000);
  };

  useEffect(() => {
    preloadImages(images);
  }, [images]);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "90vh", sm: "90vh", md: "90vh", lg: "90vh" },
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Images with Slide Animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
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
            willChange: "transform, opacity",
          }}
        />
      </AnimatePresence>

      {/* Enhanced Gradient Overlay with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "100px",
          height: "100px",
          background: "linear-gradient(135deg, #FF6B35, transparent)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "150px",
          height: "150px",
          background: "linear-gradient(45deg, #4CAF50, transparent)",
          borderRadius: "50%",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          width: "100%",
          maxWidth: "1400px",
          px: { xs: 3, sm: 4, md: 2 },
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
        }}
      >
        {/* Left Side Text with Staggered Animation */}
        <Box
          sx={{
            color: "white",
            textAlign: { xs: "center", md: "left" },
            width: "100%",
            maxWidth: { xs: "100%", md: "900px" },
            flex: 1,
          }}
        >
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={textChildrenVariants}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "2.5rem", sm: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  mb: 3,
                  background:
                    "linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: "-12px",
                    left: { xs: "50%", md: "0" },
                    transform: { xs: "translateX(-50%)", md: "translateX(0)" },
                    width: "100px",
                    height: "4px",
                    background: "linear-gradient(90deg, #f11616ff, #ff0c0cff)",
                    borderRadius: "2px",
                  },
                }}
              >
                Premium Tiles for Professional Builders & Commercial Spaces
              </Typography>
            </motion.div>

            <motion.div variants={textChildrenVariants}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.5rem" },
                  mb: 4,
                  color: "white",
                  opacity: 0.95,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                Delivering trusted ceramic solutions for 35 years across South
                India
              </Typography>
            </motion.div>

            {/* CTA Buttons with Animation */}
            <motion.div
              variants={textChildrenVariants}
              style={{
                display: "flex",
                gap: 20,
                marginTop: "2.5rem",
                justifyContent: { xs: "center", md: "flex-start" },
                flexWrap: "wrap",
              }}
            >
              {/* Primary Button - Glow Effect */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ position: "relative" }}
              >
                {/* Animated Glow Effect */}
                <motion.div
                  animate={{
                    scale: [1, 0.9, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <Button
                  variant="contained"
                  onClick={() => navigate("/services")}
                  sx={{
                    position: "relative",
                    px: 1.5,
                    py: 1.75,
                    ml: { xs: 2, md: 2 },
                    borderRadius: 3,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    background: "#d11f25",

                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    overflow: "hidden",
                    zIndex: 1,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      transition: "left 0.6s ease",
                    },
                  }}
                >
                  Explore Premium Products
                </Button>
              </motion.div>

              {/* Secondary Button - Modern Outline */}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                style={{ position: "relative" }}
              >
                <Button
                  onClick={() => navigate("/contact")}
                  variant="outlined"
                  sx={{
                    position: "relative",
                    px: 2.5,
                    py: 1.5,
                    borderRadius: 3,

                    ml: { xs: 6, md: 2 },
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid",
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "0%",
                      background:
                        "linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(255, 107, 53, 0.2))",
                      transition: "height 0.3s ease",
                      zIndex: -1,
                    },
                    "&:active": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  Request B2B Quote
                </Button>

                {/* Floating particles around button */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      position: "absolute",
                      width: "4px",
                      height: "4px",
                      background: "#4CAF50",
                      borderRadius: "50%",
                      top: "50%",
                      left: `${-10 - i * 15}px`,
                      filter: "blur(1px)",
                      zIndex: 0,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </Box>

        {!isMobile && (
          <>
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              style={{ flexShrink: 0 }}
            >
              <Paper
                elevation={16}
                component={motion.div}
                whileHover={{ y: -5 }}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  width: { xs: "100%", sm: "400px", md: "450px" },
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                  },
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={3}
                    sx={{
                      background: "#050608",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: "center",
                      fontSize: { xs: "1.5rem", sm: "1.75rem" },
                    }}
                  >
                    Get Expert Consultation
                  </Typography>
                </motion.div>

                <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  {[
                    {
                      label: "Company / Builder Name",
                      name: "fullName",
                      value: formData.fullName,
                    },
                    { label: "Phone", name: "phone", value: formData.phone },
                    { label: "Email", name: "email", value: formData.email },
                    {
                      label: "Message",
                      name: "message",
                      value: formData.message,
                      multiline: true,
                      rows: 3,
                    },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      custom={i}
                      variants={fieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <TextField
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="medium"
                        multiline={field.multiline}
                        rows={field.rows}
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    variants={fieldVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        background: "#d11f25",
                      }}
                    >
                      Get Free Quote
                    </Button>
                  </motion.div>
                </Box>
              </Paper>
            </motion.div>
          </>
        )}
      </Box>

      {/* Enhanced Navigation with Arrows */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          zIndex: 3,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Dots Navigation */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            padding: "8px 16px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          {images.map((_, i) => (
            <motion.div
              key={i}
              onClick={() => {
                if (!isAnimating) {
                  setIndex(i);
                  startAutoSlide();
                }
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: i === index ? 32 : 12,
                  height: 12,
                  borderRadius: "6px",
                  background:
                    i === index ? "#ff171fff" : "rgba(255, 255, 255, 1)",
                  transition: "all 0.3s ease",
                  boxShadow:
                    i === index ? "0 2px 8px rgba(255, 53, 53, 1)" : "none",
                }}
              />
            </motion.div>
          ))}
        </Box>
      </Box>

      {/* Success Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            variants={successPopupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              background: "linear-gradient(135deg, #4CAF50, #45a049)",
              color: "white",
              padding: "24px 32px",
              borderRadius: "16px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              textAlign: "center",
              minWidth: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 0.6,
                times: [0, 0.3, 0.6, 1],
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 60 }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Typography variant="h5" fontWeight={700}>
                Success!
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
                Thank you for your inquiry. We'll contact you shortly.
              </Typography>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default memo(HeroSection);
