import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";

const AddPrduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products/add", form);
      alert("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <>
      <div className="page-shell max-w-lg">
        <p className="eyebrow">Admin</p>
        <h2 className="font-display text-2xl font-bold mt-1 mb-6">
          Add New Product
        </h2>
        <div className="card chip-notch p-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            {Object.keys(form).map((key) => (
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                //   placeholder={key}
                placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                className="input-field"
              />
            ))}
            <button type="submit" className="btn-primary w-full py-2.5 mt-5">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPrduct;
