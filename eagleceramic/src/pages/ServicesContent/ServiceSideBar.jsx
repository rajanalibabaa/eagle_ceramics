import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Typography,
  Divider,
  Collapse,
  Checkbox,
  FormControlLabel,
  useMediaQuery,
  SwipeableDrawer,
  Fab
} from '@mui/material'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { styled, useTheme } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'

/* Styled components */
const StyledSidebar = styled(Box)(({ theme }) => ({
  padding: { xs: 0, sm: '16px', md: '24px' },
  position: 'relative',
  width: '100%',
  height: '100%',
  overflowY: 'auto',
  background: `
    linear-gradient(135deg,
      rgba(248,249,250,0.95) 0%,
      rgba(255,255,255,0.98) 50%,
      rgba(240,242,245,0.95) 100%)`,
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  fontFamily: "'Inter','Roboto','Arial',sans-serif",
  '&::-webkit-scrollbar': { width: '6px' },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '10px'
  }
}))

const SectionHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '12px 16px',
  borderRadius: 12,
  background: 'linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)',
  border: '1px solid rgba(255,255,255,0.8)',
  marginBottom: '8px'
})

const CollectionItem = styled(FormControlLabel)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '8px 12px',
  borderRadius: 10,
  transition: 'all .3s',
  '& .MuiTypography-root': {
    flex: 1,
    fontWeight: selected ? 600 : 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  '& .MuiCheckbox-root': {
    color: '#c41f25'
  }
}))

const VersionItem = styled(FormControlLabel)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '6px 12px 6px 24px',
  borderRadius: 8,
  transition: 'all .3s',
  '& .MuiTypography-root': {
    flex: 1,
    fontWeight: selected ? 600 : 400
  },
  '& .MuiCheckbox-root': {
    color: '#c41f25'
  }
}))

const ClearAllButton = styled(Typography)({
  fontSize: 14,
  color: '#e74c3c',
  cursor: 'pointer',
  fontWeight: 600,
  padding: '8px 12px',
  borderRadius: 8,
  background: 'linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)',
  border: '1px solid rgba(231,76,60,.2)',
  '&:hover': {
    background: 'rgba(231,76,60,0.1)',
    color: '#c0392b'
  }
})

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: '320px',
  flexShrink: 0,
  position: 'sticky',
  top: '80px',
  alignSelf: 'flex-start',
  height: 'calc(100vh - 80px)'
}))

