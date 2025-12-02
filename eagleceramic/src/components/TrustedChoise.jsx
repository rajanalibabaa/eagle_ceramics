import React, { memo, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Verified,
  Inventory,
  Business,
  LocalShipping,
  Apartment,
} from "@mui/icons-material";
import { motion, useInView } from "framer-motion";

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
    desc: "Eagle Ceramics & Gaurada Ceramics serving diverse style and budget needs.",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: <Inventory sx={{ fontSize: 40 }} />,
    title: "End-to-End B2B Supply Chain",
    desc: "Large inventories, bulk supply, and commercial fulfilment.",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    icon: <Apartment sx={{ fontSize: 40 }} />,
    title: "Specialized for Builders & Commercial Projects",
    desc: "Tiles for residential complexes, malls, hospitals, IT parks, retail, and more.",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    icon: <LocalShipping sx={{ fontSize: 40 }} />,
    title: "On-Time Delivery Assurance",
    desc: "Strong logistics network for uninterrupted project execution.",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
];

// Animation variants
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const cardVariants = { hidden: { opacity: 0, y: 60, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } };

const USPCard = memo(({ item, onNavigate }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const handleClick = useCallback(() => onNavigate('/services'), [onNavigate]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ scale: 1, y: -1 }}
      transition={{ type: "spring", stiffness: 500 }}
      style={{ flexShrink: 0 }} 
    >
      <Card
        onClick={handleClick}
        sx={{
          width: { xs: 300, sm: 350, md: 380 },
          height: { xs: 280, sm: 270 }, 
          borderRadius: 5,
          color: "white",
          cursor: "pointer",
          transition: "0.3s",
          background: "linear-gradient(135deg, #263447, #1a2533)",
          display: 'flex',
          flexDirection: 'column',
          "&:hover": {
            background: "linear-gradient(135deg, #87BAC3, #3b548eff)",
            zIndex: 1100,
          },
        }}
      >
        <CardContent sx={{ textAlign: "center", p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Box sx={{ mb: 2, "& .MuiSvgIcon-root": { fontSize: "2.8rem", background: item.gradient, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: "brightness(1.4)" } }}>
            {item.icon}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: "#a7a8a7" }}>
            {item.title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {item.desc}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
});
USPCard.displayName = "USPCard";

// Unchanged components
const CTAButton = memo(({ onClick, children, variant = "primary" }) => {
  const styles = useMemo(() => ({ padding: "14px 40px", borderRadius: "40px", fontWeight: 700, cursor: "pointer", fontSize: "1rem", border: "none", background: variant === "primary" ? "#d11f25" : "linear-gradient(135deg, #111, #333)", color: "white", }), [variant]);
  return (<motion.button onClick={onClick} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }} style={styles}>{children}</motion.button>);
});
CTAButton.displayName = "CTAButton";
const SectionHeading = memo(({ isInView }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
    <Typography variant="h2" sx={{ textAlign: "center", fontWeight: 800, mb: 2, color: "#333", fontSize: { xs: "2.5rem", md: "3.5rem" } }}>Why Builders Choose Us</Typography>
    <Typography variant="h6" sx={{ textAlign: "center", color: "#666", maxWidth: "600px", mx: "auto", mb: 8 }}>Trusted by leading construction companies across South India for unmatched quality and service</Typography>
  </motion.div>
));
SectionHeading.displayName = "SectionHeading";

const TrustedChoice = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <Box
      ref={containerRef}
      sx={{
        py: 8,
        position: "relative",
        overflow: "hidden", 
      }}
    >
      <SectionHeading isInView={isInView} />

      <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 4 }, 
            maxWidth: "1300px",
            mx: "auto",
            px: { xs: 2, sm: 2, md: 4 },
            overflowX: { xs: "auto", sm: "hidden" },
            overflowY: "hidden",
            pb: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {uspData.map((item, i) => (
            <USPCard key={i} item={item} onNavigate={navigate} />
          ))}
        </Box>
      </motion.div>

      <Box sx={{ mt: 8, display: "flex", justifyContent: "center", gap: 3 }}>
        <CTAButton onClick={() => navigate("/services")} variant="primary">Explore Our Products</CTAButton>
        <CTAButton onClick={() => navigate("/contact")} variant="secondary">Get a B2B Quote</CTAButton>
      </Box>
    </Box>
  );
};

export default memo(TrustedChoice);
