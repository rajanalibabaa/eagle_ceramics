import React, { useEffect, useState } from "react";
import ProductCreate from './ProductCreate';
import AddIcon from "@mui/icons-material/Add";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography,

} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ProductAndSize = () => {
    const [openModal, setOpenModal] = useState(false);


    // Modal handlers
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const [getData, setGetData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);



    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5050/api/v1/eagle-ceramic/product-sizes/get-all');
            const res = await response.json();
            console.log('Fetched data:', res.data);
            setGetData(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    return (
        <div>
            <Box>
                <Button
                    variant="contained"
                    onClick={handleOpenModal}
                    startIcon={<AddIcon />}
                    sx={{
                        backgroundColor: "red",
                        color: "white",
                        '&:hover': {
                            backgroundColor: "#d32f2f",
                        },
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600,
                    }}
                >
                    Create New Product
                </Button>
            </Box>
            <Box sx={{mt:'20px'}}>
                {getData.map((item) => {
                    return (
                        <Accordion key={item._id} sx={{mt:'15px',borderRadius:'5px'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel-${item._id}-content`}
                                id={`panel-${item._id}-header`}
                            >
                                <Typography variant="h6"> {item.productName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* Add your content here */}
                                <Typography>
                                    {/* You can display more item details here */}
                                    {item.productSizes.map((data, index) => (
                                        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                            <Typography> {data.size}</Typography>
                                            <Typography> {data.title}</Typography>
                                            <Typography> {data.description}</Typography>
                                        </Box>
                                    ))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
            <Box>
                <ProductCreate openModal={openModal} setOpenModal={setOpenModal} />
            </Box>

        </div>
    )
}

export default ProductAndSize