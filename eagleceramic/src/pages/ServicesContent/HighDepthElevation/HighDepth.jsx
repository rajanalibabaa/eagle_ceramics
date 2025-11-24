import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const ServicesCollectionCard = lazy(() =>
  import("../ServicesCollectionCard ")
);

import HighDepthV1 from "../HighDepthElevation/HighDepthV1";

const HighDepth = () => {
  return (
    <Container maxWidth="lg">
        <HighDepthV1/>
        </Container>
  )
}

export default HighDepth