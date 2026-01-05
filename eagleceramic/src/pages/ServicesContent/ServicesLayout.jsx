import  Box  from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import ServiceSideBar from './ServiceSideBar';
// import catalogPage from './catalogPage';

export default function ServicesLayout() {
  return (
    <Box sx={{  }}>
      <Box>
      <ServiceSideBar />
      </Box>
      {/* <Box sx={{ flexGrow: 1, p: 2 }}>
        <Outlet/>
      </Box> */}
    </Box>
  );
}
