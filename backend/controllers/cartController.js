import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }
    await cart.save();
    res.json({
      message: "Item Added Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Remove item from cart
export const removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.json({ message: "Cart deleted" });
    }
    await cart.save();
    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Update Quantity
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "item not found" });
    }
    if (quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }
    item.quantity = quantity;

    await cart.save();
    res.json({
      message: "Quantity updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get cart by user id
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
