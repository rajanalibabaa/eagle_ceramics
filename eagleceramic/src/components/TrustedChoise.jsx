import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { motion, useInView } from "framer-motion";

import expertiseBg from "../assets/ParkingTiles/PlainCollection1.jpg";
import brandsBg from "../assets/ElevationTiles300x450/Eagle003image.png";
import supplyChainBg from "../assets/FloorTiles/Glossyendlessv2.png";
import commercialBg from "../assets/ElevationTiles300x600/Eagle003x600image.PNG";
import deliveryBg from "../assets/FloorTiles/Random.png";


const uspData = [
  {
    title: "35+ Years of Industry Expertise",
    desc: "Trusted by leading builders for quality and reliability.",
    image: expertiseBg,
    overlay: "linear-gradient(rgba(81, 81, 91, 0.85), rgba(47, 47, 60, 0.95))"
  },
  {
    title: "Two Industry-Leading Brands",
    desc: "Eagle Ceramics & Gaurada Ceramics serving diverse style and budget needs.",
    image: brandsBg,
    overlay: "linear-gradient(rgba(81, 81, 91, 0.85), rgba(47, 47, 60, 0.95))"
  },
  {
    title: "End-to-End B2B Supply Chain",
    desc: "Large inventories, bulk supply, and commercial fulfilment.",
    image: supplyChainBg,
    overlay: "linear-gradient(rgba(81, 81, 91, 0.85), rgba(47, 47, 60, 0.95))"
  },
  {
    title: "Specialized for Builders & Commercial Projects",
    desc: "Tiles for residential complexes, malls, hospitals, IT parks, retail, and more.",
    image: commercialBg,
    overlay: "linear-gradient(rgba(81, 81, 91, 0.85), rgba(47, 47, 60, 0.95))"
  },
  {
    title: "On-Time Delivery Assurance",
    desc: "Strong logistics network for uninterrupted project execution.",
    image: deliveryBg,
    overlay: "linear-gradient(rgba(81, 81, 91, 0.85), rgba(47, 47, 60, 0.95))"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};


const USPCard = memo(({ item, onNavigate, sxExtra = {} }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handleClick = useCallback(
    () => onNavigate("/services"),
    [onNavigate]
  );

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
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
          transition: "all 0.4s ease",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-2px)",
            "& .card-overlay": { opacity: 0.2 },
            "& .card-content": { transform: "translateY(0)" }
          },
          ...sxExtra // ← extra styles injected by parent
        }}
      >
        {/* Background image */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transition: "transform 0.6s ease",
            "&:hover": { transform: "scale(1.1)" }
          }}
        />

        {/* Gradient overlay */}
        <Box
          className="card-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background: item.overlay,
            transition: "opacity 0.4s ease",
            opacity: 0.9
          }}
        />

        {/* Text */}
        <CardContent
          className="card-content"
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            transition: "transform 0.4s ease"
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
              fontSize: { xs: "1.1rem", sm: "1.2rem" }
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
              lineHeight: 1.6,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)"
            }}
          >
            {item.desc}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
});
USPCard.displayName = "USPCard";


const MotionButton = motion(Button);

const CTAButton = memo(({ onClick, children, variant = "primary" }) => {
  const sxStyles = useMemo(
    () => ({
      px: { xs: 3, sm: 4, md: 6 },
      py: { xs: 1.2, sm: 1.4, md: 1.6 },
      borderRadius: "40px",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
      border: "none",
      background:
        variant === "primary"
          ? "linear-gradient(135deg, #d11f25 0%, #b0181d 100%)"
          : "linear-gradient(135deg, #07080a 0%, #07080a 100%)",
      color: "white",
      boxShadow: "0 6px 20px rgba(0,0,0,0.22)",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.26)"
      },
      width: { xs: "100%", sm: "auto" },
      display: "inline-flex",
      justifyContent: "center"
    }),
    [variant]
  );

  return (
    <MotionButton
      onClick={onClick}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      sx={sxStyles}
    >
      {children}
    </MotionButton>
  );
});
CTAButton.displayName = "CTAButton";


const SectionHeading = memo(({ isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8 }}
  >
    <Typography
      variant="h2"
      sx={{
        fontWeight: 900,
        mb: 2,
        background: "black",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
        lineHeight: 1.2,
        textAlign: "center"
      }}
    >
      Why Builders Choose Us
    </Typography>
    <Typography
      variant="h6"
      sx={{
        textAlign: "center",
        color: "#4a5568",
        maxWidth: "600px",
        mx: "auto",
        mb: 8,
        fontSize: { xs: "1rem", sm: "1.1rem" },
        px: 2
      }}
    >
      Trusted by leading construction companies across South India for unmatched
      quality and service
    </Typography>
  </motion.div>
));
SectionHeading.displayName = "SectionHeading";

const TrustedChoice = () => {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeIdx, setActiveIdx] = useState(0);

  const CARD_WIDTH = 300; // xs width from USPCard sx
  const CARD_GAP = 24; // xs gap -> spacing(3) = 3 * 8px

  const handleScroll = (e) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const idx = Math.round(scrollLeft / (CARD_WIDTH + CARD_GAP));
    if (idx !== activeIdx) setActiveIdx(idx);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        position: "relative",
        overflow: "hidden"
      }}
    >
      <SectionHeading isInView={isInView} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            justifyContent: { xs: "flex-start", sm: "center" },
            gap: { xs: 3, sm: 4, md: 4 },
            maxWidth: "1400px",
            mx: "auto",
            px: { xs: 3, sm: 4, md: 6 },
            overflowX: { xs: "auto", sm: "hidden" },
            overflowY: "hidden",
            scrollSnapType: { xs: "x mandatory", sm: "none" }, // ← NEW
            pb: 3,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "&::-webkit-scrollbar-track": { display: "none" },
            "&::-webkit-scrollbar-thumb": { display: "none" }
          }}
          onScroll={handleScroll} // ← NEW
        >
          {uspData.map((item, i) => (
            <USPCard
              key={i}
              item={item}
              onNavigate={navigate}
              sxExtra={{
                scrollSnapAlign: { xs: "center", sm: "unset" } // ← NEW
              }}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            mt: 2
          }}
        >
          {uspData.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                mx: 0.75,
                transition: "background 0.3s",
                background: i === activeIdx ? "#d11f25" : "#cbd5e0"
              }}
            />
          ))}
        </Box>
      </motion.div>

      <Box
        sx={{
          mt: { xs: 6, sm: 8 },
          display: "flex",
          justifyContent: "center",
          gap: { xs: 2, sm: 3 },
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          px: 2
        }}
      >
        <CTAButton onClick={() => navigate("/services")} variant="primary">
          Explore Our Products
        </CTAButton>
        <CTAButton onClick={() => navigate("/contact")} variant="secondary">
          Get a B2B Quote
        </CTAButton>
      </Box>
    </Box>
  );
};

export default memo(TrustedChoice);
