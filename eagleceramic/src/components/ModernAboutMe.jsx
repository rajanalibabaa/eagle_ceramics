import React from 'react';
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Replace with your image import
import profileImage from '../assets/profile.png'; // ← Update path

// Styled Components
const AboutWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
//   background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  overflow: 'hidden',
}));

const SplitContainer = styled(Box)(({ theme, isMobile }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '1600px',
  borderRadius: '32px',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  background: '#fff',
  flexDirection: isMobile ? 'column' : 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const ImageSection = styled(motion.div)(({ theme, isMobile }) => ({
  position: 'relative',
  width: isMobile ? '100%' : '50%',
  height: isMobile ? '300px' : '500px',
  backgroundImage: `url(${profileImage})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: theme.spacing(3),
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
//     zIndex: 1,
//   },
}));

const ContentSection = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(3),
  background: 'transparent',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2),
  },
}));

const Title = styled(motion(Typography))({
  fontWeight: 800,
  fontSize: '3rem',
  lineHeight: 1.2,
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'left',
});

const Subtitle = styled(Typography)({
  fontWeight: 500,
  color: '#555',
  fontSize: '1.1rem',
  maxWidth: '600px',
});

const HighlightText = styled(Typography)({
  background: 'linear-gradient(45deg, #4caf50, #2196f3)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
  display: 'inline',
});

const FloatingBadge = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  right: '20px',
  background: 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(1, 2),
  borderRadius: '50px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  fontWeight: 600,
  fontSize: '0.85rem',
  color: '#333',
  zIndex: 2,
}));

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Main Component
const ModernAboutMe = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AboutWrapper>
      <Container maxWidth={false}>
        <SplitContainer isMobile={isMobile}>
          {/* Image Section */}
          <ImageSection
            isMobile={isMobile}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <FloatingBadge
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              👋 Hello There!
            </FloatingBadge>
          </ImageSection>

          {/* Content Section */}
          <ContentSection>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <Title variant="h1" >
                I’m Mr. Suresh M.N,
              </Title>
              <motion.div variants={itemVariants}>
                <Subtitle variant="h5">
                  {/* A passionate <HighlightText>Full-Stack Developer</HighlightText>{' '}
                  & <HighlightText>UI/UX Enthusiast</HighlightText> crafting digital
                  experiences that blend aesthetics with functionality. */}
                  
                </Subtitle>
              </motion.div>
              <motion.div variants={itemVariants}>
                {/* <Subtitle>
                  Based in San Francisco, I thrive on turning complex problems into
                  simple, beautiful, and intuitive designs. When I’m not coding, you’ll
                  find me hiking or brewing pour-over coffee.
                </Subtitle> */}
              </motion.div>
              <motion.div variants={itemVariants}>
                {/* <Subtitle>
                  Let’s build something <HighlightText>amazing</HighlightText> together.
                </Subtitle> */}
              </motion.div>
            </motion.div>
          </ContentSection>
        </SplitContainer>
      </Container>
    </AboutWrapper>
  );
};

export default ModernAboutMe;