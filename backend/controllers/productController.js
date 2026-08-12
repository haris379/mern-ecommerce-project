import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({
      message: "Product added Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updatedProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Product updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories.filter(Boolean));
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
