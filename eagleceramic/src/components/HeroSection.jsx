import React, { useState, useEffect, useMemo, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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
  animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
};

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  },
};

const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 } 
  },
};

const HeroSection = () => {
  const images = useMemo(() => [Banner, Banner2, Banner3, Banner4, Banner5], []);

  const [index, setIndex] = useState(0);
  const intervalRef = React.useRef(null);
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  message: ""
});

const [showPopup, setShowPopup] = useState(false);
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
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

  const submissionData = new FormData();
  submissionData.append("fullName", formData.fullName);
  submissionData.append("email", formData.email);
  submissionData.append("phone", formData.phone);
  submissionData.append("message", formData.message);
  submissionData.append("_subject", "New Hero Section Form Submission");
  submissionData.append("_captcha", "false");
  submissionData.append("_template", "table");
  submissionData.append("_autoresponse", `Thank you ${formData.fullName}! We will contact you shortly.`);

  fetch("https://formsubmit.co/4928bdeea462118f9e193be9cd0da148", {
    method: "POST",
    body: submissionData,
  })
    .then((res) => {
      if (res.ok) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: ""
        });
      } else {
        console.error("Form submission failed");
      }
    })
    .catch((err) => console.error("Error submitting form:", err));
};


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

      {/* Enhanced Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)",
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
        {/* Enhanced Left Side Text */}
        <Box sx={{ 
          color: "white", 
          textAlign: { xs: "center", md: "left" },
          width: "100%",
          maxWidth: { xs: "100%", md: "900px" },
          flex: 1,
        }}>
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "2.5rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.1,
                mb: 3,
                background: "linear-gradient(135deg, #FFFFFF 0%, #E8F4FD 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                position: "relative",
                '&::after': {
                  content: '""',
                  position: "absolute",
                  bottom: "-12px",
                  left: { xs: "50%", md: "0" },
                  transform: { xs: "translateX(-50%)", md: "translateX(0)" },
                  width: "100px",
                  height: "4px",
                  background: "linear-gradient(90deg, #FF6B35, #FF8E53)",
                  borderRadius: "2px",
                }
              }}
            >
              Premium Tiles for Professional Builders & Commercial Spaces
            </Typography>

            {/* Subheading with Icon-style Elements */}
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
              Delivering trusted ceramic solutions for 35 years across South India
            </Typography>

            {/* Trust Indicators */}
            <Box sx={{ 
              display: "flex", 
              gap: 4, 
              mt: 4,
              justifyContent: { xs: "center", md: "flex-start" },
              flexWrap: "wrap"
            }}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#FF6B35", mb: 0.5 }}>
                  35+
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Years Experience
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#4CAF50", mb: 0.5 }}>
                  5000+
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Projects Completed
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#2196F3", mb: 0.5 }}>
                  100%
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Client Satisfaction
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Enhanced Modern Form */}
        <motion.div
          variants={formVariants}
          initial="initial"
          animate="animate"
          style={{ flexShrink: 0 }}
        >
          <Paper
            elevation={16}
            sx={{
              p: 4,
              borderRadius: 3,
              width: { xs: "100%", sm: "400px", md: "420px" },
              background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
              }
            }}
          >
            <Typography 
              variant="h4" 
              fontWeight={700} 
              mb={3}
              sx={{
                background: "#FF6B35",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
                fontSize: { xs: "1.5rem", sm: "1.75rem" }
              }}
            >
              Get Expert Consultation
            </Typography>

            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
            >
             <TextField
  label="Company / Builder Name"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
  fullWidth
  variant="outlined"
  size="medium"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.8)",
      "&:hover fieldset": { borderColor: "#FF6B35" },
      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
    }
  }}
/>
<TextField
  label="Phone"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  fullWidth
  variant="outlined"
  size="medium"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.8)",
      "&:hover fieldset": { borderColor: "#FF6B35" },
      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
    }
  }}
/>

           <TextField
  label="Email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  fullWidth
  variant="outlined"
  size="medium"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.8)",
      "&:hover fieldset": { borderColor: "#FF6B35" },
      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
    }
  }}
/>

              <TextField
  label="Message"
  name="message"
  value={formData.message}
  onChange={handleChange}
  multiline
  rows={3}
  fullWidth
  variant="outlined"
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.8)",
      "&:hover fieldset": { borderColor: "#FF6B35" },
      "&.Mui-focused fieldset": { borderColor: "#4CAF50" }
    }
  }}
/>


             <Button
  variant="contained"
  size="large"
  onClick={handleSubmit}
  sx={{
    mt: 2,
    py: 1.5,
    borderRadius: 3,
    fontWeight: 700,
    fontSize: "1.1rem",
    background: "linear-gradient(135deg, #FF6B35, #FF8E53)",
    boxShadow: "0 4px 15px rgba(255,107,53,0.4)",
    "&:hover": {
      background: "linear-gradient(135deg, #E55A2B, #E57C3B)",
      transform: "translateY(-2px)"
    }
  }}
>
  Get Free Quote
</Button>

            </Box>

           
          </Paper>
        </motion.div>
      </Box>

      {/* Enhanced Bottom Dots Navigation */}
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
        <Box sx={{ 
          display: "flex", 
          gap: 1, 
          alignItems: "center",
          background: "rgba(0,0,0,0.3)",
          padding: "8px 16px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)"
        }}>
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => {
                setIndex(i);
                startAutoSlide();
              }}
              sx={{
                width: i === index ? 32 : 12,
                height: 12,
                borderRadius: "6px",
                background: i === index 
                  ? "linear-gradient(135deg, #FF6B35, #FF8E53)" 
                  : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: i === index ? "0 2px 8px rgba(255, 107, 53, 0.5)" : "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.8)",
                  transform: "scale(1.1)",
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