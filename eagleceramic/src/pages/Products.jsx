import React, { useRef, useState, useCallback, useMemo, memo } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import{ useTheme }from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { motion, AnimatePresence } from "framer-motion";

import CheckCircle from '@mui/icons-material/CheckCircle';
import Straighten from '@mui/icons-material/Straighten';
import  Square  from "@mui/icons-material/Square";
import Palette from '@mui/icons-material/Palette';
import Shield from '@mui/icons-material/Shield';
import Star from '@mui/icons-material/Star';

import { useNavigate } from "react-router-dom";
// Import images
import walltile from "../assets/WallTiles/Nature.jpg";
import elevationTile from "../assets/ElevationTiles300x450/Eagle008image.png";
import floorTile from "../assets/FloorTiles/Glossyendlessv1.jpg";
import parkingTile from "../assets/ParkingTiles/PunchCollection3.jpg";
import coolroof from "../assets/RoofTilesImages/RoofTiles600x600.PNG";
import kitchenSink from "../assets/KitchenSinkCollection/KitchenSink.PNG";

// Enhanced content with specifications
const content = [
  {
    id: 1,
    title: "WALL TILES",
    subtitle: "Transform Your Spaces",
    path : "/services/walltiles",
    description:
      "Explore our premium range of wall tiles — the perfect blend of style, texture, and durability to elevate any room. Crafted with precision for lasting beauty.",
    image: walltile,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["300x450mm"],
      finishes: ["Glossy", "sugar", "Matte", "Wood Grain", "Rustic",],
      // thickness: "8-10mm",
      // waterAbsorption: "< 0.5%",
      applications: ["Bathroom", "Kitchen", "Living Room", "Bedroom", "Dining Room","Commercial Space","Washrooms / Toilets"],
    },
    features: [
      "Scratch Resistant",
      "Easy to Clean",
      "Fade Resistant",
      "Anti-Bacterial",
      "Eco-Friendly",
    ],
    benefits: [
      { icon: Shield, text: "10 Year Warranty" },
      { icon: Palette, text: "500+ Designs" },
      { icon: Star, text: "Premium Quality" },
    ],
    priceRange: "₹45 - ₹120 per sq.ft",
    // bestSeller: true,
  },
  {
    id: 2,
    title: "ELEVATION TILES",
    subtitle: "Stunning Exteriors",
    path :'/services/elevation-tiles-300x450',
    description:
      "Enhance your building's exterior with our stylish and weather-resistant elevation tiles. Designed to withstand extreme conditions while maintaining elegance.",
    image: elevationTile,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["300x450mm", "300x600mm"],
      finishes: ["Matt", "Varnished", "Sugared", ],
      // thickness: "10-12mm",
      // waterAbsorption: "< 3%",
      applications: ["House Front Elevation", "Boundary Walls & Compound Walls", "Pillars", "Gate Walls","Balcony & Terrace Walls"],
    },
    features: [
      "Weather Resistant",
      "UV Protected",
      "Frost Proof",
      "High Durability",
      "Color Fast",
      "Eco-Friendly",
      "Backteria Free",

    ],
    benefits: [
      { icon: Shield, text: "15 Year Warranty" },
      { icon: Palette, text: "300+ Designs" },
      { icon: Star, text: "All-Weather" },
    ],
    priceRange: "₹55 - ₹150 per sq.ft",
    // bestSeller: false,
  },
  {
    id: 3,
    title: "FLOOR TILES",
    subtitle: "Walk in Style",
    path :'/services/floortiles/600x1200',
    description:
      "Glossy or matte — our floor tiles deliver strength, beauty, and long-lasting performance. Perfect foundation for your dream spaces.",
    image: floorTile,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["600x600 DC",  "600x1200mm"],
      finishes: ["Polished", "Matt", "Carving", "Book Match", "High Gloss"],
      // thickness: "9-12mm",
      // waterAbsorption: "< 0.05%",
      applications: ["Living Room", "Hospital Space", "Office Space", "Restaurant", "Airport Area","Residential Area"],
    },
    features: [
      "UV Protected",
      "Chemical Resistant",
      "Easy to Clean",
      "Eco-Friendly",
      "Temperature Regulating",
      "Backteria Free",
    ],
    benefits: [
      { icon: Shield, text: "Lifetime Warranty" },
      { icon: Palette, text: "1000+ Designs" },
      { icon: Star, text: "GVT/PGVT" },
    ],
    priceRange: "₹35 - ₹200 per sq.ft",
    // bestSeller: true,
  },
  {
    id: 4,
    title: "PARKING TILES",
    subtitle: "Built to Endure",
    path :'/services/parkingtiles/collection1',
    description:
      "Sturdy, anti-skid parking tiles engineered to handle heavy loads effortlessly. Maximum grip, minimum maintenance.",
    image: parkingTile,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["300x300mm", "400x400mm"],
      finishes: ["Anti-Skid", "Heavy Duty Matt", "Textured", "Diamond Pattern"],
      // thickness: "12-18mm",
      // breakingStrength: "> 2000N",
      applications: ["Car Parking", "Garage", "Driveway", "Commercial Parking", "Ramps"],
    },
    features: [
      "Heavy Load Bearing",
      "Anti-Skid Surface",
      "Oil Resistant",
      "Chemical Resistant",
      "Abrasion Proof",
    ],
    benefits: [
      { icon: Shield, text: "20 Year Warranty" },
      { icon: Palette, text: "150+ Designs" },
      { icon: Star, text: "Industrial Grade" },
    ],
    priceRange: "₹40 - ₹90 per sq.ft",
    // bestSeller: false,
  },
  {
    id: 5,
    title: "COOLROOF TILES",
    subtitle: "Beat the Heat",
    path :'/services/cool-roof-tiles-9mm',
    description:
      "Reduce heat naturally with high-reflective cool roof tiles for thermal comfort. Save energy, stay cool.",
    image: coolroof,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["600x600mm", "300x300mm", "400x400mm"],
      finishes: ["Plain Matt", "Plain SG", "Hexa Matt", "Hexa SG", "Cool Colors"],
      thickness: "9 mm - 10 mm" ,
      solarReflectance: "> 80%",
      applications: ["Rooftop", "Terrace", "Industrial Sheds", "Warehouses", "Homes"],
    },
    features: [
      "High Solar Reflectance",
      "Thermal Insulation",
      "Energy Saving",
      "Waterproof",
      "UV Resistant",
    ],
    benefits: [
      { icon: Shield, text: "25 Year Warranty" },
      { icon: Palette, text: "50+ Options" },
      { icon: Star, text: "5°C Cooler" },
    ],
    priceRange: "₹60 - ₹120 per sq.ft",
    bestSeller: true,
  },
  {
    id: 6,
    title: "KITCHEN SINK",
    subtitle: "Modern Functionality",
    path :'/services/kitchen-sink',
    description:
      "Modern, durable kitchen sinks that complement your interiors and enhance functionality. Premium quality for everyday use.",
    image: kitchenSink,
    color: "#000000ff",
    gradient: "white",
    specifications: {
      sizes: ["16' x 18' x 9'", 'Custom'],
      finishes: ["Satin", "Brushed", "Mirror Polish", "PVD Coated", "Nano Coating"],
      material: "304 Stainless Steel",
      thickness: "10mm",
      gaugeThickness: "18-22 Gauge",
      applications: ["Kitchen", "Utility", "Bar", "Commercial Kitchen", "Restaurant"],
    },
    features: [
      "Soundproof Padding",
      "Deep Bowl Options",
      "Integrated Drainboard",
      "Undermount/Topmount",
      "Rust Free",
    ],
    benefits: [
      { icon: Shield, text: "Lifetime Warranty" },
      { icon: Palette, text: "100+ Models" },
      { icon: Star, text: "Food Grade SS" },
    ],
    priceRange: "₹3,500 - ₹25,000",
    bestSeller: false,
  },
];

