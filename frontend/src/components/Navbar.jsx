import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) return setCartCount(0);

      const response = await api.get(`/cart/${userId}`);
      const total = response.data.items.reduce((sum, item) => {
        return sum + item.quantity;
      }, 0);

      setCartCount(total);
    };
    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-navy border-b border-navy-line">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-3.5">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Cartify
            </span>
          </Link>

          <div className="flex gap-5 items-center">
            <Link
              to="/cart"
              className="relative text-xl text-white/85 hover:text-white transition-colors"
              aria-label="Cart"
            >
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-volt text-white text-[0.65rem] font-mono font-semibold min-w-[1.1rem] h-[1.1rem] flex items-center justify-center rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              Home
            </Link>
            {!userId ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-white/85 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="text-sm font-medium text-white/85 hover:text-white transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
