import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router";

const productDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const respone = await api.get("/products/");
      const searchedProduct = respone.data.find((item) => {
        return item._id === id;
      });
      setProduct(searchedProduct);
    } catch (error) {
      console.error("Error getting products", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (!product) {
    return <div>Loading.....</div>;
  }

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-40 object-contain bg-white rounded"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-xl font-semibold mt-4">${product.price}</p>

        <button className="mt-6 w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </>
  );
};

export default productDetails;
