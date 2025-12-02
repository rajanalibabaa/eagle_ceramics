import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

import walltile from "../assets/WallTiles/Nature.jpg";
import elevationTile from "../assets/ElevationTiles300x450/Eagle008image.png";
import floorTile from "../assets/FloorTiles/Glossyendlessv1.jpg";
import parkingTile from "../assets/ParkingTiles/PunchCollection3.jpg";
import coolroof from "../assets/RoofTilesImages/RoofTiles600x600.PNG";
import kitchenSink from "../assets/KitchenSinkCollection/KitchenSink.PNG";

const content = [
  { title: "WALL TILES", description: "Explore our premium range of wall tiles — the perfect blend of style, texture, and durability to elevate any room.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: walltile },
  { title: "ELEVATION TILES", description: "Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: elevationTile },
  { title: "FLOOR TILES", description: "Glossy or matte — our floor tiles deliver strength, beauty, and long-lasting performance.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: floorTile },
  { title: "PARKING TILES", description: "Sturdy, anti-skid parking tiles engineered to handle heavy loads effortlessly.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: parkingTile },
  { title: "COOLROOF TILES", description: "Reduce heat naturally with high-reflective cool roof tiles for thermal comfort.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: coolroof },
  { title: "KITCHEN SINK", description: "Modern, durable kitchen sinks that complement your interiors and enhance functionality.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.", image: kitchenSink },
];

const Layout = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "flex-start",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

const LeftColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    paddingRight: 0,
    order: 2,
  },
}));

const RightSticky = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  position: "sticky",
  top: 0, // center image to viewport by using top: 0
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Section = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(0, 0, 0, 0), // keep vertical centering exact
  transition: "opacity 0.25s ease",
  cursor: "pointer",
}));

function StickyScrollReveal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerTop = containerRef.current.offsetTop;
      const scrollTop = window.scrollY - containerTop;
      const windowHeight = window.innerHeight;

      const centerPosition = scrollTop + windowHeight / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionCenter = sectionTop + section.offsetHeight / 2;
          const distance = Math.abs(centerPosition - sectionCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });

      setActiveIndex((prev) => (prev === closestIndex ? prev : closestIndex));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionHover = (index) => {
    // scroll the hovered section so its center aligns with viewport center
    if (!sectionRefs.current[index] || !containerRef.current) {
      setActiveIndex(index);
      return;
    }
    const containerTop = containerRef.current.offsetTop;
    const sectionTop = sectionRefs.current[index].offsetTop;
    const targetScroll = containerTop + sectionTop - window.innerHeight / 2 + sectionRefs.current[index].offsetHeight / 2;

    setActiveIndex(index);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 8, pb: 4 }}>
 <Typography
          sx={{
            fontSize: { xs: 20, sm: 28, md: 34 },
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            lineHeight: 1.3,
            textAlign:"center",
          }}
        >        Our Products
      </Typography>

      <Layout ref={containerRef}>
        <LeftColumn>
          {content.map((item, i) => (
            <Section
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              onMouseEnter={() => handleSectionHover(i)}
              sx={{
                opacity: i === activeIndex ? 1 : 0.35,
              }}
            >
              <motion.div
                animate={{ opacity: i === activeIndex ? 1 : 0, y: i === activeIndex ? 0 : 12 }}
                transition={{ duration: 0.45 }}
                style={{ maxWidth: 720 }}
              >
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                  {item.title}
                </Typography>

                {i === activeIndex && (
                  <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {item.description}
                  </Typography>
                )}
              </motion.div>
            </Section>
          ))}
        </LeftColumn>

        <RightSticky>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              width: "90%",
              height: "70%",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              position: "relative",
            }}
          >
            <img
              src={content[activeIndex].image}
              alt={content[activeIndex].title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </RightSticky>
      </Layout>
    </Container>
  );
}

export default function Products() {
  return <StickyScrollReveal />;
}
