import React, { useEffect, useState, useCallback, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";
import sideimg from "../assets/AdvertismentPopUp.jpg"; 

const MainPopUp = () => {
  const [open, setOpen] = useState(false); 
  const [dontShow, setDontShow] = useState(false); 
  const [email, setEmail] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showSuccessDialog, setShowSuccessDialog] = useState(false); 

  // Callback to close the main popup
  const handleClose = useCallback(() => {
    setOpen(false);
    if (dontShow) {
      localStorage.setItem("popupShown", "true"); 
    }
  }, [dontShow]);

  // Callback for form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 

    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'New Newsletter Subscription from Advertisement PopUp'); 
    formData.append('_captcha', 'false'); 
    formData.append('_template', 'table'); 
    formData.append('_autoresponse', 'Thank you for subscribing to our newsletter! We are excited to have you.'); 

    try {
      const response = await fetch('https://formsubmit.co/81a5781410abf9663679482ddc4efaf6', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        setShowSuccessDialog(true); 
        localStorage.setItem("popupShown", "true");
      } else {
        console.error('Form submission failed');
        alert('Subscription failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      setEmail(''); 
      setOpen(false); 
    }
  }, [email, isSubmitting]);

  const handleDontShowChange = useCallback((e) => {
    setDontShow(e.target.checked);
  }, []);

  // Effect to show the main popup after a delay, only if not seen before
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("popupShown");
      if (!hasSeen) {
        setOpen(true);
      }
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  // Memoized paper props for the main dialog
  const paperProps = useMemo(() => ({
    sx: { 
      borderRadius: "16px", 
      overflow: "hidden", 
      width: 1100,
      maxWidth: "90vw",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)" 
    }
  }), []);

  // Memoized text field styles
  const textFieldStyles = useMemo(() => ({
    mb: 1,
    background: "white",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid #a8d8d3",
      },
    },
    "& .MuiInputBase-input": {
      padding: "14px 16px",
      fontSize: "16px"
    },
  }), []);

  // Memoized button styles
  const buttonStyles = useMemo(() => ({
    py: 1.8,
    fontSize: "17px",
    fontWeight: 700,
    backgroundColor: "#a8d8d3",
    color: "black",
    borderRadius: "10px",
    textTransform: "none",
    boxShadow: "0 4px 15px rgba(168,216,211,0.4)",
    "&:hover": { 
      backgroundColor: "#98c8c3",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(168,216,211,0.5)",
    },
    transition: "all 0.3s ease-in-out",
    letterSpacing: "0.5px"
  }), []);

  // Memoized checkbox styles
  const checkboxStyles = useMemo(() => ({
    color: "white", 
    "&.Mui-checked": { color: "#a8d8d3" },
    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" }
  }), []);

  // Memoized paper props for the success dialog
  const successDialogPaperProps = useMemo(() => ({
    sx: {
      borderRadius: "16px",
      padding: 4,
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      backgroundColor: "white",
      color: "black",
      maxWidth: "400px",
    },
  }), []);

  return (
    <>
      {/* Main Advertisement Pop-up Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={paperProps}
      >
        {/* Background Image Container */}
        <Box
          sx={{
            height: 500,
            backgroundImage: `url(${sideimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            px: 6,
            py: 5,
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              zIndex: 10,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* RIGHT SIDE CONTENT */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: { xs: "90%", sm: "48%" },
              position: "relative",
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box sx={{ mb: 1 }}>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                sx={{ 
                  mb: 2,
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  lineHeight: 1.1,
                  fontSize: { xs: "2rem", sm: "2.5rem" },
                  whiteSpace: "nowrap"
                }}
              >
                Get 20% Discount Today
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.95,
                  lineHeight: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  textAlign:"center"
                }}
              >
                Subscribe to our newsletter and receive a 20% discount instantly.
              </Typography>
            </Box>

            {/* EMAIL INPUT */}
            <TextField
              variant="outlined"
              fullWidth
              type="email"
              required
              placeholder="Your email address"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={isSubmitting}
              sx={textFieldStyles}
            />

            {/* SUBSCRIBE BUTTON */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting} 
              sx={buttonStyles}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now →"}
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  sx={checkboxStyles}
                  onChange={handleDontShowChange}
                  checked={dontShow} // Bind to state
                />
              }
              label={
                <Typography sx={{ fontSize: "0.95rem", opacity: 0.9, fontWeight: 500 }}>
                  Don't show this pop-up again
                </Typography>
              }
              sx={{ 
                mt: 1.5, 
                alignSelf: "flex-start",
                "& .MuiFormControlLabel-label": {
                  color: "white"
                }
              }}
            />
          </Box>
        </Box>
      </Dialog>

      {/* Success Message Dialog */}
      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        PaperProps={successDialogPaperProps}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "#a8d8d3" }}>
          Thank You! 🎉
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "black" }}>
          Thank you for subscribing to our newsletter!
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, color: "black" }}>
          You'll be the first to know about our latest updates and exclusive offers.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowSuccessDialog(false)}
          sx={{
            backgroundColor: "#a8d8d3",
            color: "black",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: "#98c8c3",
            },
          }}
        >
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default React.memo(MainPopUp);