// Memoized Specification Card Component
const SpecificationCard = memo(({ icon: Icon, label, items, color }) => (
  <Paper
    // elevation={0}
    sx={{
      p: 2,
      borderRadius: 3,
      // background: `linear-gradient(135deg, ${color}08 0%, ${color}15 100%)`,
      border: `1px solid ${color}20`,
      height: "100%",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <Icon sx={{ color,  fontSize: 20 }} />
      <Typography variant="subtitle2" fontWeight={600} color="black">
        {label}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {items.slice(0, 7).map((item, idx) => (
        <Chip
          key={idx}
          label={item}
          size="small"
          sx={{
            fontSize: "0.7rem",
            height: 24,
            backgroundColor: `${color}15`,
            color: color,
            fontWeight: 500,
          }}
        />
      ))}
      {items.length > 5 && (
        <Chip
          label={`+${items.length - 4}`}
          size="small"
          sx={{
            fontSize: "0.7rem",
            height: 24,
            backgroundColor: `${color}25`,
            color: color,
            fontWeight: 600,
          }}
        />
      )}
    </Box>
  </Paper>
));

// Memoized Feature List Component
const FeatureList = memo(({ features, color }) => (
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
    {features.map((feature, idx) => (
      <Box
        key={idx}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1.5,
          py: 0.5,
          borderRadius: 2,
          backgroundColor: `${color}10`,
        }}
      >
        <CheckCircle sx={{ fontSize: 14, color }} />
        <Typography variant="caption" fontWeight={500} color="black">
          {feature}
        </Typography>
      </Box>
    ))}
  </Box>
));

