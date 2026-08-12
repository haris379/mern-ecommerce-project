import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const response = await api.get(
        `/products?search=${search}&category=${category}`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error getting products", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

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
      {/* Hero strip */}
      <div className="bg-navy">
        <div className="page-shell pt-10 pb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 max-w-xl">
            Tech that keeps up with you.
          </h1>
          <p className="text-white/60 mt-2 max-w-md">
            Browse the current lineup and add what you need &mdash; checkout in
            a couple of taps.
          </p>
        </div>
      </div>

      <div className="page-shell">
        <div className="-mt-8 mb-8 card p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
          {/* Search */}
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="input-field sm:flex-1"
          />

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="input-field sm:w-52"
          >
            <option value="">All categories</option>
            <option value="mobiles">Mobiles</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptops">Laptops</option>
          </select>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <p className="text-ink-soft text-center py-16">
            No products match your search yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="card card-hover chip-notch p-3 flex flex-col"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-40 object-contain bg-paper rounded-md"
                  />
                  <h2 className="mt-3 font-semibold text-ink leading-snug line-clamp-2">
                    {product.title}
                  </h2>
                </Link>
                <div className="mt-2 flex items-center justify-between">
                  <p className="price-mono font-semibold text-navy">
                    Rs. {product.price}
                  </p>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="btn-primary text-xs py-1.5 px-3"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
