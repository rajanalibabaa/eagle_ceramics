import React, { useState, useEffect } from 'react';
import  IconButton from '@mui/material/IconButton';
import  Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ServiceSideBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [, , collection, maybeVersion] = pathname.split('/');
  const [openCollections, setOpenCollections] = useState(true);
  const [openGoldenVersions, setOpenGoldenVersions] = useState(false);

  const clearAll = () => {
    navigate('/services'); 
  };

  useEffect(() => {
    setOpenCollections(true);
    setOpenGoldenVersions(collection === 'golden-endless-collection');
  }, [collection]);

  const go = (to) => () => navigate(to);

  const goldenVersions = [
    { label: 'All Versions', url: '/services/golden-endless-collection', isChecked: !maybeVersion },
    { label: 'Version 1', url: '/services/golden-endless-collection/v0', isChecked: maybeVersion === 'v0' },
    { label: 'Version 2', url: '/services/golden-endless-collection/v1', isChecked: maybeVersion === 'v1' },
    { label: 'Version 3', url: '/services/golden-endless-collection/v2', isChecked: maybeVersion === 'v2' },
  ];

  return (
    <Box
      sx={{
        width: 370,
        p: 2,
        borderRight: '1px solid #e0e0e0',
        position: 'sticky',
        top: 100,
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* Single Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Shop By</Typography>
        <Typography
          sx={{ fontSize: 14, color: 'red', cursor: 'pointer' }}
          onClick={clearAll}        >
          Clear All
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Single Collection Section */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setOpenCollections(c => !c)}
      >
        <Typography sx={{ fontSize: 22 }}>Collection</Typography>
        <IconButton size="small">
          {openCollections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Collapse in={openCollections}>
        {/* Golden Endless Collection */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={collection === 'golden-endless-collection' && !maybeVersion}
                onChange={go('/services/golden-endless-collection')}
              />
            }
            label="Golden Endless Collection(600X1200MM)"
          />
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpenGoldenVersions(o => !o);
            }}
          >
            {openGoldenVersions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        {/* Golden Versions Sub-items */}
        <Collapse in={openGoldenVersions}>
          <Box sx={{ ml: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {goldenVersions.map(({ label, url, isChecked }) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    size="small"
                    checked={isChecked}
                    onChange={go(url)}
                  />
                }
                label={label}
              />
            ))}
          </Box>
        </Collapse>

        {/* Statuario Collection */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === 'statuario-collection'}
              onChange={go('/services/statuario-collection')}
            />
          }
          label="Statuario Collection(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

        {/* Glossy Collection */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === 'glossy-collection'}
              onChange={go('/services/glossy-collection')}
            />
          }
          label="Glossy Collection(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
         <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/matt-carving-endless-collection'}
              onChange={go('/services/matt-carving-endless-collection')}
            />
          }
          label="Matt Carving Endless Collection(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/snp-collection'}
              onChange={go('/services/snp-collection')}
            />
          }
          label="SNP COLLECTION(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

         <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/three-dimension-collection'}
              onChange={go('/services/three-dimension-collection')}
            />
          }
          label="3D COLLECTION(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

         <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/double-charge-collection'}
              onChange={go('/services/double-charge-collection')}
            />
          }
          label="Double Charge Collection(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
         <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/matt-carving-collection'}
              onChange={go('/services/matt-carving-collection')}
            />
          }
          label="Matt Carving Collection(600X1200MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/moroccan-collection'}
              onChange={go('/services/moroccan-collection')}
            />
          }
          label="Moroccan Collection(300X300MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/plain-collection'}
              onChange={go('/services/plain-collection')}
            />
          }
          label="Plain Collection(300X300MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === '/special-collection'}
              onChange={go('/services/special-collection')}
            />
          }
          label="Special Collection(300X300MM)"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
      </Collapse>
    </Box>
  );
}