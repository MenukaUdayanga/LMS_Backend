const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    required:false
  },
  hidden: {
    type: Boolean,
    default: false, 
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
