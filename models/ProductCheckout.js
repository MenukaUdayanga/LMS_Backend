const mongoose = require("mongoose");

const productCheckoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    checkoutDate: { type: Date, default: Date.now } 
  });
  
  module.exports = mongoose.model("ProductCheckout", productCheckoutSchema);