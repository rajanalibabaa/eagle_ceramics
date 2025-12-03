import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  useTheme,
  InputAdornment,
  Fab,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  Send,
  ArrowUpward
} from '@mui/icons-material';
import ContactUsImage from '../assets/ContactUsImage.jpg'
import BackgroundWhite from '../assets/BackgroundWhite.jpg'
import HeadingImg from '../assets/ParkingTiles/PunchCollection1.jpg'

const ContactUs = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <Box sx={{
      flexGrow: 1,
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(82, 61, 61, 0.7), rgba(60, 43, 43, 0.75)), url(${HeadingImg})`,
          backgroundSize: 'cover',
          color: 'white',
          py: 15,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mt: 1,
              mb: 2,
              fontSize: { xs: '2rem', md: '4rem' }
            }}
          >

            Contact Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Get in touch with us for inquiries, support, or feedback. Our team is ready to assist you with any questions regarding our products and services. Reach out via phone, email, or visit us.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{
        py: 2, minHeight: '100vh',
        // backgroundImage: `url(${BackgroundWhite})`,
        backgroundSize: 'cover',
      }}>
        <Container maxWidth="lg">
          {/* Contact Information */}
          <Box
            sx={{
              py: { xs: 8, md: 12 },
              backgroundColor: '#ffffff',
            }}
          >
            <Container maxWidth="lg" >
              <Grid container spacing={6} justifyContent="center" sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* CARD 1 - Address */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#e65100',
                        transform: 'scale(1.12)',
                      },
                    }}
                  >
                    <LocationOn sx={{ fontSize: 28 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1e293b',
                      mb: 2,
                      fontSize: '1.3rem',
                    }}
                  >
                    Address
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: '#000000ff',
                      lineHeight: 1.8,
                      fontSize: '1rem',
                      maxWidth: 340,

                    }}
                  >
                    Survey No. 171/172, Bh. Tekza Ceramica,<br />
                    Sartanpar Road, Ratavirda Village,<br />
                    Wankaner - 363621, Dist. Morbi,<br />
                    Gujarat, INDIA.
                  </Typography>

                </Grid>

                {/* CARD 2 - Phone */}
                <Grid item xs={12} sm={6} md={4} >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#e65100',
                        transform: 'scale(1.12)',
                      },
                    }}
                  >
                    <Phone sx={{ fontSize: 28 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#1e293b',
                      mb: 2,
                      fontSize: '1.3rem',
                    }}
                  >
                    Phone
                  </Typography>

                  <Box>
                    <Typography
                      variant="body1"
                      component="a"
                      href="tel:+919586200000"
                      sx={{
                        display: 'block',
                        color: '#000000ff',
                        fontSize: '1.02rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        mb: 1,
                        '&:hover': { color: '#e65100' },
                      }}
                    >
                      +91 95862 00000
                    </Typography>
                    <Typography
                      variant="body1"
                      component="a"
                      href="tel:+919099000000"
                      sx={{
                        display: 'block',
                        color: '#000000ff',
                        fontSize: '1.02rem',
                        fontWeight: 500,
                        textDecoration: 'none',
                        '&:hover': { color: '#e65100' },
                      }}
                    >
                      +91 90990 00000
                    </Typography>
                  </Box>

                </Grid>

                {/* CARD 3 - Email */}
                <Grid item xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: '#000000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mb: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: '#e65100',
                        transform: 'scale(1.12)',
                      },
                    }}
                  >
                    <Email sx={{ fontSize: 28 }} />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: '#000000ff',
                      mb: 2,
                      fontSize: '1.3rem',
                    }}
                  >
                    Email
                  </Typography>

                  <Typography
                    variant="body1"
                    component="a"
                    href="mailto:info@marfiltiles.net"
                    sx={{
                      color: '#000409ff',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#e65100',
                      },
                    }}
                  >
                    info@eaglesceramics.net
                  </Typography>

                </Grid>

              </Grid>
            </Container>
          </Box>

          {/* Contact Form Section */}
          <Grid container spacing={3}>
            {/* Contact Form & Map Section */}
            <Grid item xs={12} sx={{ width:'100%',}} >
              <Card
                sx={{
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  height: '100%',
                  width:'100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  overflow: 'hidden'
                }}
              >
                {/* Form Section - Left Side */}
                <Box sx={{
                  width: { xs: '100%', md: '100%' },
                  height: { xs: 'auto', md: '500px' },
                  p: { xs: 3, md: 5 },
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: '#016b61',
                      mb: 4,
                      textAlign: 'center'
                    }}
                  >
                    Send us a Message
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1 }}>
                    {/* Row 1: Name (Left) & Email (Right) */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                          }
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                          }
                        }}
                      />
                    </Box>

                    {/* Row 2: Phone (Left) & Subject (Right) */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                          }
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: '#016b61' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                          }
                        }}
                      />
                    </Box>

                    {/* Row 3: Message (Full width) */}
                    <Box sx={{ mb: 3 }}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={4}
                        variant="outlined"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                          }
                        }}
                      />
                    </Box>

                    {/* Row 4: Submit Button */}
                    <Box sx={{ textAlign: 'center', mt: 'auto' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<Send />}
                        sx={{
                          px: 6,
                          py: 1.5,
                          borderRadius: 1,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          backgroundColor: '#016b61',
                          '&:hover': {
                            backgroundColor: '#A0522D'
                          },
                        }}
                      >
                        Send Message
                      </Button>
                    </Box>
                  </Box>
                </Box>

                {/* Map Section - Right Side */}
                <Box sx={{
                  width: { xs: '100%', md: '100%' },
                  height: { xs: '400px', md: '600px' },
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                
                    <CardContent sx={{ p: 0, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          flex: 1,
                          width: '100%',
                          backgroundColor: '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Google Maps Embed */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-74.005941124219!3d40.71277603833624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316e0b7d5f%3A0x2d3e1d2e3d4e5f6g!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="EleCeramics Location Map"
                        />
                      </Box>
                    </CardContent>
      
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      <Fab
        size="small"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#016b61',
          color: 'white',
          '&:hover': {
            backgroundColor: '#A0522D'
          }
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpward />
      </Fab>
    </Box>
  );
};

export default ContactUs;