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
  Tooltip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight,
  Logout,
  Dashboard,
  ProductionQuantityLimitsSharp
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAdminMenuItems } from "../AdminMenuItems.js";
import { getAdminToken, getAdminUserId, clearAdminData } from '../utils/auth';

const drawerWidth = 300;
const collapsedWidth = 70;

const AdminSidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 900px = mobile
  const [mobileOpen, setMobileOpen] = useState(false);     // for mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false);   // for desktop collapse
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const adminToken = getAdminToken();
  const userId = getAdminUserId();
  const menuItems = getAdminMenuItems(adminToken);

  const isOpen = isMobile ? mobileOpen : !isCollapsed;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false); // close on mobile after click
  };

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('http://localhost:5050/api/v1/chola/client/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      clearAdminData();
      navigate('/');
    }
  };

  const isActive = (path) => location.pathname === path;

  // If not logged in → redirect
  if (!adminToken) {
    clearAdminData();
    navigate('/');
    return null;
  }

  const drawerContent = (
    <>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        p: 2, 
        minHeight: 64,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        {isOpen ? (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                {userId?.[0]?.toUpperCase() || 'A'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  Admin Panel
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {userId ? `${userId.slice(0, 8)}...` : 'N/A'}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleDrawerToggle}>
              {isMobile ? <ChevronLeft /> : <ChevronLeft />}
            </IconButton>
          </>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronRight />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          if (!isOpen) {
            return (
              <Tooltip key={item.id} title={item.name} placement="right" arrow>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{ justifyContent: 'center', minHeight: 48 }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, color: active ? theme.palette.primary.main : 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          }

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={active}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    bgcolor: theme.palette.primary.main + '22',
                    '&:hover': { bgcolor: theme.palette.primary.main + '33' },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: active ? theme.palette.primary.main : 'inherit' }}>
                  {item.icon || <Dashboard />}
                </ListItemIcon>
                <ListItemText 
                  primary={item.name}
                  primaryTypographyProps={{ fontWeight: active ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        {isOpen ? (
          <ListItemButton
            onClick={() => setLogoutDialogOpen(true)}
            disabled={isLoggingOut}
            sx={{ borderRadius: 2, color: theme.palette.error.main }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={isLoggingOut ? "Logging out..." : "Logout"} />
          </ListItemButton>
        ) : (
          <Tooltip title="Logout" placement="right">
            <IconButton
              onClick={() => setLogoutDialogOpen(true)}
              sx={{ color: theme.palette.error.main, mx: 'auto', display: 'block' }}
            >
              <Logout />
            </IconButton>
          </Tooltip>
        )}
        {isOpen && (
          <>
          <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 2 }}>
           2026 © Eagle Ceramics Admin
          </Typography><br />
          <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Powered by : <a href="https://www.cholabiz.com" target="_blank" rel="noopener noreferrer">Cholabiz.com</a>
          </Typography>
          </>
        )}
      </Box>
    </>
  );

  return (
    <>
      {/* AppBar with Hamburger (Only visible on Mobile) */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: 1,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6"  sx={{ ml: 7 }}>
              Eagle Ceramics Admin
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: isMobile ? drawerWidth : (isOpen ? drawerWidth : collapsedWidth),
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isMobile ? drawerWidth : (isOpen ? drawerWidth : collapsedWidth),
            boxSizing: 'border-box',
            borderRight: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
            transition: !isMobile ? theme.transitions.create('width') : undefined,
          },
        }}
      >
        {/* Add Toolbar spacer only on mobile when AppBar is present */}
        {isMobile && <Toolbar />}
        
        {drawerContent}
      </Drawer>

      {/* Logout Confirmation */}
      <Dialog open={logoutDialogOpen} onClose={() => setLogoutDialogOpen(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to logout?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminSidebar;