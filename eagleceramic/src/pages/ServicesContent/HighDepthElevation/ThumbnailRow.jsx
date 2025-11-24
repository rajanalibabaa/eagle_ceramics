import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

const ThumbnailRow = ({ images = [], selectedSrc = "", onImageClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
        mt: 3,
        pb: 1,

        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 0.5,
        "&::-webkit-scrollbar": {
          height: 8,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#c1c1c1",
          borderRadius: 4,
        },
      }}
    >
      {images.map((img, i) => {
        const isActive = img.src === selectedSrc;

        return (
          <Box
            key={i}
            sx={{
              flex: "0 0 auto",
              textAlign: "center",
            }}
          >
            <Box
              component="img"
              src={img.src}
              alt={img.alt ?? `thumb-${i}`}
              onClick={() =>
                img.onClick ? img.onClick(img) : onImageClick?.(img)
              }
              sx={{
                width: { xs: 70, sm: 85, md: 90 },
                height: { xs: 60, sm: 75, md: 85 },
                objectFit: "cover",
                borderRadius: 1,
                cursor: (img.onClick || onImageClick) ? "pointer" : "default",

                border: isActive
                  ? "3px solid #658C58"
                  : "2px solid transparent",

                boxShadow: isActive ? "0px 0px 6px rgba(0,0,0,0.35)" : "none",

                transition: "0.2s ease",
                "&:hover": {
                  transform: (img.onClick || onImageClick)
                    ? "translateY(-3px)"
                    : "none",
                },
              }}
            />

          
          </Box>
        );
      })}
    </Box>
  );
};

ThumbnailRow.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  selectedSrc: PropTypes.string,
  onImageClick: PropTypes.func,
};

export default memo(ThumbnailRow);
