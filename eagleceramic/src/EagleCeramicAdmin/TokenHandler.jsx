// TokenHandler.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box, Typography } from '@mui/material';
import { setAdminToken, setAdminData } from './utils/auth';

const TokenHandler = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get('token');
    const id = params.get('id');
    const email = params.get('email');

    if (token) {
      console.log('[TokenHandler] received token:', token);
      console.log('[TokenHandler] received id:', id);

      setAdminToken(token);
      const adminData = { id: id || null, brandDetails: { email: email || null } };
      setAdminData(adminData);

      navigate(`/admin/${encodeURIComponent(token)}/dashboard`, { replace: true });
      return;
    }

    // No token provided — redirect to home
    navigate('/', { replace: true });
  }, [search, navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={60} />
      <Typography variant="h6" color="text.secondary">
        Processing authentication...
      </Typography>
    </Box>
  );
};

export default TokenHandler;