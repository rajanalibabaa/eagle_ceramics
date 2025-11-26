import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ElevationTiles300x450 from "./pages/ServicesContent/ElevationTiles/ElevationTiles300x450.jsx";

const MainPopUp = React.lazy(() => import("./components/MainPopUp.jsx"));
const Navbar = React.lazy(() => import("./components/Navbar.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const AboutUs = React.lazy(() => import("./pages/AboutUs.jsx"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.jsx"));
const ServicesLayout = React.lazy(() => import("./pages/ServicesContent/ServicesLayout.jsx"));
const Walltiles = React.lazy(() => import("./pages/ServicesContent/WallTiles/Walltiles.jsx"));
const EagleGoldenEndlessCollection = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollection.jsx"));
const EagleGoldenEndlessCollectionV0 = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV0"));
const EagleGoldenEndlessCollectionV1 = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV1"));
const EagleGoldenEndlessCollectionV2 = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV2"));
const PunchSeriesCollection = React.lazy(() => import("./pages/ServicesContent/PunchSeriesCollection.jsx"));
const PunchSeriesCollectionV1 = React.lazy(() => import("./pages/ServicesContent/PunchSeriesCollectionV1.jsx"));
const PunchSeriesCollectionV2 = React.lazy(() => import("./pages/ServicesContent/PunchSeriesCollectionV2.jsx"));
const StatuarioCollection = React.lazy(() => import("./pages/ServicesContent/StatuarioCollection.jsx"));
const GlossyCollection = React.lazy(() => import("./pages/ServicesContent/GlossyCollection.jsx"));
const MattCarvingEndlessCollection = React.lazy(() => import("./pages/ServicesContent/MattCarvingEndlessCollection.jsx"));
const SnpCollection = React.lazy(() => import("./pages/ServicesContent/SnpCollection.jsx"));
const ThreeDimensionCollection = React.lazy(() => import("./pages/ServicesContent/ThreeDimensionCollection.jsx"));
const DoubleChargeCollection = React.lazy(() => import("./pages/ServicesContent/DoubleChargeCollection.jsx"));
const MattCarvingCollection = React.lazy(() => import("./pages/ServicesContent/MattCarvingCollection.jsx"));
const HighDepth = React.lazy(() => import("./pages/ServicesContent/HighDepthElevation/HighDepth.jsx"));
const HighDepthV1 = React.lazy(() => import("./pages/ServicesContent/HighDepthElevation/HighDepthV1.jsx"));
const HighDepthV2 = React.lazy(() => import("./pages/ServicesContent/HighDepthElevation/HighDepthV2.jsx"));
const HighDepthV3 = React.lazy(() => import("./pages/ServicesContent/HighDepthElevation/HighDepthV3.jsx"));
const MoroccanCollection = React.lazy(() => import("./pages/ServicesContent/MoroccanCollection.jsx"));
const PlainCollection = React.lazy(() => import("./pages/ServicesContent/PlainCollection.jsx"));
const SpecialCollection = React.lazy(() => import("./pages/ServicesContent/SpecialCollection.jsx"));
const StepRiserCollection = React.lazy(() => import("./pages/ServicesContent/StepRiserCollection.jsx"));
const Footer = React.lazy(() => import("./components/Footer.jsx"));

const theme = createTheme({
  typography: {
    fontFamily: "Pacifico, cursive",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <MainPopUp />
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/services" element={<ServicesLayout />}>
              <Route index element={<Walltiles />} />
              <Route path="elevation-tiles-300x450" element={<ElevationTiles300x450/>} />

              {/* golden endless collection and its versions */}
              <Route path="golden-endless-collection" element={<EagleGoldenEndlessCollection />} />
              <Route path="golden-endless-collection/v0" element={<EagleGoldenEndlessCollectionV0 />} />
              <Route path="golden-endless-collection/v1" element={<EagleGoldenEndlessCollectionV1 />} />
              <Route path="golden-endless-collection/v2" element={<EagleGoldenEndlessCollectionV2 />} />

              {/* Punch Series Collection and its versions */}
              <Route path="punch-series-collection" element={<PunchSeriesCollection />} />
              <Route path="punch-series-collection/v1" element={<PunchSeriesCollectionV1 />} />
              <Route path="punch-series-collection/v2" element={<PunchSeriesCollectionV2 />} />
              
              <Route path="statuario-collection" element={<StatuarioCollection />} />
              <Route path="glossy-collection" element={<GlossyCollection />} />
              <Route path="matt-carving-endless-collection" element={<MattCarvingEndlessCollection />} />
              <Route path="snp-collection" element={<SnpCollection />} />
              <Route path="three-dimension-collection" element={<ThreeDimensionCollection />} />
              <Route path="double-charge-collection" element={<DoubleChargeCollection />} />
              <Route path="matt-carving-collection" element={<MattCarvingCollection />} />

              <Route index element={<HighDepth/>} />
                  <Route path="high-depth" element={<HighDepth />} />
                   <Route path="high-depth/v0" element={<HighDepthV1 />} />
                   <Route path="high-depth/v1" element={<HighDepthV2 />} />
                   <Route path="high-depth/v2" element={<HighDepthV3 />} />


              <Route path="moroccan-collection" element={<MoroccanCollection />} />
              <Route path="plain-collection" element={<PlainCollection />} />
              <Route path="special-collection" element={<SpecialCollection />} />
              <Route path="step-riser-collection" element={<StepRiserCollection />} />

            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;