import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  memo,
} from "react";
import { useTheme } from "@mui/material";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

/* --------------------  images  -------------------- */
import resident from "../assets/ResidentialBuilders.jpg";
import commercial from "../assets/comercialdevelopers.jpeg";
import architect from "../assets/Architects.jpg";
import contractor from "../assets/contractor.jpg";
import showroom from "../assets/showroom.jpg";
import hospital from "../assets/hospital.png";
import school from "../assets/school.jpeg";
import job from "../assets/job.jpg";
import manufacture from "../assets/manufacture.jpeg";
import hotel from "../assets/hotel.jpg";
import build from "../assets/CommercialBuildings.jpeg";
import mall from "../assets/malls.jpg";
import government from "../assets/government.jpg";
import flooring from "../assets/flooring.jpeg";

/* --------------------  data  -------------------- */
const clients = [
  { name: "Residential Builders", image: resident },
  { name: "Commercial Developers", image: commercial },
  { name: "Architects & Designers", image: architect },
  { name: "Contractors", image: contractor },
  { name: "Showrooms & Retail", image: showroom },
  { name: "Hospitals & Clinics", image: hospital },
  { name: "Schools & Colleges", image: school },
  { name: "IT Parks & Offices", image: job },
  { name: "Manufacturing Units", image: manufacture },
  { name: "Hotels & Restaurants", image: hotel },
];

const highlightedProjects = [
  { title: "Residential Complexes", image: hotel },
  { title: "Commercial Buildings", image: build },
  { title: "Malls & Multiplexes", image: mall },
  { title: "Government Projects", image: government },
  { title: "Industrial Flooring Works", image: flooring },
];

/* --------------------  framer variants  -------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};
const staggerWrapper = {
  visible: { transition: { staggerChildren: 0.2 } },
};

/* --------------------  helper components  -------------------- */
const ClientSlide = memo(({ client, isActive }) => (
  <motion.div
    animate={{ scale: isActive ? 1.05 : 0.9, opacity: isActive ? 1 : 0.6 }}
    transition={{ duration: 0.4 }}
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      padding: "20px 0",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Avatar
        src={client.image}
        alt={client.name}
        sx={{
          width: 100,
          height: 100,
          border: "3px solid white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          mb: "-50px",
          zIndex: 1,
        }}
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
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {client.name}
        </Typography>
      </Paper>
    </Box>
  </motion.div>
));
ClientSlide.displayName = "ClientSlide";

const ProjectCard = memo(({ item }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      component={motion.div}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.3 }}
      sx={{
        position: "relative",
        width: "100%",
        height: 280,
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        onLoad={() => setLoaded(true)}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: loaded ? "none" : "blur(8px)",
          transition: "filter .3s",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "white", textAlign: "center" }}
        >
          {item.title}
        </Typography>
      </Box>
    </Box>
  );
});
ProjectCard.displayName = "ProjectCard";

/* =====================  MAIN VIEW  ===================== */

