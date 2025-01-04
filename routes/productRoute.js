const express = require('express');
const route = express.Router();
const {addProduct,updateProduct,deleteProduct,getAllProduct,searchProduct} = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

route.post('/add',authMiddleware,addProduct);
route.put('/update/:id',authMiddleware,updateProduct);
route.post('/delete/:id',authMiddleware,deleteProduct);
route.get('/getAll',authMiddleware,getAllProduct);
route.get('/search',authMiddleware,searchProduct);


module.exports = route;