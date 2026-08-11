import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: Number(item.quantity),
      price: Number(item.productId.price),
    }));

    const totalAmount = orderItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    console.log("Order Items:", orderItems);
    console.log("Total Amount:", totalAmount);

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
    });

    await Cart.findOneAndUpdate(
      { userId },
      { items: [] }
    );

    res.status(201).json({
      message: "Order placed successfully",
      orderId: order._id,
    });

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);

    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};