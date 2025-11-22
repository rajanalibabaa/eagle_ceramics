import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const ServicesCollectionCard = lazy(() =>
  import("../ServicesContent/ServicesCollectionCard ")
);
import pdf from "../../assets/pdf/EAGLE GLOSSY ENDLESS-V2-COLLECTION_600X1200MM_compressed.pdf"

import dorefafino from "../../assets/V2DoregaFino.jpg";
import dorefafinoHover from "../../assets/V2DoregaFinoHover.jpg"
import eroscoco from "../../assets/V2ErosCoco.jpg";
import eroscocoHover from "../../assets/V2ErosCocoHover.jpg";
import fioritamid from "../../assets/V2FioritaMid.jpg";
import fioritamidHover from "../../assets/V2FioritaMidHover.jpg";
import fioroliv from "../../assets/V2Fioroliv.jpg";
import fiorolivHover from "../../assets/V2FiorolivHover.jpg";
import linergrey from "../../assets/V2LinerGrey.jpg";
import linergreyHover from "../../assets/V2LinerGreyHover.jpg";
import jemserbegie from "../../assets/V2Jemserbegie.jpg";
import jemserbegieHover from "../../assets/V2JemserbegieHover.jpg";
import moskidusk from "../../assets/V2Moskidusk.jpg";
import moskiduskHover from "../../assets/V2MoskiduskHover.jpg";
import natoobrown from "../../assets/V2Natoobrown.jpg";
import natoobrownHover from "../../assets/V2NatoobrownHover.jpg";
import omixbianco from "../../assets/V2Omixbianco.jpg";
import omixbiancoHover from "../../assets/V2OmixbiancoHover.jpg";
import omnitile from "../../assets/V2Omnitile.jpg";
import omnitileHover from "../../assets/V2OmnitileHover.jpg";
import pebllo from "../../assets/V2PeblloGrey.jpg";
import peblloHover from "../../assets/V2PeblloGreyHover.jpg";
import PeticaZuk from "../../assets/V2PeticaZuk.jpg";
import PeticaZukHover from "../../assets/V2PeticaZukHover.jpg";
import sentrom from "../../assets/V2Sentrom.jpg";
import sentromHover from "../../assets/V2SentromHover.jpg";
import sunvetgris from "../../assets/V2SunvetGris.jpg";
import sunvetgrisHover from "../../assets/V2SuvetGrisHover.jpg";
import tilflixgrey from "../../assets/V2TilflixGrey.jpg";
import tilflixgreyHover from "../../assets/V2TilflixGreyHover.jpg";
import tilvanagrey from "../../assets/V2TilvanaGrey.jpg";
import tilvanagreyHover from "../../assets/V2TilvanaGreyHover.jpg";
import vistarchoco from "../../assets/V2VistarChoco.jpg";
import vistarchocoHover from "../../assets/V2VistarChocoHover.jpg";
import vitoracoco from "../../assets/V2VitoraCoco.jpg";
import vitoracocoHover from "../../assets/V2VitoraCocoHover.jpg";
import walkerbianco from "../../assets/V2WalkerBianco.jpg";
import walkerbiancoHover from "../../assets/V2WalkerBiancoHover.jpg";
import zuranocrema from "../../assets/V2ZuranoCrema.jpg";
import zuranocremaHover from "../../assets/V2ZuranoCremaHover.jpg";
import nicolasash from "../../assets/V2NicolasAsh.jpg";
import nicolasashHover from "../../assets/V2NicolasAshHover.jpg";
import dubin from "../../assets/V2Dubin.jpg";
import dubinHover from "../../assets/V2DubinHover.jpg";
import cottonbrown from "../../assets/V2CottonBrown.jpg";
import cottonbrownHover from "../../assets/V2CottonBrownHover.jpg";
import eonvarde from "../../assets/V2Eonvarde.jpg";
import eonvardeHover from "../../assets/V2EonvardeHover.jpg";
import hitcongrey from "../../assets/V2HitconGrey.jpg";
import hitcongreyHover from "../../assets/V2HitconGreyHover.jpg";
import murfichoco from "../../assets/V2Murfichoco.jpg";
import murfichocoHover from "../../assets/V2MurgichocoHover.jpg";
import rigatowhite from "../../assets/V2RigatoWhite.jpg";
import rigatowhiteHover from "../../assets/V2RigatoWhiteHover.jpg";
import vegasdark from "../../assets/V2VegasDark.jpg";
import vegasdarkHover from "../../assets/V2VegasDarkHover.jpg";
import zabbitbrown from "../../assets/V2ZabbitBrown.jpg";
import zabbitbrownHover from "../../assets/V2ZabbitBrownHover.jpg";

const goldenCollection = [
    { main: dorefafino, hover: dorefafinoHover, title: "DOREGA FINO" },
    { main: eroscoco, hover: eroscocoHover, title: "EROS COCO" },
    { main: fioritamid, hover: fioritamidHover, title: "FIORITA MID" },
    { main: fioroliv, hover: fiorolivHover, title: "FIOR OLIV" },
    { main: linergrey, hover: linergreyHover, title: "LINER GREY" },
    { main: jemserbegie, hover: jemserbegieHover, title: "JEMSER BEGIE" },
    { main: moskidusk, hover: moskiduskHover, title: "MOSKI DUSK" },
    { main: natoobrown, hover: natoobrownHover, title: "NATOO BROWN" },
    { main: omixbianco, hover: omixbiancoHover, title: "OMIX BIANCO" },
    { main: omnitile, hover: omnitileHover, title: "OMNITILE" },
    { main: pebllo, hover: peblloHover, title: "PEBLLO GREY" },
    { main: PeticaZuk, hover: PeticaZukHover, title: "PETICA ZUK" },
    { main: sentrom, hover: sentromHover, title: "SENTROM" },
    { main: sunvetgris, hover: sunvetgrisHover, title: "SUNVET GRIS" },
    { main: tilflixgrey, hover: tilflixgreyHover, title: "TILFLIX GREY" },
    { main: tilvanagrey, hover: tilvanagreyHover, title: "TILVANA GREY" },
    { main: vistarchoco, hover: vistarchocoHover, title: "VISTAR CHOCO" },
    { main: vitoracoco, hover: vitoracocoHover, title: "VITORA COCO" },
    { main: walkerbianco, hover: walkerbiancoHover, title: "WALKER BIANCO" },
    { main: zuranocrema, hover: zuranocremaHover, title: "ZURANO CREMA" },
    { main: nicolasash, hover: nicolasashHover, title: "NICOLAS ASH" },
    { main: dubin, hover: dubinHover, title: "DUBIN" },
    { main: cottonbrown, hover: cottonbrownHover, title: "COTTON BROWN" },
    { main: eonvarde, hover: eonvardeHover, title: "EON VARDE" },
    { main: hitcongrey, hover: hitcongreyHover, title: "HITCON GREY" },
    { main: murfichoco, hover: murfichocoHover, title: "MURFI CHOCO" },
    { main: rigatowhite, hover: rigatowhiteHover, title: "RIGATO WHITE" },
    { main: vegasdark, hover: vegasdarkHover, title: "VEGAS DARK" },
    { main: zabbitbrown, hover: zabbitbrownHover, title: "ZABBIT BROWN" },
];
const EagleGoldenEndlessCollectionV2 = () => {
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
  }}      >
        Golden Endless Collection - Version 3
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

    </Container>  )
}

export default EagleGoldenEndlessCollectionV2