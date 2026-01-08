import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import Fab from "@mui/material/Fab";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AboutPageContent from "./pages/ServicesContent/AboutPageContent/AboutPageContent.jsx";
import ContactPageFab from "./components/ContactPageFab.jsx";

import PageLoader from "./PageLoader.jsx";

const Navbar = React.lazy(() => import("./components/Navbar.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const TrustedChoise = React.lazy(() => import("./components/TrustedChoise.jsx"));
const WhyOurProducts = React.lazy(() => import("./components/WhyOurProducts.jsx"));
const Testimonials = React.lazy(() => import("./components/Testimonials.jsx"));
const OurClients = React.lazy(() => import("./components/OurClients.jsx"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.jsx"));
const ServicesLayout = React.lazy(() => import("./pages/ServicesContent/ServicesLayout.jsx"));
const CatalogPage = React.lazy(() => import("./pages/ServicesContent/CatalogPage.jsx"));

const Footer = React.lazy(() => import("./components/Footer.jsx"));

// Admin Components
const AdminLayout = React.lazy(() => import("./EagleCeramicAdmin/AdminLayout.jsx"));
const CreateProductPage = React.lazy(() => import("./EagleCeramicAdmin/ProductCatalogue/CreateProduct.jsx"));
const ProductAndSize = React.lazy(() => import("./EagleCeramicAdmin/CreateProduct/ProductAndSize.jsx"));
const AdminDashboard = React.lazy(() => import("./EagleCeramicAdmin/Dashboard/AdminDashboard.jsx"));
const TokenHandler = React.lazy(() => import("./EagleCeramicAdmin/TokenHandler.jsx"));

// Theme setup
const theme = createTheme({
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  palette: {
    primary: {
      main: "#c21f24",
    },
    secondary: {
      main: "#c21f24",
    },
  },
});

const colors = {
  primary: "#c21f24",
  secondary: "#c21f24",
};

// WhatsApp Button (always visible)
const WhatsAppButton = () => {
  const mobileNumber = "+918248638595";

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${mobileNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Fab
      onClick={handleWhatsAppClick}
      sx={{
        position: "fixed",
        bottom: { xs: 170, sm: 470, md: 370, lg: 200 },
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
      aria-label="Contact via WhatsApp"
    >
      <WhatsAppIcon sx={{ fontSize: { xs: 28, sm: 26, md: 30, lg: 32 } }} />
    </Fab>
  );
};

// Scroll button
const SmartScrollButton = () => {
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const isAtTop = scrollY <= 50;
      const isAtBottom = scrollY + windowHeight >= fullHeight - 50;

      if (isAtBottom) setScrollDirection("up");
      else if (isAtTop) setScrollDirection("down");
      else setScrollDirection("up");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollClick = () => {
    if (scrollDirection === "up") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <Fab
      onClick={handleScrollClick}
      size="medium"
      aria-label="Scroll button"
      sx={{
        position: "fixed",
        bottom: { xs: 25, sm: 50, md: 25 },
        right: { xs: 5, sm: 15, md: 25 },
        background: `#c21f24`,
        color: "#fff",
        "&:hover": {
          transform: "translateY(-4px)",
          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
        },
        transition: "all 0.3s ease",
        zIndex: 9999,
        width: { xs: 54, sm: 58, md: 52 },
        height: { xs: 54, sm: 58, md: 52 },
      }}
    >
      {scrollDirection === "up" ? (
        <KeyboardDoubleArrowUpIcon
          sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }}
        />
      ) : (
        <KeyboardDoubleArrowDownIcon
          sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }}
        />
      )}
    </Fab>
  );
};

function App() {
  // ✅ show message icon only for mobile and tablet (<=1024px)
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={
            <PageLoader />
          
          }

        >
          <Routes>
            <Route path="/admin" element={<TokenHandler />} />

            {/* Admin Routes with token */}
            <Route path="/admin/:token" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="new-product-sizes" element={<ProductAndSize />} />
<Route path="product-catalogue" element={<CreateProductPage />} />
            </Route>

            {/* Public Routes */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPageContent />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/trusted-choice" element={<TrustedChoise />} />
                  <Route path="/why-our-products" element={<WhyOurProducts />} />
                  <Route path="/our-clients" element={<OurClients />} />
                  <Route path="/testimonials" element={<Testimonials />} />

                  <Route path="/products" element={<ServicesLayout />}>
                    <Route index element={<CatalogPage />} />
                  </Route>

                  
             
                    
                </Routes>
                <Footer />
                {isMobileOrTablet && <ContactPageFab />}
              </>
            } />
          </Routes>
        </Suspense>
      </Router>

      <WhatsAppButton />
      <SmartScrollButton />
    </ThemeProvider>
  );
}

export default App;