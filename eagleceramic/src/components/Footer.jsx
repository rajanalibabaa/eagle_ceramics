import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';

import React, { useState } from 'react';

// Define colors (you can adjust these as needed)
const colors = {
  primary: '#FFD700', // Gold color for highlights
};

// Define legal links
const legalLinks = [
  { text: 'Privacy Policy', path: '/privacy' },
  { text: 'Terms of Service', path: '/terms' },
  { text: 'Disclaimer', path: '/disclaimer' },
];

function Footer() {
  const navigate = useNavigate();
  // Mock isMobile state - you can replace this with actual responsive logic
  const isMobile = false;

  // Mock navigation handler
  const handleNavigate = (path) => {
    console.log('Navigating to:', path);
    // Add your navigation logic here
  };

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    // Show the popup
    setShowPopup(true);

    // Create FormData for submission
    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'New Newsletter Subscription from Eagle Ceramics');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');
    
    // Optional: Add a thank you message in the response
    formData.append('_autoresponse', 'Thank you for subscribing to Eagle Ceramics newsletter!');

    // Submit the form data
    fetch('https://formsubmit.co/81a5781410abf9663679482ddc4efaf6', {
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (response.ok) {
        console.log('Form submitted successfully');
      } else {
        console.error('Form submission failed');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });

    setEmail('');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        marginTop: '5%',
        maxWidth: '100%'
      }}
      component="footer"
    >
      <Container 
        maxWidth={false} 
        sx={{
          backgroundColor: '#222626ff',
          color: 'white',
          padding: '18px',
        }}
      >
        {/* Main Title - Centered */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800,
              color: '#c41f25',
              fontSize: { xs: '1.75rem', md: '2rem' }
            }}
          >
            Eagle Ceramics
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'white', 
              opacity: 0.9,
              maxWidth: '800px',
              margin: '0 auto',
              mt: 2,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>

        <Grid 
          container 
          spacing={4} 
          sx={{ 
            mb: 4,
            justifyContent: 'space-around',
            textAlign: 'center'
          }}
        >
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                color: '#a7a9a9'
              }}
            >
              Quick Links
            </Typography>
            <Box 
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                alignItems: 'center',
              }}
            >
              <Link 
                href="#" 
                variant="body2" 
                sx={{ 
                  color: 'white', 
                  textDecoration: "none",
                  cursor: 'pointer',
                  '&:hover': { 
                    color: '#c41f25'
                  },
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Home
              </Link>
              <Link 
               onClick={() => navigate('/about')}
                variant="body2" 
                sx={{ 
                  color: 'white', 
                  textDecoration: "none",
                  cursor: 'pointer',
                  '&:hover': { 
                    color: '#c41f25'
                  },
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                About
              </Link>
              <Link 
              onClick={() => navigate('/services')}
                variant="body2" 
                sx={{ 
                  color: 'white', 
                  textDecoration: "none",
                  cursor: 'pointer',
                  '&:hover': { 
                    color: '#c41f25'
                  },
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Services
              </Link>
              <Link 
              onClick={() => navigate('/contact')}
                variant="body2" 
                sx={{ 
                  color: 'white', 
                  textDecoration: "none",
                  cursor: 'pointer',
                  '&:hover': { 
                    color: '#c41f25'
                  },
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Newsletter - Center Column */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                color: '#a7a9a9'
              }}
            >
              Newsletter
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                opacity: 0.9, 
                mb: 3,
                fontSize: { xs: '0.875rem', md: '1rem' }
              }}
            >
              Subscribe our newsletter & get latest updates
            </Typography>
            <Box
              component="form"
              id="newsletter-form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
                maxWidth: '400px',
                margin: '0 auto'
              }}
            >
              <TextField
                type="email"
                name="email"
                placeholder="Enter your email"
                variant="outlined"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flexGrow: 1,
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: '#a7a7a8' },
                    '&.Mui-focused fieldset': { borderColor: '#c41f25' },
                  },
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '& .MuiInputBase-input': {
                    '&::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#a7a7a8',
                  color: '#222626ff',
                  fontWeight: 'bold',
                  '&:hover': { 
                    backgroundColor: '#c21f24',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  },
                  px: 3,
                  minWidth: '120px',
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Popup Component */}
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
                onClick={() => setShowPopup(false)}
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
                  <Typography variant="h6" sx={{ mb: 2, color: '#016B61' }}>
                    Thank You! 🎉
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: 'black' }}>
                    Thank you for subscribing to our newsletter! We're excited to have you on board.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, color: 'black' }}>
                    You'll be the first to know about our latest updates and exclusive offers.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setShowPopup(false)}
                    sx={{
                      backgroundColor: '#016B61',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#015951',
                      }
                    }}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>

          {/* Contact Us - Center Column */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                mb: 3,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                color: '#a7a9a9'
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                Email: info@eagleceramics.com
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                Phone: +1 (555) 123-4567
              </Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
                Address: 123 Main St, City, State
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media - Centered */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}>
            <IconButton 
              aria-label="Facebook" 
              sx={{ 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255,215,0,0.1)',
                  color: '#FFD700',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton 
              aria-label="Twitter" 
              sx={{ 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255,215,0,0.1)',
                  color: '#FFD700',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton 
              aria-label="Instagram" 
              sx={{ 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255,215,0,0.1)',
                  color: '#FFD700',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton 
              aria-label="LinkedIn" 
              sx={{ 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: 'rgba(255,215,0,0.1)',
                  color: '#FFD700',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>

        {/* Divider Line - Centered */}
        <Divider 
          sx={{ 
            my: 4, 
            borderColor: "rgba(255, 255, 255, 0.2)",
            maxWidth: '800px',
            margin: '0 auto'
          }} 
        />

        {/* Copyright and Powered By Section - Centered */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{ 
              color: "rgba(255, 255, 255, 1)", 
              mb: 2,
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            © {new Date().getFullYear()}{" "}
            <Typography 
              component="span" 
              sx={{ 
                color: '#c41f25', 
                fontWeight: 700,
                fontSize: 'inherit'
              }}
            >
              Eagle Ceramics
            </Typography>
            . All Rights Reserved | Built with ❤️ in India
          </Typography>
          
          <Typography
            variant="body2"
            sx={{ 
              color: "rgba(255, 255, 255, 1)",
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Powered by :{" "}
            <a 
              href="https://cholabiz.com/" 
              style={{ 
                textDecoration: 'none',
                color: '#c21f24',
                fontWeight: 700,
                fontSize: 'inherit'
              }}
            >
              CholaBiz.com
            </a>
          </Typography>

          {/* Optional: Legal Links (commented out as per original) */}
          {/* 
          <Box sx={{ mt: 3 }}>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={isMobile ? 2 : 1}
              flexWrap="wrap"
              mb={0.5}
            >
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.text}>
                  <Link
                    onClick={() => handleNavigate(link.path)}
                    sx={{
                      color: "rgba(255, 255, 255, 1)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": { color: colors.primary },
                      cursor: "pointer",
                    }}
                  >
                    {link.text}
                  </Link>
                  {index < legalLinks.length - 1 && !isMobile && (
                    <Typography color="rgba(255, 255, 255, 1)">|</Typography>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Box>
          */}
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;