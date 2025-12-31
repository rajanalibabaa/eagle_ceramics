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
  Tooltip
} from '@mui/material';
import {
  Dashboard,
  AddBox,
  Category,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
 
const drawerWidth = 300;
const collapsedWidth = 64;
 
const AdminSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpen, setIsOpen] = useState(true);
 
  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <Dashboard />,
      path: '/admin/dashboard'
    },
    {
      id: 'new-product',
      name: 'New Product and Sizes',
      icon: <AddBox />,
      path: '/admin/new-product-sizes'
    },
    {
      id: 'catalogue',
      name: 'Add Product Catalogue',
      icon: <Category />,
      path: '/admin/catalogue'
    }
  ];
 
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setIsOpen(false);
    }
  };
 
  const isActive = (path) => {
    return location.pathname === path;
  };
 
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
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              Admin Panel
            </Typography>
            <IconButton onClick={() => setIsOpen(false)} size="small">
              <ChevronLeft />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => setIsOpen(true)} size="small">
            <ChevronRight />
          </IconButton>
        )}
      </Box>
 
      {/* Menu Items */}
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => {
          const isItemActive = isActive(item.path);
         
          if (!isOpen) {
            // Collapsed view with tooltips
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
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          }
 
          // Expanded view
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
                  {item.icon}
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
 
      {/* Optional: Add a footer section if needed */}
      <Box sx={{ mt: 'auto', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {isOpen && (
          <Typography variant="body2" color="text.secondary" align="center">
            Eagle Ceramics Admin
          </Typography>
        )}
      </Box>
    </Drawer>
  );
};
 
export default AdminSidebar;