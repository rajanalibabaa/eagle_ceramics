import React from "react";
import { Box, Link, Typography } from "@mui/material";


const StatuarioCollectionCard = ({
    mainImage,
    hoverImage,
    title = "STATUARIO COLLECTION",
    subtitle = "Explore Collections",
    titleColor = "#000",
    subtitleColor = "#b51a1a",
    overlayBg = "rgba(255,255,255,0.55)",
    pdfFile,
    onExploreClick,
}) => {
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                height: "500px",
                cursor: "pointer",

                // INITIAL STATES for images
                "& .mainImage": {
                    position: "absolute",
                    top: 0,
                    left: 30,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 1,
                    transition: "all 0.5s ease",
                },
                "& .hoverImage": {
                    position: "absolute",
                    top: 0,
                    left: 30,
                    width: "90%",
                    height: "90%",
                    objectFit: "contain",
                    opacity: 0,
                    transition: "all 0.5s ease",
                },

                // HOVER STATES
                "&:hover .mainImage": {
                    opacity: 0,
                    transform: "scale(1.08)",
                },
                "&:hover .hoverImage": {
                    opacity: 1,
                    transform: "scale(1.08)",
                },
                "&:hover .exploreText": {
                    opacity: 1,
                    transform: "translateY(0px)",
                },
            }}
        >
            {/* MAIN IMAGE */}
            <Box
                component="img"
                src={mainImage}
                alt={title}
                className="mainImage"
            />

            {/* HOVER IMAGE */}
            <Box
                component="img"
                src={hoverImage}
                alt={`${title} hover`}
                className="hoverImage"
            />

            {/* TITLE OVERLAY */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: overlayBg,
                    py: 3,
                    textAlign: "center",
                    backdropFilter: "blur(3px)",
                    zIndex: 2,
                }}
            >
                <Typography
                    sx={{
                        fontSize: "28px",
                        letterSpacing: "2px",
                        color: titleColor,
                        fontFamily: "serif",
                        fontWeight: 600,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    onClick={() => onExploreClick && pdfFile && onExploreClick(pdfFile)}
                    className="exploreText"
                    sx={{
                        mt: 1,
                        fontSize: "18px",
                        color: subtitleColor,
                        opacity: 0,
                        transform: "translateY(15px)",
                        transition: "all 0.4s ease",
                        fontWeight: 500,
                    }}
                >
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    );
};

export default StatuarioCollectionCard;