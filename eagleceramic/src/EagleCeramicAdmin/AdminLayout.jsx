import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './Sidebar/AdminSidebar.jsx';
import { setAdminToken, setAdminData, getAdminData, decodeJwt } from './utils/auth';

const AdminLayout = () => {
  const { token } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    setAdminToken(token);

    const payload = decodeJwt(token);
    
    if (payload) {
      console.log('[AdminLayout] All payload keys:', Object.keys(payload));
      console.log('[AdminLayout] Payload content:');
      Object.keys(payload).forEach(key => {
        console.log(`  ${key}:`, payload[key]);
      });
    }

    const existing = getAdminData();
    console.log('[AdminLayout] Existing admin data:', existing);
    
    let extractedId = null;
    let extractedEmail = null;
    
    if (payload) {
      extractedId = payload.id || payload.userId || payload.sub || payload.uid || payload.user_id || null;
      
      extractedEmail = payload.email || payload.username || payload.userEmail || null;
    }
    
    console.log('[AdminLayout] Extracted ID:', extractedId);
    console.log('[AdminLayout] Extracted email:', extractedEmail);
    
    if (!existing || extractedId || extractedEmail) {
      const adminData = {
        id: extractedId || existing?.id || null,
        brandDetails: {
          email: extractedEmail || existing?.brandDetails?.email || null,
          ...(existing?.brandDetails || {})
        }
      };
      
      console.log('[AdminLayout] Setting new admin data:', adminData);
      setAdminData(adminData);
    }

    const storedData = getAdminData();
    console.log('[AdminLayout] Final stored admin data:', storedData);
    console.log('[AdminLayout] Final stored ID:', storedData?.id);

    if (location.pathname === `/admin/${token}`) {
      navigate(`/admin/${encodeURIComponent(token)}/dashboard`, { replace: true });
    }
  }, [token, location.pathname, navigate]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar token={token} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;