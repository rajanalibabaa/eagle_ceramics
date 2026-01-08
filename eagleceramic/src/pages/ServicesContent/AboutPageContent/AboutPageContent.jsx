import React, { useState, useRef, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
  import Button from '@mui/material/Button';
  import Stack from '@mui/material/Stack';
  import Divider from '@mui/material/Divider';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const MotionBox = motion(Box);

// Replace with your actual images
import heroBg from '../../../assets/Bannerimage4.jpeg';
import Img1 from '../../../assets/BannerImage5.jpeg';
import Img2 from '../../../assets/Bannerimage3.png';
import Img3 from '../../../assets/profile.png';
import Mission from '../../../assets/AboutImages/Mission.webp'
import Mission1 from '../../../assets/AboutImages/Mission1.webp'
import vision from '../../../assets/AboutImages/vision.webp'
import vision1 from '../../../assets/AboutImages/vision1.webp'
import value from '../../../assets/AboutImages/value.webp'
import value1 from '../../../assets/AboutImages/value1.webp'

import OnTimeDelivery from '../../../assets/AboutImages/On-TimeDelivery.jpeg'
import ConsistentSupply from '../../../assets/AboutImages/ConsistentSupply.jpg'
import IntegrityTransparency from '../../../assets/AboutImages/IntegrityTransparency.jpg'
import CustomerFirstApproach from '../../../assets/AboutImages/CustomerFirstApproach.jpg'
import QualityCommitment from '../../../assets/AboutImages/QualityCommitment.jpeg'
import TimelyFulfilment from '../../../assets/AboutImages/TimelyFulfilment.jpg'
import FAQSection from '../../../components/Faqsections';
import ModernAboutMe from '../../../components/ModernAboutMe';

const AboutPageContent = () => {
  const cardRefs = useRef([]);
  const [currentCard, setCurrentCard] = useState(0);
  const enhancedCardsCount = 6; // number of items in the enhanced cards grid
  const enhancedGridRef = useRef(null);

  useEffect(() => {
    if (!cardRefs.current) return;
    const rootEl = enhancedGridRef.current || null; // use the horizontal scroll container when available
    const options = { root: rootEl, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          if (!Number.isNaN(idx)) setCurrentCard(idx);
        }
      });
    }, options);

    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [enhancedGridRef.current]);

  const scrollToCard = (index) => {
    const el = cardRefs.current[index];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setCurrentCard(index);
  };

  return (
    <>
    <Box sx={{ background: '#ffffff', color: '#0f172a', overflow: 'hidden' }}>

      {/* STATS BAR - Premium Horizontal */}
      
      {/* HERO - Ultra Clean & Powerful */}
      <Box sx={{
        position: 'relative',
        minHeight: { xs: '75vh', sm: '75vh', md: '89vh' },
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.88) 100%)',
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 5, md: 0 } }}>
          <Grid container justifyContent='center' alignItems="center">
            <Grid item xs={12} md={8}>
              <MotionBox
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                sx={{ textAlign: 'center', px: { xs: 2, sm: 3, md: 0 } }}
              >
                <Typography  variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background:"white",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}>
                  Eagle & Garuda Ceramic
                </Typography>

                <Typography variant="h6" sx={{
                  color: '#ffffffff',
                  fontWeight: 700,
                  letterSpacing: { xs: '0.1em', md: '0.2em' },
                  mb: { xs: 3, md: 4 },
                  textAlign: 'center',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                  px: { xs: 1, sm: 0 }
                }}>
                  ESTABLISHED 2006 • B2B CERAMIC EXCELLENCE
                </Typography>

                <Typography variant="h5" sx={{
                  color: '#e2e8f0',
                  maxWidth: '680px',
                  lineHeight: 1.7,
                  fontWeight: 400,
                  mb: { xs: 6, md: 8 },
                  mx: 'auto',
                  textAlign: 'center',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  px: { xs: 2, sm: 3, md: 0 }
                }}>
                  For over 20 years, we've been the silent backbone behind India's finest construction projects — supplying premium tiles with unwavering quality, speed, and trust.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center', px: { xs: 2, sm: 0 }, mb: 5 }}>
                  <Button
                    component={Link}
                    to="/contact"
                    size="large"
                    sx={{
                      bgcolor: '#dc2626',
                      color: 'white',
                      px: { xs: 4, sm: 5, md: 7 },
                      py: { xs: 2, sm: 2.5, md: 3 },
                      borderRadius: 0,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                      boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)',
                      '&:hover': {
                        bgcolor: '#ef4444',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 15px 40px rgba(239, 68, 68, 0.5)'
                      },
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Request Quote
                  </Button>

                  <Button
                    component={Link}
                    to="/products"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: '#ffffff',
                      color: '#ffffff',
                      px: { xs: 4, sm: 5, md: 7 },
                      py: { xs: 2, sm: 2.5, md: 3 },
                      borderRadius: 0,
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      width: { xs: '100%', sm: 'auto' },
                      '&:hover': {
                        borderColor: '#0db42eff',
                        color: '#2ab81aff',
                        backgroundColor: 'rgba(26, 114, 18, 0.1)',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    Explore Products
                  </Button>
                </Stack>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, transparent 100%)',
          zIndex: 1
        }} />
      </Box>

