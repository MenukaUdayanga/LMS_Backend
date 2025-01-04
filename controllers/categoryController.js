const Category = require('../models/Category');

exports.addCategory = async (req ,res) => {

    try{
        const {name,image} = req.body;

         if(!name || !image){
            return res.status(400).json({ message: 'All fields are required!' });
         }

       const exitProduct = await Category.findOne({name});

       if(exitProduct){
        return res.status(400).json({ message: 'This category already exit!' });
       }

       const category = new Category({
        name:name,
        image:image,
        hidden: false,
       });


       const categorySave = await category.save();

       return res.status(201).json({
        message: "Category added successfully",
        category: categorySave,
      });


    } catch(error){
        console.error("Error adding category:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }

}




exports.updateCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    const {id} = req.params;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "This category does not exist!" });
    }

    if (name) existingCategory.name = name;
     if(image) existingCategory.image = image;
    
    const updatedCategory = await existingCategory.save();

    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).json({ message: "Please pass the id!" });
    }

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "This category does not exist!" });
    }

    existingCategory.hidden = true;
    
    const updatedCategory = await existingCategory.save();

    return res.status(200).json({
      message: "Category delete successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.getAllCategory = async (req, res) => {
  try {

    const visibleCategories = await Category.find({ hidden: false });
    
    return res.status(200).json({
      message: "Fetched visible categories successfully",
      categories: visibleCategories,
    });

  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.searchCategory = async (req, res) => {
  try {
    const { term } = req.query;

  
    const query = {
      hidden: false, 
    };

    if (term && term.trim() !== "") {
      query.name = { $regex: term, $options: "i" }; 
    }

    const searchResult = await Category.find(query);

    return res.status(200).json({
      message: "Fetched categories successfully",
      products: searchResult,
    });
  } catch (error) {
    console.error("Error searching categories:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


