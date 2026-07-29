import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    stock: "",
  });
  const allowedFields = [
    "title",
    "price",
    "description",
    "category",
    "image",
    "stock",
  ];

  const loadProducts = async () => {
    const response = await api.get("/products");
    const product = response.data.find((p) => p._id === id);
    console.log("URL id:", id);
    console.log("Products:", response.data);
    console.log("Found product:", product);

    if (product) {
      setForm(product);
    } else {
      alert("Product not found");
      navigate("/admin/products");
    }
    setForm(product);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/products/update/${id}`, form);
    alert("Product updated!");
    navigate("/admin/products");
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {allowedFields.map((key) => (
            <input
              key={key}
              name={key}
              // value={form[key]}
              value={form[key]}
              onChange={handleChange}
              placeholder={key}
              className="w-full border px-3 py-2 rounded"
            />
          ))}

          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