{/* <ModernAboutMe/> */}
<Box sx={{ bgcolor: '#ffffffff', py: { xs: 2, md: 5, sm: 4 }, px: { sm: 6, md: 12 },maxWidth:'80%',position:'absolute',justifyContent:'center',mx:'auto',bottom:{xs:'-60px',sm:'-60px',md:'-80px'},left:'0',right:'0',textAlign:'center',borderRadius:2 ,zIndex:3,}}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 5 }} justifyContent='space-between' alignItems='center' textAlign="center">
            {[
              { number: "20+", label: "Years of Experience" },
              { number: "5000+", label: "Box Delivered" },
              { number: "Encountered", label: "Happy Dealers" },
              { number: "Zero", label: "Supply Delays" },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Typography variant="h3" sx={{
                    color: 'black',
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '2rem', md: '2rem', lg: '2rem' },
                    // mt:5,
                    pb: { xs: 0, md: 3 }
                  }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" sx={{
                    color: '#000000ff',
                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' }
                  }}>
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* FOUNDER STORY - Elegant & Emotional */}
      <Box sx={{
        py: { xs: 8, sm: 10, lg: 5 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        px: { xs: 2, sm: 3, md: 0 },


      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" flexDirection={{ xs: 'column-reverse', md: 'row' }} sx={{ mt: 8 }}>
            {/* Left Content */}
            <Grid item xs={12} md={6} sx={{
              width: { xs: '100%', md: '45%' },
              marginLeft: { xs: 0, md: 0 }
            }}>
              <MotionBox
                initial={{ opacity: 0, x: { xs: 0, md: -80 } }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                sx={{
                  pr: { md: 4 },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                <Typography variant="h2" sx={{
                  fontWeight: 800,
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3.1rem' },
                  lineHeight: 1.2,
                  whiteSpace: { xs: 'normal', md: 'nowrap' }
                }}>
                  One Man & One Vision
                  <br />
                  <Box component="span" sx={{ color: '#dc2626' }}>A Legacy Built.</Box>
                </Typography>

                <Divider sx={{
                  width: 100,
                  height: 5,
                  bgcolor: '#dc2626',
                  mb: { xs: 4, md: 5 },
                  borderRadius: '2px',
                  mx: { xs: 'auto', md: '0' }
                }} />
 

                <Typography variant="h6" sx={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.15rem' },
                  mb: 3
                }}>
                  Founded by <strong style={{ color: '#dc2626' }}>Mr. Suresh M.N</strong>, a pioneer with <strong>20 years</strong> of experience in the tiles and construction industry, <strong>Eagle Ceramic</strong> has grown into a trusted B2B supplier known for quality, consistency, and professionalism.
                </Typography>

                <Typography variant="h6" sx={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.15rem' },
                  mb: 3
                }}>
                  What began as a small wholesale operation has expanded into two strong brands — <strong style={{ color: '#dc2626' }}>Eagle Ceramic</strong> and <strong style={{ color: '#dc2626' }}>Garuda Ceramic</strong> — each addressing the growing demands of modern construction and commercial architecture.
                </Typography>

                <Typography variant="h6" sx={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.15rem' },
                  mb: 4
                }}>
                  We specialize in bulk tile supply for builders, contractors, and commercial establishments, ensuring product reliability and uninterrupted supply across projects of every scale. Our deep industry knowledge, curated product selection, and strong vendor network allow us to provide premium ceramic solutions at competitive pricing.
                </Typography>
              </MotionBox>
            </Grid>

            {/* Right Images */}
            <Grid item xs={12} md={6} sx={{
              width: { xs: '100%', md: '45%' },
              marginLeft: { xs: 0, md: '67px' }
            }}>
              <MotionBox
                  initial={{ opacity: 0, x: { xs: 0, md: 80 } }}
                  whileInView={{ opacity: 1, x: 0 }}
                  // whileHover={{
                  //   scale: { md: 1.04 },
                  //   boxShadow: '0 40px 100px rgba(220, 38, 38, 0.2)'
                  // }}
                  transition={{
                    duration: 0.9,
                    type: "spring",
                    stiffness: 100
                  }}
                  sx={{
                    position: 'relative',
                    borderRadius: { xs: 2, md: 4 },
                    overflow: 'hidden',
                    width: '100%',
                    height: { xs: '250px', sm: '300px', md: '700px' },
                    
                  }}
                >
                  <img
                    src={Img3}
                    alt="Mr. Suresh - Founder & Industry Pioneer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </MotionBox>
              
            </Grid>
          </Grid>
          <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 3, md: 4 },
                width: '100%'
              }}>
                {/* First Image - Founder */}
                <MotionBox
                  initial={{ opacity: 0, x: { xs: 0, md: 80 } }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    scale: { md: 1.04 },
                    boxShadow: '0 40px 100px rgba(220, 38, 38, 0.2)'
                  }}
                  transition={{
                    duration: 0.9,
                    type: "spring",
                    stiffness: 100
                  }}
                  sx={{
                    position: 'relative',
                    borderRadius: { xs: 2, md: 4 },
                    overflow: 'hidden',
                    width: '100%',
                    height: { xs: '250px', sm: '300px', md: '350px' },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, transparent 60%)',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <img
                    src={Img1}
                    alt="Mr. Suresh - Founder & Industry Pioneer"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </MotionBox>
               
                {/* Second Image - Factory/Showroom */}
                <MotionBox
                  initial={{ opacity: 0, x: { xs: 0, md: 80 } }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{
                    scale: { md: 1.04 },
                    boxShadow: '0 40px 100px rgba(0,0,0,0.2)'
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  sx={{
                    position: 'relative',
                    borderRadius: { xs: 2, md: 4 },
                    overflow: 'hidden',
                    width: '100%',
                    height: { xs: '250px', sm: '300px', md: '350px' },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.15) 0%, transparent 60%)',
                      zIndex: 1,
                      pointerEvents: 'none'
                    }
                  }}
                >
                  <img
                    src={Img2}
                    alt="Eagle & Gaurada Ceramic Factory"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </MotionBox>
              </Box>
        </Container>
      </Box>

      {/* CORE VALUES - Clean Grid */}
      <Box sx={{
        bgcolor: 'rgba(255, 255, 255, 0.61)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 10 },
        px: { xs: 2, sm: 3, md: 0 },
        background: 'black'
      }}>
        {/* Animated Background Elements */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          zIndex: 0,
          display: { xs: 'none', md: 'block' }
        }}>
          <Box sx={{
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 1)',
            position: 'relative',
            animation: 'rotate 40s linear infinite reverse',
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}>
            <Box sx={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              bgcolor: '#dc2626',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)'
            }} />
          </Box>
        </Box>

        {/* Additional floating elements */}
        <Box sx={{
          position: 'absolute',
          bottom: '15%',
          right: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(255, 255, 255, 1)',
          zIndex: 0,
          display: { xs: 'none', md: 'block' },
          animation: 'float 8s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Enhanced Title Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: { xs: 6, md: 10 },
              textAlign: 'center'
            }}
          >
            <Typography
               variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background:"white",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}
            >
              Our Foundation & Our Promise
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: '#ffffffff',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 400,
                lineHeight: 1.6
              }}
            >
              Building lasting relationships through excellence, reliability, and innovation
            </Typography>
          </MotionBox>

          {/* Enhanced Cards Grid */}
          <Box ref={enhancedGridRef} sx={{
            width: '100%',
            py: { xs: 2, sm: 3, md: 4 },
            overflowX: { xs: 'auto', sm: 'visible' }, // Enable horizontal scroll on mobile
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#ffffffff',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#dc2626',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#b91c1c',
            }
          }}>
            <Grid container
              spacing={{ xs: 2, sm: 3, md: 4, lg: 5 }}
              justifyContent="center"
              sx={{
                flexWrap: { xs: 'nowrap', sm: 'wrap' }, // No wrap on mobile for horizontal scroll
                justifyContent: { xs: 'flex-start', sm: 'center' }, // Start from left on mobile
                width: { xs: 'max-content', sm: '100%' }, // Make grid wider than container on mobile
                mx: { xs: 'auto', sm: 0 },
                px: { xs: 2, sm: 0 }, // Add padding on mobile for better scroll
              }}
            >
              {[
                {
                  title: "Quality Commitment",
                  image: QualityCommitment,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                },
                {
                  title: "On-Time Delivery",
                  image: OnTimeDelivery,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                },
                {
                  title: "Consistent Supply",
                  image: ConsistentSupply,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                },
                {
                  title: "Integrity & Transparency",
                  image: IntegrityTransparency,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                },
                {
                  title: "Customer-First Approach",
                  image: CustomerFirstApproach,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                },
                {
                  title: "Timely Fulfilment",
                  image: TimelyFulfilment,
                  color: '#dc2626',
                  gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                }
              ].map((item, i) => (
                <Grid item
                  xs={12}
                  sm={6}
                  md={4}
                  key={i}
                  data-index={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  sx={{
                    flex: { xs: '0 0 auto', sm: '1 0 auto' }, // Don't shrink on mobile
                    width: { xs: '280px', sm: 'auto' }, // Fixed width on mobile for scrolling
                  }}
                >
                  <MotionBox
                    initial={{
                      opacity: 0,
                      x: { xs: -100, sm: 0, md: 0 }, // Slide from left on mobile only
                      y: { xs: 0, sm: 50, md: 50 } // Keep y animation for tablet/desktop
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.15, // Staggered delay for slide effect
                      type: { xs: "spring", sm: "tween" }, // Spring animation for mobile slide
                      stiffness: { xs: 100, sm: 0 },
                      damping: { xs: 12, sm: 0 }
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'white',
                        p: { xs: 2, sm: 3, md: 3, lg: 4 },
                        borderRadius: {
                          xs: 16,    // Mobile
                          sm: 20,    // Tablet
                          md: 22,    // Mac
                          lg: 24     // Desktop (unchanged)
                        },
                        textAlign: 'center',
                        height: {
                          xs: '280px',   // Mobile
                          sm: '320px',   // Tablet
                          md: '300px',   // Mac (matches your md value)
                          lg: '360px'    // Desktop
                        },
                        width: {
                          xs: '280px',   // Mobile (fixed for scroll)
                          sm: '100%',    // Tablet+
                        },
                        maxWidth: {
                          xs: '280px',   // Mobile
                          sm: '280px',   // Tablet
                          md: '280px',   // Mac (matches your maxWidth)
                          lg: '320px'    // Desktop
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: {
                            xs: 'translateY(-6px) scale(1.02)',   // Mobile: scale effect for touch
                            sm: 'translateY(-8px)',   // Tablet
                            md: 'translateY(-10px)',  // Mac
                            lg: 'translateY(-12px)'   // Desktop (unchanged)
                          },
                          boxShadow: {
                            xs: '0 20px 40px rgba(0,0,0,0.15)',
                            sm: '0 20px 40px rgba(0,0,0,0.15)',
                            md: '0 25px 50px rgba(0,0,0,0.15)',
                            lg: '0 25px 50px rgba(0,0,0,0.15)'  // Desktop (unchanged)
                          },
                          '& .icon-container': {
                            transform: {
                              xs: 'scale(1.05)',
                              sm: 'scale(1.07)',
                              md: 'scale(1.09)',
                              lg: 'scale(1.1)'
                            },
                            boxShadow: `0 15px 30px ${item.color}40`
                          },
                          '& .title-text': {
                            color: item.color
                          },
                          '& .divider': {
                            width: {
                              xs: '60px',   // Mobile
                              sm: '70px',   // Tablet
                              md: '75px',   // Mac
                              lg: '80px'    // Desktop (unchanged)
                            },
                            backgroundColor: item.color
                          }
                        }
                      }}
                    >
                      {/* Background Gradient */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: item.gradient,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 0,
                        '&:hover': {
                          opacity: 0.05
                        }
                      }} />

                      {/* Corner Accents */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: {
                          xs: '40px',   // Mobile
                          sm: '50px',   // Tablet
                          md: '55px',   // Mac
                          lg: '60px'    // Desktop (unchanged)
                        },
                        height: {
                          xs: '40px',   // Mobile
                          sm: '50px',   // Tablet
                          md: '55px',   // Mac
                          lg: '60px'    // Desktop (unchanged)
                        },
                        borderTop: `2px solid ${item.color}`,
                        borderLeft: `2px solid ${item.color}`,
                        borderTopLeftRadius: {
                          xs: '12px',   // Mobile
                          sm: '16px',   // Tablet
                          md: '18px',   // Mac
                          lg: '20px'    // Desktop (unchanged)
                        },
                        opacity: 0.3
                      }} />

                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: {
                          xs: '40px',   // Mobile
                          sm: '50px',   // Tablet
                          md: '55px',   // Mac
                          lg: '60px'    // Desktop (unchanged)
                        },
                        height: {
                          xs: '40px',   // Mobile
                          sm: '50px',   // Tablet
                          md: '55px',   // Mac
                          lg: '60px'    // Desktop (unchanged)
                        },
                        borderBottom: `2px solid ${item.color}`,
                        borderRight: `2px solid ${item.color}`,
                        borderBottomRightRadius: {
                          xs: '12px',   // Mobile
                          sm: '16px',   // Tablet
                          md: '18px',   // Mac
                          lg: '20px'    // Desktop (unchanged)
                        },
                        opacity: 0.3
                      }} />       

                      {/* Icon Container with Enhanced Design */}
                      <Box className="icon-container"
                        sx={{
                          width: {
                            xs: '80px',    // Mobile
                            sm: '90px',    // Tablet
                            md: '100px',   // Mac
                            lg: '120px'    // Desktop (matches your sm value)
                          },
                          height: {
                            xs: '80px',    // Mobile
                            sm: '90px',    // Tablet
                            md: '100px',   // Mac
                            lg: '120px'    // Desktop (matches your sm value)
                          },
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          backgroundColor: 'white',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          border: `2px solid ${item.color}20`,
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-2px',
                            left: '-2px',
                            right: '-2px',
                            bottom: '-2px',
                            borderRadius: '50%',
                            background: item.gradient,
                            zIndex: -1,
                            opacity: 0.2
                          }
                        }}
                      >
                        <Box sx={{
                          width: '80%',
                          height: '80%',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: 'white',
                          overflow: 'hidden'
                        }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: `drop-shadow(0 5px 15px ${item.color}30)`
                            }}
                          />
                        </Box>
                      </Box>

                      {/* Content Section */}
                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        zIndex: 1,
                        flex: 1,
                        pt: { xs: 1, sm: 2 }
                      }}>
                        <Typography className="title-text"
                          variant="h5"
                          fontWeight="bold"
                          sx={{
                            color: '#0f172a',
                            fontSize: {
                              xs: '1rem',      // Mobile
                              sm: '1.125rem',  // Tablet
                              md: '1.25rem',   // Mac
                              lg: '1.5rem'     // Desktop (matches your sm value)
                            },
                            mb: {
                              xs: 1.5,   // Mobile
                              sm: 2,     // Tablet
                              md: 2.5,   // Mac
                              lg: 3      // Desktop (unchanged)
                            },
                            textAlign: 'center',
                            width: '100%',
                            lineHeight: 1.3,
                            minHeight: {
                              xs: '48px',   // Mobile
                              sm: '56px',   // Tablet
                              md: '60px',   // Mac
                              lg: '70px'    // Desktop (unchanged)
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {item.title}
                        </Typography>

                        {/* Animated Divider */}
                        <Box className="divider"
                          sx={{
                            width: {
                              xs: '40px',   // Mobile
                              sm: '50px',   // Tablet
                              md: '55px',   // Mac
                              lg: '60px'    // Desktop (unchanged)
                            },
                            height: {
                              xs: '3px',   // Mobile
                              sm: '3.5px', // Tablet
                              md: '4px',   // Mac
                              lg: '4px'    // Desktop (unchanged)
                            },
                            backgroundColor: `${item.color}80`,
                            borderRadius: '2px',
                            transition: 'all 0.4s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: item.gradient,
                              animation: 'slide 2s infinite',
                              '@keyframes slide': {
                                '0%': { left: '-100%' },
                                '100%': { left: '100%' }
                              }
                            }
                          }}
                        />
                      </Box>

                      {/* Hover Effect Lines (Desktop only) */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: { xs: 'none', md: 'block' }, // Only show on md and above
                        '&:hover': {
                          opacity: 1
                        },
                        '&::before, &::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: '200%',
                          height: '200%',
                          background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                          transform: 'translate(-50%, -50%)',
                          animation: 'ripple 2s linear infinite'
                        },
                        '&::after': {
                          animationDelay: '1s'
                        },
                        '@keyframes ripple': {
                          '0%': { transform: 'translate(-50%, -50%) scale(0.5)' },
                          '100%': { transform: 'translate(-50%, -50%) scale(1)' }
                        }
                      }} />
                    </Box>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Mobile dots navigation for Enhanced Cards Grid */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 3, pb: 1 }}>
            {Array.from({ length: enhancedCardsCount }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  mx: 1,
                  bgcolor: index === currentCard ? '#dc2626' : '#ccc',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    bgcolor: index === currentCard ? '#dc2626' : '#999'
                  }
                }}
                onClick={() => scrollToCard(index)}
              />
            ))}
          </Box>

          {/* Call to Action Section */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            sx={{
              textAlign: 'center',
              mt: { xs: 8, md: 12 },
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.95) 100%)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Typography variant="h4" fontWeight="bold" sx={{
              color: '#000000ff',
              mb: 2,
              background: '#010000ff',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Ready to Experience Excellence?
            </Typography>
            <Typography variant="h6" sx={{
              color: '#000000ff',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto'
            }}>
              Join thousands of satisfied builders who trust Eagle & Gaurada Ceramic
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                px: 6,
                py: 2,
                borderRadius: 3,
                fontSize: '1.125rem',
                fontWeight: 'bold',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 15px 40px rgba(220, 38, 38, 0.4)',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Today
            </Button>
          </MotionBox>
        </Container>
      </Box>

      {/* VISION, MISSION & CORE VALUES - Simplified */}
      <Box sx={{
        bgcolor: 'rgba(248, 250, 252, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 0 }
      }}>
        <Box sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          zIndex: 0,
          display: { xs: 'none', md: 'block' }
        }}>
          <Box sx={{
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '1px solid rgba(220, 38, 38, 0.1)',
            position: 'relative',
            animation: 'rotate 30s linear infinite',
            '@keyframes rotate': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              bgcolor: '#dc2626',
              transform: 'translate(-50%, -50%)'
            }} />
          </Box>
        </Box>

        <Container>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8, lg: 12 }, mt: { md: 10 } }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              sx={{ mb: 2 }}
            >
              <Typography variant="h6" sx={{
                color: '#dc2626',
                fontWeight: 600,
                letterSpacing: { xs: '0.05em', md: '0.1em' },
                textTransform: 'uppercase',
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}>
                Our Purpose
              </Typography>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography  variant="h2"
              sx={{
                fontWeight: 900,
                mb: 2,
                background:"black",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                lineHeight: 1.2,
              }}>
                Transforming Spaces Through a Foundation of Excellence
              </Typography>
            </MotionBox>
          </Box>

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {[
              {
                title: 'Our Mission',
                icon: Mission,
                hoverImg: Mission1,
                content: 'At Eagle & Gaurada Ceramic, our mission is to deliver innovative, high-quality tiles that elevate spaces. We strive for excellence through craftsmanship, technology, and customer satisfaction, ensuring timeless designs for India\'s construction industry.',
                delay: 0
              },
              {
                title: 'Our Vision',
                icon: vision,
                hoverImg: vision1,
                content: 'We envision Eagle & Gaurada Ceramic as a leader in tile manufacturing, recognized for setting new standards in design and quality. Our goal is to inspire creativity, transforming ordinary spaces into extraordinary environments through our premium tiles.',
                delay: 0.1
              },
              {
                title: 'Core Values',
                icon: value,
                hoverImg: value1,
                content: 'Our core values are rooted in integrity, innovation, and excellence. We prioritize customer satisfaction, craftsmanship, and sustainability, while continually pushing the boundaries of design and quality in tile manufacturing.',
                delay: 0.2
              }
            ].map((card, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: { xs: 1.01, md: 1.02 }, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                transition={{ duration: 0.5, delay: card.delay }}
                sx={{
                  bgcolor: 'white',
                  borderRadius: { xs: 2, md: 2 },
                  overflow: 'hidden',
                  mb: index < 2 ? { xs: 3, md: 4 } : 0,
                  height: { xs: 'auto', md: '300px' },
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  boxShadow: '0 15px 40px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  width: '100%',
                  marginX: 'auto',
                  '&:hover': {
                    width: { xs: '100%', md: '95%' },
                    marginX: 'auto',
                  },
                  '&:hover .hover-image': {
                    opacity: { xs: 0, md: 1 },
                    transform: { xs: 'rotate(75deg) scale(1)', md: 'rotate(0deg) scale(1)' }
                  },
                  '&:hover .content-text': {
                    mr: { xs: 0, md: 34 }
                  }
                }}
              >
                <Box sx={{
                  p: { xs: 3, md: 4 },
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  alignItems: { xs: 'center', md: 'center' },
                  gap: { xs: 3, md: 4 }
                }}>
                  <Box sx={{
                    width: { xs: '80px', sm: '100px', md: '120px' },
                    height: { xs: '80px', sm: '100px', md: '120px' },
                    flexShrink: 0
                  }}>
                    <img src={card.icon} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Box>

                  <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h3" sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.2rem' },
                      mb: { xs: 2, md: 3 },
                      color: '#0f172a'
                    }}>
                      {card.title}
                    </Typography>
                    <Typography
                      className="content-text"
                      variant="h6"
                      sx={{
                        color: '#64748b',
                        lineHeight: 1.8,
                        fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                        fontWeight: 400,
                        transition: 'margin-right 0.3s ease',
                      }}
                    >
                      {card.content.split('Eagle & Gaurada Ceramic').map((part, i, arr) => (
                        i === arr.length - 1 ? part : <span key={i}>{part}<strong style={{ color: '#dc2626' }}>Eagle & Gaurada Ceramic</strong></span>
                      ))}
                    </Typography>
                  </Box>
                </Box>

                <Box className="hover-image" sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  marginLeft: { xs: '0%', md: '40%' },
                  opacity: 0,
                  transition: 'all 0.5s ease',
                  pointerEvents: 'none',
                  zIndex: 2,
                  transform: 'rotate(75deg)',
                  display: { xs: 'none', md: 'block' },
                  '&:hover': {
                    transform: 'rotate(75deg) scale(1.05)'
                  }
                }}>
                  <img src={card.hoverImg} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
              </MotionBox>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
    <>
    <FAQSection />
    </>
    </>
  );
};

export default AboutPageContent;