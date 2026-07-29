import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router";

const productDetails = () => {
  const id = useParams();
  const [product, setProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const respone = await api.get("/products");
      const searchedProduct = respone.data.find((item) => {
        item.id === id;
      });
    } catch (error) {
      console.error("Error getting products", error);
    }
  };

  return <div>Welcome to Product Details Page</div>;
};

export default productDetails;
