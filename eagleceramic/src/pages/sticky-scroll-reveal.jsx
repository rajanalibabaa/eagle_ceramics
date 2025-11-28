"use client";
import React, { useRef, useEffect, useState } from "react";
import { Box, Container, Typography, Paper, useTheme, useMediaQuery, Fade, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";

const StickyScrollContainer = styled(Box)(({ theme }) => ({
  position: "relative",
}));

const ContentSection = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  position: "sticky",
  top: 0,
  alignItems: "center",
  justifyContent: "space-between",
  height: "100vh",
  padding: theme.spacing(6),
  backgroundColor: isActive ? theme.palette.background.paper : theme.palette.background.default,
  borderRadius: theme.spacing(3),
  marginBottom: theme.spacing(2),
  boxShadow: isActive ? theme.shadows[8] : theme.shadows[2],
  transition: "all 0.3s ease-in-out",
  flexDirection: "row",
  gap: theme.spacing(4),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(4),
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: "500px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const VisualContent = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    minHeight: "300px",
    width: "100%",
  },
}));

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #06b6d4, #10b981)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Collaborative Editing
        </Typography>
      </Box>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <img
          src="/linear.webp"
          width={300}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px",
          }}
          alt="linear board demo"
        />
      </Box>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #f97316, #eab308)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Version control
        </Typography>
      </Box>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom right, #06b6d4, #10b981)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Running out of content
        </Typography>
      </Box>
    ),
  },
];

export function StickyScroll({ content: propContent }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const sectionHeight = window.innerHeight;
        const currentIndex = Math.floor(scrollY / sectionHeight);
        setActiveIndex(Math.min(currentIndex, propContent.length - 1));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [propContent.length]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <StickyScrollContainer ref={containerRef}>
        {propContent.map((item, index) => (
          <ContentSection 
            key={index} 
            elevation={4}
            isActive={index === activeIndex}
          >
            <TextContent>
              <Slide direction="right" in={index === activeIndex} timeout={500}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom 
                  fontWeight="bold"
                  color="primary"
                >
                  {item.title}
                </Typography>
              </Slide>
              <Fade in={index === activeIndex} timeout={800}>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  lineHeight={1.7}
                  sx={{ mt: 2 }}
                >
                  {item.description}
                </Typography>
              </Fade>
            </TextContent>
            
            <VisualContent>
              <Fade in={index === activeIndex} timeout={1000}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  {item.content}
                </Box>
              </Fade>
            </VisualContent>
          </ContentSection>
        ))}
      </StickyScrollContainer>
    </Container>
  );
}

export { content };