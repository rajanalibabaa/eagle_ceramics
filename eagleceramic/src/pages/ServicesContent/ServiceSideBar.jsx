import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel,
  IconButton,
  Drawer
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import ListIcon from '@mui/icons-material/List';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: theme.spacing(2),
  background: `
    linear-gradient(135deg,
      rgba(248,249,250,0.95) 0%,
      rgba(255,255,255,0.98) 50%,
      rgba(240,242,245,0.95) 100%)`,
  boxShadow: 'inset -2px 0 15px rgba(0,0,0,0.03)',
  fontFamily: "'Inter','Roboto','Arial',sans-serif",
  backdropFilter: 'blur(5px)',
  
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.05)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: 'rgba(0,0,0,0.3)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing(1.5, 2),
  borderRadius: 12,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  background: 'linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)',
  border: '1px solid rgba(255,255,255,0.8)',
  marginBottom: theme.spacing(1),
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 1.5),
  }
}));

const CollectionItem = styled(FormControlLabel)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 0,
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(1, 1.5),
  borderRadius: 10,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  
  '& .MuiTypography-root': {
    fontSize: theme.breakpoints.down('sm') ? 14 : 15,
    fontFamily: "'Inter',sans-serif",
    fontWeight: selected ? 600 : 500,
    color: 'black',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1
  },
  
  '& .MuiCheckbox-root': {
    color: '#7f8c8d',
    marginRight: 8,
    padding: theme.spacing(0.5),
    '&.Mui-checked': { color: '#2980b9' }
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1),
  }
}));

const VersionItem = styled(FormControlLabel)(({ theme, selected }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 0,
  marginBottom: theme.spacing(0.25),
  padding: theme.spacing(0.75, 1.5, 0.75, 3),
  borderRadius: 8,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  
  '& .MuiTypography-root': {
    fontSize: theme.breakpoints.down('sm') ? 13 : 14,
    fontFamily: "'Inter',sans-serif",
    fontWeight: selected ? 600 : 400,
    color: 'black'
  },
  
  '& .MuiCheckbox-root': {
    color: '#7f8c8d',
    padding: theme.spacing(0.25),
    '&.Mui-checked': { color: '#2980b9' }
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.5, 1, 0.5, 2.5),
  }
}));

const ClearAllButton = styled(Typography)(({ theme }) => ({
  fontSize: theme.breakpoints.down('sm') ? 13 : 14,
  color: '#e74c3c',
  cursor: 'pointer',
  fontWeight: 600,
  padding: theme.spacing(1, 1.5),
  borderRadius: 8,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  fontFamily: "'Inter',sans-serif",
  background: 'linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)',
  border: '1px solid rgba(231,76,60,.2)',
  boxShadow: '0 2px 8px rgba(0,0,0,.05)',
  
  '&:hover': {
    background: 'linear-gradient(135deg,rgba(231,76,60,.1) 0%,rgba(255,255,255,.95) 100%)',
    color: '#c0392b',
    boxShadow: '0 4px 15px rgba(231,76,60,.2)',
    transform: 'translateY(-1px)'
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 1),
  }
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1300,
  backgroundColor: 'rgba(255,255,255,0.95)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  
  [theme.breakpoints.up('md')]: {
    display: 'none',
  }
}));

