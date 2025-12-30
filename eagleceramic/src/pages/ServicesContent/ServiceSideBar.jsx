import React, { useState, useEffect, useRef } from 'react'

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import useMediaQuery from '@mui/material/useMediaQuery';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Fab from '@mui/material/Fab';

import  ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import  ExpandLessIcon  from '@mui/icons-material/ExpandLess';
import  FilterListIcon from '@mui/icons-material/FilterList';
import  CloseIcon  from '@mui/icons-material/Close';
import { styled, useTheme } from '@mui/material/styles'
import { useNavigate, useLocation } from 'react-router-dom'

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

const CollectionItem = styled(Box)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '12px 5%',  
  borderTopRightRadius:12,
  borderBottomRightRadius:12,
  transition: 'all .3s',
  cursor: 'pointer',
 
  '& .MuiTypography-root': {
    flex: 1,
    fontWeight: selected ? 600 : 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: selected ? '#c41f25' : 'inherit',
    paddingLeft: '5%'  
  }
}))

const VersionItem = styled(Box)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  padding: '10px 5% 10px 10%',  // 10% left padding for first level indent
  borderTopRightRadius:12,
  borderBottomRightRadius:12,
  transition: 'all .3s',
  cursor: 'pointer',
  border: selected ? '1px solid rgba(196, 31, 37, 0.3)' : '1px solid transparent',
  
  '& .MuiTypography-root': {
    flex: 1,
    fontWeight: selected ? 600 : 400,
    color: selected ? '#c41f25' : 'inherit',
    paddingLeft: '5%'  
  }
}))



const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: '320px',
  flexShrink: 0,
  overflowY: 'auto',
  backgroundColor: 'red',
  position: 'sticky',
  top: '80px',
  alignSelf: 'flex-start',
  height: 'calc(100vh - 80px)'
}))

