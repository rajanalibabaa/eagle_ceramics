import React, { useMemo, useCallback } from "react";
import { Box, Typography, Avatar, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

// Memoized Testimonial Card component
const TestimonialCard = React.memo(({ item, isMobile }) => (
  <Box
    sx={{
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      p: isMobile ? 3 : 4,
      position: "relative",
      minHeight: isMobile ? "280px" : "320px",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: isMobile ? "translateY(-4px)" : "translateY(-8px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      },
    }}
  >
    {/* Role Badge */}
    <Typography
      variant="subtitle1"
      fontWeight="600"
      mb={2}
      sx={{
        textAlign: "center",
        color: "#d11f25",
        display: "inline-block",
        px: 2,
        py: 0.5,
        borderRadius: "20px",
        fontSize: isMobile ? "0.8rem" : "0.89rem",
      }}
    >
      {item.role}
    </Typography>

    {/* Testimonial Text */}
    <Typography
      color="text.secondary"
      mb={3}
      sx={{
        lineHeight: 1.7,
        fontSize: isMobile ? "0.9rem" : "1rem",
        flexGrow: 1,
      }}
    >
      "{item.text}"
    </Typography>

    {/* User Info */}
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
          border: "3px solid",
          borderColor: "rgba(209, 31, 37, 0.2)",
        }}
      />
      <Box>
        <Typography fontWeight="700" fontSize={isMobile ? "1rem" : "1.1rem"}>
          {item.author}
        </Typography>
        <Typography fontSize={isMobile ? 13 : 14} color="text.secondary">
          {item.role}
        </Typography>
      </Box>
    </Box>
  </Box>
));

TestimonialCard.displayName = 'TestimonialCard';

