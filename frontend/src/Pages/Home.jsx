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

  return (
    <>
      <div className="p-6">
        <div className="mb-4 flex gap-4">
          {/* Search */}
          <input
            placeholder="Search Products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="border px-3 py-2 rounded w-1/2"
          />

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="">All Category</option>
            <option value="mobiles">Mobiles</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptops">Laptops</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-3 rounded shadow hover:shadow-lg transition"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-contain bg-white rounded"
                />
                <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
