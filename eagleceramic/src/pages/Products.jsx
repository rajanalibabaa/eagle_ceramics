"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Fade,
  Slide,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import walltile from "../assets/WallTiles/Nature.jpg";
import elevationTile from "../assets/ElevationTiles300x450/Eagle008image.png";
import floorTile from "../assets/FloorTiles/Glossyendlessv1.jpg";
import parkingTile from "../assets/ParkingTiles/PunchCollection3.jpg";
import coolroof from "../assets/RoofTilesImages/RoofTiles600x600.PNG";
import kitchenSink from "../assets/KitchenSinkCollection/KitchenSink.PNG";

const content = [
  {
    title: "WALL TILES",
    description:
      "Explore our premium range of wall tiles — the perfect blend of style, texture, and durability to elevate any room.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: walltile,
  },
  {
    title: "ELEVATION TILES",
    description:
      "Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: elevationTile,
  },
  {
    title: "FLOOR TILES",
    description:
      "Glossy or matte — our floor tiles deliver strength, beauty, and long-lasting performance.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: floorTile,
  },
  {
    title: "PARKING TILES",
    description:
      "Sturdy, anti-skid parking tiles engineered to handle heavy loads effortlessly.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: parkingTile,
  },
  {
    title: "COOLROOF TILES",
    description:
      "Reduce heat naturally with high-reflective cool roof tiles for thermal comfort.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: coolroof,
  },
  {
    title: "KITCHEN SINK",
    description:
      "Modern, durable kitchen sinks that complement your interiors and enhance functionality.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.Enhance your building's exterior with our stylish and weather-resistant elevation tiles.lorem ipsum dolor sit amet.",
    image: kitchenSink,
  },
];

const Layout = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  alignItems: "flex-start",
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
  top: theme.spacing(10),
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
  padding: theme.spacing(4, 0),
}));



function StickyScrollReveal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  // SCROLL LOGIC (kept)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const topOffset = containerRef.current.offsetTop;
        const scrollTop = window.scrollY - topOffset;
        const sectionHeight = window.innerHeight * 0.95;

        const index = Math.max(
          0,
          Math.min(Math.floor(scrollTop / sectionHeight), content.length - 1)
        );

        setActiveIndex(index);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        color="primary"
        align="center"
        sx={{ mb: 4 }}
      >
        Our Products
      </Typography>

      <Layout ref={containerRef}>
        {/* LEFT SIDE TEXT */}
        <LeftColumn>
          {content.map((item, i) => (
            <Section
              key={i}
              onMouseEnter={() => setActiveIndex(i)}   // 🔥 HOVER TO CHANGE IMAGE
              sx={{
                cursor: "pointer",
              }}
            >
              <Slide direction="right" in={i === activeIndex} timeout={300}>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {item.title}
                </Typography>
              </Slide>

              <Fade in={i === activeIndex} timeout={600}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ width: "95%", lineHeight: 1.7 }}
                >
                  {item.description}
                </Typography>
              </Fade>
            </Section>
          ))}
        </LeftColumn>

        {/* RIGHT SIDE IMAGE */}
        <RightSticky>
          <Fade in timeout={700}>
            <Box
              sx={{
                width: "90%",
                height: "70%",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
              }}
            >
              <img
                src={content[activeIndex].image}
                alt={content[activeIndex].title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          </Fade>
        </RightSticky>
      </Layout>
    </Container>
  );
}

export default function Products() {
  return <StickyScrollReveal />;
}
