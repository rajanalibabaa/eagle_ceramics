import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Lazy imports
const MainPopUp = React.lazy(() => import("./components/MainPopUp.jsx"));
const Navbar = React.lazy(() => import("./components/Navbar.jsx"));
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));
const AboutUs = React.lazy(() => import("./pages/AboutUs.jsx"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.jsx"));
const Services = React.lazy(() => import("./pages/Services.jsx"));
const ServicesLayout = React.lazy(() => import("./pages/ServicesContent/ServicesLayout.jsx"));
const EagleGoldenEndlessCollection = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollection.jsx"));
const EagleGoldenEndlessCollectionV0        = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV0"));
const EagleGoldenEndlessCollectionV1        = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV1"));
const EagleGoldenEndlessCollectionV2        = React.lazy(() => import("./pages/ServicesContent/EagleGoldenEndlessCollectionV2"));
const StatuarioCollection = React.lazy(() => import("./pages/ServicesContent/StatuarioCollection.jsx"));
const GlossyCollection = React.lazy(() => import("./pages/ServicesContent/GlossyCollection.jsx"));
import Footer from './components/Footer.jsx';

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
          <MainPopUp/>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs/>}/>
           <Route path="/services" element={<ServicesLayout />}>
              {/* /services → show your general Services page */}
              <Route index element={<Services />} />

              {/* golden endless collection and its versions */}
              <Route path="golden-endless-collection" element={<EagleGoldenEndlessCollection />} />
              <Route path="golden-endless-collection/v0" element={<EagleGoldenEndlessCollectionV0 />} />
              <Route path="golden-endless-collection/v1" element={<EagleGoldenEndlessCollectionV1 />} />
              <Route path="golden-endless-collection/v2" element={<EagleGoldenEndlessCollectionV2 />} />

              <Route path="statuario-collection" element={<StatuarioCollection />} />
              <Route path="glossy-collection"    element={<GlossyCollection />} />
            </Route>
          </Routes>
          <Footer/>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;