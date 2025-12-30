import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import AdminSidebar from './Sidebar/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminSidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          minHeight: '100vh',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Toolbar /> 
        <Outlet /> 
      </Box>
    </Box>
  );
};

export default AdminLayout;