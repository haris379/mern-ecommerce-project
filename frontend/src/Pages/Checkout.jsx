import React, { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, []);

  if (!cart) {
    return <div>Loading...</div>;
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
  return (
     <div className="page-shell max-w-4xl">
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
                    {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
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
