import React, { useState, useEffect } from "react";
import api from "../api/axios";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

  // loadCart
  const loadCart = async () => {
    try {
      if (!userId) return;
      const response = await api.get(`/cart/${userId}`);
      setCart(response.data);
    } catch (error) {
      console.error("Error loading Cart", error);
    }
  };
  useEffect(() => {
    if (userId) {
      loadCart();
    }
  }, [userId]);

  const removeItem = async (productId) => {
    try {
      await api.post("/cart/remove", { userId, productId });
      // loadCart();
      setCart((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.productId._id !== productId),
      }));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error removing Item", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity === 0) {
        await removeItem(productId);
        return;
      }
      await api.post("/cart/update", { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  if (!cart) {
    return <div>Loading...</div>;
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="flex items-center justify-between border rounded p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">
                      {item.productId.title}
                    </h2>
                    <p className="text-gray-600">
                      {item.productId.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => {
                      updateQuantity(item.productId._id, item.quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() => {
                      updateQuantity(item.productId._id, item.quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="font-semibold">
                    ${(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="text-right mt-4">
              <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            </div>
            <button
              // onClick={() => navigate("/checkout-address")}
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
