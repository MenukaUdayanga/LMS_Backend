const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  mark_price: {
    type: Number, 
    required: true,
  },
  real_price: {
    type: Number, 
    required: true,
  },
  discount: {
    type: Number, 
  },
  des: {
    type: String,
    required: true,
  },
  isFevarite: {
    type: Boolean,
    default: false, 
  },
  hidden: {
    type: Boolean,
    default: false, 
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category", 
    required: true, 
  },
});

module.exports = mongoose.model("Product", productSchema);
