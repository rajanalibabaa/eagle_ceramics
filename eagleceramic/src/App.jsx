import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const MainPopUp = React.lazy(()=> import ("./components/MainPopUp.jsx"))
const Navbar = React.lazy(()=> import ("./components/Navbar.jsx"))
const HomePage = React.lazy(()=> import ("./pages/HomePage.jsx"))
const AboutUs = React.lazy(()=> import ("./pages/AboutUs.jsx"))
const ContactUs = React.lazy(()=> import ("./pages/ContactUs.jsx"))
const Services = React.lazy(()=> import ("./pages/Services.jsx"))
const ServicesGoldenEndlessCollection = React.lazy(()=> import ("./pages/ServicesContent/ServicesGoldenEndlessCollection.jsx"))

import Footer from './components/Footer.jsx'
import StatuarioCollection from "./pages/ServicesContent/StatuarioCollection.jsx";


const theme = createTheme({
  typography: {
    fontFamily: "Pacifico, cursive",
  },
});
function App() {

  return (
      <ThemeProvider theme={theme}>
      <Router>
        <Suspense>
          <MainPopUp/>
          <Navbar />
          <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs/>}/>
       <Route path="/services" element={<Services />}>
  <Route
    path="golden-endless-collection"
    element={<ServicesGoldenEndlessCollection />}
  />
  <Route path="statuario-collection" element={<StatuarioCollection />} />

</Route>

            </Routes>
                 <Footer/>

        </Suspense>
      </Router>
      </ThemeProvider>
 
  )
 
}

export default App
