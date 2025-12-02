import React, { useRef, useState, useMemo, useCallback, memo } from 'react';

// MUI Components
import {
  Container,
  Typography,
  Box,
  Avatar,
  Paper,
  IconButton,
  Grid
} from '@mui/material';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Framer Motion - Import only what you need
import { motion } from 'framer-motion';

// Swiper - Use dynamic import for production or keep static if necessary
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// === Client Images ===
// Consider using Next.js Image or similar for production
// For React, use dynamic imports or ensure proper image optimization
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

// === Highlighted Project Images ===
import build from "../assets/CommercialBuildings.jpeg";
import mall from "../assets/malls.jpg";
import government from "../assets/government.jpg";
import flooring from "../assets/flooring.jpeg";

// Memoize static data to prevent re-creation on every render
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
// Memoize animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerWrapper = {
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

// Create a memoized component for each slide to prevent unnecessary re-renders
const ClientSlide = memo(({ client, isActive, index }) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    transition={{ duration: 0.4 }}
    animate={{
      scale: isActive ? 1.1 : 0.9,
      opacity: isActive ? 1 : 0.6,
    }}
    style={{ height: '100%', display: 'flex', alignItems: 'center' }}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 3}}>
      <Avatar
        src={client.image}
        sx={{
          width: 100,
          height: 100,
          border: "3px solid white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "-50px",
          zIndex: 1,
        }}
        // Add alt text for accessibility and better performance
        alt={client.name}
      />

      <Paper
        elevation={3}
        sx={{
          width: "100%",
          textAlign: "center",
          pt: "70px",
          pb: 2,
          px: 2,
          height: "150px",
          borderRadius: "16px",
          transition: "0.3s",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {client.name}
        </Typography>
      </Paper>
    </Box>
  </motion.div>
));

ClientSlide.displayName = 'ClientSlide';

// Memoized Project Card component
const ProjectCard = memo(({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.3 }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "450px",
          height: 280,
          borderRadius: "20px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {/* Optimized Image with loading state */}
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            // Add blur-up effect for better UX
            filter: imageLoaded ? 'none' : 'blur(10px)',
            transition: 'filter 0.3s ease-out',
          }}
          loading="lazy" // Lazy load images
          onLoad={() => setImageLoaded(true)}
        />

        {/* OVERLAY TITLE - Only render if needed */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ pointerEvents: 'none' }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              textAlign: "center",
              px: 2,
            }}
          >
            {item.title}
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const OurClients = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // Memoize callbacks to prevent re-renders
  const handleSlidePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleSlideNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Memoize swiper configuration
  const swiperConfig = useMemo(() => ({
    spaceBetween: 40,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    effect: "coverflow",
    centeredSlides: true,
    loop: true,
    grabCursor: true,
    slidesPerView: 5,
    breakpoints: {
      320: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      900: { slidesPerView: 3 },
      1200: { slidesPerView: 3 },
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
      slideShadows: false,
    },
    onSlideChange: handleSlideChange,
    modules: [EffectCoverflow, Navigation, Autoplay],
  }), [handleSlideChange]);

  // Memoize the entire projects grid to prevent re-renders
  const projectsGrid = useMemo(() => (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 4 }}
      component={motion.div}
      variants={staggerWrapper}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }} // Adjust margin for earlier trigger
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
  ), []);

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        textAlign: 'center', 
        py: 6,
        overflow: 'hidden' // Prevent layout shifts
      }}
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Reduced trigger amount for performance
      variants={fadeUp}
    >

      {/* MAIN TITLE - Memoized section */}
      {useMemo(() => (
        <motion.div variants={fadeUp}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
            Trusted by Leading Builders & Businesses
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '750px', mx: 'auto' }}
          >
            Over the past 35 years, we have supplied tiles and ceramic products
            to hundreds of construction and commercial projects.
          </Typography>
        </motion.div>
      ), [])}

      {/* SUBTITLE */}
      {useMemo(() => (
        <motion.div variants={fadeUp}>
          <Typography variant="h4" sx={{ mt: 6, mb: 2, fontWeight: 600 }}>
            Our Clients Include
          </Typography>
        </motion.div>
      ), [])}

      {/* === SWIPER CAROUSEL === */}
      <Box
        component={motion.div}
        variants={fadeUp}
        sx={{ 
          position: 'relative', 
          px: { xs: 0, md: 1 }, 
          width: '80%', 
          mx: 'auto',
          // Prevent layout shifts
          minHeight: '380px'
        }}
      >
        <Swiper 
          {...swiperConfig}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {clients.map((client, index) => (
            <SwiperSlide 
              key={client.name} 
              style={{ 
                width: '280px', 
                height: '280px',
                // Improve paint performance
                willChange: 'transform'
              }}
            >
              <ClientSlide 
                client={client} 
                isActive={index === activeIndex} 
                index={index}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ARROWS - Memoized handlers */}
        <IconButton
          onClick={handleSlidePrev}
          sx={{
            position: 'absolute',
            left: { xs: 0, md: -20 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.7)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
          aria-label="Previous slide"
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleSlideNext}
          sx={{
            position: 'absolute',
            right: { xs: 0, md: -20 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.7)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.9)',
            }
          }}
          aria-label="Next slide"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* PROJECTS TITLE */}
      {useMemo(() => (
        <motion.div variants={fadeUp}>
          <Typography variant="h4" sx={{ mt: 10, fontWeight: 'bold', mb: 4 }}>
            Our Projects
          </Typography>
        </motion.div>
      ), [])}

      {projectsGrid}

    </Container>
  );
};

export default memo(OurClients);