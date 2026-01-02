import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Alert, Button } from '@mui/material';
import { getAdminData, getAdminToken } from '../utils/auth';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const data = getAdminData();
    setAdminData(data);
    
    // Try multiple possible ID locations
    const id = data?.id || data?.userId || data?.sub || data?.brandDetails?.id || null;
    setAdminId(id);

    // Log comprehensive debug info
    const token = getAdminToken();

    // Create debug info string
    setDebugInfo(`
      Full Data: ${JSON.stringify(data, null, 2)}
      Token: ${token ? `${token.substring(0, 20)}...` : 'No token'}
      ID: ${id || 'Not found'}
    `);
  }, []);

  const checkLocalStorage = () => {
    console.log('adminToken:', localStorage.getItem('adminToken'));
    console.log('adminData:', localStorage.getItem('adminData'));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>


      {adminData ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body1">
            <strong>Logged in as:</strong> {adminData.brandDetails?.email || 'Admin'}
          </Typography>
          <Typography variant="body1">
            <strong>Admin ID:</strong> {adminId || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
            {adminId ? '✓ ID found' : '⚠ ID not found in admin data'}
          </Typography>
        </Alert>
      ) : (
        <Alert severity="warning" sx={{ mb: 3 }}>
          No admin data found. Please check if the token was processed correctly.
        </Alert>
      )}
    </Box>
  );
};

export default AdminDashboard;