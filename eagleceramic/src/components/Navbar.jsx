import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import logo from "../assets/EagleCeramicsLogo.png";

const fadeDown = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const Navbar = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <AppBar
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        py: 1.5,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        color: "#fff",
        backdropFilter: "blur(4px)",
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
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="logo"
              style={{ maxWidth: "150px", maxHeight: "50px" }}
            />
          </Box>

          {/* DESKTOP MENU */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
              color: "black",
            }}
          >
            <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => navigate("/")}>HOME</Button>
            <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => navigate("/about")}>ABOUT US</Button>
            <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => navigate("/services")}>PRODUCTS</Button>
            <Button color="inherit" sx={{ fontWeight: 600 }} onClick={() => navigate("/contact")}>CONTACT US</Button>
          </Box>

          {/* MOBILE HAMBURGER ICON */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "black" }}
            onClick={() => setOpenMenu(!openMenu)}
          >
            {openMenu ? (
              <CloseIcon sx={{ fontSize: 30 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 30 }} />
            )}
          </IconButton>
        </Toolbar>
      </motion.div>

      {/* MOBILE DROPDOWN MENU */}
      {openMenu && (
        <Box
          component={motion.div}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          sx={{
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            backgroundColor: "#ffffff36",
            px: 2,
            py: 2,
            color: "black",
          }}
        >
          <Typography sx={{ py: 1.5 }} onClick={() => { navigate("/"); setOpenMenu(false); }}>HOME</Typography>
          <Typography sx={{ py: 1.5 }} onClick={() => { navigate("/about"); setOpenMenu(false); }}>ABOUT US</Typography>
          <Typography sx={{ py: 1.5 }} onClick={() => { navigate("/services"); setOpenMenu(false); }}>PRODUCTS</Typography>
          <Typography sx={{ py: 1.5 }} onClick={() => { navigate("/contact"); setOpenMenu(false); }}>CONTACT US</Typography>
        </Box>
      )}
    </AppBar>
  );
};

export default memo(Navbar);
