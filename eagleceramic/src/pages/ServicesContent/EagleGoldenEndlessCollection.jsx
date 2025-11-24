import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";


import EagleGoldenEndlessCollectionV0 from "./EagleGoldenEndlessCollectionV0";
import EagleGoldenEndlessCollectionV1 from "./EagleGoldenEndlessCollectionV1";
import EagleGoldenEndlessCollectionV2 from "./EagleGoldenEndlessCollectionV2";

const EagleGoldenEndlessCollection = memo(() => {

  


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

     

 <EagleGoldenEndlessCollectionV0/> 
<EagleGoldenEndlessCollectionV1/>
<EagleGoldenEndlessCollectionV2/>

     

    </Container>
  );
});

export default EagleGoldenEndlessCollection;