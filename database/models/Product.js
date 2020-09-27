const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  price: {
    type: Number,
    required: true,
    max: 255,
  },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
});

module.exports = mongoose.model("Product", productSchema);
