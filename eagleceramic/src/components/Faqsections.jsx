import React, { useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    question: "What products does Eagle Ceramic offer?",
    answer:
      "We provide ceramic tiles, vitrified tiles, wall tiles, floor tiles, porcelain tiles, outdoor tiles, and designer decorative tiles.",
  },
  {
    question:
      "Are Eagle Ceramic tiles suitable for both indoor and outdoor use?",
    answer:
      "Yes, we manufacture tiles suitable for indoor spaces such as bathrooms and kitchens, as well as outdoor areas like balconies, parking, and terraces.",
  },
  {
    question: "Do the tiles require special maintenance?",
    answer:
      "No special maintenance is needed. Regular sweeping and mopping with mild cleaners is enough to maintain shine and durability.",
  },
  {
    question: "Are your tiles water-resistant?",
    answer:
      "Yes, most of our ceramic and vitrified tiles have low water absorption and are ideal for bathrooms and other wet areas.",
  },
  {
    question: "Can Eagle Ceramic tiles handle heavy foot traffic?",
    answer:
      "Absolutely. Our vitrified and porcelain tiles are durable and perfect for malls, offices, hotels, and other high-traffic environments.",
  },
  {
    question: "Do you offer anti-skid tiles?",
    answer:
      "Yes, we offer anti-skid tiles specially designed for bathrooms, outdoor spaces, and wet areas.",
  },
  {
    question: "Where can I purchase Eagle Ceramic tiles?",
    answer:
      "You can buy from our authorized dealers, showrooms, or contact us directly via our website for location details.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "While we don’t provide installation directly, we can help connect you with certified tile installers.",
  },
  {
    question: "Are your tiles environmentally friendly?",
    answer:
      "Yes, our tiles are manufactured using eco-friendly processes and sustainable materials.",
  },
  {
    question: "Do you offer project-based or bulk order solutions?",
    answer:
      "Yes, we provide custom and large-scale solutions for builders, architects, and contractors.",
  },
];

export default function FAQSection() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false); // Only one open at a time
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={5}
        sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }}
      >
        Frequently Asked Questions
      </Typography>

      <Box>
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
            sx={{
              mb: 2,
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              "&::before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                bgcolor: expanded === index ? "#f5f5f5" : "#fff",
                transition: "0.3s",
              }}
            >
              <Typography fontWeight={600} sx={{ fontSize: "1.05rem" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ bgcolor: "#fafafa" }}>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
