import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: String,
    image: String,
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timeStamp: true,
  },
);

export default mongoose.model("Product", productSchema);
