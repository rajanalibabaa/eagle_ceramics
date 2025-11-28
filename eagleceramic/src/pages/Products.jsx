"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Fade,
  Slide,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import walltile from "../assets/WallTiles/Nature.jpg";

const content = [
  {
    title: "WALL TILES",
    description:
      "Explore our premium range of wall tiles — the perfect blend of style and durability for every space.",
    image: walltile,
  },
  {
    title: "ELEVATION TILES",
    description:
      "Add depth and elegance to your exteriors with our contemporary elevation tiles.",
    image: "/linear.webp",
  },
  {
    title: "FLOOR TILES",
    description:
      "Strong, stylish, and sustainable floor tiles built to last in any environment.",
    image: "/floor.webp",
  },
  {
    title: "PARKING TILES",
    description:
      "Durable, anti‑skid parking tiles designed to withstand heavy usage and weather.",
    image: "/parking.webp",
  },
  {
    title: "COOLROOF TILES",
    description:
      "Keep your building cool naturally with our heat‑reflective coolroof tiles.",
    image: "/coolroof.webp",
  },
  {
    title: "KITCHEN SINK",
    description:
      "Functional and modern kitchen sinks to complement your tile choices perfectly.",
    image: "/sink.webp",
  },
];

const Layout = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  position: "relative",
  gap: theme.spacing(6),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const LeftColumn = styled(Box)(({ theme }) => ({
  flex: 1,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    order: 2,
  },
}));

const RightSticky = styled(Box)(({ theme }) => ({
  flex: 1,
  position: "sticky",
  top: theme.spacing(10),
  height: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    position: "relative",
    top: "initial",
    height: "300px",
    width: "100%",
    order: 1,
  },
}));

const Section = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  marginBottom: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

// ---------- Main Sticky Scroll Component ----------
function StickyScrollReveal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const topOffset = containerRef.current.offsetTop;
        const scrollTop = window.scrollY - topOffset;
        const sectionHeight = window.innerHeight;
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
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Typography
        variant="h2"
        fontWeight="bold"
        color="primary"
        gutterBottom  
        align="center"
      >
        Our Products
      </Typography>
      <Layout ref={containerRef}>
        {/* Left side text */}
        <LeftColumn>
          {content.map((item, i) => (
            <Section key={i}>
              <Slide direction="right" in={i === activeIndex} timeout={300}>
                <Typography
                  variant="h3"
                  fontWeight="bold"
                  color="primary"
                  gutterBottom
                >
                  {item.title}
                </Typography>
              </Slide>
              <Fade in={i === activeIndex} timeout={600}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  lineHeight={1.7}
                  sx={{ maxWidth: 600 }}
                >
                  {item.description}
                </Typography>
              </Fade>
            </Section>
          ))}
        </LeftColumn>

        {/* Right side sticky image */}
        <RightSticky>
          <Fade in timeout={800}>
            <Box
              sx={{
                width: "100%",
                height: "70%",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <img
                src={content?.[activeIndex]?.image}
                alt={content?.[activeIndex]?.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Fade>
        </RightSticky>
      </Layout>
    </Container>
  );
}

// ---------- Export Component ----------
export default function Products() {
  return (
    <div>
      <StickyScrollReveal />
    </div>
  );
}
