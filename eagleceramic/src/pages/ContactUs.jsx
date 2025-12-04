import React, { useState, useRef } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Send,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import HeadingImg from '../assets/ParkingTiles/PunchCollection1.jpg';
import OurClients from '../components/OurClients.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQSection from '../components/Faqsections.jsx';

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
      content: "Shop No 13, Second Floor, Survey No 63 Paiki1/paiki2, Plot No 1 Paiki Prabhat Chamber, Halvad Road, Mahendranagar, Morbi MORBI-363641, GUJARAT-INDIA",
      bg: "#3f464dff"
    },
    {
      icon: <Phone />,
      title: "Phone",
      content: [
        { href: "tel:+919586200000", text: "+91 95862 00000" },
        { href: "tel:+919099000000", text: "+91 90990 00000" }
      ],
      bg: "#30363bff"
    },
    {
      icon: <Email />,
      title: "Email",
      content: { href: "mailto:info@eaglesceramics.net", text: "info@eaglesceramics.net" },
      bg: "#3f464dff"
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollLeft -= cardWidth;
      setCurrentCard(prev => Math.max(0, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.offsetWidth;
      container.scrollLeft += cardWidth;
      setCurrentCard(prev => Math.min(cards.length - 1, prev + 1));
    }
  };

  return (
    <>

      <Box sx={{ flexGrow: 1 }}>
        {/* Hero Section */}
        <Box
          sx={{
            backgroundImage: `linear-gradient(rgba(82, 61, 61, 0.7), rgba(60, 43, 43, 0.75)), url(${HeadingImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
            py: { xs: 10, sm: 11, md: 12, lg: 14 },
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
                  xs: '3rem',
                  sm: '3.8rem',
                  md: '3.5rem',
                  lg: '4.5rem'
                }
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
                fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.05rem' }
              }}
            >
              Get in touch with us for inquiries, support, or feedback. Our team is ready to assist you.
            </Typography>
          </Container>
        </Box>

        {/* Top 3 Cards - Horizontal Scroll for Mobile/Tablet */}
        <Box
          sx={{
            position: 'relative',
            display: { xs: 'block', md: 'none' }
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
            }}
          >
            {cards.map((card, index) => (
              <Box
                key={index}
                sx={{
                  flex: '0 0 100%',
                  scrollSnapAlign: 'start',
                  bgcolor: card.bg,
                  p: 4,
                  minHeight: '350px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: '#e65100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 3,
                  mx: 'auto'
                }}>
                  {React.cloneElement(card.icon, { sx: { fontSize: 32 } })}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: '1.3rem'
                  }}
                >
                  {card.title}
                </Typography>

                {card.title === "Phone" ? (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    {card.content.map((phone, i) => (
                      <Typography
                        key={i}
                        component="a"
                        href={phone.href}
                        sx={{
                          display: 'block',
                          color: '#fff',
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: '1.05rem',
                          mt: i > 0 ? 1 : 0
                        }}
                      >
                        {phone.text}
                      </Typography>
                    ))}
                  </Box>
                ) : card.title === "Email" ? (
                  <Typography
                    component="a"
                    href={card.content.href}
                    sx={{
                      color: '#fff',
                      fontWeight: 500,
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center',
                      mt: 2,
                      fontSize: '1.05rem'
                    }}
                  >
                    {card.content.text}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#fff',
                      lineHeight: 1.8,
                      textAlign: 'center',
                      mt: 2,
                      fontSize: '1rem',
                      px: 2
                    }}
                  >
                    {card.content}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows for Mobile/Tablet */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: 'absolute',
              left: 10,
              top: '55%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'white' },
              display: currentCard === 0 ? 'none' : 'flex'
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={scrollRight}
            sx={{
              position: 'absolute',
              right: 10,
              top: '55%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255,255,255,0.8)',
              '&:hover': { bgcolor: 'white' },
              display: currentCard === cards.length - 1 ? 'none' : 'flex'
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Dots Indicator */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pb: 2 }}>
            {cards.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  mx: 1,
                  bgcolor: index === currentCard ? '#e65100' : '#ccc',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const container = scrollContainerRef.current;
                    container.scrollLeft = index * container.offsetWidth;
                    setCurrentCard(index);
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Desktop View - Regular Grid (Hidden on mobile/tablet) */}
        <Grid
          container
          spacing={0}
          sx={{
            width: '100%',
            display: { xs: 'none', md: 'flex' }
          }}
        >
          {cards.map((card, index) => (
            <Grid
              item
              key={index}
              xs={12}
              md={4}
              sx={{
                bgcolor: card.bg,
                p: 5,
                width: '33.33%'
              }}
            >
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: '#e65100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                mb: 3,
                mx: 'auto'
              }}>
                {React.cloneElement(card.icon, { sx: { fontSize: 32 } })}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: '1.3rem'
                }}
              >
                {card.title}
              </Typography>

              {card.title === "Phone" ? (
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  {card.content.map((phone, i) => (
                    <Typography
                      key={i}
                      component="a"
                      href={phone.href}
                      sx={{
                        display: 'block',
                        color: '#fff',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '1.05rem',
                        mt: i > 0 ? 1 : 0
                      }}
                    >
                      {phone.text}
                    </Typography>
                  ))}
                </Box>
              ) : card.title === "Email" ? (
                <Typography
                  component="a"
                  href={card.content.href}
                  sx={{
                    color: '#fff',
                    fontWeight: 500,
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    mt: 2,
                    fontSize: '1.05rem'
                  }}
                >
                  {card.content.text}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    color: '#fff',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    mt: 2,
                    fontSize: '1rem'
                  }}
                >
                  {card.content}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>

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
                  color: '#e65100',
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
                Don't Hesitate To Contact<br />With Us For Any Kind Of<br />Information
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
                  '&:hover': { color: '#e65100' },
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ width: { xs: '100%' }}}>
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
                          bgcolor: '#00b0ff',
                          py: 1.8,
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: '#0095d8' },
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