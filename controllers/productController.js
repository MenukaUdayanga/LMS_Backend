const Product = require('../models/Product');
const Category = require('../models/Category');

exports.addProduct = async (req, res) => {
  try {
    const { name, image, mark_price, real_price, des, category,discount } = req.body;

    if (!name || !image || !mark_price || !real_price || !des  || !category) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ message: 'This product already exists!' });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found!' });
    }

    const product = new Product({
      name,
      image,
      mark_price,
      real_price,
      des,
      isFevarite:false,
      category: category,
      hidden: false,
      discount:discount||0
    });


    const savedProduct = await product.save();

  
    existingCategory.products.push(savedProduct._id);
    await existingCategory.save();


    return res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { name, mark_price, real_price, des, category, discount, image } = req.body;
    const { id } = req.params;

  
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "This product does not exist!" });
    }


    if (name) existingProduct.name = name;
    if (mark_price) existingProduct.mark_price = mark_price;
    if (real_price) existingProduct.real_price = real_price;
    if (des) existingProduct.des = des;
    if (category) existingProduct.category = category;
    if (discount) existingProduct.discount = discount;
    if (image) existingProduct.image = image;

    
    const updatedProduct = await existingProduct.save();

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please pass the id!" });
    }

    const existingCategory = await Product.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "This product does not exist!" });
    }

    existingCategory.hidden = true;
    
    const updatedCategory = await existingCategory.save();

    return res.status(200).json({
      message: "Product delete successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error deleting Product:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.getAllProduct = async (req, res) => {
  try {

    const visibleProducts = await Product.find({ hidden: false });
    
    return res.status(200).json({
      message: "Fetched visible Products successfully",
      categories: visibleProducts,
    });

  } catch (error) {
    console.error("Error getting Products:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.searchProduct = async (req, res) => {
  try {
    const { term } = req.query;

  
    const query = {
      hidden: false, 
    };

    if (term && term.trim() !== "") {
      query.name = { $regex: term, $options: "i" }; 
    }

    const searchResult = await Product.find(query);

    return res.status(200).json({
      message: "Fetched products successfully",
      categories: searchResult,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};





