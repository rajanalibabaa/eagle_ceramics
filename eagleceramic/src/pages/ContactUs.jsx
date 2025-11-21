import React from "react";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import ContactImage from '../assets/ContactImage.jpg';
import ContactParkingImage from '../assets/ContactParkingImage.jpg'

export default function ContactUs() {
  return (
    <Box sx={{ backgroundColor: "#fafafa",backgroundImage: `
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
            url(${ContactParkingImage})
          `, backgroundSize: "cover",}}>

      {/* Hero Section */}
      <Box
        sx={{
          // backgroundImage: `
          //   linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
          //   url(${ContactImage})
          // `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            px: 2,
            py: 1,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Contact Us
        </Typography>
      </Box>

 {/* First Grid: Get in Touch + Contact Form */}
      <Grid container spacing={1} alignItems="stretch" mb={4}  sx={{
          // backgroundImage: `
          //   linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
          //   url(${ContactParkingImage})
          // `, 
          justifyContent:'space-around'}} >
        {/* Left: Get in Touch */}
        <Grid item xs={6} md={6} sx={{margin:'5%'}}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', 
            width: 500 , 
            color: 'white', 
            backgroundColor: 'transparent',
            }}>
            <Typography variant="h5" fontWeight={'bold'} sx={{fontSize:50}} gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 ,fontSize:20}}>
              Whether you’re renovating, building, or exploring design ideas, our tile and
              ceramics experts are here to help. Reach out with any questions about products,
              samples, bulk orders, or showroom visits.
            </Typography>
          </Paper>
        </Grid>

        {/* Right: Send Us a Message */}
        <Grid item xs={12} md={6} sx={{margin:'2%'}}>
          <Paper elevation={3} sx={{ p: 1, height: '100%', width:500,}}>
            <Typography variant="h6" fontWeight={600} sx={{textAlign:'center'}} gutterBottom>
              Send Us a Message
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField fullWidth label="Name" variant="outlined" sx={{ mb: 1, p:1 }} />
              <TextField fullWidth label="Email" variant="outlined" sx={{ mb: 1 , p:1}} />
              <TextField fullWidth label="Phone" variant="outlined" sx={{ mb: 1 , p:1}} />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Second Grid: Contact Information + Map */}
      <Grid container spacing={4} alignItems="stretch">
        {/* Left: Contact Information */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" mb={2}><strong>Phone:</strong> +1 (234) 567-890</Typography>
            <Typography variant="body1" mb={2}><strong>Email:</strong> info@ceramictiles.com</Typography>
            <Typography variant="body1" mb={2}><strong>Address:</strong> 123 Stonecraft Avenue, Ceramic City, CA 90210</Typography>
            <Typography variant="h6" fontWeight={600} mt={3} gutterBottom>Showroom Hours</Typography>
            <Typography variant="body1">Mon – Fri: 9:00 AM – 6:00 PM</Typography>
            <Typography variant="body1">Saturday: 10:00 AM – 4:00 PM</Typography>
            <Typography variant="body1">Sunday: Closed</Typography>
          </Paper>
        </Grid>

        {/* Right: Map */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 0, height: '100%' }}>
            <iframe
              title="showroom-location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019079854718!2d-122.41941518468169!3d37.77492977975925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b7c3a5b%3A0x4e0d7d8a4b1b6f1f!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1616173412345!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
