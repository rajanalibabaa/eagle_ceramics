import React from 'react';
import {
  Container, Typography, Box, Grid, Button, Stack, Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  EmojiEvents, Verified, Speed, Handshake, TrendingUp, Architecture
} from '@mui/icons-material';

const MotionBox = motion(Box);

// Replace with your actual images
import heroBg from '../../../assets/Bannerimage4.png';
import Img1 from '../../../assets/Bannerimage5.png';
import Img2 from '../../../assets/Bannerimage3.png';
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

const AboutPageContent = () => {

  return (
    <Box sx={{ background: '#ffffff', color: '#0f172a', overflow: 'hidden' }}>
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
                <Typography variant="h1" sx={{
                  fontSize: { xs: '2rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  mb: { xs: 2, md: 3 },
                  textAlign: 'center',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  whiteSpace: { xs: 'normal', md: 'nowrap' }
                }}>
                  Eagle & Gaurada <Box component="span" sx={{ color: '#2ab81aff', display: 'inline' }}>Ceramics</Box>
                </Typography>

                <Typography variant="h6" sx={{
                  color: '#2ab81aff',
                  fontWeight: 700,
                  letterSpacing: { xs: '0.1em', md: '0.2em' },
                  mb: { xs: 3, md: 4 },
                  textAlign: 'center',
                  fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)',
                  px: { xs: 1, sm: 0 }
                }}>
                  ESTABLISHED 1989 • B2B CERAMIC EXCELLENCE
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
                  For over 35 years, we've been the silent backbone behind India's finest construction projects — supplying premium tiles with unwavering quality, speed, and trust.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ justifyContent: 'center', px: { xs: 2, sm: 0 } }}>
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
                    to="/services"
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

      {/* STATS BAR - Premium Horizontal */}
      <Box sx={{ bgcolor: '#ffffffff', py: { xs: 1, md: 3 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 8, md: 15 }} justifyContent='center' alignItems='center' textAlign="center">
            {[
              { number: "35+", label: "Years of Trust", icon: <EmojiEvents /> },
              { number: "15M+", label: "Sq. Ft. Delivered", icon: <Architecture /> },
              { number: "1000+", label: "Happy Builders", icon: <Handshake /> },
              { number: "Zero", label: "Supply Delays", icon: <Speed /> },
            ].map((stat, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Box sx={{
                    color: '#dc2626',
                    fontSize: { xs: 50, sm: 50, md: 60, lg: 80 },
                    mb: { xs: 0.5, md: 2 }
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{
                    color: 'black',
                    fontWeight: 800,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
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
        py: { xs: 8, sm: 10, lg: 12 },
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        px: { xs: 2, sm: 3, md: 0 }
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" flexDirection={{ xs: 'column-reverse', md: 'row' }}>
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
                  Founded by <strong style={{ color: '#dc2626' }}>Mr. Suresh</strong>, a pioneer with <strong>35 years</strong> of experience in the tiles and construction industry, <strong>Eagle Ceramics</strong> has grown into a trusted B2B supplier known for quality, consistency, and professionalism.
                </Typography>

                <Typography variant="h6" sx={{
                  color: '#475569',
                  lineHeight: 1.8,
                  fontSize: { xs: '1rem', sm: '1.125rem', md: '1.15rem' },
                  mb: 3
                }}>
                  What began as a small wholesale operation has expanded into two strong brands — <strong style={{ color: '#dc2626' }}>Eagle Ceramics</strong> and <strong style={{ color: '#dc2626' }}>Gaurada Ceramics</strong> — each addressing the growing demands of modern construction and commercial architecture.
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
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
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
                    alt="Eagle & Gaurada Ceramics Factory"
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
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CORE VALUES - Clean Grid */}
      <Box sx={{
        bgcolor: 'rgba(252, 248, 251, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 0 }
      }}>
        {/* Animated Circles Background */}
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
            border: '1px solid rgba(220, 38, 38, 0.1)',
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
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              bgcolor: '#dc2626',
              transform: 'translate(-50%, -50%)'
            }} />
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Title Section */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 4, md: 6 },
            textAlign: 'center'
          }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem', lg: '3.5rem' },
                color: '#0f172a',
                maxWidth: '800px',
                mx: 'auto',
                px: { xs: 1, sm: 0 },
                whiteSpace: { xs: 'normal', md: 'nowrap' }
              }}
            >
              Our Foundation & Our Promise
            </Typography>
          </Box>

          {/* Cards Grid - Updated for proper spacing */}
          <Box sx={{
            width: '100%',
            overflowX: { xs: 'auto', sm: 'visible' },
            overflowY: 'hidden',
            py: { xs: 2, sm: 0 },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            WebkitOverflowScrolling: 'touch',
          }}>
            <Box sx={{
              width: { xs: 'max-content', sm: '100%' },
              px: { xs: 2, sm: 0 }
            }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: { xs: 'nowrap', sm: 'wrap' },
                  justifyContent: { xs: 'flex-start', sm: 'space-around' },
                  gap: { xs: '16px', sm: '20px', md: '24px' },
                  width: { xs: 'max-content', sm: '100%' },
                  pb: { xs: 2, sm: 0 }
                }}
              >
                {[
                  {
                    title: "Quality Commitment",
                    image: QualityCommitment
                  },
                  {
                    title: "On-Time Delivery",
                    image: OnTimeDelivery
                  },
                  {
                    title: "Consistent Supply",
                    image: ConsistentSupply
                  },
                  {
                    title: "Integrity & Transparency",
                    image: IntegrityTransparency
                  },
                  {
                    title: "Customer-First Approach",
                    image: CustomerFirstApproach
                  },
                  {
                    title: "Timely Fulfilment",
                    image: TimelyFulfilment
                  }
                ].map((item, i) => (
                  <Box
                    key={i}
                    sx={{
                      flexShrink: { xs: 0, sm: 1 },
                      flexBasis: { xs: '260px', sm: 'calc(50% - 20px)', md: 'calc(33.333% - 24px)' },
                      minWidth: { xs: '260px', sm: 'auto' }
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'white',
                        p: { xs: 3, sm: 4 },
                        borderRadius: { xs: 2, sm: 3 },
                        textAlign: 'center',
                        height: { xs: '260px', sm: '300px' },
                        width: { xs: '260px', sm: '100%', md: '300px' },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                        borderTop: '5px solid #38c40eff',
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        mx: 'auto',
                        '&:hover': {
                          transform: 'scale(1.02)', // 2px bigger on hover
                          boxShadow: '0 10px 25px rgba(220, 38, 38, 0.15)',
                        }
                      }}
                    >
                      <Box sx={{
                        mb: { xs: 2, sm: 3 },
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        }
                      }}>
                        <Box sx={{
                          width: { xs: 80, sm: 90 },
                          height: { xs: 80, sm: 90 },
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              filter: 'drop-shadow(0 3px 6px rgba(220, 38, 38, 0.15))',
                            }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                      }}>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            color: '#0f172a',
                            fontSize: { xs: '1rem', sm: '1.1rem' },
                            mb: { xs: 1, sm: 2 },
                            textAlign: 'center',
                            width: '100%',
                            lineHeight: 1.3,
                            minHeight: { xs: '48px', sm: '56px' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Box sx={{
                          width: { xs: '40px', sm: '50px' },
                          height: '3px',
                          backgroundColor: '#dc2626',
                          borderRadius: '2px',
                          mt: { xs: 1, sm: 2 },
                          transition: 'width 0.3s ease',
                          '&:hover': {
                            width: { xs: '50px', sm: '60px' }
                          }
                        }} />
                      </Box>

                      {/* Background Glow */}
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, rgba(220, 38, 38, 0.05) 0%, transparent 70%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: -1,
                        '&:hover': {
                          opacity: 1
                        }
                      }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
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
              <Typography variant="h2" sx={{
                fontWeight: 800,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem', lg: '3.5rem' },
                lineHeight: 1.2,
                color: '#0f172a',
                px: { xs: 1, sm: 0 }
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
                content: 'At Eagle & Gaurada Ceramics, our mission is to deliver innovative, high-quality tiles that elevate spaces. We strive for excellence through craftsmanship, technology, and customer satisfaction, ensuring timeless designs for India\'s construction industry.',
                delay: 0
              },
              {
                title: 'Our Vision',
                icon: vision,
                hoverImg: vision1,
                content: 'We envision Eagle & Gaurada Ceramics as a leader in tile manufacturing, recognized for setting new standards in design and quality. Our goal is to inspire creativity, transforming ordinary spaces into extraordinary environments through our premium tiles.',
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
                      {card.content.split('Eagle & Gaurada Ceramics').map((part, i, arr) => (
                        i === arr.length - 1 ? part : <span key={i}>{part}<strong style={{ color: '#dc2626' }}>Eagle & Gaurada Ceramics</strong></span>
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
  );
};

export default AboutPageContent;