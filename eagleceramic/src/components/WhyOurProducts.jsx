"use client";
import React, { memo, useMemo } from "react";
import { Box, Typography, Stack, Avatar, Button } from "@mui/material";  
import { motion } from "framer-motion";
import HandshakeIcon from "@mui/icons-material/Handshake";
import InventoryIcon from "@mui/icons-material/Inventory";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import img1 from "../assets/WhyProductimg.jpg";
import { useNavigate } from "react-router-dom";

const ITEMS = [
  { icon: <VerifiedIcon />,  title: "Premium Manufacturing Quality", sub: "High-grade raw materials & advanced production." },
  { icon: <InventoryIcon />, title: "Bulk Availability",            sub: "Always-ready stock for commercial scale projects." },
  { icon: <HandshakeIcon />, title: "Strong Vendor Partnerships",   sub: "Reliable sourcing from industry-trusted suppliers." },
  { icon: <LocalShippingIcon />, title: "Delivery Reliability",     sub: "On-time project fulfillment across regions." },
];

const btnVariants = {
  hidden:  { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" }
  })
};

const FeatureItem = memo(({ item, index }) => (
  <motion.div
    style={{ width: "100%" }}
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    custom={index}
  >
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 3 }}
      alignItems="center"
      justifyContent="center"
      width="100%"
      textAlign={{ xs: "center", sm: "left" }}
    >
      <Avatar
        sx={{
          background: "#fff",
          width: { xs: 50, sm: 56 },
          height: { xs: 50, sm: 56 },
          boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
          "& svg": { color: "#d6336c", fontSize: { xs: 24, sm: 30 } },
        }}
      >
        {item.icon}
      </Avatar>

      <Box sx={{ mt: { xs: 1, sm: 0 } }}>
        <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" }, fontWeight: 700, color: "#333" }}>
          {item.title}
        </Typography>
        <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, color: "#555", mt: 0.3 }}>
          {item.sub}
        </Typography>
      </Box>
    </Stack>
  </motion.div>
));

FeatureItem.displayName = 'FeatureItem';

const AnimatedButton = memo(({ variant, onClick, children, custom }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    variants={btnVariants}
    custom={custom}
    viewport={{ once: true, margin: "-50px" }}
  >
    <Button
      onClick={onClick}
      variant={variant}
      size="large"
      sx={variant === "contained" ? containedStyles : outlinedStyles}
    >
      {children}
    </Button>
  </motion.div>
));

AnimatedButton.displayName = 'AnimatedButton';

const containedStyles = {
  px: { xs: 2.5, sm: 3.5 },
  py: { xs: 1.5, sm: 1.8 },
  fontWeight: 600,
  borderRadius: 3,
  textTransform: "none",
  backgroundColor: "#d6336c",
  "&:hover": { backgroundColor: "#bf295c" },
  color: "#fff",
};

const outlinedStyles = {
  px: { xs: 2.5, sm: 3.5 },
  py: { xs: 1.5, sm: 1.8 },
  fontWeight: 600,
  borderRadius: 3,
  textTransform: "none",
  borderColor: "#d6336c",
  color: "#d6336c",
  "&:hover": { backgroundColor: "rgba(214, 51, 108, 0.08)", borderColor: "#bf295c" },
};

const WhyOurProducts = () => {
  const navigate = useNavigate();
  const handleCatalogueClick = React.useCallback(() => navigate('/services'), [navigate]);
  const handleQuoteClick = React.useCallback(() => navigate('/contact'), [navigate]);
  const renderedFeatures = useMemo(() => ITEMS.map((item, index) => <FeatureItem key={index} item={item} index={index} />), []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        minHeight: { xs: "650px", md: "700px", lg: "750px" },
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* LEFT SECTION */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          background: "linear-gradient(135deg, #FCE7E9, #F8DCE2)",
          borderTopRightRadius: { xs: 0, md: "1100px" },
          borderBottomRightRadius: { xs: 0, md: "1100px" },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: { xs: 6, md: 10 },
          px: { xs: 3, sm: 5 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
            fontWeight: 800,
            color: "#222",
            mb: { xs: 4, md: 6 },
            lineHeight: 1.2,
          }}
        >
          What We Do
        </Typography>

        <Stack spacing={{ xs: 3, md: 4 }} alignItems="center" width="100%" mb={{ xs: 4, md: 5 }}>
          {renderedFeatures}
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <AnimatedButton variant="contained" onClick={handleCatalogueClick} custom={0}>
            Request a Product Catalogue
          </AnimatedButton>
          <AnimatedButton variant="outlined" onClick={handleQuoteClick} custom={1}>
            Get a Quote
          </AnimatedButton>
        </Stack>
      </Box>

      {/* RIGHT SECTION */}
<Box
  sx={{
    width: { xs: "100%", md: "50%" },
    height: { xs: "350px", sm: "450px", md: "650px", lg: "700px" },
    display: { xs: "none", sm: "flex" }, 
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "white",
    px: { xs:0, sm: 4 },
  }}
>
  <motion.img
    src={img1}
    alt="Product section"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }}
    variants={imageVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    loading="lazy"
  />
</Box>

    </Box>
  );
};

export default memo(WhyOurProducts);
