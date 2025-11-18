import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const Navbar = React.lazy(()=> import ("./components/Navbar.jsx"))
const HomePage = React.lazy(()=> import ("./pages/HomePage.jsx"))
import { useState } from 'react'

import Footer from './components/Footer.jsx'

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
          <Navbar />
          <Routes>
        <Route path="/" element={<HomePage />} />
            </Routes>
                 <Footer/>

        </Suspense>
      </Router>
      </ThemeProvider>
 
  )
 
}

export default App