/* Main Component */
export default function ServiceSideBar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [, , collectionKey, maybeVersion] = pathname.split('/')
  const [openCollections, setOpenCollections] = useState(true)
  const [openSubVersions, setOpenSubVersions] = useState({})
  const [openSub, setOpenSub] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false)

  const go = url => () => {
    setDrawerOpen(false)
    navigate(url)
  }
  const clearAll = () => {
    setDrawerOpen(false)
    navigate('/services')
  }

  useEffect(() => {
    setOpenSub(prev => ({
      ...prev,
      [collectionKey]: prev[collectionKey] ?? !!maybeVersion
    }))
  }, [collectionKey, maybeVersion])

  const collections = [
    {
      label: 'Wall Tiles',
      key: 'walltiles',
      versions: [{ label: '300 X 450', url: '/services/walltiles' }]
    },
    {
      label: 'Elevation Tiles',
      key: 'elevation-tiles-collection',
      versions: [
        { label: '300 X 450', url: '/services/elevation-tiles-300x450' },
        { label: '300 X 600', url: '/services/elevation-tiles-300x600' }
      ]
    },
    {
      label: 'Floor Tiles',
      key: 'floortiles',
      versions: [
        {
          label: '600 X 1200',
          url: '/services/floortiles/600x1200',
          subversions: [
            { label: 'Glossy', url: '/services/floortiles/600x1200/glossy' },
            { label: 'Matt', url: '/services/floortiles/600x1200/matt' }
          ]
        },
        { label: '600 X 600 DC', url: '/services/floortiles/600x600dc' }
      ]
    },
    {
      label: 'Parking Tiles',
      key: 'parkingtiles',
      versions: [
        { label: '300 X 300', url: '/services/parkingtiles/collection1' },
        { label: '400 X 400', url: '/services/parkingtiles/collection2' }
      ]
    },
    {
      label: 'CoolRoof Tiles',
      key: 'cool-roof-tiles-9mm',
      versions: [
        {
          label: '300 X 300',
          url: '/services/cool-roof-tiles-9mm',
          subversions: [
            { label: '9MM', url: '/services/cool-roof-tiles-9mm' },
            { label: '10MM', url: '/services/cool-roof-tiles-10mm' }
          ]
        },
        { label: '600 X 600', url: '/services/cool-roof-tiles-600x600' }
      ]
    },
    { label: 'Kitchen Sink',url: '/services/kitchen-sink', key: 'kitchen-sink', versions: [] }
  ]

  /* Sidebar content */
  const sidebarRef = useRef(null)

  const SidebarContent = (
    <StyledSidebar ref={sidebarRef}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            background: 'black',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Shop By Products
        </Typography>
        {isMobile ? (
          <Fab size="small" onClick={() => setDrawerOpen(false)} sx={{ boxShadow: 'none' }}>
            <CloseIcon />
          </Fab>
        ) : (
          <ClearAllButton onClick={clearAll}>Clear All</ClearAllButton>
        )}
      </Box>

      <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />

      <SectionHeader onClick={() => setOpenCollections(o => !o)}>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>Products</Typography>
        {openCollections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </SectionHeader>
      <Divider sx={{ mb: 1, borderColor: 'rgba(0,0,0,0.1)' }} />

      <Collapse in={openCollections}>
        <Box>
          {collections.map(item => {
            const hasVersions = item.versions?.length > 0

            // NEW: derive checked & indeterminate states
            const childMatches = hasVersions &&
              item.versions.some(v => pathname.startsWith(v.url))

            const allChildMatches = hasVersions &&
              item.versions.every(v => pathname.startsWith(v.url))

            const isSelected = !hasVersions
              ? (collectionKey === item.key)
              : childMatches

            return (
              <Box key={item.key} sx={{ mb: 1 }}>
                <CollectionItem
                  selected={isSelected}
                  control={
                   <Checkbox
  size="small"
  checked={isSelected}  
  indeterminate={false}
  sx={{ color: '#c41f25', '&.Mui-checked': { color: '#c41f25' } }}
  onChange={go(
    hasVersions
      ? item.versions[0].url
      : item.url || '/services'
  )}
  onClick={e => e.stopPropagation()}
/>

                  }
                  label={
                    hasVersions ? (
                      <Box
                        onClick={() =>
                          setOpenSub(prev => ({ ...prev, [item.key]: !prev[item.key] }))
                        }
                        sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                      >
                        <Typography sx={{ flexGrow: 1 }}>{item.label}</Typography>
                        {openSub[item.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    ) : (
                      item.label
                    )
                  }
                />

                {hasVersions && (
                  <Collapse in={!!openSub[item.key]}>
                    <Box sx={{ pl: 2 }}>
                      {item.versions.map(v => {
                        const thisChecked = pathname.startsWith(v.url)
                        const hasSub = Array.isArray(v.subversions)
                        const openThisSub = openSubVersions[v.label]

                        return (
                          <Box key={v.label} sx={{ mb: 0.5 }}>
                            <VersionItem
                              selected={thisChecked}
                              control={
                                <Checkbox
                                  size="small"
                                  checked={thisChecked}
                                  sx={{ color: '#c41f25', '&.Mui-checked': { color: '#c41f25' } }}
                                  onChange={go(v.url)}
                                  onClick={e => e.stopPropagation()}
                                />
                              }
                              label={
                                hasSub ? (
                                  <Box
                                    onClick={() =>
                                      setOpenSubVersions(prev => ({
                                        ...prev,
                                        [v.label]: !prev[v.label]
                                      }))
                                    }
                                    sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                  >
                                    <Typography sx={{ flexGrow: 1 }}>{v.label}</Typography>
                                    {openThisSub ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                  </Box>
                                ) : (
                                  v.label
                                )
                              }
                            />

                            {hasSub && (
                              <Collapse in={openThisSub}>
                                <Box sx={{ pl: 3 }}>
                                  {v.subversions.map(sv => (
                                    <VersionItem
                                      key={sv.label}
                                      control={
                                        <Checkbox
                                          size="small"
                                          checked={pathname === sv.url}
                                          sx={{ color: '#c41f25', '&.Mui-checked': { color: '#c41f25' } }}
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
                        )
                      })}
                    </Box>
                  </Collapse>
                )}
              </Box>
            )
          })}
        </Box>
      </Collapse>
    </StyledSidebar>
  )

  /* Render */
  if (!isMobile) {
    return <SidebarWrapper>{SidebarContent}</SidebarWrapper>
  }
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    if (!sidebarRef.current) return
    const el = sidebarRef.current
    const obs = new IntersectionObserver(
      entries => {
        setSidebarVisible(!!entries[0].isIntersecting)
      },
      { threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [sidebarRef])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      entries => {
        setFooterVisible(!!entries[0].isIntersecting)
      },
      { threshold: 0.05 }
    )
    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  const showFab = sidebarVisible && !footerVisible

  return (
    <>
      {showFab && !drawerOpen && (
  <Fab
    variant="extended"
    onClick={() => setDrawerOpen(true)}
    sx={{
      position: 'fixed',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: theme.zIndex.modal + 1,
      color: '#c41f25',               
      backgroundColor: '#fff',         
      border: '1px solid #c41f25',     
      '&:hover': {
        backgroundColor: '#ffe5e6'     
      }
    }}
  >
    <FilterListIcon sx={{ mr: 1 }} /> Filters
  </Fab>
)}


      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { height: '90vh', borderRadius: '16px 16px 0 0' }
        }}
      >
        {SidebarContent}
      </SwipeableDrawer>
    </>
  )
}
