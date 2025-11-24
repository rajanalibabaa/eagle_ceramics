import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';

const StyledSidebar = styled(Box)(({ theme }) => ({
  width: { xs: '100%', sm: '280px', md: '320px', lg: '360px' },
  padding: { xs: '16px', sm: '20px', md: '24px' },
  position: 'sticky',
  top: 80,
  // Remove fixed height and use auto with max-height
  height: 'auto',
  maxHeight: 'calc(100vh - 80px)', // Maximum height but can be less
  overflowY: 'auto', // Scroll only when content exceeds max-height
  overflowX: 'hidden',   
  borderRight: { xs: 'none', md: '1px solid rgba(255,255,255,0.2)' },
  background: `
    linear-gradient(135deg,
      rgba(248,249,250,0.95) 0%,
      rgba(255,255,255,0.98) 50%,
      rgba(240,242,245,0.95) 100%)`,
  boxShadow: {
    xs: '0 4px 20px rgba(0,0,0,0.08)',
    md: 'inset -2px 0 15px rgba(0,0,0,0.03)'
  },
  borderRadius: { xs: '0 0 16px 16px', md: 0 },
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

const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '12px 16px',
  borderRadius: 12,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  background: 'linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)',
  border: '1px solid rgba(255,255,255,0.8)',
  marginBottom: '8px'
});

const CollectionItem = styled(FormControlLabel)(({ selected }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 0,
  marginBottom: '4px',
  padding: '8px 12px',
  borderRadius: 10,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  '& .MuiTypography-root': {
    fontSize: { xs: 14, sm: 15 },
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
    '&.Mui-checked': { color: '#2980b9' }
  }
}));

const VersionItem = styled(FormControlLabel)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 0,
  marginBottom: '2px',
  padding: '6px 12px 6px 24px',
  borderRadius: 8,
  transition: 'all .3s cubic-bezier(.4,0,.2,1)',
  '& .MuiTypography-root': {
    fontSize: { xs: 13, sm: 14 },
    fontFamily: "'Inter',sans-serif",
    fontWeight: selected ? 600 : 400,
    color: 'black'
  },
  '& .MuiCheckbox-root': {
    color: '#7f8c8d',
    padding: '4px',
    '&.Mui-checked': { color: '#2980b9' }
  }
}));

const ClearAllButton = styled(Typography)({
  fontSize: { xs: 13, sm: 14 },
  color: '#e74c3c',
  cursor: 'pointer',
  fontWeight: 600,
  padding: '8px 12px',
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
  }
});

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: { xs: '100%', sm: '280px', md: '320px', lg: '360px' },
  flexShrink: 0,
}));

export default function ServiceSideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, , collection, maybeVersion] = pathname.split('/'); 

  const [openCollections, setOpenCollections] = useState(true);
  const [openSub, setOpenSub] = useState({}); 

  const go = url => () => navigate(url);
  const clearAll = () => navigate('/services');

  const collections = [
    {
      label: 'Golden Endless Collection (600X1200MM)',
      key: 'golden-endless-collection',
      versions: [
        { label: 'All Versions', url: '/services/golden-endless-collection', path: '' },
        { label: 'Version 1', url: '/services/golden-endless-collection/v0', path: 'v0' },
        { label: 'Version 2', url: '/services/golden-endless-collection/v1', path: 'v1' },
        { label: 'Version 3', url: '/services/golden-endless-collection/v2', path: 'v2' }
      ]
    },
    { label: 'Statuario Collection (600X1200MM)', url: '/services/statuario-collection', key: 'statuario-collection' },
    { label: 'Glossy Collection (600X1200MM)', url: '/services/glossy-collection', key: 'glossy-collection' },
    { label: 'Matt Carving Endless Collection (600X1200MM)', url: '/services/matt-carving-endless-collection', key: 'matt-carving-endless-collection' },
    { label: 'SNP COLLECTION (600X1200MM)', url: '/services/snp-collection', key: 'snp-collection' },
    { label: '3D COLLECTION (600X1200MM)', url: '/services/three-dimension-collection', key: 'three-dimension-collection' },
    { label: 'Double Charge Collection (600X1200MM)', url: '/services/double-charge-collection', key: 'double-charge-collection' },
    { label: 'Matt Carving Collection (600X1200MM)', url: '/services/matt-carving-collection', key: 'matt-carving-collection' },
    {
      label: 'High Depth Elevation (600X300MM)',
      key: 'high-depth',
      versions: [
        { label: 'All Versions', url: '/services/high-depth', path: '' },
        { label: 'Version 1', url: '/services/high-depth/v0', path: 'v0' },
        { label: 'Version 2', url: '/services/high-depth/v1', path: 'v1' },
        { label: 'Version 3', url: '/services/high-depth/v2', path: 'v2' }
      ]
    },
  ];

  useEffect(() => {
    setOpenSub(prev => ({
      ...prev,
      [collection]: prev[collection] ?? !!maybeVersion 
    }));
  }, [collection, maybeVersion]);

  return (
    <SidebarWrapper>
      <StyledSidebar>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          p: 2, 
          mb: 2,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)' 
        }}>
          <Typography
            sx={{
              fontSize: { xs: 18, sm: 20, md: 22 },
              fontWeight: 700,
              fontFamily: "'Poppins',sans-serif",
              background: 'linear-gradient(45deg,#2c3e50 0%,#3498db 50%,#2980b9 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 4px rgba(255,255,255,0.5)'
            }}
          >
            Shop By Collection
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
              fontSize: { xs: 17, sm: 19, md: 21 },
              fontWeight: 700,
              fontFamily: "'Poppins',sans-serif",
              background: 'linear-gradient(45deg,#34495e 0%,#2c3e50 100%)',
              WebkitBackgroundClip: 'text',
              color: 'black'
            }}
          >
            Collection
          </Typography>
          {openCollections ? (
            <ExpandLessIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, color: 'black' }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, color: 'black' }} />
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
                        onChange={go(item.versions[0].url)} // Go to "All Versions"
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
                          <ExpandLessIcon sx={{ ml: 1, fontSize: 20 }} />
                        ) : (
                          <ExpandMoreIcon sx={{ ml: 1, fontSize: 20 }} />
                        )}
                      </Box>
                    }
                  />
                  <Collapse in={isSubOpen}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, pl: 1 }}>
                      {item.versions.map(v => {
                        const thisChecked = isSelected && (v.path === maybeVersion || (!maybeVersion && v.path === ''));
                        return (
                          <VersionItem
                            key={v.label}
                            control={<Checkbox size="small" checked={thisChecked} onChange={go(v.url)} />}
                            label={v.label}
                            selected={thisChecked}
                          />
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
    </SidebarWrapper>
  );
}