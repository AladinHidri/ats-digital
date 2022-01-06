const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  reviews: {
    required: true,
    default: [],
    type: [
      {
        value: {
          type: Number,
          required: true,
          get: (v) => Math.round(v),
          set: (v) => Math.round(v),
        },
        content: { type: String, required: true },
      },
    ],
  },
});

module.exports = mongoose.model("Product", productSchema);
