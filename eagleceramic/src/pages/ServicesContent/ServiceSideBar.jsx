import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Collapse,
  IconButton,
  Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ServiceSideBar = () => {
  const navigate = useNavigate();
  const [openCollection, setOpenCollection] = useState(true);
  const handleCollectionClick = () => {
    navigate("/services/statuario-collection");
  };

  return (
    <Box
      sx={{
        width: "260px",
        p: 2,
        borderRight: "1px solid #e0e0e0",
        fontFamily: "serif",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography
          sx={{ fontSize: "18px", fontWeight: 500, color: "#2a2a2a" }}
        >
          Shop By
        </Typography>

        <Typography
          sx={{
            fontSize: "14px",
            color: "red",
            cursor: "pointer",
          }}
        >
          Clear All
        </Typography>
      </Box>

      <Box sx={{ width: "100%", height: "2px", background: "#000", mb: 2 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
          alignItems: "center",
        }}
        onClick={() => setOpenCollection(!openCollection)}
      >
        <Typography sx={{ fontSize: "22px", color: "#464646" }}>
          Collection
        </Typography>

        <IconButton size="small">
          {openCollection ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Collapse in={openCollection}>
        <Box sx={{ mt: 1 }}>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Golden Endless Collection"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Statuario Collection (600x1200)"
          />
          <FormControlLabel
            control={<Checkbox size="small"   onChange={handleCollectionClick}/>}
          
            label="Somany Collection"
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default ServiceSideBar;
