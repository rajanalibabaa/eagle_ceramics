import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import  Button from "@mui/material/Button";
import  Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import About from "../pages/AboutUs";
import Contact from "../pages/ContactUs";
import Services from "../pages/Services";
import logo from '../assets/eagle_ceramics_logo.jpg'
const fadeDown = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      sx={{
        backgroundColor: "#016b60",
        boxShadow: "none",
        py: 1.5,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <motion.div {...fadeDown}>
        <Toolbar
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 1.5, sm: 2 },
          }}
        >
          {/* LOGO */}
          <Box
            sx={{
              cursor:'pointer'
            }}
            onClick={() => navigate("/")}
           ><img src={logo} alt="logo" style={{maxWidth:'150px',maxHeight:'50px'}}/>
          </Box>
           

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/")}
            >
              HOME
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              onClick={()=> navigate("/about")}
            >
              ABOUT US
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/services")}
            >
              SERVICES
            </Button>
{/* 
            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/blog")}
            >
              BLOG
            </Button> */}

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
              onClick={() => navigate("/contact")}
            >
              CONTACT US
            </Button>
          </Box>

          {/* MOBILE MENU ICON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Toolbar>
      </motion.div>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 240,
            backgroundColor: "#016B61",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            <ListItemButton sx={{ py: 2 }} onClick={() => { navigate("/"); setOpen(false); }}>
  <Typography sx={{ fontWeight: 600 }}>HOME</Typography>
</ListItemButton>

<ListItemButton sx={{ py: 2 }} onClick={() => { navigate("/about"); setOpen(false); }}>
  <Typography sx={{ fontWeight: 600 }}>ABOUT US</Typography>
</ListItemButton>

<ListItemButton sx={{ py: 2 }} onClick={() => { navigate("/services"); setOpen(false); }}>
  <Typography sx={{ fontWeight: 600 }}>SERVICES</Typography>
</ListItemButton>

{/* <ListItemButton sx={{ py: 2 }} onClick={() => { navigate("/blog"); setOpen(false); }}>
  <Typography sx={{ fontWeight: 600 }}>BLOG</Typography>
</ListItemButton> */}

<ListItemButton sx={{ py: 2 }} onClick={() => { navigate("/contact"); setOpen(false); }}>
  <Typography sx={{ fontWeight: 600 }}>CONTACT US</Typography>
</ListItemButton>

          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default memo(Navbar);