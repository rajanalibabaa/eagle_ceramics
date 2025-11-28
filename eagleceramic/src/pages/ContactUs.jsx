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

  // Contact information
  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 24, color: '#016b61' }} />,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
    },
    {
      icon: <Email sx={{ fontSize: 24, color: '#016b61' }} />,
      title: 'Email',
      details: ['support@eleceramics.com', 'sales@eleceramics.com']
    },
    {
      icon: <LocationOn sx={{ fontSize: 24, color: '#016b61' }} />,
      title: 'Address',
      details: ['123 Ceramic Street', 'New York, NY 10001']
    },
    {
      icon: <AccessTime sx={{ fontSize: 24, color: '#016b61' }} />,
      title: 'Working Hours',
      details: ['Mon - Fri: 9:00 - 18:00', 'Sat: 10:00 - 16:00']
    }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #a9cfbaff 0%, #2cb676ff 100%)',   
          color: 'white',
          py: 8,
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
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            How May We Help You?
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
            Fill in the form or drop an email
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Box sx={{ py: 2, backgroundColor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          {/* Contact Form Section */}
          <Grid container spacing={3}>
            {/* Contact Form - Right Side */}
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(40, 197, 25, 0.1)',
                  border: '1px solid #e0e0e0',
                  backgroundColor: 'white',
                  height: '100%',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    width: '50%',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <img
                    src={ContactUsImage}
                    alt="Ceramics Showroom"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </Box>

                {/* Form Section */}
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                  <CardContent sx={{ p: 5, height: '100%' }}>
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

                    <Box component="form" onSubmit={handleSubmit}>
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
                          rows={6}
                          variant="outlined"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1
                            }
                          }}
                        />
                      </Box>

                      {/* Row 4: Submit Button */}
                      <Box sx={{ textAlign: 'center' }}>
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
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Contact Information */}
          <Box sx={{ mt: 6 }}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(42, 160, 26, 0.1)',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white'
              }}
            >
              <CardContent sx={{ p: 1 }}>
                <Grid container spacing={2}>
                  {contactInfo.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center', p: 8 }}>
                        <Box
                          sx={{
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: '#016b61',
                            fontSize: '1rem'
                          }}
                        >
                          {item.title}
                        </Typography>
                        {item.details.map((detail, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              color: '#666',
                              lineHeight: 1.4,
                              fontSize: '0.8rem'
                            }}
                          >
                            {detail}
                          </Typography>
                        ))}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>

          {/* Map Section */}
          <Box sx={{ mt: 6 }}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(139, 69, 19, 0.1)',
                border: '1px solid #e0e0e0',
                backgroundColor: 'white',
                width: '100%'
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#016b61',
                    p: 3,
                    pb: 2,
                    textAlign: 'center'
                  }}
                >
                  Our Location
                </Typography>
                <Box
                  sx={{
                    height: 400,
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    overflow: 'hidden',
                    padding: 1,
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
            </Card>
          </Box>
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