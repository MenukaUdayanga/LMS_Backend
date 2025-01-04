const express = require('express');
const route = express.Router();
const {createUser,userLogin,userForgotPassword,resetPassword} = require('../controllers/userController');

route.post('/register',createUser);
route.post('/login',userLogin);
route.post('/forgot-password', userForgotPassword);
route.put('/reset-password/:token', resetPassword);


module.exports = route;

