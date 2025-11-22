import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ServicesCollectionCard = lazy(() =>
  import("../ServicesContent/ServicesCollectionCard ")
);

import goldenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.jpg";
import goldenHover from "../../assets/EAGLE GOLDEN AdersonBlue.jpg";
import aliceMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey.jpg";
import aliceHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION AliceGrey2.jpg";
import bentonMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonMain.jpg";
import bentonHover from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION BentonSub.jpg";
import dalbyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION DalbyMain.jpg";
import dalbysub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION Dalbysub.jpg";
import egyptoaquaMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION EGYPTOAQUAMain.jpg";
import egyptoauqaSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION EgyptoAquasub.jpg";
import emperiorgreenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION EmperiogreenMain.jpg";
import emperiorgreenSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION Emperiorgreensub.jpg";
import evablueMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION EvaBlueMain.jpg";
import evablueSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION EvaBluesub.jpg";
import flockMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION FlockMain.jpg";
import flockSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION Flocksub.jpg";
import fosterGreenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION ForsterGreenMain.jpg";
import fosterGreenSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION FosterGreenSub.jpg";
import glamBlueMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION GlamBlueMain.jpg";
import glamBlueSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION GlamBluesub.jpg";
import goldWaveMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION GoldWaveMain.jpg";
import goldWaveSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION GoldWavesub.jpg";
import harbourgreyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION HarbourGreyMain.jpg";
import harbourgreySub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION HarbourGreysub.jpg";
import jetcofinoMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION JetCofinoMain.jpg";
import jetcofinoSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION JetCofinoSub.jpg";
import KerobaBlueMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION KerobaBlueMain.jpg";
import KerobaBlueSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION KerobaBluesub.jpg";
import LoxtonMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION LoxtonMain.jpg";
import LoxtonSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION LoxtonSub.jpg";
import NewtonGreyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION NewtonGreyMain.jpg";
import NewtonGreySub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION NewtonGreySub.jpg";
import nohatGreenMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION NohatGreenMain.jpg";
import nohatGreenSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION NohatGreensub.jpg";
import qotaBlackMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION QotaBlackMain.jpg";
import qotaBlackSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION QotaBlacksub.jpg";
import recardoSkyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION RecardoSkyMain.jpg";
import recardoSkySub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION RecardoSkysub.jpg";
import roftGoldGreyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION RoftGoldGreyMain.jpg";
import roftGoldGreySub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION RoftGoldGreysub.jpg";
import SconeYellowMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION SconeYellowMain.jpg";
import SconeYellowSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION SconeYellowSub.jpg";
import ShineSkyMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION ShineSkyMain.jpg";
import ShineSkySub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION ShineSkySub.jpg";
import WintoBlueMain from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION WintoBlueMain.jpg";
import WintoBlueSub from "../../assets/EAGLE GOLDEN ENDLESS COLLECTION WintoBluesub.jpg";

import pdf from "../../assets/pdf/EAGLE GOLDEN ENDLESS COLLECTION 600X1200MM.pdf";


const EagleGoldenEndlessCollectionV0 = () => {
   const [openPdf, setOpenPdf] = useState(false);
    const [currentPdf, setCurrentPdf] = useState("");
  
    const handleOpenPdf = useCallback((pdfFile) => {
      setCurrentPdf(pdfFile);
      setOpenPdf(true);
    }, []);
  
    const handleClosePdf = useCallback(() => {
      setOpenPdf(false);
      setCurrentPdf("");
    }, []);
    const goldenCollection = [
        { main: goldenMain, hover: goldenHover, title: "ADRESON BLUE" },
        { main: aliceMain, hover: aliceHover, title: "ALICE GREY" },
        { main: bentonMain, hover: bentonHover, title: "BENTON GREEN" },
        { main: dalbyMain, hover: dalbysub, title: "DALBY BLUE" },
        { main: egyptoaquaMain, hover: egyptoauqaSub, title: "EGYPTO AQUA" },
        { main: emperiorgreenMain, hover: emperiorgreenSub, title: "EMPERIO GREEN" },
        { main: evablueMain, hover: evablueSub, title: "EVA BLUE" },
        { main: flockMain, hover: flockSub, title: "FLOCK" },
        { main: fosterGreenMain, hover: fosterGreenSub, title: "FORSTER GREEN" },
        { main: glamBlueMain, hover: glamBlueSub, title: "GLAM BLUE" },
        { main: goldWaveMain, hover: goldWaveSub, title: "GOLD WAVE" },
        { main: harbourgreyMain, hover: harbourgreySub, title: "HARBOUR GREY" },
        { main: jetcofinoMain, hover: jetcofinoSub, title: "JETCO FINO" },
        { main: KerobaBlueMain, hover: KerobaBlueSub, title: "KEROBA BLUE" },
        { main: LoxtonMain, hover: LoxtonSub, title: "LOXTON" },
        { main: NewtonGreyMain, hover: NewtonGreySub, title: "NEWTON GREY" },
        { main: nohatGreenMain, hover: nohatGreenSub, title: "NOHAT GREEN" },
        { main: qotaBlackMain, hover: qotaBlackSub, title: "QOTA BLACK" },
        { main: recardoSkyMain, hover: recardoSkySub, title: "RECARDO SKY" },
        { main: roftGoldGreyMain, hover: roftGoldGreySub, title: "ROFF GOLD GREY" },
        { main: SconeYellowMain, hover: SconeYellowSub, title: "SCONE YELLOW" },
        { main: ShineSkyMain, hover: ShineSkySub, title: "SHINE SKY" },
        { main: WintoBlueMain, hover: WintoBlueSub, title: "WINTO BLUE" },
      ];
      
  return (
     <Container maxWidth="lg" sx={{ py: 4 }}>
<Typography
  variant="h4"
  align="center"
  sx={{ 
    color: "#658C58", 
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: 1
  }}
>
  Golden Endless Collection - Version 1
</Typography>
   <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: 1,
  }}
>
  {goldenCollection.map((item, index) => (
    <Suspense
      key={index}
      fallback={<CircularProgress sx={{ display: "block", mx: "auto" }} />}
    >
      <ServicesCollectionCard
        mainImage={item.main}
        hoverImage={item.hover}
        title={item.title}
        subtitle="Explore More"
        pdfFile={pdf}
        onExploreClick={handleOpenPdf}
      />
    </Suspense>
  ))}
</Box>

      <Modal
        open={openPdf}
        onClose={handleClosePdf}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "90%",
            height: "95%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 1,
          }}
        >
          <IconButton
            onClick={handleClosePdf}
            sx={{
              position: "absolute",
              right: -8,
              top: -13,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {openPdf && (
            <iframe
              src={currentPdf}
              width="100%"
              height="100%"
              style={{ border: "none", borderRadius: 8 }}
              title="PDF Viewer"
              loading="lazy"
            />
          )}
        </Box>
      </Modal>

    </Container>
  )
}

export default EagleGoldenEndlessCollectionV0