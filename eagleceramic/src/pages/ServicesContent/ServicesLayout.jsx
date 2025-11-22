import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import ServiceSideBar from './ServiceSideBar';

export default function ServicesLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <ServiceSideBar />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