// Memoized Benefits Component
const BenefitsBadge = memo(({ benefits, color }) => (
  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
    {benefits.map((benefit, idx) => {
      const IconComponent = benefit.icon;
      return (
        <Box
          key={idx}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${color}15 0%, ${color}25 100%)`,
            border: `1px solid ${color}30`,
          }}
        >
          <IconComponent sx={{ fontSize: 18, color }} />
          <Typography variant="body2" fontWeight={600} color={color}>
            {benefit.text}
          </Typography>
        </Box>
      );
    })}
  </Box>
));

// Main Product Card Component
const ProductContent = memo(({ item, isActive, isMobile, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      className="content-section"
      onClick={onClick}
      sx={{
        minHeight: { xs: "auto", md: "100vh" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: { xs: 4, md: 2 },
        px: { xs: 2, md: 4 },
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: isActive ? 1 : isMobile ? 1 : 0.4,
        transform: isActive ? "translateX(0) scale(1)" : "translateX(-10px) scale(0.98)",
        "&:hover": {
          opacity: 1,
          transform: "translateX(0) scale(1)",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: isActive || isMobile ? 1 : 0.4,
          y: isActive || isMobile ? 0 : 20,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            {item.bestSeller && (
              <Chip
                // icon={<Star sx={{ fontSize: 14,}} />}
                label="Best Seller"
                size="small"
                sx={{
                  background: item.gradient,
                  color: "red",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1,borderRadius:5, background:'red',height:40,width:40  }}  /> */}

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 0,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.75rem" },
              background: 'black',
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
            }}
          >
            {item.title}
          </Typography>
<Typography
            variant="overline"
            sx={{
              color: item.color,
              fontWeight: 600,
              letterSpacing: 2,
              fontSize: "0.75rem",
            }}
          >
            {item.subtitle}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "black",
              lineHeight: 1.8,
              fontSize: { xs: "0.95rem", md: "1.1rem" },
              maxWidth: "600px",
              mb: 1,
            }}
          >
            {item.description}
          </Typography>
        </Box>

        {/* Price Range */}
        {/* <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${item.color}10 0%, ${item.color}20 100%)`,
              border: `2px solid ${item.color}30`,
            }}
          >
            <LocalOffer sx={{ color: item.color, fontSize: 20 }} />
            <Typography variant="h6" fontWeight={700} color={item.color}>
              {item.priceRange}
            </Typography>
          </Box>
        </Box> */}

        {/* Benefits */}
        <Box sx={{ mb: 1 }}>
          <BenefitsBadge benefits={item.benefits} color={item.color} />
        </Box>

        {/* Specifications Grid */}
        <Grid container spacing={2} sx={{ mb: 0 }}>
          <Grid item xs={6} sm={6} md={6}>
            <SpecificationCard
              icon={Square}
              label="Available Sizes"
              items={item.specifications.sizes}
              color='red'
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <SpecificationCard
              icon={Palette}
              label="Finishes"
              items={item.specifications.finishes}
              color='red'
            />
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 3,
                // background: `linear-gradient(135deg, ${item.color}05 0%, ${item.color}10 100%)`,
                border: `1px solid ${item.color}15`,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={600}
                color="black"
                sx={{ mb: .3 }}
              >
                Key Features
              </Typography>
              <FeatureList features={item.features} color='red' />
            </Paper>
          </Grid>
        </Grid>

        {/* Technical Specs */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            p: 2,
            borderRadius: 3,
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Straighten sx={{ fontSize: 16, color: "red " }} />
            <Typography variant="caption" color="black">
              <strong>Thickness:</strong> {item.specifications.thickness || "Standard"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Shield sx={{ fontSize: 16, color: "red" }} />
            <Typography variant="caption" color="black">
              <strong>Water Absorption:</strong>{" "}
              {item.specifications.waterAbsorption || "Standard"}
            </Typography>
          </Box>
        </Box>

        {/* Applications */}
        <Box sx={{ mt: 0 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="black"
            sx={{ mb: 1 }}
          >
            Perfect For
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {item.specifications.applications.map((app, idx) => (
              <Chip
                key={idx}
                label={app}
                variant="outlined"
                size="small"
                sx={{
                  borderColor: item.color,
                  color: item.color,
                  fontSize: "0.75rem",
                  "&:hover": {
                    backgroundColor: `${item.color}10`,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
});

// Image Display Component
const ImageDisplay = memo(({ item, isMobile }) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
    transition={{
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    }}
    style={{
      width: "100%",
      height: isMobile ? "350px" : "75vh",
      maxHeight: isMobile ? "350px" : "700px",
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: `0 25px 50px -12px ${item.color}40`,
    }}
  >
  
    {/* Main Image */}
    <Box
      component="img"
      src={item.image}
      alt={item.title}
      loading="lazy"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.6s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    />

    {/* Bottom Info Overlay */}
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(transparent, rgba(0, 0, 0, 1.92))",
        padding: { xs: 2, md: 5 },
        zIndex: 2,
      }}
    >
      

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "white",
          fontSize: { xs: "1.25rem", md: "2.75rem" },
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          mb: 0.5,
        }}
      >
        {item.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 1)",
          fontSize: { xs: "0.8rem", md: "0.9rem" },
        }}
      >
        {item.subtitle} • {item.specifications.sizes.length} Sizes Available
      </Typography>
    </Box>

    
  </motion.div>
));




// Main Component
function StickyScrollReveal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // Memoized current item
  const currentItem = useMemo(() => content[activeIndex], [activeIndex]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const scrollTop = window.scrollY - containerTop;
    const windowHeight = window.innerHeight;

    const sections = container.querySelectorAll(".content-section");
    let newActiveIndex = 0;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionCenter = sectionTop + sectionHeight / 2;
      const viewportCenter = scrollTop + windowHeight / 2;
      const distance = Math.abs(viewportCenter - sectionCenter);

      if (distance < minDistance) {
        minDistance = distance;
        newActiveIndex = index;
      }
    });

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
    }
  }, [activeIndex]);

  // Scroll listener with RAF optimization
  React.useEffect(() => {
    let ticking = false;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [handleScroll]);

  // Navigation handler
  const handleSectionClick = useCallback((index) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const sections = container.querySelectorAll(".content-section");
    const section = sections[index];

    if (section) {
      const containerTop = container.offsetTop;
      const sectionTop = section.offsetTop;
      const targetScroll =
        containerTop + sectionTop - window.innerHeight / 2 + section.offsetHeight / 2;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  }, []);

  // Arrow navigation
 
 const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "#ffffffff",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 8 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "black",
                fontWeight: 600,
                letterSpacing: 3,
                mb: 1,
                display: "block",
              }}
            >
              DISCOVER OUR COLLECTION
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background:"black",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              Premium Products
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "black",
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                lineHeight: 1.6,
              }}
            >
              Explore our curated collection of high-quality tiles and kitchen
              solutions designed to transform your spaces.
            </Typography>
          </motion.div>
        </Box>

        
        {/* Main Content Area */}
       {!isMobile && (
         <>
          <Box
          ref={containerRef}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            position: "relative",
          }}
        >
          {/* Left Content Column */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              zIndex: 2,
              order: { xs: 2, md: 1 },
            }}
          >
            {content.map((item, index) => (
              <ProductContent
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                isMobile={isMobile}
                onClick={() => handleSectionClick(index)}
              />
            ))}
          </Box>

          {/* Right Sticky Image Column */}
          {!isMobile && (
            <>
            <Box
            sx={{
              flex: 1,
              position: { xs: "relative", md: "sticky" },
              top: { xs: 0, md: "12%" },
              height: { xs: "auto", md: "fit-content" },
              order: { xs: 1, md: 2 },
              mb: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <ImageDisplay
                  key={currentItem.id}
                  item={currentItem}
                  isMobile={isMobile}
                />
              </AnimatePresence>

              
            </Box>
          </Box>
          </>
          )}
          
        </Box></>
       )}
       {isMobile && (<>
       
       <Box>
        {content.map((item, index) => (
          <Box key={item.id} position={'relative'} mt={5} sx={{ transition: "transform 0.6s ease",
        "&:hover": {
          transform: "scale(1.02)",
        },}} >
            <Box  onClick={()=>navigate(item.path)}  component={'img'} src={item.image} sx={{height:'250px',width:'350px',objectFit:'cover'}} />
            <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(transparent, rgba(0, 0, 0, 1.92))",
        padding: { xs: 2, md: 5 },
        zIndex: 2,
      }}
    >
     

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          color: "white",
          fontSize: { xs: "1.25rem", md: "2.75rem" },
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          mb: 0.5,
        }}
      >
        {item.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 1)",
          fontSize: { xs: "0.8rem", md: "0.9rem" },
        }}
      >
        {item.subtitle} • {item.specifications.sizes.length} Sizes Available
      </Typography>
    </Box>
            
            </Box>
          
        ))}
        <Box>

          </Box>
       </Box>
       </>)}

        
      </Container>
    </Box>
  );
}

export default memo(function Products() {
  return <StickyScrollReveal />;
});