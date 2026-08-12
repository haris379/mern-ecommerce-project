import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";
import BackButton from "../components/BackButton";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

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
    return (
      <div className="page-shell text-center text-ink-soft">
        Loading&hellip;
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  return (
    <>
      <div className="page-shell max-w-4xl">
        <BackButton/>
        <h1 className="font-display text-2xl font-bold mb-6">Your Cart</h1>

        {cart.items.length === 0 ? (
          <div className="card p-10 text-center text-ink-soft">
            Your cart is empty.
          </div>
        ) : (
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="card p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-16 h-16 object-cover rounded-md bg-paper"
                  />
                  <div>
                    <h2 className="font-semibold text-ink">
                      {item.productId.title}
                    </h2>
                    <p className="price-mono text-sm text-ink-soft">
                      Rs. {item.productId.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border border-line rounded-lg px-1">
                  <button
                    className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-navy transition-colors"
                    onClick={() => {
                      updateQuantity(item.productId._id, item.quantity - 1);
                    }}
                  >
                    &minus;
                  </button>
                  <span className="price-mono text-sm w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    className="w-7 h-7 flex items-center justify-center text-ink-soft hover:text-navy transition-colors"
                    onClick={() => {
                      updateQuantity(item.productId._id, item.quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="price-mono font-semibold text-navy">
                    Rs. {(item.productId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.productId._id)}
                  className="btn-danger-ghost text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="card p-5 flex items-center justify-between mt-2">
              <span className="text-ink-soft">Order total</span>
              <h2 className="price-mono text-xl font-bold text-navy">
                Rs. {total.toFixed(2)}
              </h2>
            </div>
            <button
              onClick={() => navigate("/checkout-address")}
              className="btn-primary w-full py-3"
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
