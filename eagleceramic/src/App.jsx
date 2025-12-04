import React, { Suspense, useState, useEffect } from "react";
import "./App.css";
import { Fab } from "@mui/material";
import ScrollToTop from "./ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MessageIcon from "@mui/icons-material/Message";

import ElevationTiles300x450 from "./pages/ServicesContent/ElevationTiles/ElevationTiles300x450.jsx";
import ElevationTiles300x600 from "./pages/ServicesContent/ElevationTiles/ElevationTiles300x600.jsx";
import CoolRoofTiles9MM from "./pages/ServicesContent/CoolRoofTiles/CoolRoofTiles9MM.jsx";
import CoolRoofTiles10MM from "./pages/ServicesContent/CoolRoofTiles/CoolRoofTiles10MM.jsx";
import CoolRoofTiles600x600 from "./pages/ServicesContent/CoolRoofTiles/CoolRoofTiles600x600.jsx";
import KitchenSink from "./pages/ServicesContent/KitchenSink/KitchenSink.jsx";
import AboutPageContent from "./pages/ServicesContent/AboutPageContent/AboutPageContent.jsx";

const MainPopUp = React.lazy(() => import("./components/MainPopUp.jsx"));
const Navbar = React.lazy(() => import("./components/Navbar.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const TrustedChoise = React.lazy(() => import("./components/TrustedChoise.jsx"));
const WhyOurProducts = React.lazy(() => import("./components/WhyOurProducts.jsx"));
const Testimonials = React.lazy(() => import("./components/Testimonials.jsx"));
const OurClients = React.lazy(() => import("./components/OurClients.jsx"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.jsx"));
const ServicesLayout = React.lazy(() => import("./pages/ServicesContent/ServicesLayout.jsx"));
const Walltiles = React.lazy(() => import("./pages/ServicesContent/WallTiles/Walltiles.jsx"));
const DoubleCharge = React.lazy(() =>
  import("./pages/ServicesContent/FloorTiles/600X600DC/DoubleCharge.jsx")
);
const GlossyCollection = React.lazy(() =>
  import("./pages/ServicesContent/FloorTiles/600X1200/GlossyCollection.jsx")
);
const MattCollection = React.lazy(() =>
  import("./pages/ServicesContent/FloorTiles/600X1200/MattCollection.jsx")
);
const ParkingTiles = React.lazy(() =>
  import("./pages/ServicesContent/ParkingTiles/Collection1.jsx")
);
const ParkingTilesCollection1 = React.lazy(() =>
  import("./pages/ServicesContent/ParkingTiles/Collection1.jsx")
);
const ParkingTilesCollection2 = React.lazy(() =>
  import("./pages/ServicesContent/ParkingTiles/Collection2.jsx")
);
const StatuarioCollection = React.lazy(() =>
  import("./pages/ServicesContent/StatuarioCollection.jsx")
);
const MattCarvingEndlessCollection = React.lazy(() =>
  import("./pages/ServicesContent/MattCarvingEndlessCollection.jsx")
);
const SnpCollection = React.lazy(() =>
  import("./pages/ServicesContent/SnpCollection.jsx")
);
const ThreeDimensionCollection = React.lazy(() =>
  import("./pages/ServicesContent/ThreeDimensionCollection.jsx")
);
const DoubleChargeCollection = React.lazy(() =>
  import("./pages/ServicesContent/DoubleChargeCollection.jsx")
);
const MattCarvingCollection = React.lazy(() =>
  import("./pages/ServicesContent/MattCarvingCollection.jsx")
);
const MoroccanCollection = React.lazy(() =>
  import("./pages/ServicesContent/MoroccanCollection.jsx")
);
const PlainCollection = React.lazy(() =>
  import("./pages/ServicesContent/PlainCollection.jsx")
);
const SpecialCollection = React.lazy(() =>
  import("./pages/ServicesContent/SpecialCollection.jsx")
);
const StepRiserCollection = React.lazy(() =>
  import("./pages/ServicesContent/StepRiserCollection.jsx")
);
const Footer = React.lazy(() => import("./components/Footer.jsx"));

// Theme setup
const theme = createTheme({
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif",
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

const WhatsAppButton2 = () => {
  return (
    <Fab
      onClick={() => {
        window.location.href = "/contact";
        window.scrollTo(0, 0);
      }}
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
        <KeyboardDoubleArrowUpIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
      ) : (
        <KeyboardDoubleArrowDownIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
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
        <Suspense fallback={<div>Loading...</div>}>
          <MainPopUp />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPageContent />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/trusted-choice" element={<TrustedChoise />} />
            <Route path="/why-our-products" element={<WhyOurProducts />} />
            <Route path="/our-clients" element={<OurClients />} />
            <Route path="/testimonials" element={<Testimonials />} />

            <Route path="/services" element={<ServicesLayout />}>
              <Route index element={<Walltiles />} />
              <Route path="walltiles" element={<Walltiles />} />
              <Route path="elevation-tiles-300x450" element={<ElevationTiles300x450 />} />
              <Route path="elevation-tiles-300x600" element={<ElevationTiles300x600 />} />
              <Route path="cool-roof-tiles-9mm" element={<CoolRoofTiles9MM />} />
              <Route path="cool-roof-tiles-10mm" element={<CoolRoofTiles10MM />} />
              <Route path="cool-roof-tiles-600x600" element={<CoolRoofTiles600x600 />} />
              <Route path="kitchen-sink" element={<KitchenSink />} />

              {/* Floor Tiles */}
              <Route path="floortiles">
                <Route path="600x1200">
                  <Route index element={<GlossyCollection />} />
                  <Route path="glossy" element={<GlossyCollection />} />
                  <Route path="matt" element={<MattCollection />} />
                </Route>
                <Route path="600x600dc" element={<DoubleCharge />} />
              </Route>

              {/* Parking Tiles */}
              <Route path="parkingtiles" element={<ParkingTiles />} />
              <Route path="parkingtiles/collection1" element={<ParkingTilesCollection1 />} />
              <Route path="parkingtiles/collection2" element={<ParkingTilesCollection2 />} />

              <Route path="statuario-collection" element={<StatuarioCollection />} />
              <Route path="glossy-collection" element={<GlossyCollection />} />
              <Route path="matt-carving-endless-collection" element={<MattCarvingEndlessCollection />} />
              <Route path="snp-collection" element={<SnpCollection />} />
              <Route path="three-dimension-collection" element={<ThreeDimensionCollection />} />
              <Route path="double-charge-collection" element={<DoubleChargeCollection />} />
              <Route path="matt-carving-collection" element={<MattCarvingCollection />} />
              <Route path="moroccan-collection" element={<MoroccanCollection />} />
              <Route path="plain-collection" element={<PlainCollection />} />
              <Route path="special-collection" element={<SpecialCollection />} />
              <Route path="step-riser-collection" element={<StepRiserCollection />} />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </Router>

      <WhatsAppButton />

      {isMobileOrTablet && <WhatsAppButton2 />}

      <SmartScrollButton />
    </ThemeProvider>
  );
}

export default App;
