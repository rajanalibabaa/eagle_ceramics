import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ServicesCollectionCard from '../../pages/ServicesContent/ServicesCollectionCard ';
import goldenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.jpg";
import goldenHover from "../../assets/EAGLE GOLDEN AdersonBlue.jpg";
import aliceMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey.jpg";
import aliceHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey2.jpg";
import bentonMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonMain.jpg";
import bentonHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonSub.jpg";
const EagleGoldenEndlessCollection = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{color:"#F87B1B", mb:4}} >
        Golden Endless Collection - Version 1
      </Typography>
      
      <ServicesCollectionCard
        mainImage={goldenMain}
        hoverImage={goldenHover}
        title="ADRESON BLUE"
        subtitle="Explore More"
      />
       <Typography variant="h4" component="h1" gutterBottom align="center" sx={{color:"#F87B1B", mt:15, mb:4}} >
        Golden Endless Collection - Version 2
      </Typography>
      
      <ServicesCollectionCard
        mainImage={aliceMain}
        hoverImage={aliceHover}
        title="ALICE GREY"
        subtitle="Explore More"
      />
       <Typography variant="h4" component="h1" gutterBottom align="center" sx={{color:"#F87B1B", mt:15, mb:4}} >
        Golden Endless Collection - Version 3
      </Typography>
      
      <ServicesCollectionCard
        mainImage={bentonMain}
        hoverImage={bentonHover}
        title="BENTON GREEN"
        subtitle="Explore More"
      />
    </Container>
  );
};

export default EagleGoldenEndlessCollection;