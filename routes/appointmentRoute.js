const express = require('express');
const route = express.Router();
const {addAppointment,getAllAppintment,updateAppointment,deleteAppointment,appointmentGetById,appointmentGetByDoctorName,appointmentCancelByDoctorName} = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

route.post('/add',authMiddleware,addAppointment);
route.get('/getAll/:id',authMiddleware,getAllAppintment);
route.put('/update/:id',authMiddleware,updateAppointment);
route.delete('/delete/:id',authMiddleware,deleteAppointment);
route.get('/getById/:id',authMiddleware,appointmentGetById);
route.post('/doctorName',authMiddleware,appointmentGetByDoctorName);
route.put('/doctorCancel/:id',authMiddleware,appointmentCancelByDoctorName);
// route.get('/search',authMiddleware,searchCategory);




module.exports = route;


