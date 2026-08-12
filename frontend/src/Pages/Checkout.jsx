import React, { useState, useEffect, useId, use } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton.jsx";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      try {
        const cartResponse = await api.get(`/cart/${userId}`);
        setCart(cartResponse.data);

        const addressResponse = await api.get(`/address/${userId}`);
        setAddress(addressResponse.data);
        if (addressResponse.data.length > 0) {
          setSelectedAddress(addressResponse.data[0]);
        }
      } catch (error) {
        console.error("Checkout loading error:", error);
      } finally {
        setLoadingAddress(false);
      }
    };
    fetchData();
  }, [userId, navigate]);

  useEffect(() => {
    if (!loadingAddress && address.length === 0) {
      const timer = setTimeout(() => {
        navigate("/checkout-address");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loadingAddress, address.length, navigate]);
  if (!cart || loadingAddress) {
    return (
      <div className="page-shell text-center text-ink-soft">
        Loading&hellip;
      </div>
    );
  }

  if (address.length === 0) {
    return (
      <div className="page-shell text-center text-ink-soft">
        <p>No delivery address found.</p>
        <p className="mt-2">Redirecting you to add an address...</p>
      </div>
    );
  }
  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0,
  );
  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select address");
      return;
    }

    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });

    navigate(`/order-success/${res.data.orderId}`);
  };
  if (address.length === 0) {
    return (
      <div className="page-shell text-center text-ink-soft">
        Loading&hellip;
      </div>
    );
  }
  return (
    <div className="page-shell max-w-4xl">
      <BackButton/>
      <p className="eyebrow">Step 2 of 2</p>
      <h1 className="font-display text-2xl font-bold mt-1 mb-6">Checkout</h1>

      <h2 className="font-semibold text-ink-soft text-sm uppercase tracking-wide mb-3">
        Select delivery address
      </h2>

      <div className="space-y-3">
        {address.map((addr) => {
          const isSelected = selectedAddress?._id === addr._id;
          return (
            <label
              key={addr._id}
              className={`block card p-4 cursor-pointer transition-colors ${
                isSelected ? "border-navy" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="address"
                  checked={isSelected}
                  onChange={() => setSelectedAddress(addr)}
                  className="mt-1 accent-volt"
                />
                <div>
                  <strong className="text-ink">{addr.fullName}</strong>
                  <p className="text-sm text-ink-soft mt-0.5">
                    {addr.addressLine}, {addr.city}, {addr.state} -{" "}
                    {addr.pincode}
                  </p>
                  <p className="text-sm text-ink-soft">📞 {addr.phone}</p>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      <div className="card chip-notch p-5 mt-6 flex items-center justify-between">
        <h2 className="font-semibold text-ink-soft text-sm uppercase tracking-wide">
          Order total
        </h2>
        <p className="price-mono text-xl font-bold text-navy">Rs. {total}</p>
      </div>

      <button onClick={placeOrder} className="btn-primary w-full py-3 mt-6">
        Place Order &middot; Cash on Delivery
      </button>
    </div>
  );
};

export default Checkout;
