import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Send,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import HeadingImg from '../assets/ContactUsBackground.jpg';
import OurClients from '../components/OurClients.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQSection from '../components/Faqsections.jsx';
import { color } from 'framer-motion';

const ContactUs = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const scrollContainerRef = useRef(null);
  const [currentCard, setCurrentCard] = useState(0);

  // Handle scroll events for mobile cards
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newCard = Math.round(scrollLeft / cardWidth);
      setCurrentCard(newCard);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate email
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Show the popup
    setShowPopup(true);

    // Create FormData for submission
    const submissionData = new FormData();
    submissionData.append('firstName', formData.firstName);
    submissionData.append('lastName', formData.lastName);
    submissionData.append('email', formData.email);
    submissionData.append('subject', formData.subject);
    submissionData.append('message', formData.message);
    submissionData.append('_subject', 'New Contact Form Submission from Eagles Ceramics');
    submissionData.append('_captcha', 'false');
    submissionData.append('_template', 'table');
    submissionData.append('_autoresponse', `Thank you ${formData.firstName} ${formData.lastName} for contacting Eagles Ceramics! We will get back to you shortly.`);

    // Submit the form data using FormSubmit.co
    fetch('https://formsubmit.co/pradeepbabaateam66@gmail.com', {
      method: 'POST',
      body: submissionData,
    })
      .then(response => {
        if (response.ok) {
          console.log('Contact form submitted successfully');
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          console.error('Form submission failed');
          alert('Failed to submit form. Please try again or contact us directly.');
        }
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Network error. Please check your connection and try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const cards = [
    {
      icon: <LocationOn />,
      title: "Address",
      content: `Shop No 13, Second Floor, Survey No 63 Paiki1/paiki2,
       Plot No 1 Paiki Prabhat Chamber, Halvad Road, Mahendranagar,
        Morbi MORBI-363641, GUJARAT-INDIA`,
      bg: "#9c9a9aff"
    },
    {
      icon: <Phone />,
      title: "Phone",
      content: [
        { href: "tel:+919586200000", text: "+91 95862 00000" },
        { href: "tel:+919099000000", text: "+91 90990 00000" }
      ],
      bg: "#b8b9b6ff",
    },
    {
      icon: <Email />,
      title: "Email",
      content: { href: "mailto:info@eaglesceramics.net", text: "info@eaglesceramics.net" },
      bg: "#9c9a9aff"
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: container.scrollLeft - cardWidth,
        behavior: 'smooth'
      });
      setCurrentCard(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: container.scrollLeft + cardWidth,
        behavior: 'smooth'
      });
      setCurrentCard(prev => Math.min(cards.length - 1, prev + 1));
    }
  };

  const scrollToCard = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setCurrentCard(index);
    }
  };

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${HeadingImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            color: 'white',
            py: { xs: 6, sm: 12, md: 12, lg: 18 },
            textAlign: 'center'
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                fontSize: {
                  xs: '2.5rem',
                  sm: '3rem',
                  md: '3.5rem',
                  lg: '4.5rem'
                },
                color: 'whitesmoke'
              }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 4,
                opacity: 0.9,
                maxWidth: 700,
                mx: 'auto',
                px: { xs: 2, sm: 0 },
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem' },
                color: 'white'
              }}
            >
              Get in touch with us for inquiries, support, or feedback. Our team is ready to assist you.
            </Typography>
          </Container>
        </Box>

        {/* Mobile & Tablet View - Horizontal Scroll */}
        <Box
          sx={{
            position: 'relative',
            display: { xs: 'block', md: 'none' },
            mt: 4,
            mb: 4,
            px: 2
          }}
        >
          {/* Scroll Container for Mobile/Tablet */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory',
              '&::-webkit-scrollbar': { display: 'none' },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              gap: 3,
              pb: 2
            }}
          >
            {cards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 calc(100% - 8px)',
                  scrollSnapAlign: 'start',
                  backgroundColor: card.bg,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 4,
                  minHeight: '320px',
                  minWidth: 'calc(100% - 8px)',
                  mx: 0.5,
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                    '& .mobile-card-icon': {
                      transform: 'scale(1.1) rotate(5deg)'
                    }
                  }
                }}
              >
                {/* Icon Container */}
                <Box
                  className="mobile-card-icon"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    mb: 3,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(230, 81, 0, 0.3)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: '2px solid rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  {React.cloneElement(card.icon, { sx: { fontSize: 28 } })}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    color: '#000000ff',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    mb: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '40px',
                      height: '3px',
                      backgroundColor: '#dc2626',
                      borderRadius: '2px'
                    }
                  }}
                >
                  {card.title}
                </Typography>

                {/* Content */}
                <Box sx={{
                  textAlign: 'center',
                  mt: 2,
                  width: '100%'
                }}>
                  {card.title === "Phone" ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {card.content.map((phone, i) => (
                        <Typography
                          key={i}
                          component="a"
                          href={phone.href}
                          sx={{
                            color: '#000000ff',
                            textDecoration: 'none',
                            fontWeight: 500,
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            py: 1.2,
                            px: 2,
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 30, 0, 0.3)',
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(255, 81, 0, 0.2)'
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                backgroundColor: '#fff'
                              }}
                            />
                          </Box>
                          {phone.text}
                        </Typography>
                      ))}
                    </Box>
                  ) : card.title === "Email" ? (
                    <Typography
                      component="a"
                      href={card.content.href}
                      sx={{
                        color: '#000000ff',
                        fontWeight: 500,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        py: 1.2,
                        px: 3,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.3s ease',
                        width: '100%',
                        fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 30, 0, 0.3)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(230, 81, 0, 0.2)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px'
                        }}
                      >
                        ✉️
                      </Box>
                      {card.content.text}
                    </Typography>
                  ) : card.title === "Address" ? (
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#fff',
                        lineHeight: 1.6,
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        px: 1,
                        whiteSpace: 'pre-line',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                        '& span': {
                          display: 'block'
                        }
                      }}
                    >
                      <span style={{ color: '#010000ff' }}>Shop No 13, Second Floor,</span>
                      <span style={{ color: '#010000ff' }}>Survey No 63 Paiki1/paiki2,</span>
                      <span style={{ color: '#010000ff' }}>Plot No 1 Paiki Prabhat Chamber,</span>
                      <span style={{ color: '#010000ff' }}>Halvad Road, Mahendranagar, Morbi,</span>
                      <span style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>
                        MORBI-363641, GUJARAT-INDIA
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#fff',
                        lineHeight: 1.7,
                        textAlign: 'center',
                        fontSize: '1rem',
                        px: 2
                      }}
                    >
                      {card.content}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows for Mobile/Tablet */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: 'absolute',
              left: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              '&:hover': { bgcolor: 'white' },
              display: currentCard === 0 ? 'none' : 'flex',
              width: 40,
              height: 40,
              zIndex: 1
            }}
          >
            <ChevronLeft sx={{ fontSize: 24 }} />
          </IconButton>
          <IconButton
            onClick={scrollRight}
            sx={{
              position: 'absolute',
              right: 4,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              '&:hover': { bgcolor: 'white' },
              display: currentCard === cards.length - 1 ? 'none' : 'flex',
              width: 40,
              height: 40,
              zIndex: 1
            }}
          >
            <ChevronRight sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pb: 1 }}>
            {cards.map((_, index) => (
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
        </Box>

        {/* Desktop View - Grid Layout */}
        <Box
          sx={{
            width: '100%',
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 4,
            backgroundColor: 'transparent',
            position: 'relative',
            mx: 'auto',
            maxWidth: '1200px',
            mt: 6,
            mb: 4,
            px: 2
          }}
        >
          {cards.map((card, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                backgroundColor: card.bg,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 5,
                minHeight: '350px',
                height: '100%',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                  '& .card-icon': {
                    transform: 'scale(1.1) rotate(5deg)'
                  }
                }
              }}
            >
              {/* Icon Container */}
              <Box
                className="card-icon"
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: '##dc2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 4,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(230, 0, 0, 0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {React.cloneElement(card.icon, { sx: { fontSize: 28 } })}
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  color: '#060000ff',
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  mb: 2,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '3px',
                    backgroundColor: '#dc2626',
                    borderRadius: '2px'
                  }
                }}
              >
                {card.title}
              </Typography>

              {/* Content */}
              <Box sx={{
                textAlign: 'center',
                mt: 2,
                width: '100%'
              }}>
                {card.title === "Phone" ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {card.content.map((phone, i) => (
                      <Typography
                        key={i}
                        component="a"
                        href={phone.href}
                        sx={{
                          color: '#040000ff',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1.5,
                          py: 1.2,
                          px: 3,
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 26, 1, 0.3)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(255, 26, 1, 0.3)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Box
                            sx={{
                              width: 9,
                              height: 9,
                              borderRadius: '50%',
                              backgroundColor: '#fff'
                            }}
                          />
                        </Box>
                        {phone.text}
                      </Typography>
                    ))}
                  </Box>
                ) : card.title === "Email" ? (
                  <Typography
                    component="a"
                    href={card.content.href}
                    sx={{
                      color: '#030000ff',
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      py: 1.2,
                      px: 3,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      width: '100%',
                      fontSize: '1.1rem',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 26, 1, 0.3)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(255, 26, 1, 0.3)'
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px'
                      }}
                    >
                      ✉️
                    </Box>
                    {card.content.text}
                  </Typography>
                ) : card.title === "Address" ? (
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#fff',
                      lineHeight: 1.6,
                      textAlign: 'center',
                      fontSize: '0.95rem',
                      px: 2,
                      whiteSpace: 'pre-line',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 0.5,
                      '& span': {
                        display: 'block'
                      }
                    }}
                  >
                    <span style={{ color: '#030000ff' }}>Shop No 13, Second Floor,</span>
                    <span style={{ color: '#030000ff' }}>Survey No 63 Paiki1/paiki2,</span>
                    <span style={{ color: '#030000ff' }}>Plot No 1 Paiki Prabhat Chamber,</span>
                    <span style={{ color: '#030000ff' }}>Halvad Road, Mahendranagar, Morbi,</span>
                    <span style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.95rem' }}>
                      MORBI-363641, GUJARAT-INDIA
                    </span>
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#fff',
                      lineHeight: 1.7,
                      textAlign: 'center',
                      fontSize: '1rem',
                      px: 2
                    }}
                  >
                    {card.content}
                  </Typography>
                )}
              </Box>

              {/* Decorative Corner */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '50px',
                  height: '50px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderBottomLeftRadius: '50px'
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Contact Form Section */}
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 6, sm: 8, md: 10, lg: 12 }
          }}
        >
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            alignItems="center"
            sx={{
              flexDirection: { xs: 'column', lg: 'row' }
            }}
          >
            {/* Left Side - Content */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                width: { xs: '100%', lg: '40%' },
                textAlign: { xs: 'center', lg: 'left' }
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#dc2626',
                  mb: 2,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.125rem' }
                }}
              >
                CONTACT US
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem', lg: '2.75rem' }
                }}
              >
                Don't Hesitate To Contact<br />With Us For Any<br /> Kind Of<br />Information
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.1rem', sm: '1.5rem' }
                }}
              >
                Call us for immediate support this number
              </Typography>
              <Typography
                variant="h5"
                component="a"
                href="tel:+918807665455"
                sx={{
                  color: '#000',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  '&:hover': { color: '#dc2626' },
                  fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}
              >
                +880 876 65 455
              </Typography>
            </Grid>

            {/* Right Side - Form Card */}
            <Grid
              item
              xs={12}
              lg={6}
              sx={{
                width: { xs: '100%', lg: '55%' }
              }}
            >
              <Card
                elevation={10}
                sx={{
                  borderRadius: 3,
                  p: { xs: 3, sm: 4, md: 5 },
                  bgcolor: '#fff'
                }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                >
                  <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={3}
                    sx={{
                      background: "#050608",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      textAlign: "center",
                      fontSize: { xs: "1.5rem", sm: "1.75rem" },
                    }}
                  >
                    Get Expert Consultation
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ width: { xs: '100%' } }}>
                      <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ width: { xs: '100%', } }}>
                      <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: { xs: '100%', } }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: { xs: '100%', } }}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ width: { xs: '100%', } }}>
                      <TextField
                        required
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={5}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={!loading && <Send />}
                        disabled={loading}
                        sx={{
                          bgcolor: '#dc2626',
                          py: 1.8,
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#d23636ff' },
                          width: { xs: '100%', md: 'auto' },
                          ml: { xs: 0, md: 0 }
                        }}
                      >
                        {loading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <>
        <OurClients />
        <Testimonials />
        <FAQSection />
      </>

      {/* Success Popup */}
      {showPopup && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={closePopup}
        >
          <Box
            sx={{
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              textAlign: 'center',
              maxWidth: '400px',
              margin: 2,
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" sx={{ mb: 2, color: '#00b0ff', fontWeight: 700 }}>
              Thank You! 🎉
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'black' }}>
              Thank you for contacting Eagles Ceramics! We have received your message and our team will get back to you shortly.
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, color: 'black' }}>
              We typically respond within 24 hours during business days.
            </Typography>
            <Button
              variant="contained"
              onClick={closePopup}
              sx={{
                backgroundColor: '#00b0ff',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#0095d8',
                }
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ContactUs;