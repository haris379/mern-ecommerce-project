import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useParams } from "react-router";
import BackButton from "../components/BackButton.jsx";

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
  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please Login to Continue");
        return;
      }
      const response = await api.post("/cart/add", { userId, productId });
      const total = response.data.cart.items.reduce((sum, item) => {
        return sum + item.productId.price * item.quantity;
      }, 0);
      localStorage.setItem("cartCount", total);
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  return (
    <>
      <div className="page-shell max-w-3xl">
        <BackButton />
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="card chip-notch p-6 bg-paper">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-72 object-contain"
            />
          </div>

          <div>
            <p className="eyebrow">{product.category || "Product"}</p>
            <h1 className="font-display text-2xl md:text-3xl font-bold mt-2">
              {product.title}
            </h1>
            <p className="text-ink-soft mt-3 leading-relaxed">
              {product.description}
            </p>
            <p className="price-mono text-2xl font-semibold text-navy mt-5">
              Rs. {product.price}
            </p>

            <button
              onClick={() => addToCart(product._id)}
              className="btn-primary w-full md:w-auto mt-6 px-8 py-3"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default productDetails;
