import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-navy-line mt-0">
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <span className="font-display font-bold text-xl text-white tracking-tight">
            Cartify
          </span>

          <p className="text-white/50 text-sm mt-3 leading-relaxed">
            Everything You Need, All in One Place.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">
            Shop
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-white/60 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/cart"
                className="text-white/60 hover:text-white transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-3">
            Account
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/login"
                className="text-white/60 hover:text-white transition-colors"
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/signup"
                className="text-white/60 hover:text-white transition-colors"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-line">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-center items-center">
          <p className="text-white/40 text-xs">
            &copy; {year} Cartify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;