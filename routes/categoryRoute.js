const express = require('express');
const route = express.Router();
const {addCategory,updateCategory,deleteCategory,getAllCategory,searchCategory} = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

route.post('/add',authMiddleware,addCategory);
route.put('/update/:id',authMiddleware,updateCategory);
route.post('/delete/:id',authMiddleware,deleteCategory);
route.get('/getAll',authMiddleware,getAllCategory);
route.get('/search',authMiddleware,searchCategory);


module.exports = route;