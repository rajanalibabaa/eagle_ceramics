import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";

import React, { useState } from "react";

function Footer() {
  const navigate = useNavigate();
  // Mock isMobile state - you can replace this with actual responsive logic
  const isMobile = false;

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    // Show the popup
    setShowPopup(true);

    // Create FormData for submission
    const formData = new FormData();
    formData.append("email", email);
    formData.append(
      "_subject",
      "New Newsletter Subscription from Eagle Ceramic"
    );
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    // Optional: Add a thank you message in the response
    formData.append(
      "_autoresponse",
      "Thank you for subscribing to Eagle Ceramic newsletter!"
    );

    // Submit the form data
    fetch("https://formsubmit.co/info@eagleceramic.com", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully");
        } else {
          console.error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });

    setEmail("");
  };

  return (
    <Box
      sx={{
        bgcolor: "black",
        borderTop: "1px solid",
        borderColor: "divider",
        marginTop: "5%",
        maxWidth: "100%",
      }}
      component="footer"
    >
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#222626ff",
          color: "white",
          padding: "18px",
        }}
      >
        {/* Main Title - Centered */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: "#ffffffff",
              fontSize: { xs: "1.75rem", md: "2rem" },
            }}
          >
            Eagle Ceramic
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "white",
              // opacity: 0.9,
              maxWidth: "800px",
              margin: "0 auto",
              mt: 2,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Delivering premium ceramic tiles, sanitaryware, and construction
            materials with unmatched quality and durability. We are committed to
            innovation, reliability, and excellent customer satisfaction.
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          sx={{
            mb: 4,
            justifyContent: "space-around",
            textAlign: "center",
          }}
        >
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#ffffffff",
              }}
            >
              Quick Links
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#c41f25",
                  },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => navigate("/about")}
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#c41f25",
                  },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                About
              </Link>
              <Link
                onClick={() => navigate("/products")}
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#c41f25",
                  },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Products
              </Link>
              <Link
                onClick={() => navigate("/contact")}
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#c41f25",
                  },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Contact
              </Link>
              <Link
                href="https://cholabiz.com/login/chola-clients/"
                // href="http://localhost:3000/login/chola-clients/"
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={{
                  color: "white",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#c41f25",
                  },
                  fontSize: { xs: "0.875rem", md: "1rem" },
                }}
              >
                Login
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
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#ffffffff",
              }}
            >
              Newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                // opacity: 0.9,
                mb: 3,
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              Subscribe our newsletter & get latest updates
            </Typography>
            <Box
              component="form"
              id="newsletter-form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                maxWidth: "400px",
                margin: "0 auto",
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
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    color: "Black",
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "#ffffffff" },
                    "&.Mui-focused fieldset": { borderColor: "#c41f25" },
                  },
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  borderRadius: 1,
                  "& .MuiInputBase-input": {
                    "&::placeholder": {
                      color: "rgba(0, 0, 0, 0.7)",
                      opacity: 1,
                    },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ffffffff",
                  color: "#222626ff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#c21f24",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                  px: 3,
                  minWidth: "120px",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Subscribe
              </Button>
            </Box>

            {/* Popup Component */}
            {showPopup && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
                onClick={() => setShowPopup(false)}
              >
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    textAlign: "center",
                    maxWidth: "400px",
                    margin: 2,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: "#016B61" }}>
                    Thank You! 🎉
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: "black" }}>
                    Thank you for subscribing to our newsletter! We're excited
                    to have you on board.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, opacity: 0.8, color: "black" }}
                  >
                    You'll be the first to know about our latest updates and
                    exclusive offers.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setShowPopup(false)}
                    sx={{
                      backgroundColor: "#016B61",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#015951",
                      },
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
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "#ffffffff",
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                alignItems: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "white" }}>
                Email: info@eagleceramic.com
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                Phone: +91 9884003787
              </Typography>
              <Typography variant="body2" sx={{ color: "white" }}>
                Address: Shop No 13,Second Floor,Survey No 63 Paiki1/paiki2,
                Plot No 1 Paiki Prabhat Chamber,Halvad Road, Mahendranagar,Morbi
                MORBI-363641 GUJRAT-INDIA
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Social Media - Centered */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <IconButton
              aria-label="Facebook"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,215,0,0.1)",
                  color: "#FFD700",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              aria-label="Twitter"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,215,0,0.1)",
                  color: "#FFD700",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,215,0,0.1)",
                  color: "#FFD700",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,215,0,0.1)",
                  color: "#FFD700",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>

        {/* Divider Line - Centered */}
        <Divider
          sx={{
            my: 2,
            borderColor: "rgba(255, 255, 255, 1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        />

        {/* Copyright and Powered By Section - Centered */}
        <Box sx={{ textAlign: "center", mt: 2, mb: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 1)",
              mb: 2,
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
          >
            © {new Date().getFullYear()}{" "}
            <Typography
              component="span"
              sx={{
                color: "#c41f25",
                fontWeight: 700,
                fontSize: "inherit",
              }}
            >
              Eagle Ceramic
            </Typography>
            . All Rights Reserved | Built with ❤️ in India
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 1)",
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
          >
            Powered by :{" "}
            <a
              href="https://cholabiz.com/"
              style={{
                textDecoration: "none",
                color: "#c21f24",
                fontWeight: 700,
                fontSize: "inherit",
              }}
            >
              CholaBiz.com
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
