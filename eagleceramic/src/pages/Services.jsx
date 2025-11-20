import React from 'react'
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

import ServiceSideBar from "./ServicesContent/ServiceSideBar";

const Services = () => {
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* LEFT SIDEBAR */}
      <Box sx={{ width: "260px" }}>
        <ServiceSideBar />
      </Box>

      {/* RIGHT CONTENT */}
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Outlet />    
      </Box>

    </Box>
  );
}

export default Services;
