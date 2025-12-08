import React, { useMemo } from "react";

import Box from "@mui/material/Box";
  import Typography from "@mui/material/Typography";
  import Avatar from "@mui/material/Avatar";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import { useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    role: "Builder / Developer",
    text: "Eagle Ceramics has been our go-to supplier for all our residential projects. Their tile quality and timely delivery make our project planning smooth.",
    author: "ABC Builders",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    role: "Architect / Interior Designer",
    text: "The product range is extensive and meets both functional and aesthetic needs. Highly reliable for commercial and high-traffic projects.",
    author: "Design Craft Studio",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    role: "Commercial Client",
    text: "Great pricing, professional service, and consistent supply. We've used their tiles in our showrooms and office spaces for years.",
    author: "XYZ Enterprises",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    role: "Contractor",
    text: "Bulk orders delivered on time every single time. Their experience shows in the way they handle requirements.",
    author: "SK Constructions",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    role: "Homeowner",
    text: "Beautiful tiles that transformed our home. Excellent customer service and quality products!",
    author: "Sarah Johnson",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    role: "Project Manager",
    text: "Reliable supplier for our large-scale projects. Consistent quality across all deliveries.",
    author: "Urban Developers Ltd.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const TestimonialCard = React.memo(({ item, isMobile }) => (
  <Box
    sx={{
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      p: isMobile ? 3 : 4,
      minHeight: isMobile ? 280 : 320,
      display: "flex",
      flexDirection: "column",
      transition: "transform .3s, box-shadow .3s",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      },
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight={600}
      mb={2}
      sx={{
        textAlign: "center",
        color: "#d11f25",
        px: 2,
        py: 0.5,
        borderRadius: "20px",
        fontSize: isMobile ? "0.8rem" : "0.89rem",
      }}
    >
      {item.role}
    </Typography>

    <Typography
      color="text.secondary"
      mb={3}
      sx={{ lineHeight: 1.7, fontSize: isMobile ? "0.9rem" : "1rem", flexGrow: 1 }}
    >
      &ldquo;{item.text}&rdquo;
    </Typography>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 1.5 : 2,
        pt: 2,
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <Avatar
        src={item.img}
        sx={{
          width: isMobile ? 48 : 56,
          height: isMobile ? 48 : 56,
          border: "3px solid rgba(209,31,37,0.2)",
        }}
      />
      <Box>
        <Typography fontWeight={700} fontSize={isMobile ? "1rem" : "1.1rem"}>
          {item.author}
        </Typography>
        <Typography fontSize={isMobile ? 13 : 14} color="text.secondary">
          {item.role}
        </Typography>
      </Box>
    </Box>
  </Box>
));
TestimonialCard.displayName = "TestimonialCard";

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const swiperParams = useMemo(
    () => ({
      modules: [Pagination, Mousewheel],
      grabCursor: true,
      mousewheel: { forceToAxis: true, sensitivity: 0.4 },
      pagination: {
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: isMobile ? 2 : 3,
      },
      spaceBetween: isMobile ? 16 : isTablet ? 20 : 30,
      slidesPerView: isMobile ? 1 : isTablet ? 2 : 3,
      style: { padding: isMobile ? "15px 5px 40px" : "20px 10px 60px" },
    }),
    [isMobile, isTablet]
  );

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        maxWidth: 1400,
        mx: "auto",

        // ⭐ SWIPER DOT COLOR OVERRIDE
        "& .swiper-pagination-bullet": {
          backgroundColor: "#c41f25",
          opacity: 0.4,
        },
        "& .swiper-pagination-bullet-active": {
          backgroundColor: "#c41f25",
          opacity: 1,
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 900,
          mb: 2,
          background: "black",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
          lineHeight: 1.2,
          textAlign: "center",
        }}
      >
        What Our Clients Say
      </Typography>

      <Swiper {...swiperParams}>
        {testimonials.map((item, i) => (
          <SwiperSlide key={i}>
            <TestimonialCard item={item} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default React.memo(Testimonials);