export default function ServiceSideBar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [, , collectionKey, maybeVersion] = pathname.split('/')
  const [openCollections, setOpenCollections] = useState(true)
  const [openSub, setOpenSub] = useState({})
  const [openSubVersions, setOpenSubVersions] = useState({})
  const [drawerOpen, setDrawerOpen] = useState(false)

  const go = url => () => {
    setDrawerOpen(false)
    navigate(url)
  }



  // Auto-open the parent when child is selected
  useEffect(() => {
    if (collectionKey) {
      setOpenSub(prev => ({
        ...prev,
        [collectionKey]: true
      }))
    }
  }, [collectionKey])

  // Close other collections when one is opened
  const handleCollectionClick = (key) => {
    setOpenSub(prev => {
      const newState = {}
      // Close all other collections
      Object.keys(prev).forEach(k => {
        newState[k] = false
      })
      // Open the clicked one
      newState[key] = !prev[key]
      return newState
    })
  }



  const collections = [
    {
      label: 'Wall Tiles',
      key: 'walltiles',
      versions: [{ label: '300 X 450', url: '/products/walltiles' }]
    },
    {
      label: 'Elevation Tiles',
      key: 'elevation-tiles-collection',
      versions: [
        { label: '300 X 450', url: '/products/elevation-tiles-300x450' },
        { label: '300 X 600', url: '/products/elevation-tiles-300x600' }
      ]
    },
    {
      label: 'Floor Tiles',
      key: 'floortiles',
      versions: [
            { label: '600 X 1200 Glossy', url: '/products/floortiles/600x1200/glossy' },
            { label: '600 X 1200 Matt', url: '/products/floortiles/600x1200/matt' } ,
            { label: '600 X 600 DC', url: '/products/floortiles/600x600dc' }
      ]
    },
    {
      label: 'Parking Tiles',
      key: 'parkingtiles',
      versions: [
        { label: '300 X 300', url: '/products/parkingtiles/collection1' },
        { label: '400 X 400', url: '/products/parkingtiles/collection2' }
      ]
    },
    {
      label: 'CoolRoof Tiles',
      key: 'cool-roof-tiles-9mm',
      versions: [
            { label: '300 X 300 9MM', url: '/products/cool-roof-tiles-9mm' },
            { label: '300 X 300 10MM', url: '/products/cool-roof-tiles-10mm' }  ,
            { label: '600 X 600', url: '/products/cool-roof-tiles-600x600' }
      ]
    },
    { label: 'Kitchen Sink', url: '/products/kitchen-sink', key: 'kitchen-sink', versions: [] }
  ]

  const sidebarRef = useRef(null)

  const SidebarContent = (
    <StyledSidebar ref={sidebarRef}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        pl: '5%' , // Using percentage in sx prop
      
      }}>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c41f25 0%, #e74c3c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            pl: '5%'  
          }}
        >
          Shop By Products
        </Typography>
        {isMobile ? (
          <Fab size="small" onClick={() => setDrawerOpen(false)} sx={{ boxShadow: 'none' }}>
            <CloseIcon />
          </Fab>
        ) : (
          <></>
        )}
      </Box>

      <Divider sx={{ 
        mb: 2, 
        borderColor: 'rgba(0, 0, 0, 1)',
        ml: '5%',  // Align divider with text
        mr: '5%'
      }} />

      <SectionHeader sx={{ ml: '5%', mr: '5%' }} onClick={() => setOpenCollections(o => !o)}>
        <Typography sx={{ 
          fontSize: 18, 
          fontWeight: 700,
          pl: '5%'  // Text padding
        }}>
          Products
        </Typography>
        {openCollections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </SectionHeader>
      <Divider sx={{ 
        mb: 1, 
        borderColor: 'rgba(0, 0, 0, 1)',
        ml: '5%',
        mr: '5%'
      }} />

      <Collapse in={openCollections}>
        <Box sx={{ px: 0, mb: 2, ml: '5%', mr: '5%', }}>
          {collections.map(item => {
            const hasVersions = item.versions?.length > 0
            
            // Determine if this item or any of its children is selected
            const isSelected = !hasVersions
              ? (collectionKey === item.key)
              : item.versions.some(v => 
                  pathname.startsWith(v.url) || 
                  v.subversions?.some(sv => pathname === sv.url)
                )

            return (
              <Box key={item.key} sx={{ mb: 1 }}>
                <CollectionItem
                  selected={isSelected}
                  onClick={() => {
                    if (hasVersions) {
                      handleCollectionClick(item.key)
                    } else {
                      go(item.url)()
                    }
                  }}
                >
                  <Typography sx={{ 
                    flexGrow: 1,
                    pl: '5%' ,
                  }}>
                    {item.label}
                  </Typography>
                  {hasVersions && (
                    openSub[item.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />
                  )}
                </CollectionItem>

                {hasVersions && (
                  <Collapse in={!!openSub[item.key]}>
                    <Box>
                      {item.versions.map(v => {
                        const thisSelected = pathname === v.url || 
                          (pathname.startsWith(v.url) && !item.versions.some(other => 
                            other !== v && pathname.startsWith(other.url)
                          ))

                        return (
                          <Box key={v.label} sx={{ mb: 0.5, mt:'1%', }}>
                            <VersionItem
                              selected={thisSelected}
                              onClick={() => {
                                go(v.url)()
                              }}
                            >
                              <Typography sx={{ 
                                flexGrow: 1,
                               
                                pl: '5%'
                              }}>
                                {v.label}
                              </Typography>
                            </VersionItem>
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

  if (!isMobile) {
    return <SidebarWrapper>{SidebarContent}</SidebarWrapper>
  }
  
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    if (!sidebarRef.current) return
    const obs = new IntersectionObserver(
      entries => setSidebarVisible(entries[0].isIntersecting),
      { threshold: 0.01 }
    )
    obs.observe(sidebarRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const obs = new IntersectionObserver(
      entries => setFooterVisible(entries[0].isIntersecting),
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