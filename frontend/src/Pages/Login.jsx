import React, { useState } from "react";
import { Link , useNavigate } from "react-router";
import api from "../api/axios.js";

const Login = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respone = await api.post("/auth/login", form);
      console.log(respone);

      // Save token to Local Storage
      localStorage.setItem("token", respone.data.token);
      localStorage.setItem("userId", respone.data.user.id);

      setMsg("Login Successful");

      // Redirect to Home
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMsg(error.response?.data?.message || "An error occurred");
    }
  };
  return (
     <>
      <div className="auth-shell">
        <div className="card chip-notch bg-panel p-8 w-full max-w-sm">
          <p className="eyebrow text-center">Welcome back</p>
          <h2 className="font-display text-2xl font-bold mt-1 mb-6 text-center">
            Log in to Cartify
          </h2>

          {msg && (
            <div className="mb-4 text-center text-sm bg-danger-light text-danger font-medium rounded-md py-2 px-3">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              Log in
            </button>
          </form>

          <p className="text-center text-sm text-ink-soft mt-5">
            New to Cartify?{" "}
            <Link to="/signup" className="text-volt-dark font-medium hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
