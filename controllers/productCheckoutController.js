const ProductCheckout = require('../models/ProductCheckout');

exports.addCheckout = async (req, res) => {
  try {
    const { userId , productId, categoryId, quantity } = req.body;

    if (!userId || !productId || !categoryId || !quantity) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingCheckout = await ProductCheckout.findOne({ userId ,productId});

    if (existingCheckout) {

      console.log("Already product is exit")

      const sum = existingCheckout.quantity + quantity;

      console.log("Sum of the quantity : ",sum);

      existingCheckout.quantity = sum;
      const updatedCheckout = await existingCheckout.save();

      return res.status(200).json({
        message: "Checkout quantity updated successfully!",
        data: updatedCheckout,
      });
    } else {

      const productCheckout = new ProductCheckout({
        userId,
        productId,
        categoryId,
        quantity,
        checkoutDate: new Date(),
      });

      const productCheckoutRes = await productCheckout.save();

      return res.status(201).json({
        message: "Checkout data saved successfully!",
        data: productCheckoutRes,
      });
    }
  } catch (error) {
    console.error("Error saving checkout:", error);
    return res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};


exports.deleteCheckout = async (req,res) =>{

  try{
      const {_id} = req.query;
      console.log("Delete id : ",_id);

      const deletedCheckout = await ProductCheckout.findByIdAndDelete(_id);

      if (!deletedCheckout) {
        return res.status(404).json({ message: "Checkout not found or already deleted!" });
      }

      return res.status(200).json({
        message: "Checkout deleted successfully!",
        data: deletedCheckout,
      });

  }catch(error){

    console.error("Error deleting checkout:", error);
    return res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });

  }

}


exports.getAllCheckoutProduct = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const checkoutProducts = await ProductCheckout.find({ userId })
      .populate("productId") 
      .populate("categoryId"); 
    if (!checkoutProducts || checkoutProducts.length === 0) {
      return res.status(404).json({ message: "No checkout products found for this user" });
    }

    return res.status(200).json({
      message: "Retrieved checkout products successfully",
      checkoutProducts,
    });
  } catch (error) {
    console.error("Error retrieving checkout products:", error);
    return res.status(500).json({
      message: "Server error, please try again later",
      error: error.message,
    });
  }
};