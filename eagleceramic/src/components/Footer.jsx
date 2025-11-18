import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import React, { useState } from 'react';
import cholaLogo from '../assets/cholaautomation_PoweredLogo.jpeg';

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

    // Clear the input field
    setEmail('');
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
        padding: '10px',
        marginTop: '5%',
        maxWidth:'100%'
      }}
      component="footer"
    >
      <Container  maxWidth={false} sx={{
        backgroundColor: '#016B61',
        color: 'white',
        padding: '18px',
       
      }}>

        {/* Quick Links - Top Center */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, mb: 1, fontFamily: "'Pacifico', cursive", }}>
            Quick Links
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            flexWrap: 'wrap'
          }}>
            <Link href="#" variant="body2" sx={{ color: 'white', textDecoration: "none", '&:hover': { textDecoration: 'underline' }, fontFamily: "'Pacifico', cursive", }}>
              Home
            </Link>
            <Link href="#" variant="body2" sx={{ color: 'white', textDecoration: "none", '&:hover': { textDecoration: 'underline' }, fontFamily: "'Pacifico', cursive", }}>
              About
            </Link>
            <Link href="#" variant="body2" sx={{ color: 'white', textDecoration: "none", '&:hover': { textDecoration: 'underline' }, fontFamily: "'Pacifico', cursive", }}>
              Services
            </Link>
            <Link href="#" variant="body2" sx={{ color: 'white', textDecoration: "none", '&:hover': { textDecoration: 'underline' }, fontFamily: "'Pacifico', cursive", }}>
              Contact
            </Link>
          </Box>
        </Box>

        {/* Newsletter Section - Center */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2, fontFamily: "'Pacifico', cursive" }}>
            Newsletter
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, mb: 3, fontFamily: "'Pacifico', cursive" }}>
            Subscribe our newsletter & get latest updations
          </Typography>
          <Box
            component="form"
            id="newsletter-form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
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
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: 'white' },
                  '&.Mui-focused fieldset': { borderColor: 'white' },
                },
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 1,
                '& .MuiInputBase-input': {
                  fontFamily: "'Pacifico', cursive",
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
                backgroundColor: 'white',
                color: '#016B61',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                px: 3,
                fontFamily: "'Pacifico', cursive",
                minWidth: '120px'
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
                <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Pacifico', cursive", color: '#016B61' }}>
                  Thank You! 🎉
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, fontFamily: "'Pacifico', cursive", color: 'black' }}>
                  Thank you for subscribing to our newsletter! We're excited to have you on board.
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, fontFamily: "'Pacifico', cursive", color: 'black' }}>
                  You'll be the first to know about our latest updates and exclusive offers.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowPopup(false)}
                  sx={{
                    backgroundColor: '#016B61',
                    color: 'white',
                    fontFamily: "'Pacifico', cursive",
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
        </Box>

        {/* Company Info and Contact Info - Side by Side */}
        <Grid container spacing={4} sx={{ mb: 1, justifyContent: 'space-around' }}>
          {/* Company Info - Left Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white', opacity: 0.9, fontFamily: "'Pacifico', cursive", }}>
              Eagle Ceramics
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: "'Pacifico', cursive", color: 'white', opacity: 0.9 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>

          {/* Contact Info - Right Side */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Pacifico', cursive", color: 'white', opacity: 0.9 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, mb: 1, fontFamily: "'Pacifico', cursive", }}>
              Email: info@eagleceramics.com
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, mb: 1, fontFamily: "'Pacifico', cursive", }}>
              Phone: +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, mb: 1, fontFamily: "'Pacifico', cursive", }}>
              Address: 123 Main St, City, State
            </Typography>
          </Grid>
        </Grid>

        {/* Social Media - Center */}
        <Box sx={{ textAlign: 'center', mb: 0.2 }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1
          }}>
            <IconButton aria-label="Facebook" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <Facebook />
            </IconButton>
            <IconButton aria-label="Twitter" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <Twitter />
            </IconButton>
            <IconButton aria-label="Instagram" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <Instagram />
            </IconButton>
            <IconButton aria-label="LinkedIn" sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>

        {/* Updated Copyright Section */}
        <Box sx={{ mt: 0.5, pt: 2 }}>
          <Typography
            variant="body2"
            mt={2}
            textAlign="center"
            sx={{ color: "rgba(255, 255, 255, 1)", fontFamily: "'Pacifico', cursive" }}
          >
            © {new Date().getFullYear()}{" "}
            <Typography component="span" color={colors.primary} fontWeight={700} sx={{ fontFamily: "'Pacifico', cursive" }}>
              Eagle Ceramics
            </Typography>
            . All Rights Reserved | Built with ❤️ in India
          </Typography>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: "rgba(255, 255, 255, 1)", fontFamily: "'Pacifico', cursive", mt: 1 }}
          >
            Powered by :{" "}
            <a href="https://cholabiz.com/" style={{ textDecoration: 'none' }}>
              {" "}
              <span style={{ color: colors.primary, fontWeight: 'bold', fontFamily: "'Pacifico', cursive" }}>
                {/* Add logo image here */}
                <img
                  src={cholaLogo}
                  alt="CHOLA BIZ Logo"
                  style={{
                    marginLeft: '8px',
                    verticalAlign: 'middle',
                    width: '50px',
                    height: 'auto'
                  }}
                />
              </span>
            </a>
          </Typography>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 1)" }} />

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
                    fontFamily: "'Pacifico', cursive",
                  }}
                >
                  {link.text}
                </Link>
                {index < legalLinks.length - 1 && !isMobile && (
                  <Typography color="rgba(255, 255, 255, 1)" sx={{ fontFamily: "'Pacifico', cursive" }}>|</Typography>
                )}
              </React.Fragment>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;