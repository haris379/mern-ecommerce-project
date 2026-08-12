import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { formToJSON } from "axios";
import BackButton from "../components/BackButton";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const respone = await api.get("/products");
    setProducts(respone.data);
  };

  const deletedProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully!");
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", err);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="page-shell max-w-4xl">
        <BackButton />
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="eyebrow">Admin</p>
            <h2 className="font-display text-2xl font-bold mt-1">
              Product List
            </h2>
          </div>
          <Link to="/admin/products/add" className="btn-primary text-sm">
            + Add New Product
          </Link>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-navy text-white text-left">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-line hover:bg-paper transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-ink">
                    {product.title}
                  </td>
                  <td className="px-4 py-3 price-mono text-navy">
                    Rs. {product.price}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        product.stock > 0
                          ? "bg-teal-light text-teal"
                          : "bg-danger-light text-danger"
                      }`}
                    >
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="text-navy font-medium hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deletedProduct(product._id)}
                      className="btn-danger-ghost"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductList;
