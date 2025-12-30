import React from 'react'
import Fab from '@mui/material/Fab'
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';

const ContactPageFab = () => {
    const navigate = useNavigate();

  return (
    <Fab
        onClick={() => navigate('/contact')}
      sx={{
        position: "fixed",
        bottom: { xs: 100, sm: 120, md: 140 },
        right: { xs: 4, sm: 20, md: 25 },
        backgroundColor: "#25D366",
        color: "#fff",
        width: { xs: 58, sm: 55, md: 55, lg: 60 },
        height: { xs: 58, sm: 55, md: 55, lg: 60 },
        zIndex: 9999,
        "&:hover": {
          backgroundColor: "#1ebe5d",
          transform: "scale(1.1)",
        },
        transition: "all 0.3s ease",
      }}
      aria-label="Contact via Message"
    >
      <MessageIcon sx={{ fontSize: { xs: 28, sm: 26, md: 30, lg: 32 } }} />
    </Fab>
  )
}

export default ContactPageFab
