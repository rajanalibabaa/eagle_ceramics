import React, { useRef, useState, useMemo, useCallback, memo } from 'react';
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import resident from '../assets/ResidentialBuilders.jpg';
import commercial from '../assets/comercialdevelopers.jpeg';
import architect from "../assets/Architects.jpg";
import contractor from "../assets/contractor.jpg";
import showroom from "../assets/showroom.jpg";
import hospital from "../assets/hospital.png";
import school from "../assets/school.jpeg";
import job from "../assets/job.jpg";
import manufacture from"../assets/manufacture.jpeg";
import hotel from "../assets/hotel.jpg";
import build from "../assets/CommercialBuildings.jpeg";
import mall from "../assets/malls.jpg";
import government from "../assets/government.jpg";
import flooring from "../assets/flooring.jpeg";

const clients = [
  { name: 'Residential Builders', image: resident },
  { name: 'Commercial Developers', image: commercial },
  { name: 'Architects & Designers', image: architect },
  { name: 'Contractors', image: contractor },
  { name: 'Showrooms & Retail', image: showroom },
  { name: 'Hospitals & Clinics', image: hospital },
  { name: 'Schools & Colleges', image: school },
  { name: 'IT Parks & Offices', image: job },
  { name: 'Manufacturing Units', image: manufacture },
  { name: 'Hotels & Restaurants', image: hotel },
];

const highlightedProjects = [
  { title: "Residential Complexes", image: hotel },
  { title: "Commercial Buildings", image: build },
  { title: "Malls & Multiplexes", image: mall },
  { title: "Government Projects", image: government },
  { title: "Industrial Flooring Works", image: flooring }
];

// --- Animation Variants ---
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerWrapper = { visible: { transition: { staggerChildren: 0.2 } } };

// === ClientSlide Component ===
const ClientSlide = memo(({ client, isActive }) => (
  <motion.div
    animate={{ scale: isActive ? 1.05 : 0.9, opacity: isActive ? 1 : 0.6 }}
    transition={{ duration: 0.4 }}
    style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '20px 0' }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Avatar
        src={client.image}
        sx={{ 
          width: 100, 
          height: 100, 
          border: "3px solid white", 
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
          mb: "-50px", 
          zIndex: 1 
        }}
        alt={client.name}
      />
      <Paper 
        elevation={3} 
        sx={{ 
          width: "90%", 
          textAlign: "center", 
          pt: "60px", 
          pb: 2, 
          px: 2, 
          minHeight: "140px", 
          borderRadius: "16px",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)"
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
          {client.name}
        </Typography>
      </Paper>
    </Box>
  </motion.div>
));
ClientSlide.displayName = 'ClientSlide';

const ProjectCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardVariants = { rest: {}, hover: {} };
  const imageVariants = { rest: { scale: 1 }, hover: { scale: 1.1 } };
  const overlayVariants = { rest: { opacity: 0, y: 20 }, hover: { opacity: 1, y: 0 } };

  return (
    <motion.div
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.4 }}
      style={{ 
        position: "relative", 
        width: "100%", 
        height: 280, 
        borderRadius: "20px", 
        overflow: "hidden", 
        cursor: "pointer" 
      }}
    >
      <motion.img
        variants={imageVariants}
        src={item.image}
        alt={item.title}
        style={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover", 
          filter: imageLoaded ? 'none' : 'blur(10px)', 
          transition: 'filter 0.3s ease-out' 
        }}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      <Box 
        sx={{ 
          position: "absolute", 
          inset: 0,  
          display: "flex", 
          alignItems: "flex-end", 
          justifyContent: "center", 
          color: "white", 
          p: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)"
        }}
      >
        <motion.div variants={overlayVariants}>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {item.title}
          </Typography>
        </motion.div>
      </Box>
    </motion.div>
  );
});
ProjectCard.displayName = 'ProjectCard';

