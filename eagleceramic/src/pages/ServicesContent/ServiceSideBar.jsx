import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Checkbox,
  FormControlLabel, Collapse,
  IconButton, Divider
} from '@mui/material';
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

  // auto‐open “Golden Versions” whenever you're on that collection
  useEffect(() => {
    setOpenCollections(true);
    setOpenGoldenVersions(collection === 'golden-endless-collection');
  }, [collection]);

  const go = (to) => () => navigate(to);

  return (
    <Box
      sx={{
        width: 320, p: 2,
        borderRight: '1px solid #e0e0e0',
        position: 'sticky', top: 100,
        height: 'calc(100vh - 100px)',
        overflowY: 'auto',
      }}
    >
      {/* header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 500 }}>Shop By</Typography>
        <Typography
          sx={{ fontSize: 14, color: 'red', cursor: 'pointer' }}
          onClick={() => navigate(pathname, { replace: true }) }
        >
          Clear All
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setOpenCollections(c => !c)}
      >
        <Typography sx={{ fontSize: 22 }}>Collection</Typography>
        <IconButton size="small">
          {openCollections ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />

      <Collapse in={openCollections}>
        {/* Golden Endless */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={collection === 'golden-endless-collection' && !maybeVersion}
                onChange={go('/services/golden-endless-collection')}
              />
            }
            label="Golden Endless Collection"
          />
          <IconButton
            size="small"
            onClick={e => { e.stopPropagation(); setOpenGoldenVersions(o => !o); }}
          >
            {openGoldenVersions ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
          </IconButton>
        </Box>

        {/* Golden Versions */}
        <Collapse in={openGoldenVersions}>
          <Box sx={{ ml: 5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {[
              ['All Versions',       '/services/golden-endless-collection',      !maybeVersion],
              ['Version 0',          '/services/golden-endless-collection/v0',  maybeVersion==='v0'],
              ['Version 1',          '/services/golden-endless-collection/v1',  maybeVersion==='v1'],
              ['Version 2',          '/services/golden-endless-collection/v2',  maybeVersion==='v2'],
            ].map(([label, url, isChecked]) => (
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

        {/* Statuario */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === 'statuario-collection'}
              onChange={go('/services/statuario-collection')}
            />
          }
          label="Statuario Collection"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />

        {/* Glossy */}
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={collection === 'glossy-collection'}
              onChange={go('/services/glossy-collection')}
            />
          }
          label="Glossy Collection"
          sx={{ display: 'block', mt: 1, ml: 0.5 }}
        />
      </Collapse>
    </Box>
  );
}
