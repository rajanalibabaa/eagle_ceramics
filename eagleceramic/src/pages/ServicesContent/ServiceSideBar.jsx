import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [openCollection, setOpenCollection] = useState(true);

  // Auto-open "Golden Versions" when on that collection
  useEffect(() => {
    setOpenCollections(true);
    setOpenGoldenVersions(collection === 'golden-endless-collection');
  }, [collection]);

  const handleGoldenClick = () => {
    navigate("/services/golden-endless-collection");
  };
  const handleStatuarioClick = () => {
    navigate("/services/statuario-collection");
  };

  const handleGlossyClick = () => {
    navigate("/services/glossy-collection");
  }

  const handleMattCarvingEndlessClick = () => {
    navigate("/services/matt-carving-endless-collection");
  }

  const handleSnpClick = () => {
    navigate("/services/snp-collection");
  }

  const handleThreeDimensionClick = () => {
    navigate("/services/three-dimension-collection");
  }

  const handleDoubleChargeClick = () => {
    navigate("/services/double-charge-collection");
  }

  const handleMattCarvingClick = () => {
    navigate("/services/matt-carving-collection");
  }

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

      <Collapse in={openCollection}>
        <Box sx={{ mt: 1 }}>

          {/* GOLDEN ENDLESS MAIN OPTION WITH TOGGLE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              ml: 0.5,
            }}
            onClick={() => setOpenGoldenVersions(!openGoldenVersions)}
          >
            <FormControlLabel
              control={<Checkbox size="small" onChange={handleGoldenClick} />}
              label="Golden Endless Collection (600 X 1200 MM)"
            />

            <IconButton size="small">
              {openGoldenVersions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          {/* SUB-VERSIONS */}
          <Collapse in={openGoldenVersions}>
            <Box sx={{ ml: 5, mt: 1 }}>
              {Array.from({ length: 3 }, (_, i) => (
                <FormControlLabel
                  key={i}
                  control={<Checkbox size="small" />}
                  label={`Version ${i + 1}`}
                />
              ))}
            </Box>
          </Collapse>

          {/* OTHER COLLECTIONS */}
          <FormControlLabel
            control={<Checkbox size="small" onChange={handleStatuarioClick} />}
            label="Statuario Collection(600 X 1200 MM)"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={handleGlossyClick} />}
            label="Glossy Collection(600 X 1200 MM)"
          />
          <FormControlLabel
            control={<Checkbox size="small" onChange={handleMattCarvingEndlessClick} />}
            label="Matt Carving Endless Collection(600 X 1200 MM)"
          />
           <FormControlLabel
            control={<Checkbox size="small" onChange={handleSnpClick} />}
            label="Snp Collection(600 X 1200 MM)"
          />

          <FormControlLabel
            control={<Checkbox size="small" onChange={handleThreeDimensionClick} />}
            label="3D Collection(600 X 1200 MM)"
          />

          <FormControlLabel
            control={<Checkbox size="small" onChange={handleDoubleChargeClick} />}
            label="Double Charge Collection(600 X 1200 MM)"
          />

          <FormControlLabel
            control={<Checkbox size="small" onChange={handleMattCarvingClick} />}
            label="Matt Carving Collection(600 X 1200 MM)"
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Somany Collection"
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
      </Collapse>
    </Box>
  );
}