// === Main OurClients Component ===
const OurClients = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback((swiper) => setActiveIndex(swiper.realIndex), []);

  const swiperConfig = useMemo(() => ({
    effect: "coverflow", 
    centeredSlides: true, 
    loop: true, 
    grabCursor: true,
    autoplay: { 
      delay: 2500, 
      disableOnInteraction: false, 
      pauseOnMouseEnter: true 
    },
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      600: { slidesPerView: 2, spaceBetween: 30 },
      900: { slidesPerView: 3, spaceBetween: 40 },
      1200: { slidesPerView: 3, spaceBetween: 50 },
    },
    coverflowEffect: { 
      rotate: 0, 
      stretch: 0, 
      depth: 100, 
      modifier: 2.5, 
      slideShadows: false 
    },
    onSlideChange: handleSlideChange,
    modules: [EffectCoverflow, Autoplay],
  }), [handleSlideChange]);
  
  const projectsGrid = useMemo(() => (
    <Box 
      sx={{ mt: 4 }} 
      component={motion.div} 
      variants={staggerWrapper} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: '-100px' }}
    >
      <Box sx={{ 
        display: { xs: 'flex', md: 'none' }, 
        overflowX: 'auto', 
        gap: 2, 
        py: 2, 
        px: { xs: 2, sm: 3 }, 
        '&::-webkit-scrollbar': { display: 'none' }, 
        scrollbarWidth: 'none' 
      }}>
        {highlightedProjects.map((item, i) => (
          <Box key={i} sx={{ width: '80%', flexShrink: 0 }} component={motion.div} variants={fadeUp}>
            <ProjectCard item={item} />
          </Box>
        ))}
      </Box>
      <Grid 
        container 
        spacing={4} 
        justifyContent="center" 
        sx={{ display: { xs: 'none', md: 'flex' } }}
      >
        {highlightedProjects.map((item, i) => (
          <Grid 
            item 
            xs={12} 
            sm={10} 
            md={6} 
            lg={4} 
            key={i} 
            display="flex" 
            justifyContent="center" 
            component={motion.div} 
            variants={fadeUp}
          >
            <ProjectCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  ), []);

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        textAlign: 'center', 
        py: { xs: 4, md: 6 }, 
        overflowX: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)'
      }}
      component={motion.div} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.1 }} 
      variants={fadeUp}
    >
      {useMemo(() => (
        <motion.div variants={fadeUp}>
           <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 900,
                          mb: 2,
                          background:"black",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                          lineHeight: 1.2,
                        }}
                      >
            Trusted by Leading Builders & Businesses
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4, 
              maxWidth: '750px', 
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.1rem' }
            }}
          >
            Over the past 35 years, we have supplied tiles and ceramic products to hundreds of construction and commercial projects.
          </Typography>
        </motion.div>
      ), [])}

      {useMemo(() => (
        <motion.div variants={fadeUp}>
          <Typography 
            variant="h4" 
            sx={{ 
              mt: 6, 
              mb: 2, 
              fontWeight: 600, 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              color: '#1e293b'
            }}
          >
            Our Clients Include
          </Typography>
        </motion.div>
      ), [])}
      
      <Box
        component={motion.div}
        variants={fadeUp}
        sx={{ 
          position: 'relative', 
          width: { xs: '100%', md: '90%' },
          mx: 'auto',
          py: 4
        }}
      >
        <Swiper {...swiperConfig} onSwiper={(swiper) => (swiperRef.current = swiper)}>
          {clients.map((client, index) => (
            <SwiperSlide key={client.name} style={{ width: '280px' }}>
              <ClientSlide client={client} isActive={index === activeIndex} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {useMemo(() => (
        <motion.div variants={fadeUp}>
          <Typography 
            variant="h4" 
            sx={{ 
              mt: 10, 
              mb: 4, 
              fontWeight: 'bold', 
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              color: '#1e293b'
            }}
          >
            Our Projects
          </Typography>
        </motion.div>
      ), [])}

      {projectsGrid}

    </Container>
  );
};

export default memo(OurClients);