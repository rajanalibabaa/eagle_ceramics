import React, { useState, useCallback, lazy, Suspense, memo } from "react";
import { Box, Container, Typography, Modal, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import aluregold from "../../assets/V1AlureGold.jpg";
import aluregoldHover from "../../assets/V1AlureGoldHover.jpg";
import argentabianco from "../../assets/V1ArgentaBianco.jpg";
import argentabiancoHover from "../../assets/V1ArgentaBiancoHover.jpg";
import armonia from "../../assets/V1Armonia.jpg";
import armoniaHover from "../../assets/V1ArmoniaHover.jpg";
import calacatta from "../../assets/V1CalacattaPacific.jpg";
import calacattaHover from "../../assets/V1CalacattaPacificHover.jpg";
import cremonamint from "../../assets/V1CremonaMint.jpg";
import cremonamintHover from "../../assets/V1CremonaMintHover.jpg";
import crisp from "../../assets/V1Crisp.jpg";
import crispHover from "../../assets/V1CrispHover.jpg";
import divcamust from "../../assets/V1DivcaMust.jpg";
import divcamustHover from "../../assets/V1DivcaMustHover.jpg";
import edenacrema from "../../assets/V1EdenaCrema.jpg";
import edenacremaHover from "../../assets/V1EdenaCremaHover.jpg";
import eloragrey from "../../assets/V1EloraGrey.jpg";
import eloragreyHover from "../../assets/V1EloraGreyHover.jpg";
import enigma from "../../assets/V1Enigma.jpg";
import enigmaHover from "../../assets/V1EnigmaHover.jpg";
import exoramist from "../../assets/V1Exoramist.jpg";
import exoramistHover from "../../assets/V1ExoramistHover.jpg";
import fluidriver from "../../assets/V1FluidRiver.jpg"
import fluidriverHover from "../../assets/V1FluidRiverHover.jpg"
import fontanachoco from "../../assets/V1FontanaChoco.jpg";
import fontanachocoHover from "../../assets/V1FontanaChocoHover.jpg";
import gigovalatter from "../../assets/V1GigovaLatte.jpg";
import gigovalatterHover from "../../assets/V1GigovaLatteHover.jpg";
import grimmoon from "../../assets/V1GrimMoon.jpg";
import grimmoonHover from "../../assets/V1GrimMoonHover.jpg";
import jenifogrey from "../../assets/V1JenifoGrey.jpg";
import jenifogreyHover from "../../assets/V1JenifoGreyHover.jpg";
import karvamoca from "../../assets/V1KarvaMoca.jpg";
import karvamocaHover from "../../assets/V1KarvaMocaHover.jpg";
import liner from "../../assets/V1Liner.jpg";
import linerHover from "../../assets/V1LinerHover.jpg";
import marvelnero from "../../assets/V1MarvelNero.jpg";
import marvelneroHover from "../../assets/V1MarvelNeroHover.jpg";
import morisgrey from "../../assets/V1MorisGrey.jpg";
import morisgreyHover from "../../assets/V1MorisGreyHover.jpg";
import midasbeige from "../../assets/V1MidasBeige.jpg";
import midasbeigeHover from "../../assets/V1MidasBeigeHover.jpg";
import modanacamel from "../../assets/V1ModanaCamel.jpg";
import modanacamelHover from "../../assets/V1ModanaCamelHover.jpg";
import moonwhite from "../../assets/V1MoonWhite.jpg";
import moonwhiteHover from "../../assets/V1MoonWhiteHover.jpg";
import nairobimocha from "../../assets/V1NairobiMocha.jpg";
import nairobimochaHover from "../../assets/V1NairobiMochaHover.jpg";
import oasianatural from "../../assets/V1OasiaNatural.jpg";
import oasianaturalHover from "../../assets/V1OasiaNaturalHover.jpg";
import orisiswhite from "../../assets/V1OrisisWhite.jpg";
import orisiswhiteHover from "../../assets/V1OrisisWhiteHover.jpg";
import orrasand from "../../assets/V1OrraSand.jpg";
import orrasandHover from "../../assets/V1OrraSandHover.jpg";
import pitona from "../../assets/V1Pitona.jpg";
import pitonaHover from "../../assets/V1PitonaHover.jpg";
import rivervete from "../../assets/V1RiverVete.jpg";
import riverveteHover from "../../assets/V1RiverVeteHover.jpg";
import rossatomord from "../../assets/V1RossatoMord.jpg";
import rossatomordHover from "../../assets/V1RossatoMordHover.jpg";
import sekolacrema from "../../assets/V1SekolaCrema.jpg";
import sekolacremaHover from "../../assets/V1SekolaCremaHover.jpg";
import serenegrey from "../../assets/V1SereneGrey.jpg";
import serenegreyHover from "../../assets/V1SereneGreyHover.jpg";
import sofitagris from "../../assets/V1SofitaGris.jpg";
import sofitagrisHover from "../../assets/V1SofitaGrisHover.jpg";
import taaj from "../../assets/V1Taaj.jpg";
import taajHover from "../../assets/V1TaajHover.jpg";
import tagasgrey from "../../assets/V1TagasGrey.jpg";
import tagasgqreyHover from "../../assets/V1TagasGreyHover.jpg";
import tidomist from "../../assets/V1TidoMist.jpg";
import tidomistHover from "../../assets/V1TidoMistHover.jpg";
import victoriatoast from "../../assets/V1VictoriaToast.jpg";
import victoriatoastHover from "../../assets/V1VictoriaToastHover.jpg";
import pdf from "../../assets/pdf/EAGLE GLOSSY ENDLESS-V1-COLLECTION_600X1200MM_compressed.pdf"

const ServicesCollectionCard = lazy(() =>
  import("../ServicesContent/ServicesCollectionCard ")
);
 
const goldenCollection = [
    { main: aluregold, hover: aluregoldHover, title: "ALURE GOLD" },
    { main: argentabianco, hover: argentabiancoHover, title: "ARGENTA BIANCO" },
    { main: armonia, hover: armoniaHover, title: "ARMONIA" },
    { main: calacatta, hover: calacattaHover, title: "CALACATTA PACIFIC" },
    { main: cremonamint, hover: cremonamintHover, title: "CREMONA MINT" },
    { main: crisp, hover: crispHover, title: "CRISP" },
    { main: divcamust, hover: divcamustHover, title: "DIVCA MUST" },
    { main: edenacrema, hover: edenacremaHover, title: "EDENA CREMA" },
    { main: eloragrey, hover: eloragreyHover, title: "ELORA GREY" },
    { main: enigma, hover: enigmaHover, title: "ENIGMA" },
    { main: exoramist, hover: exoramistHover, title: "EXORAMIST" },
    { main: fluidriver, hover: fluidriverHover, title: "FLUID RIVER" },
    { main: fontanachoco, hover: fontanachocoHover, title: "FONTANA CHOCO" },
    { main: gigovalatter, hover: gigovalatterHover, title: "GIGOVA LATTE" },
    { main: grimmoon, hover: grimmoonHover, title: "GRIM MOON" },
    { main: jenifogrey, hover: jenifogreyHover, title: "JENIFO GREY" },
    { main: karvamoca, hover: karvamocaHover, title: "KARVA MOCA" },
    { main: liner, hover: linerHover, title: "LINER" },
    { main: marvelnero, hover: marvelneroHover, title: "MARVEL NERO" },
    { main: morisgrey, hover: morisgreyHover, title: "MORIS GREY" },
    { main: midasbeige, hover: midasbeigeHover, title: "MIDAS BEIGE" },
    { main: modanacamel, hover: modanacamelHover, title: "MODANA CAMEL" },
    { main: moonwhite, hover: moonwhiteHover, title: "MOON WHITE" },
    { main: nairobimocha, hover: nairobimochaHover, title: "NAIROBI MOCHA" },
    { main: oasianatural, hover: oasianaturalHover, title: "OASIA NATURAL" },
    { main: orisiswhite, hover: orisiswhiteHover, title: "ORISIS WHITE" },
    { main: orrasand, hover: orrasandHover, title: "ORRA SAND" },
    { main: pitona, hover: pitonaHover, title: "PITONA" },
    { main: rivervete, hover: riverveteHover, title: "RIVER VETE" },
    { main: rossatomord, hover: rossatomordHover, title: "ROSSATO MORD" },
    { main: sekolacrema, hover: sekolacremaHover, title: "SEKOLA CREMA" },
    { main: serenegrey, hover: serenegreyHover, title: "SERENE GREY" },
    { main: sofitagris, hover: sofitagrisHover, title: "SOFITA GRIS" },
    { main: taaj, hover: taajHover, title: "TAAJ" },
    { main: tagasgrey, hover: tagasgqreyHover, title: "TAGAS GREY" },
    {main:tidomist, hover:tidomistHover, title:"TIDO MIST"},
    {main:victoriatoast, hover:victoriatoastHover, title:"VICTORIA TOAST"},
  ];

const EagleGoldenEndlessCollectionV1 = () => {
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
        sx={{ color: "#F87B1B", mb: 4 }}
      >
        Golden Endless Collection - Version 2
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

export default EagleGoldenEndlessCollectionV1