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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import sideimg from "../assets/AdvertismentPopUp.jpg"; 

const MainPopUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("popupShown");
      if (!hasSeen) {
        setOpen(true);
      }
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  const getDialogWidth = useCallback(() => {
    if (isMobile) return "95vw";
    if (isTablet) return "85vw";
    return 1100;
  }, [isMobile, isTablet]);

  // Memoized paper props for the main dialog
  const paperProps = useMemo(() => ({
    sx: { 
      borderRadius: "16px", 
      overflow: "hidden", 
      width: getDialogWidth(),
      maxWidth: "95vw",
      maxHeight: "95vh",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      m: 1,
    }
  }), [getDialogWidth]);

  // Responsive image height
  const getImageHeight = useCallback(() => {
    if (isMobile) return 400;
    if (isTablet) return 450;
    return 500;
  }, [isMobile, isTablet]);

  // Responsive content width
  const getContentWidth = useCallback(() => {
    if (isMobile) return "100%";
    return "48%";
  }, [isMobile]);

  // Responsive padding
  const getContentPadding = useCallback(() => {
    if (isMobile) return { px: 3, py: 4 };
    if (isTablet) return { px: 4, py: 4 };
    return { px: 6, py: 5 };
  }, [isMobile, isTablet]);

  // Responsive typography font size
  const getTitleFontSize = useCallback(() => {
    if (isMobile) return "1.75rem";
    if (isTablet) return "2rem";
    return "2.2rem";
  }, [isMobile, isTablet]);

  const getSubtitleFontSize = useCallback(() => {
    if (isMobile) return "0.95rem";
    return "1rem";
  }, [isMobile]);

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
      padding: isMobile ? "12px 14px" : "14px 16px",
      fontSize: isMobile ? "14px" : "16px"
    },
  }), [isMobile]);

  // Memoized button styles
  const buttonStyles = useMemo(() => ({
    py: isMobile ? 1.5 : 1.8,
    fontSize: isMobile ? "15px" : "17px",
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
    letterSpacing: "0.5px",
    minHeight: isMobile ? "48px" : "52px",
  }), [isMobile]);

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
      padding: isMobile ? 3 : 4,
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      backgroundColor: "white",
      color: "black",
      maxWidth: isMobile ? "90vw" : "400px",
      m: 2,
    },
  }), [isMobile]);

  return (
    <>
      {/* Main Advertisement Pop-up Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={paperProps}
        sx={{
          "& .MuiDialog-container": {
            alignItems: isMobile ? "flex-end" : "center",
          }
        }}
      >
        {/* Background Image Container */}
        <Box
          sx={{
            height: getImageHeight(),
            backgroundImage: isMobile 
              ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${sideimg})`
              : `url(${sideimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: "center",
            ...getContentPadding(),
          }}
        >
          {/* Overlay - Only show on larger screens since we added gradient to mobile */}
          {!isMobile && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)",
              }}
            />
          )}

          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              zIndex: 10,
              width: isMobile ? 36 : 48,
              height: isMobile ? 36 : 48,
            }}
          >
            <CloseIcon sx={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }} />
          </IconButton>

          {/* CONTENT */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: getContentWidth(),
              position: "relative",
              color: "white",
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? 2 : 3,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Box sx={{ mb: isMobile ? 0.5 : 1 }}>
              <Typography 
                variant="h4" 
                fontWeight={800} 
                sx={{ 
                  mb: isMobile ? 1 : 2,
                  textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                  lineHeight: 1.1,
                  fontSize: getTitleFontSize(),
                  whiteSpace: isMobile ? "normal" : "nowrap",
                  wordBreak: "break-word",
                }}
              >
                Get 20% Discount Today
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.95,
                  lineHeight: 1.5,
                  fontSize: getSubtitleFontSize(),
                  fontWeight: 400,
                  textAlign: isMobile ? "center" : "center",
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
                  sx={{
                    ...checkboxStyles,
                    padding: isMobile ? "6px" : "9px",
                  }}
                  onChange={handleDontShowChange}
                  checked={dontShow}
                />
              }
              label={
                <Typography sx={{ 
                  fontSize: isMobile ? "0.85rem" : "0.95rem", 
                  opacity: 0.9, 
                  fontWeight: 500,
                  textAlign: "left",
                }}>
                  Don't show this pop-up again
                </Typography>
              }
              sx={{ 
                mt: isMobile ? 1 : 1.5, 
                alignSelf: isMobile ? "center" : "flex-start",
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
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2, 
            fontWeight: 700, 
            color: "#a8d8d3",
            fontSize: isMobile ? "1.5rem" : "1.75rem"
          }}
        >
          Thank You! 🎉
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            color: "black",
            fontSize: isMobile ? "0.95rem" : "1rem"
          }}
        >
          Thank you for subscribing to our newsletter!
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 3, 
            opacity: 0.8, 
            color: "black",
            fontSize: isMobile ? "0.85rem" : "0.875rem"
          }}
        >
          You'll be the first to know about our latest updates and exclusive offers.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setShowSuccessDialog(false)}
          sx={{
            backgroundColor: "#a8d8d3",
            color: "black",
            fontWeight: 700,
            fontSize: isMobile ? "14px" : "16px",
            py: isMobile ? 1 : 1.2,
            "&:hover": {
              backgroundColor: "#98c8c3",
            },
          }}
          fullWidth={isMobile}
        >
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default React.memo(MainPopUp);