const Testimonials = () => {
  const swiperRef = React.useRef(null);
  const [isBeginning, setIsBeginning] = React.useState(true);
  const [isEnd, setIsEnd] = React.useState(false);
  
  const theme = useTheme();
  
  // Media queries for different devices
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // > 900px

  // Memoize the slide change handler
  const handleSlideChange = useCallback((swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  // Memoize the swiper initialization handler
  const handleSwiperInit = useCallback((swiper) => {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  }, []);

  // Memoize navigation handlers
  const handlePrevClick = useCallback(() => {
    if (!isBeginning && swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, [isBeginning]);

  const handleNextClick = useCallback(() => {
    if (!isEnd && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, [isEnd]);

  // Memoize swiper parameters
  const swiperParams = useMemo(() => ({
    modules: [Navigation, Pagination],
    pagination: { 
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: isMobile ? 2 : 3,
    },
    navigation: {
      prevEl: ".swiper-button-prev-custom",
      nextEl: ".swiper-button-next-custom",
    },
    spaceBetween: isMobile ? 16 : isTablet ? 20 : 30,
    slidesPerView: isMobile ? 1 : isTablet ? 2 : 3,
    speed: isMobile ? 300 : 400,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      600: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    onSwiper: handleSwiperInit,
    onSlideChange: handleSlideChange,
    style: { 
      padding: isMobile ? "15px 5px 40px" : "20px 10px 60px",
      margin: isMobile ? "0 8px" : "0 20px"
    },
    lazy: true,
    preloadImages: false,
    watchSlidesProgress: true,
    resistance: true,
    resistanceRatio: 0.85,
    touchStartPreventDefault: false,
    shortSwipes: isMobile,
    longSwipes: !isMobile,
    followFinger: true,
    grabCursor: true,
  }), [handleSwiperInit, handleSlideChange, isMobile, isTablet]);

  return (
    <Box sx={{ 
      py: isMobile ? 4 : isTablet ? 6 : 8,
      px: isMobile ? 2 : isTablet ? 3 : 4,
      maxWidth: "1400px", 
      mx: "auto", 
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Title with Top Navigation Arrows for Desktop/Tablet */}
      <Box sx={{ 
        position: "relative",
        mb: isMobile ? 4 : isTablet ? 5 : 6
      }}>
        <Typography
          variant={isMobile ? "h4" : isTablet ? "h3" : "h3"}
          fontWeight="bold"
          textAlign="center"
          color="black"
          sx={{
            fontSize: {
              xs: "1.75rem",
              sm: "2rem",
              md: "2.25rem",
              lg: "2.5rem",
            },
            px: isDesktop ? 8 : 0 // Add padding to make space for arrows
          }}
        >
          What Our Clients Say
        </Typography>

        {/* Top Navigation Buttons - Desktop/Tablet Only */}
        {!isMobile && (
          <Box sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            pointerEvents: "none", // Let clicks pass through to underlying elements
            zIndex: 1,
          }}>
            {/* Left Arrow */}
            <Box sx={{
              pointerEvents: "auto", // Re-enable clicks for the arrow
              ml: isTablet ? -4 : -6,
            }}>
              <IconButton
                sx={{
                  backgroundColor: isBeginning ? "grey.100" : "white",
                  color: isBeginning ? "grey.400" : "grey.800",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  width: isTablet ? 44 : 50,
                  height: isTablet ? 44 : 50,
                  "&:hover": {
                    backgroundColor: isBeginning ? "grey.100" : "black",
                    color: isBeginning ? "black" : "white",
                  },
                  cursor: isBeginning ? "not-allowed" : "pointer",
                }}
                onClick={handlePrevClick}
                disabled={isBeginning}
                aria-label="Previous testimonial"
              >
                <ChevronLeft fontSize={isTablet ? "medium" : "large"} />
              </IconButton>
            </Box>

            {/* Right Arrow */}
            <Box sx={{
              pointerEvents: "auto", // Re-enable clicks for the arrow
              mr: isTablet ? -4 : -6,
            }}>
              <IconButton
                sx={{
                  backgroundColor: isEnd ? "grey.100" : "white",
                  color: isEnd ? "grey.400" : "grey.800",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  width: isTablet ? 44 : 50,
                  height: isTablet ? 44 : 50,
                  "&:hover": {
                    backgroundColor: isEnd ? "grey.100" : "black",
                    color: isEnd ? "grey.400" : "white",
                  },
                  cursor: isEnd ? "not-allowed" : "pointer",
                }}
                onClick={handleNextClick}
                disabled={isEnd}
                aria-label="Next testimonial"
              >
                <ChevronRight fontSize={isTablet ? "medium" : "large"} />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Swiper Carousel */}
      <Swiper {...swiperParams}>
        {testimonials.map((item, index) => (
          <SwiperSlide key={`testimonial-${index}`}>
            <TestimonialCard item={item} isMobile={isMobile} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Mobile Navigation Buttons - Still at bottom for mobile */}
      {isMobile && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            mt: 3,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: isBeginning ? "grey.300" : "#d11f25",
              color: "white",
              "&:hover": { 
                backgroundColor: isBeginning ? "grey.300" : "#b0191e" 
              },
              cursor: isBeginning ? "not-allowed" : "pointer",
              width: 44,
              height: 44,
            }}
            onClick={handlePrevClick}
            disabled={isBeginning}
            aria-label="Previous testimonial (mobile)"
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
          
          <IconButton
            sx={{
              backgroundColor: isEnd ? "grey.300" : "#d11f25",
              color: "white",
              "&:hover": { 
                backgroundColor: isEnd ? "grey.300" : "#b0191e" 
              },
              cursor: isEnd ? "not-allowed" : "pointer",
              width: 44,
              height: 44,
            }}
            onClick={handleNextClick}
            disabled={isEnd}
            aria-label="Next testimonial (mobile)"
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        </Box>
      )}

      {isTablet && (
        <Box sx={{ 
          mt: 2, 
          display: 'flex', 
          justifyContent: 'center',
          '.swiper-pagination-bullet': {
            width: '10px',
            height: '10px',
            margin: '0 6px !important'
          }
        }} />
      )}
    </Box>
  );
};

export default React.memo(Testimonials);