import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ServicesCollectionCard from "../ServicesContent/ServicesCollectionCard ";
import BackgroundImage from "../../assets/BannerImage2.png";

const StyledSidebar = styled(Box)(({ theme }) => ({
  padding: { xs: 0, sm: "16px", md: "24px" },
  position: "relative",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  background: `
    linear-gradient(135deg,
      rgba(248,249,250,0.95) 0%,
      rgba(255,255,255,0.98) 50%,
      rgba(240,242,245,0.95) 100%)`,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  fontFamily: "'Inter','Roboto','Arial',sans-serif",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0,0,0,0.2)",
    borderRadius: "10px",
  },
}));

const SectionHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  padding: "12px 16px",
  borderRadius: 12,
  background:
    "linear-gradient(135deg,rgba(255,255,255,.9) 0%,rgba(248,249,250,.9) 100%)",
  border: "1px solid rgba(255,255,255,0.8)",
  marginBottom: "8px",
});

const CollectionItem = styled(Box)(({ selected }) => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: "12px 5%",
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  transition: "all .3s",
  cursor: "pointer",
  backgroundColor: selected ? "rgba(196, 31, 37, 0.1)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(196, 31, 37, 0.05)",
  },
  "& .MuiTypography-root": {
    flex: 1,
    fontWeight: selected ? 600 : 500,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: selected ? "#c41f25" : "inherit",
    paddingLeft: "5%",
  },
}));

const VersionItem = styled(Box)(({ selected }) => ({
  display: "flex",
  alignItems: "center",
  margin: 0,
  padding: "10px 5% 10px 10%",
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  transition: "all .3s",
  cursor: "pointer",
  border: selected
    ? "1px solid rgba(196, 31, 37, 0.3)"
    : "1px solid transparent",
  backgroundColor: selected ? "rgba(196, 31, 37, 0.08)" : "transparent",
  "&:hover": {
    backgroundColor: "rgba(196, 31, 37, 0.05)",
  },
  "& .MuiTypography-root": {
    flex: 1,
    fontWeight: selected ? 600 : 400,
    color: selected ? "#c41f25" : "inherit",
    paddingLeft: "5%",
  },
}));

const SidebarWrapper = styled(Box)(({ theme }) => ({
  width: "320px",
  flexShrink: 0,
  overflowY: "auto",
  position: "sticky",
  top: "80px",
  alignSelf: "flex-start",
  height: "calc(100vh - 80px)",
}));

const CatalogContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: { xs: "16px", md: "24px" },
  minHeight: "calc(100vh - 80px)",
}));

