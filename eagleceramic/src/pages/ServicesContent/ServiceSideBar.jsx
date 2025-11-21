import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
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
  const [openGoldenVersions, setOpenGoldenVersions] = useState(false);

    const navigate = useNavigate();
  const [openCollection, setOpenCollection] = useState(true);

 const handleGoldenClick = () => {
  navigate("/services/golden-endless-collection");
};
const handleStatuarioClick = () => {
  navigate("/services/statuario-collection");
};


  return (
    <Box
      sx={{
        width: "310px",
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

    {/* GOLDEN ENDLESS MAIN OPTION WITH TOGGLE */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
        ml: 0.5,
      }}
      onClick={() => setOpenGoldenVersions(!openGoldenVersions)}
    >
      <FormControlLabel
        control={<Checkbox size="small" onChange={handleGoldenClick} />}
        label="Golden Endless Collection (600 X 1200 MM)"
      />

      <IconButton size="small">
        {openGoldenVersions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>

    {/* SUB-VERSIONS */}
    <Collapse in={openGoldenVersions}>
      <Box sx={{ ml: 5, mt: 1 }}>
        {Array.from({ length: 3 }, (_, i) => (
          <FormControlLabel
            key={i}
            control={<Checkbox size="small" />}
            label={`Version ${i + 1}`}
          />
        ))}
      </Box>
    </Collapse>

    {/* OTHER COLLECTIONS */}
    <FormControlLabel
      control={<Checkbox size="small" />}
      label="Statuario Collection(600 X 1200 MM)"
    />

    <FormControlLabel
      control={<Checkbox size="small" onChange={handleStatuarioClick} />}
      label="Somany Collection"
    />
  </Box>
</Collapse>

    </Box>
  );
};

export default ServiceSideBar;