const OurClients = () => {
  const theme = useTheme();

  /* ----------  Swiper (clients) ---------- */
  const [activeClientIdx, setActiveClientIdx] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback(
    (swiper) => setActiveClientIdx(swiper.realIndex),
    []
  );

  const swiperConfig = useMemo(
    () => ({
      effect: "coverflow",
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      speed: 800, // slower slide animation
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      mousewheel: {
        forceToAxis: true,
        sensitivity: 0.35, // require more wheel delta
        releaseOnEdges: true,
      },
      slidesPerView: "auto",
      spaceBetween: 20,
      breakpoints: {
        600: { slidesPerView: 2, spaceBetween: 30 },
        900: { slidesPerView: 3, spaceBetween: 40 },
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      },
      modules: [EffectCoverflow, Autoplay, Mousewheel],
      onSlideChange: handleSlideChange,
    }),
    [handleSlideChange]
  );

  /* ----------  Projects row (xs) ---------- */
  const rowRef = useRef(null);
  const [activeProjIdx, setActiveProjIdx] = useState(0);

  /* update dot on manual drag */
  const handleRowScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const gap = parseFloat(theme.spacing(2)); // 16
    const cardW = row.firstChild?.offsetWidth || 1;
    const idx = Math.round(row.scrollLeft / (cardW + gap));
    if (idx !== activeProjIdx) setActiveProjIdx(idx);
  }, [activeProjIdx, theme]);

  /* auto-advance the row, one card at a time, wrap to start */
  useEffect(() => {
    if (window.matchMedia("(min-width:600px)").matches) return; // xs only
    const int = setInterval(() => {
      const row = rowRef.current;
      if (!row) return;
      const gap = parseFloat(theme.spacing(2));
      const cardW = row.firstChild?.offsetWidth || 1;
      const maxScroll = row.scrollWidth - row.clientWidth;
      const next = row.scrollLeft + cardW + gap;
      row.scrollTo({
        left: next > maxScroll ? 0 : next,
        behavior: "smooth",
      });
    }, 5000); // slower interval
    return () => clearInterval(int);
  }, [theme]);

  /* ----------  memoised Projects JSX ---------- */
  const projectsSection = useMemo(
    () => (
      <Box
        component={motion.div}
        variants={staggerWrapper}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ mt: 4 }}
      >
        {/* mobile row */}
        <Box
          ref={rowRef}
          onScroll={handleRowScroll}
          sx={{
            display: { xs: "flex", md: "none" },
            overflowX: "auto",
            gap: 2,
            px: 2,
            py: 2,
            scrollSnapType: "x mandatory",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
          }}
        >
          {highlightedProjects.map((p, i) => (
            <Box
              key={i}
              sx={{
                width: "80%",
                flexShrink: 0,
                scrollSnapAlign: "center",
              }}
            >
              <ProjectCard item={p} />
            </Box>
          ))}
        </Box>

        {/* dots for mobile projects */}
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            mt: 2,
          }}
        >
          {highlightedProjects.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                mx: 0.75,
                background: i === activeProjIdx ? "#d11f25" : "#cbd5e0",
                transition: "background .3s",
              }}
            />
          ))}
        </Box>

        {/* desktop grid */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {highlightedProjects.map((p, i) => (
            <Grid
              key={i}
              item
              xs={12}
              sm={10}
              md={6}
              lg={4}
              display="flex"
              justifyContent="center"
              component={motion.div}
              variants={fadeUp}
            >
              <ProjectCard item={p} />
            </Grid>
          ))}
        </Grid>
      </Box>
    ),
    [activeProjIdx, handleRowScroll]
  );

  /* ---------------------  JSX --------------------- */
  return (
    <Container
      maxWidth={false}
      component={motion.div}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      sx={{
        textAlign: "center",
        py: { xs: 4, md: 6 },
        overflowX: "hidden",
        background: "linear-gradient(180deg,#fff 0%,#f8fafc 100%)",
      }}
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 2,
            background: "black",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          }}
        >
          Trusted by Leading Builders & Businesses
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 750,
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Over the past 35 years, we’ve supplied tiles and ceramic products to
          hundreds of construction and commercial projects.
        </Typography>
      </motion.div>

      {/* Clients title */}
      <motion.div variants={fadeUp}>
        <Typography
          variant="h4"
          sx={{
            mt: 6,
            mb: 2,
            fontWeight: 600,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            color: "#1e293b",
          }}
        >
          Our Clients Include
        </Typography>
      </motion.div>

      {/* Swiper */}
      <Box
        component={motion.div}
        variants={fadeUp}
        sx={{ width: { xs: "100%", md: "90%" }, mx: "auto", py: 4 }}
      >
        <Swiper {...swiperConfig} onSwiper={(sw) => (swiperRef.current = sw)}>
          {clients.map((c, i) => (
            <SwiperSlide key={c.name} style={{ width: 280 }}>
              <ClientSlide client={c} isActive={i === activeClientIdx} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* dots */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {clients.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                mx: 0.75,
                background: i === activeClientIdx ? "#d11f25" : "#cbd5e0",
                transition: "background .3s",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Projects title */}
      <motion.div variants={fadeUp}>
        <Typography
          variant="h4"
          sx={{
            mt: 10,
            mb: 4,
            fontWeight: 700,
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            color: "#1e293b",
          }}
        >
          Our Projects
        </Typography>
      </motion.div>

      {/* Projects section */}
      {projectsSection}
    </Container>
  );
};

export default memo(OurClients);
