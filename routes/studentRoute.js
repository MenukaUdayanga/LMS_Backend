const express = require('express');
const route = express.Router();
const {addStudent,getAllStudents,deleteStudent,updateStudent} = require('../controllers/studentContoller');
const authMiddleware = require('../middlewares/authMiddleware');

route.post('/add',authMiddleware,addStudent);
route.get('/getAll/:id',authMiddleware,getAllStudents);
route.delete('/delete/:id',authMiddleware,deleteStudent);
route.put('/update/:id',authMiddleware,updateStudent);



module.exports = route;


