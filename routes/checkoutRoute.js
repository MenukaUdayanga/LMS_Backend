const express = require('express');
const route = express.Router();
const {addCheckout,deleteCheckout,getAllCheckoutProduct} = require('../controllers/productCheckoutController');
const authMiddleware = require('../middlewares/authMiddleware');


route.post('/add',authMiddleware,addCheckout);
route.delete('/delete',authMiddleware,deleteCheckout);
route.get('/getAll',authMiddleware,getAllCheckoutProduct);


module.exports = route;