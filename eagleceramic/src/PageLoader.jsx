// import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
// import { styled, keyframes } from "@mui/system";
// import logo from "./assets/eagle_ceramics_logo.jpg";
// import video1 from "./assets/Homepageloading.mp4";

// /* Keyframe Animations */
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const pulse = keyframes`
//   0%, 100% {
//     transform: scale(1);
//   }
//   50% {
//     transform: scale(1.05);
//   }
// `;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// /* Styled Components */
// const LoaderContainer = styled(Box)({
//   position: "fixed",
//   top: 0,
//   left: 0,
//   width: "100vw",
//   height: "100vh",
//   overflow: "hidden",
//   zIndex: 9999,
// });

// const BackgroundVideo = styled("video")({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   minWidth: "100%",
//   minHeight: "100%",
//   width: "auto",
//   height: "auto",
//   objectFit: "cover",
// });

// const Overlay = styled(Box)({
//   position: "absolute",
//   top: 0,
//   left: 0,
//   width: "100%",
//   height: "100%",
//   background: "linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
//   backdropFilter: "blur(2px)",
// });

// const Content = styled(Box)({
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   gap: 24,
//   zIndex: 2,
// });

// const Logo = styled("img")(({ theme }) => ({
//   width: 280,
//   maxWidth: "80vw",
//   height: "auto",
//   borderRadius: 12,
//   boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
//   animation: `${fadeIn} 1s ease-out, ${pulse} 3s ease-in-out infinite`,
//   [theme.breakpoints.down("sm")]: {
//     width: 200,
//   },
// }));

// const LoaderWrapper = styled(Box)({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   gap: 16,
//   animation: `${fadeIn} 1s ease-out 0.3s both`,
// });

// const CustomLoader = styled(Box)({
//   position: "relative",
//   width: 60,
//   height: 60,
// });

// const OuterRing = styled(Box)({
//   position: "absolute",
//   width: "100%",
//   height: "100%",
//   border: "3px solid rgba(255,255,255,0.2)",
//   borderTop: "3px solid #ff0000",
//   borderRadius: "50%",
//   animation: `${rotate} 1s linear infinite`,
// });

// const InnerRing = styled(Box)({
//   position: "absolute",
//   top: 8,
//   left: 8,
//   width: "calc(100% - 16px)",
//   height: "calc(100% - 16px)",
//   border: "3px solid rgba(255,255,255,0.2)",
//   borderBottom: "3px solid #ffffff",
//   borderRadius: "50%",
//   animation: `${rotate} 0.8s linear infinite reverse`,
// });

// const LoadingText = styled(Typography)({
//   color: "#ffffff",
//   fontSize: 14,
//   fontWeight: 500,
//   letterSpacing: 3,
//   textTransform: "uppercase",
//   opacity: 0.9,
// });

// /* Component */
// const PageLoader = () => {
//   return (
//     <LoaderContainer>
//       {/* Full Screen Background Video */}
//       <BackgroundVideo
//         src={video1}
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Gradient Overlay */}
//       {/* <Overlay /> */}

//       {/* Centered Content */}
//       <Content>
//         {/* Logo */}
//         <Logo src={logo} alt="Eagle Ceramics Logo" />

//         {/* Modern Loader */}
//         <LoaderWrapper>
//           <CustomLoader>
//             <OuterRing />
//             <InnerRing />
//           </CustomLoader>
//           {/* <LoadingText>Loading...</LoadingText> */}
//         </LoaderWrapper>
//       </Content>
//     </LoaderContainer>
//   );
// };

// export default PageLoader;


import { Box, CircularProgress, Typography, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import logo from "./assets/eagle_ceramics_logo.jpg";
import video1 from "./assets/Homepageloading.mp4";

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.02); opacity: 0.9; }
`;

const PageLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* Background Video */}
      <Box
  component="video"
  src={video1}
  autoPlay
  loop
  muted
  playsInline
  sx={{
    width: "100%",
    maxWidth: { xs: "100%", md: "600px" },
    height: "auto",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    display: "block",
    margin: "0 auto",
    marginLeft:{xs:'auto',md:63},

    // Optional fine tuning for desktop
    position: "relative",
    top: { md: 0 },
    left: { md: 0 },
  }}
/>


      {/* Overlay */}
      {/* <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(3px)",
        }}
      /> */}

      {/* Centered Content */}
      <Fade in timeout={1000}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Eagle Ceramics Logo"
            sx={{
              width: { xs: 200, md: 280 },
              maxWidth: "80vw",
              borderRadius: 2,
              mt: { xs: 0, md: 14 },
            //   boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          />

          {/* Modern Spinner */}
          <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
            <CircularProgress
              size={50}
              thickness={2}
              sx={{ color: "rgba(255,255,255,0.3)" }}
            />
            <CircularProgress
              size={50}
              thickness={2}
              sx={{
                color: "#ff0000",
                position: "absolute",
                left: 0,
                animationDuration: "1.5s",
              }}
            />
          </Box>

          {/* Loading Text */}
          {/* <Typography
            sx={{
              color: "white",
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            Loading...
          </Typography> */}
        </Box>
      </Fade>
    </Box>
  );
};

export default PageLoader;