
"use client"
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import Dropdown from "./components/Dropdown";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import AddProduct from "./components/AddProduct";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("jewelery");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/categories");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/category/${selectedCategory}?limit=10`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [selectedCategory]);

  const getAddedProduct = (data) => {
    setProducts([...products, data]);

  }
  const getUpdatedProduct = (data) => {
    const restProductList = products.filter((a) => a.id !== data.id);
    const newProductList = [...restProductList,data]
    setProducts(newProductList);

  }
  const getDeletedProduct = (data) => {
    const newProductList = products.filter((a) => a.id !== data.id)
    setProducts(newProductList);
  }

  console.log(products)
  return (
    <Container maxWidth="xl">
      <Box className="flex justify-center my-5">
        <Dropdown options={data} sendSelectedCategory={setSelectedCategory} />
      </Box>
      <Typography className="text-3xl font-bold text-center capitalize my-5">
        Category: {selectedCategory}
      </Typography>
      <Box className="flex justify-center my-5">

        <AddProduct category={selectedCategory} sendAddedProduct={getAddedProduct} />

      </Box>
      <Box className="h-full p-4  flex justify-evenly items center flex-wrap">
        {products.map((product, index) => (

          <ProductCard key={index} no={index} sendUpdatedProduct={getUpdatedProduct} sendDeletedProduct={getDeletedProduct} product={product} />

        ))}
      </Box>
    </Container>
  );
}
