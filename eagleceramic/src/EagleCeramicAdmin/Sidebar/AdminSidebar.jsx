import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  Dashboard,
  
  Logout,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getAdminMenuItems } from "../AdminMenuItems.js"; 
import { getAdminToken, getAdminUserId, clearAdminData } from '../utils/auth';

const drawerWidth = 300;
const collapsedWidth = 64;

const AdminSidebar = ({ token }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(true);

  const { token: tokenFromParams } = useParams();

 
  const adminToken = token || tokenFromParams || getAdminToken();


  const userId = getAdminUserId();

  const AdminMenuItems = getAdminMenuItems(adminToken);

  const handleNavigation = (path) => {
    navigate(path); 
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    clearAdminData();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path; 
  };

  // Check if token is valid (basic)
  const isValid = Boolean(adminToken);

  if (!isValid) {
    handleLogout();
    return null;
  }

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? isOpen : true}
      onClose={() => setIsOpen(false)}
      sx={{
        width: isOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          minHeight: 64,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        {isOpen ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: theme.palette.primary.main, 
                  width: 40, 
                  height: 40,
                  fontSize: '0.875rem'
                }}
              >
                {userId ? userId.charAt(0).toUpperCase() : 'A'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                  Admin Panel
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  ID: {userId ? `${userId.substring(0, 8)}...` : 'N/A'}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <ChevronLeft />
            </IconButton>
          </>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <IconButton onClick={() => setIsOpen(true)} size="small">
              <ChevronRight />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ p: 1 }}>
        {AdminMenuItems.map((item) => {
          const isItemActive = isActive(item.path);
          
          if (!isOpen) {
            return (
              <Tooltip key={item.id} title={item.name} placement="right" arrow>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      minHeight: 48,
                      justifyContent: 'center',
                      px: 2.5,
                      backgroundColor: isItemActive ? theme.palette.action.selected : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        color: isItemActive ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {item.icon || <Dashboard />} {/* Add fallback icon */}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          }

          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  my: 0.5,
                  borderRadius: 1,
                  backgroundColor: isItemActive ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    color: isItemActive ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon || <Dashboard />} {/* Add fallback icon */}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: isItemActive ? 600 : 400,
                    color: isItemActive ? theme.palette.primary.main : 'inherit',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout Section */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        {isOpen ? (
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              px: 2.5,
              borderRadius: 1,
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: theme.palette.error.lighter,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 3, color: 'inherit' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        ) : (
          <Tooltip title="Logout" placement="right" arrow>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: theme.palette.error.main,
                  '&:hover': {
                    backgroundColor: theme.palette.error.lighter,
                  },
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          </Tooltip>
        )}
        
        <Divider sx={{ my: 2 }} />
        
        {isOpen && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mt: 1 }}
          >
            Eagle Ceramics Admin
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;