import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";

const ProductCreate = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productSizes: [{ size: "", title: "", description: "" }],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...productData.productSizes];
    updatedSizes[index][field] = value;
    setProductData((prev) => ({
      ...prev,
      productSizes: updatedSizes,
    }));
  };

  const addSize = () => {
    setProductData((prev) => ({
      ...prev,
      productSizes: [
        ...prev.productSizes,
        { size: "", title: "", description: "" },
      ],
    }));
  };

  const removeSize = (index) => {
    if (productData.productSizes.length === 1) return;

    setProductData((prev) => ({
      ...prev,
      productSizes: prev.productSizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        // changed to use dev-server proxy to avoid CORS
        "/api/eagle-ceramic/product-sizes/create",
        productData
      );

      console.log("Product Created:", response.data);

      // Reset form after success
      setProductData({
        productName: "",
        productSizes: [{ size: "", title: "", description: "" }],
      });

      alert("Product created successfully!");
    } catch (error) {
      console.error("Create Product Error:", error);
      alert(
        error?.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold">
          Create Product
        </Typography>

        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Product Name */}
            <Grid item xs={12}>
              <TextField
                label="Product Name"
                name="productName"
                value={productData.productName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* Product Sizes */}
            <Grid item xs={12}>
              <Typography variant="h6">Product Sizes</Typography>
            </Grid>

            {productData.productSizes.map((sizeItem, index) => (
              <Grid item xs={12} key={index}>
                <Paper variant="outlined" sx={{ p: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Size"
                        value={sizeItem.size}
                        onChange={(e) =>
                          handleSizeChange(index, "size", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Title"
                        value={sizeItem.title}
                        onChange={(e) =>
                          handleSizeChange(index, "title", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Description"
                        value={sizeItem.description}
                        onChange={(e) =>
                          handleSizeChange(index, "description", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>

                    {/* Action Buttons */}
                    <Grid item xs={12}>
                      <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <IconButton color="primary" onClick={addSize}>
                          <AddCircleOutlineIcon />
                        </IconButton>

                        {productData.productSizes.length > 1 && (
                          <IconButton
                            color="error"
                            onClick={() => removeSize(index)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        )}
                      </Stack>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Product"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductCreate;