export default function ServiceSideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, , collection, maybeVersion] = pathname.split('/');
  const theme = useTheme();
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));      // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));       // >= 900px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg'));  // >= 1200px
  
  const [openCollections, setOpenCollections] = useState(true);
  const [openSubVersions, setOpenSubVersions] = useState({});
  const [openSub, setOpenSub] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const go = url => () => {
    navigate(url);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const clearAll = () => {
    navigate('/services');
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const collections = [
    {
      label: 'Wall Tiles',
      key: 'walltiles',
      versions: [
        { label: '300 X 450', url: '/services/walltiles', path: '' },
      ]
    },
    {
      label: 'Elevation Tiles',
      key: 'elevation-tiles-collection',
      versions: [
        { label: '300 X 450', url: '/services/elevation-tiles-300x450', path: '' },
        { label: '300 X 600', url: '/services/elevation-tiles-300x600', path: 'v1' },
      ]
    },
    {
      label: "Floor Tiles",
      key: "floortiles",
      url: "/services/floortiles",
      versions: [
        {
          label: "600 X 1200",
          url: "/services/floortiles/600x1200",
          subversions: [
            {
              label: "Glossy Collection",
              url: "/services/floortiles/600x1200/glossy"
            },
            {
              label: "Matt Collection",
              url: "/services/floortiles/600x1200/matt"
            }
          ]
        },
        {
          label: "600 X 600 DC",
          url: "/services/floortiles/600x600dc"
        }
      ]
    },
    {
      label: 'Parking Tiles', 
      key: 'parkingtiles', 
      url: "/services/parkingtiles",
      versions: [
        { label: '300 X 300', url: '/services/parkingtiles/collection1' },
        { label: '400 X 400', url: '/services/parkingtiles/collection2' },
      ]
    },
    {
      label: 'CoolRoof Tiles', 
      key: 'cool-roof-tiles-9mm',
      versions: [
        {
          label: '300 X 300', 
          path: '',
          subversions: [
            { label: '9MM', url: '/services/cool-roof-tiles-9mm', path: '' },
            { label: '10MM', url: '/services/cool-roof-tiles-10mm', path: 'v1' },
          ]
        },
        { label: '600 X 600', url: '/services/cool-roof-tiles-600x600', path: 'v1' },
      ]
    },
    { 
      label: 'Kitchen Sink', 
      url: '/services/kitchen-sink', 
      key: 'kitchen-sink' 
    },
  ];

  useEffect(() => {
    setOpenSub(prev => ({
      ...prev,
      [collection]: prev[collection] ?? !!maybeVersion
    }));
  }, [collection, maybeVersion]);

  // Responsive sidebar width calculation
  const getSidebarWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return 320;
    if (isLargeDesktop) return 360;
    return 300; // Default for desktop (md)
  };

  const sidebarContent = (
    <StyledSidebar>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: { xs: 1.5, sm: 2 },
        mb: 2,
        gap: 1,
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
      }}>
        <Typography
          sx={{
            fontSize: { 
              xs: 16, 
              sm: 18, 
              md: 20, 
              lg: 22 
            },
            fontWeight: 700,
            fontFamily: "'Poppins',sans-serif",
            background: 'linear-gradient(45deg,#2c3e50 0%,#3498db 50%,#2980b9 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 2px 4px rgba(255,255,255,0.5)'
          }}
        >
          Shop By Products
        </Typography>

        <ClearAllButton onClick={clearAll}>Clear All</ClearAllButton>
      </Box>

      <Divider sx={{
        mb: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1,
        background: 'linear-gradient(90deg,transparent 0%,rgba(52,152,219,.3) 50%,transparent 100%)',
        height: 2
      }} />

      <SectionHeader
        sx={{ justifyContent: 'space-between' }}
        onClick={() => setOpenCollections(o => !o)}
      >
        <Typography
          sx={{
            fontSize: { 
              xs: 15, 
              sm: 17, 
              md: 19, 
              lg: 21 
            },
            fontWeight: 700,
            fontFamily: "'Poppins',sans-serif",
            background: 'linear-gradient(45deg,#34495e 0%,#2c3e50 100%)',
            WebkitBackgroundClip: 'text',
            color: 'black'
          }}
        >
          Products
        </Typography>
        {openCollections ? (
          <ExpandLessIcon sx={{ 
            fontSize: { 
              xs: 16, 
              sm: 18, 
              md: 20, 
              lg: 22 
            }, 
            color: 'black' 
          }} />
        ) : (
          <ExpandMoreIcon sx={{ 
            fontSize: { 
              xs: 16, 
              sm: 18, 
              md: 20, 
              lg: 22 
            }, 
            color: 'black' 
          }} />
        )}
      </SectionHeader>

      <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.4)' }} />

      <Collapse in={openCollections}>
        <Box sx={{ pb: 1 }}>
          {collections.map(item => {
            const isSelected = collection === item.key;
            const hasVersions = Array.isArray(item.versions);

            if (!hasVersions) {
              return (
                <CollectionItem
                  key={item.key}
                  control={
                    <Checkbox
                      size="small"
                      checked={isSelected}
                      onChange={go(item.url)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  }
                  label={item.label}
                  selected={isSelected}
                />
              );
            }

            const isSubOpen = !!openSub[item.key];
            return (
              <Box key={item.key} sx={{ mb: 0.5 }}>
                <CollectionItem
                  selected={isSelected}
                  control={
                    <Checkbox
                      size="small"
                      checked={isSelected}
                      onChange={go(item.versions[0].url)}
                      onClick={e => e.stopPropagation()}
                    />
                  }
                  label={
                    <Box
                      onClick={() =>
                        setOpenSub(prev => ({ ...prev, [item.key]: !prev[item.key] }))
                      }
                      style={{ display: "flex", alignItems: "center", width: "100%" }}
                    >
                      <Typography sx={{ flexGrow: 1 }}>{item.label}</Typography>
                      {isSubOpen ? (
                        <ExpandLessIcon sx={{ 
                          ml: 1, 
                          fontSize: { xs: 18, sm: 20 } 
                        }} />
                      ) : (
                        <ExpandMoreIcon sx={{ 
                          ml: 1, 
                          fontSize: { xs: 18, sm: 20 } 
                        }} />
                      )}
                    </Box>
                  }
                />
                <Collapse in={isSubOpen}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0, 
                    pl: { xs: 0.5, sm: 1 } 
                  }}>
                    {item.versions.map(v => {
                      const thisChecked = pathname.startsWith(v.url);
                      const hasSubVersions = Array.isArray(v.subversions);
                      const openThisSub = openSubVersions[v.label];

                      return (
                        <Box key={v.label}>
                          <VersionItem
                            selected={thisChecked}
                            control={
                              <Checkbox
                                size="small"
                                checked={thisChecked}
                                onChange={go(v.url)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            }
                            label={
                              <Box
                                onClick={() => {
                                  if (hasSubVersions) {
                                    setOpenSubVersions(prev => ({
                                      ...prev,
                                      [v.label]: !prev[v.label],
                                    }));
                                  }
                                }}
                                style={{ display: "flex", alignItems: "center", width: "100%" }}
                              >
                                <Typography sx={{ flexGrow: 1 }}>{v.label}</Typography>
                                {hasSubVersions &&
                                  (openThisSub ? (
                                    <ExpandLessIcon sx={{ 
                                      ml: 1, 
                                      fontSize: { xs: 16, sm: 18 } 
                                    }} />
                                  ) : (
                                    <ExpandMoreIcon sx={{ 
                                      ml: 1, 
                                      fontSize: { xs: 16, sm: 18 } 
                                    }} />
                                  ))}
                              </Box>
                            }
                          />

                          {hasSubVersions && (
                            <Collapse in={openThisSub}>
                              <Box sx={{ 
                                pl: { xs: 3, sm: 4 }, 
                                pt: 0.5 
                              }}>
                                {v.subversions.map(sv => (
                                  <VersionItem
                                    key={sv.label}
                                    control={
                                      <Checkbox
                                        size="small"
                                        checked={pathname === sv.url}
                                        onChange={go(sv.url)}
                                      />
                                    }
                                    label={sv.label}
                                  />
                                ))}
                              </Box>
                            </Collapse>
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Collapse>
    </StyledSidebar>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <>
        <MobileMenuButton onClick={handleDrawerToggle} sx={{mt:6.3,ml:-1.5}}>
          <ListIcon />
        </MobileMenuButton>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: getSidebarWidth(),
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            p: 2 
          }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          {sidebarContent}
        </Drawer>
      </>
    );
  }

  // Tablet and Desktop - fixed sidebar
  return (
    <Box sx={{
      width: getSidebarWidth(),
      flexShrink: 0,
      position: 'sticky',
      top: 80,
      height: 'calc(100vh - 80px)',
      overflowY: 'auto',
      borderRight: '1px solid rgba(255,255,255,0.2)',
      borderRadius: isTablet ? '0 0 16px 0' : 0,
      
      // Responsive positioning
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        width: 320,
      },
      [theme.breakpoints.up('md')]: {
        width: 300,
      },
      [theme.breakpoints.up('lg')]: {
        width: 360,
      }
    }}>
      {sidebarContent}
    </Box>
  );
}