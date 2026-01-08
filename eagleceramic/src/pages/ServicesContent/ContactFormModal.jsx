import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
const fieldVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" },
  }),
};

const ContactFormModal = ({ open, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const FORM_SUBMITTED_KEY = "collection_form_submitted";
const [alreadySubmitted, setAlreadySubmitted] = useState(false);
React.useEffect(() => {
  const submitted = localStorage.getItem(FORM_SUBMITTED_KEY);
  if (submitted === "true") {
    setAlreadySubmitted(true);
  }
}, []);
  const handleSubmit = (e) => {

    e.preventDefault();


    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    if (alreadySubmitted) {
  alert("You have already submitted this form.");
  return;
}


    // setShowPopup(true);

    // Auto-hide popup after 3 seconds
    // setTimeout(() => {
    //   setShowPopup(false);
    // }, 3000);

    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("message", formData.message);
    submissionData.append("_subject", "New Hero Section Form Submission");
    submissionData.append("_captcha", "false");
    submissionData.append("_template", "table");
    submissionData.append(
      "_autoresponse",
      `Thank you ${formData.fullName}! We will contact you shortly.`
    );

    fetch("https://formsubmit.co/info@eagleceramic.com", {
      method: "POST",
      body: submissionData,
    })
      .then((res) => {
        if (res.ok) {
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: "",
          });
          localStorage.setItem(FORM_SUBMITTED_KEY, "true");
setAlreadySubmitted(true);
          onClose();
          onSubmit();
        }
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" >
          <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
        }}
      >      <DialogTitle sx={{  color: "#cb0f3eff", fontWeight: "bold"}}> Get In Touch </DialogTitle>

        <CloseIcon onClick={onClose} sx={{ cursor: "pointer", color: "#cb0f3eff", fontWeight: "bold" }} />
      </Box>
    

      <DialogContent>
        {alreadySubmitted ? (
    null
  ) : (
   <Box
                  component="form"
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}

                >

                  {[
                    {
                      label: "Company / Builder Name",
                      name: "fullName",
                      value: formData.fullName,
                    },
                    { label: "Phone", name: "phone", value: formData.phone },
                    { label: "Email", name: "email", value: formData.email },
                    {
                      label: "Message",
                      name: "message",
                      value: formData.message,
                      multiline: true,
                      rows: 3,
                    },
                  ].map((field, i) => (
                    <motion.div
                      key={field.name}
                      custom={i}
                      variants={fieldVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <TextField
                        label={field.label}
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="medium"
                        multiline={field.multiline}
                        rows={field.rows}
                       
                      />
                    </motion.div>
                  ))}

                  <motion.div
                    variants={fieldVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        background: "#d11f25",
                      }}
                    >
                       Submit & View Collection
                    </Button>
                  </motion.div>
                </Box>
  )}
        
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
