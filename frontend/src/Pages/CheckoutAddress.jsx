import React, { useState } from "react";
import api from "../api/axios.js";
import { Link, useNavigate } from "react-router";

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    try {
      const response = await api.post("/address/add", {
        ...form,
        userId,
      });
      navigate("/checkout");
    } catch (error) {
      console.error("Error saving address", error);
    }
  };
  return (
    <div className="page-shell max-w-xl">
      <p className="eyebrow">Step 1 of 2</p>
      <h1 className="font-display text-2xl font-bold mt-1 mb-6">
        Delivery Address
      </h1>
      <div className="card chip-notch p-6">
        <div className="space-y-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              onChange={handleChange}
              className="input-field"
            />
          ))}
        </div>

        <button onClick={saveAddress} className="btn-primary w-full py-3 mt-6">
          Save &amp; Continue
        </button>
        <p className="text-center text-sm text-ink-soft mt-5">
          Already have address?{" "}
          <Link
            to="/checkout"
            className="text-volt-dark font-medium hover:underline"
          >
            Proceed
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckoutAddress;
