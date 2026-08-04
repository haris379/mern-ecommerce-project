import React, { useState, useEffect } from "react";
import api from "../api/axios.js";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) return;
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, []);
//   useEffect(() => {
//   if (!userId) return;

//   api.get(`/address/${userId}`).then((res) => {
//     console.log("Response:", res);
//     console.log("Data:", res.data);
//     console.log(JSON.stringify(res.data, null, 2));
//     console.log("Is Array:", Array.isArray(res.data));

//     setAddress(res.data);
//     setSelectedAddress(res.data[0]);
//   });
// }, []);

  if (!cart) {
    return <div>Loading...</div>;
  }

  const total = cart.items.reduce((sum , item)=>{
    return sum + item.productId.price * item.price
  },0)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="font-semibold mb-2">Select Delivery Address</h2>

      <div className="space-y-3">
        {address.map((addr) => (
          <label
            key={addr._id}
            className="block border p-3 rounded cursor-pointer"
          >
            <input
              type="radio"
              name="address"
              checked={selectedAddress?._id === addr._id}
              onChange={() => setSelectedAddress(addr)}
              className="mr-2"
            />
            <strong>{addr.fullName}</strong>
            <p className="text-sm">
              {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <p className="text-sm">📞 {addr.phone}</p>
          </label>
        ))}
      </div>
      <h2 className="font-semibold mt-6 mb-2">Order Summary</h2>
      <p className="text-lg font-bold">Total: Rs.{total}</p>

      <button
        // onClick={placeOrder}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Place Order (COD)
      </button>
    </div>
  );
};

export default Checkout;
