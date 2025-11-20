import React, { useState, memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ThankYouPopup = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          backgroundColor: "white",
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          maxWidth: 400,
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Pacifico', cursive", color: "#016B61" }}>
         Thank you for subscribing to our newsletter! 🎉
        </Typography>

        <Typography sx={{ mb: 2, fontFamily: "'Pacifico', cursive" ,color: "#016B61"}}>
         We’ll keep you informed with important updates, product insights, and special announcements.
        </Typography>

        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            mt: 1,
            backgroundColor: "#016B61",
            fontFamily: "'Pacifico', cursive",
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
};

export default memo(ThankYouPopup);
