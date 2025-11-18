import React, { memo, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Drawer,
  List,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const fadeDown = {
  initial: { opacity: 0, y: -15 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      sx={{
        backgroundColor: "#016B61",
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
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Pacifico', cursive",
              fontSize: { xs: "22px", sm: "26px", md: "28px" },
              fontWeight: "bold",
              color: "white",
            }}
          >
            Eagle Ceramics
          </Typography>

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
            >
              HOME
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
            >
              ABOUT US
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
            >
              SERVICES
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
            >
              BLOG
            </Button>

            <Button
              color="inherit"
              sx={{ fontWeight: 600 }}
              component={motion.button}
              whileHover={{ scale: 1.04 }}
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
            <ListItemButton sx={{ py: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>HOME</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>ABOUT US</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>SERVICES</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>BLOG</Typography>
            </ListItemButton>

            <ListItemButton sx={{ py: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>CONTACT US</Typography>
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default memo(Navbar);
