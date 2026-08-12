import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router";
import BackButton from "../components/BackButton";

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
      <div className="page-shell max-w-lg">
        <BackButton />
        <p className="eyebrow">Admin</p>
        <h2 className="font-display text-2xl font-bold mt-1 mb-6">
          Edit Product
        </h2>

        <div className="card chip-notch p-6">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {allowedFields.map((key) => (
              <input
                key={key}
                name={key}
                // value={form[key]}
                value={form[key]}
                onChange={handleChange}
                placeholder={key}
                className="input-field"
              />
            ))}

            <button className="btn-primary w-full py-2.5 mt-5">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