export default function ServiceSideBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openCollections, setOpenCollections] = useState(true);
  const [openSub, setOpenSub] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for fetched data
  const [filterData, setFilterData] = useState([]);
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [headerData, setHeaderData] = useState({
    title: "ELEVATION TILES",
    BackgroundImage: BackgroundImage,
    subtitle: "Premium 300 x 450 mm | High-Depth 3D Elevation Series",
  });

  // Fetch filter data from API
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://clientbackend.cholabiz.com/api/v1/eagle-ceramic/catalog/get-by-product"
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = response.data;

        console.log("Filter result", result);
        if (result.success && result.data?.filterdata) {
          setFilterData(result.data.filterdata);
          setCatalogData(result.data.catalogData || []);

          // Set initial header data from first product if available
          if (result.data.filterdata.length > 0) {
            const firstProduct = result.data.filterdata[0];
            if (
              firstProduct.productSizes &&
              firstProduct.productSizes.length > 0
            ) {
              const firstSize = firstProduct.productSizes[0];
              setHeaderData({
                title: firstSize.title || firstProduct.productName,
                BackgroundImage: firstSize?.image,
                subtitle: firstSize.description || "",
              });
            }
          }
        } else {
          throw new Error("Invalid data structure from API");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching filter data:", err);
        setFilterData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  // Fetch catalog data based on product and size
  const fetchCatalogData = async (productName, productSize, sizeData) => {
    console.log("Fetching sizeData for:", sizeData);
    try {
      setCatalogLoading(true);
      const params = new URLSearchParams();
      if (productName) params.append("productName", productName);
      if (productSize) params.append("productSize", productSize);

      const response = await axios.get(
        `https://clientbackend.cholabiz.com/api/v1/eagle-ceramic/catalog/get-by-product?${params.toString()}`
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = response.data;

      if (result.success && result.data?.catalogData) {
        setCatalogData(result.data.catalogData);

      } else {
        throw new Error("Invalid catalog data structure from API");
      }
    } catch (err) {
      console.error("Error fetching catalog data:", err);
      setCatalogData([]);
    } finally {
      setCatalogLoading(false);
     
    }
  };


  const handleSizeClick = async (productName, size, sizeData) => {
    const productKey = productName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const sizeKey = size
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Update URL with query parameters
    navigate(`/products?product=${productKey}&size=${sizeKey}`);

    setSelectedProduct(productName);
    setSelectedSize(size);
    setDrawerOpen(false);

    // console.log("headerData",headerData);
    console.log("sizeData", sizeData);

    // Update header data

    console.log("Updated headerData", {
      title: sizeData.title || productName,
      BackgroundImage: sizeData?.image,
      subtitle: sizeData.description || "",
    });

    // Fetch catalog data
    fetchCatalogData(productName, size, sizeData);
    setHeaderData({
      title: sizeData.title || productName,
      BackgroundImage: sizeData?.image,
      subtitle: sizeData.description || "",
    });
  };

  // Auto-open the parent when child is selected
  useEffect(() => {
    if (selectedProduct) {
      const productKey = selectedProduct
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setOpenSub((prev) => ({
        ...prev,
        [productKey]: true,
      }));
    }
  }, [selectedProduct]);

  const handleCollectionClick = (key) => {
    setOpenSub((prev) => ({
      [key]: !prev[key],
    }));
  };

  const sidebarRef = useRef(null);

  const SidebarContent = (
    <StyledSidebar ref={sidebarRef}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pl: "5%",
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            background: "linear-gradient(135deg, #c41f25 0%, #e74c3c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            pl: "5%",
          }}
        >
          Shop By Products
        </Typography>
        {isMobile && (
          <Fab
            size="small"
            onClick={() => setDrawerOpen(false)}
            sx={{ boxShadow: "none" }}
          >
            <CloseIcon />
          </Fab>
        )}
      </Box>

      <Divider
        sx={{
          mb: 2,
          borderColor: "rgba(0, 0, 0, 0.1)",
          ml: "5%",
          mr: "5%",
        }}
      />

      <SectionHeader
        sx={{ ml: "5%", mr: "5%" }}
        onClick={() => setOpenCollections((o) => !o)}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            pl: "5%",
          }}
        >
          Products
        </Typography>
        {openCollections ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </SectionHeader>

      <Divider
        sx={{
          mb: 1,
          borderColor: "rgba(0, 0, 0, 0.1)",
          ml: "5%",
          mr: "5%",
        }}
      />

      <Collapse in={openCollections}>
        <Box sx={{ px: 0, mb: 2, ml: "5%", mr: "5%" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : error ? (
            <Typography sx={{ textAlign: "center", p: 2, color: "error.main" }}>
              Error: {error}
            </Typography>
          ) : filterData.length === 0 ? (
            <Typography sx={{ textAlign: "center", p: 2 }}>
              No products available
            </Typography>
          ) : (
            filterData.map((item) => {
              const productKey = item.productName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

              const hasSizes = item.productSizes?.length > 0;
              const isSelected = selectedProduct === item.productName;

              return (
                <Box key={item.uuid} sx={{ mb: 1 }}>
                  <CollectionItem
                    selected={isSelected}
                    onClick={() => {
                      if (hasSizes) {
                        handleCollectionClick(productKey);
                      } else {
                        handleSizeClick(item.productName, "", {});
                      }
                    }}
                  >
                    <Typography
                      sx={{
                        flexGrow: 1,
                        pl: "5%",
                      }}
                    >
                      {item.productName}
                    </Typography>
                    {hasSizes &&
                      (openSub[productKey] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      ))}
                  </CollectionItem>

                  {hasSizes && (
                    <Collapse in={!!openSub[productKey]}>
                      <Box>
                        {item.productSizes.map((sizeItem) => {
                          const sizeKey = sizeItem.size
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "");
                          const thisSelected =
                            selectedProduct === item.productName &&
                            selectedSize === sizeItem.size;

                          return (
                            <Box key={sizeItem._id} sx={{ mb: 0.5, mt: "1%" }}>
                              <VersionItem
                                selected={thisSelected}
                                onClick={() =>
                                  handleSizeClick(
                                    item.productName,
                                    sizeItem.size,
                                    sizeItem
                                  )
                                }
                              >
                                <Typography
                                  sx={{
                                    flexGrow: 1,
                                    pl: "5%",
                                  }}
                                >
                                  {sizeItem.size}
                                </Typography>
                              </VersionItem>
                            </Box>
                          );
                        })}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })
          )}
        </Box>
      </Collapse>
    </StyledSidebar>
  );

  // Mobile FAB logic
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    if (!sidebarRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => setSidebarVisible(entries[0].isIntersecting),
      { threshold: 0.01 }
    );
    obs.observe(sidebarRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      (entries) => setFooterVisible(entries[0].isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  const showFab = sidebarVisible && !footerVisible;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Desktop Sidebar */}
      {!isMobile && <SidebarWrapper>{SidebarContent}</SidebarWrapper>}

      {/* Main Content */}
      <CatalogContainer sx={{ p: 4 }}>
        {/* Header Section */}
        <Box
          sx={{
            position: "relative",
            textAlign: "center",
            mb: { xs: 3, sm: 4 },
            pt: 1,
            backgroundImage: {
              xs: "none",
              sm: `url(${headerData.BackgroundImage})`,
            },
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "25px",
            overflow: "hidden",
            "::before": {
              content: '""',
              position: "absolute",
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: {
                xs: "none",
                sm: "linear-gradient(45deg, transparent, rgba(0, 0, 0, 0.84))",
              },
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mt: { xs: 0, sm: 3 },
              fontWeight: 700,
              fontSize: { xs: "2.8rem", sm: "3.5rem" },
              color: { xs: "black", sm: "white" },
              textShadow: { sm: "0 2px 4px rgba(0,0,0,0.5)" },
            }}
          >
            {headerData.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 1,
              mb: 3,
              fontSize: { xs: "0.95rem", sm: "1.2rem" },
              color: { xs: "black", sm: "white" },
              textShadow: { sm: "0 1px 2px rgba(0,0,0,0.5)" },
            }}
          >
            {headerData.subtitle}
          </Typography>
        </Box>

        {/* Catalog Display */}
        {catalogLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : catalogData.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              {selectedProduct && selectedSize
                ? `No catalog items found for ${selectedProduct} - ${selectedSize}`
                : "Select a product and size to view catalog items"}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {catalogData.map((item) => (
              <Grid
                item
                xs={12}
                key={item.uuid}
                sx={{ display: "grid", width: "100%" }}
              >
                <ServicesCollectionCard
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                  buttonText={item.buttonText || "View Details"}
                  pdfFile={item.pdfUrl}
                  onExploreClick={(pdf) => window.open(pdf, "_blank")}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </CatalogContainer>

      {/* Mobile Filter FAB */}
      {isMobile && showFab && !drawerOpen && (
        <Fab
          variant="extended"
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: theme.zIndex.modal + 1,
            color: "#c41f25",
            backgroundColor: "#fff",
            border: "1px solid #c41f25",
            "&:hover": {
              backgroundColor: "#ffe5e6",
            },
          }}
        >
          <FilterListIcon sx={{ mr: 1 }} /> Filters
        </Fab>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <SwipeableDrawer
          anchor="bottom"
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: { height: "90vh", borderRadius: "16px 16px 0 0" },
          }}
        >
          {SidebarContent}
        </SwipeableDrawer>
      )}
    </Box>
  );
}
