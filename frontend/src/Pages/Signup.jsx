import React, { useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/signup", form);
      setMsg(response.data.message);
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="auth-shell">
        <div className="card chip-notch bg-panel p-8 w-full max-w-sm">
          <p className="eyebrow text-center">Get started</p>
          <h2 className="font-display text-2xl font-bold mt-1 mb-6 text-center">
            Create your account
          </h2>

          {msg && (
            <div className="bg-danger-light text-danger p-3 rounded-md mb-4 text-center text-sm font-medium">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <button type="submit" className="btn-primary w-full py-2.5">
              Sign up
            </button>
          </form>

          <p className="text-center text-sm text-ink-soft mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-volt-dark font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
