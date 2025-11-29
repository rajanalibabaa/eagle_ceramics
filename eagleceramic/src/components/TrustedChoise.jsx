"use client";
import React, { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Box  from "@mui/material/Box";
import  Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Verified,
  Inventory,
  Business,
  LocalShipping,
  Apartment,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const uspData = [
  {
    icon: <Verified sx={{ fontSize: 40 }} />,
    title: "35+ Years of Industry Expertise",
    desc: "Trusted by leading builders for quality and reliability.",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    title: "Two Industry-Leading Brands",
    desc: "Eagle Ceramics & Gaurada Ceramics serving all style and budget needs.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: <Inventory sx={{ fontSize: 40 }} />,
    title: "End-to-End B2B Supply Chain",
    desc: "Bulk inventories, commercial fulfilment, and dependable stock supply.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    icon: <Apartment sx={{ fontSize: 40 }} />,
    title: "Specialized for Builders & Commercial Projects",
    desc: "Tiles for residential complexes, malls, hospitals, IT parks, and retail spaces.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "On-Time Delivery Assurance",
    desc: "Robust logistics for uninterrupted project execution.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

// Memoized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      delay: 0.2
    }
  }
};

// Memoized Card Component to prevent unnecessary re-renders
const USPCard = memo(({ item, index, onNavigate }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleClick = useCallback(() => {
    onNavigate('/services');
  }, [onNavigate]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card
        sx={{
          width: { xs: "100%", sm: 350, md: 380 },
          height: 300,
          borderRadius: 5,
          color: "white",
          transition: "0.3s",
          boxShadow: "0 8px 25px rgba(0,0,0,0.45)",
          cursor: "pointer",
          background: "linear-gradient(135deg, #263447, #1a2533)",
          "&:hover": {
            background: "linear-gradient(135deg, #87BAC3, #3b548eff)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
          },
        }}
        onClick={handleClick}
      >
        <CardContent
          sx={{
            textAlign: "center",
            px: 3,
            py: 5,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.15, rotate: 8 },
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
                "& .MuiSvgIcon-root": {
                  fontSize: "3rem",
                  background: item.gradient,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "brightness(1.4)",
                },
              }}
            >
              {item.icon}
            </Box>
          </motion.div>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: "#f1f5f9", 
              textShadow: "0 0 4px rgba(0,0,0,0.4)",
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.3,
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#cbd5e1",
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            {item.desc}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
});

USPCard.displayName = 'USPCard';

// Memoized Button Component
const CTAButton = memo(({ onClick, children, variant = "primary" }) => {
  const buttonStyles = useMemo(() => {
    const baseStyles = {
      padding: "14px 40px",
      borderRadius: "40px",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: "1rem",
      border: "none",
    };

    if (variant === "primary") {
      return {
        ...baseStyles,
        border: "1px solid rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.15)",
        color: "black",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      };
    } else {
      return {
        ...baseStyles,
        background: "linear-gradient(135deg, #111, #333)",
        color: "white",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      };
    }
  }, [variant]);

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      style={buttonStyles}
    >
      {children}
    </motion.button>
  );
});

CTAButton.displayName = 'CTAButton';

// Memoized Heading Component
const SectionHeading = memo(({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <Typography
      variant="h2"
      sx={{
        textAlign: "center",
        fontWeight: 800,
        mb: 2,
        backgroundColor: "#333333",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: { xs: "2.5rem", md: "3.5rem" },
      }}
    >
      Why Builders Choose Us
    </Typography>
    
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        fontWeight: 400,
        mb: 8,
        color: "#666",
        maxWidth: "600px",
        mx: "auto",
        px: 2,
      }}
    >
      Trusted by leading construction companies across South India for unmatched quality and service
    </Typography>
  </motion.div>
));

SectionHeading.displayName = 'SectionHeading';

// Main Component
const TrustedChoice = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoized navigation handlers
  const handleExploreClick = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  const handleQuoteClick = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const handleCardNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Memoized background style
  const backgroundStyle = useMemo(() => ({
    py: 6,
    px: 2,
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#f4f6f9",
    backgroundImage: `
      repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(0,0,0,0.03) 36px),
      repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(0,0,0,0.03) 36px)
    `,
  }), []);

  return (
    <Box
      ref={ref}
      sx={backgroundStyle}
    >
      <SectionHeading isInView={isInView} />

      {/* USP Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
            maxWidth: "1300px",
            mx: "auto",
          }}
        >
          {uspData.map((item, index) => (
            <USPCard 
              key={index} 
              item={item} 
              index={index}
              onNavigate={handleCardNavigate}
            />
          ))}
        </Box>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <Box
          sx={{
            mt: 8,
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <CTAButton onClick={handleExploreClick} variant="primary">
            Explore Our Products
          </CTAButton>
          
          <CTAButton onClick={handleQuoteClick} variant="secondary">
            Get a B2B Quote
          </CTAButton>
        </Box>
      </motion.div>
    </Box>
  );
};

export default memo(TrustedChoice);