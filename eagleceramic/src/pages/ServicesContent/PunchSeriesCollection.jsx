// import React from 'react'

// const PunchSeriesCollection = () => {
//   return (
//     <div>PunchSeriesCollection</div>
//   )
// }

// export default PunchSeriesCollection

import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const ServicesCollectionCard = lazy(() =>
    import("./ServicesCollectionCard ")
);

import PunchSeriesCollectionV1 from "./PunchSeriesCollectionV1";
import PunchSeriesCollectionV2 from "./PunchSeriesCollectionV2";

const PunchSeriesCollection = memo(() => {




    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>



            <PunchSeriesCollectionV1 />
            <PunchSeriesCollectionV2 />


        </Container>
    );
});

export default PunchSeriesCollection;