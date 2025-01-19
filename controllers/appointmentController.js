const Appointment = require('../models/Appointment');

exports.addAppointment = async (req, res) => {
  try {
    console.log("Appoint data:", req.body);

    const {
      doctorName,
      usersId,
      appoint_date,
      appoint_time,
      type,
      des,
      is_delete,
      is_approve,
    } = req.body;

    if (
      !doctorName ||
      !usersId ||
      !appoint_date ||
      !appoint_time ||
      !type ||
      !des
    ) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const appointment = new Appointment({
      doctorName,
      usersId,
      appoint_date,
      appoint_time,
      type,
      des,
      is_delete: is_delete ?? false, 
      is_approve: is_approve ?? false, 
    });

    const appointmentSave = await appointment.save();

    return res.status(201).json({
      message: "Appointment added successfully",
      appointment: appointmentSave,
    });
  } catch (error) {
    console.error("Error in adding appointment:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};


// Get all appointment

exports.getAllAppintment = async (req, res) => {
  try {

    const {id} = req.params;

    const appointments = await Appointment.find({ is_delete: false,usersId:id });
    
    return res.status(200).json({
      message: "Fetched appointment successfully",
      appointments: appointments,
    });

  } catch (error) {
    console.error("Error updating appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

// Update appointment

exports.updateAppointment = async (req, res) => {

  try {

    console.log("Appoint data:", req.body);

    const {doctorName,appoint_date,appoint_time,type,des} = req.body;
    const {id} = req.params;

    console.log("Appointment Id : ",id);


    const exitAppointment =  await Appointment.findById(id);
    console.log("Appointment object : ",exitAppointment);

    if(!exitAppointment){
      return res.status(404).json({ message: "This appointment does not exist!" });
    }

    if (doctorName) exitAppointment.doctorName = doctorName;
    if (appoint_date) exitAppointment.appoint_date = appoint_date;
    if (appoint_time) exitAppointment.appoint_time = appoint_time;
    if (type) exitAppointment.type = type;
    if (des) exitAppointment.des = des;
    

    const updateAppointment = await exitAppointment.save();

    return res.status(200).json({
      message: "Appointment updated successfully",
      category: updateAppointment,
    });
    
    }

  catch (error) {
    console.error("Error updating appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


// Delete appointment


exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Appointment delete ID:", id);

  
    const existingAppointment = await Appointment.findById(id);
    console.log("Appointment object:", existingAppointment);

    if (!existingAppointment) {
      console.log("Appointment ID does not exist.");
      return res.status(404).json({ message: "This appointment does not exist!" });
    }

    await Appointment.deleteOne({ _id: id });
    console.log("Appointment deleted successfully.");

    return res.status(200).json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};


// Appointment get by id

exports.appointmentGetById = async (req, res) => {
  try {

    const {id} = req.params;

    const appointments = await Appointment.find({ is_delete: false,_id:id });
    
    return res.status(200).json({
      message: "Fetched single appointment successfully",
      appointment: appointments,
    });

  } catch (error) {
    console.error("Error fetching appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


// Appointment get by doctorName

exports.appointmentGetByDoctorName = async (req, res) => {
  try {

    const {doctorName} = req.body;

    const appointments = await Appointment.find({ is_delete: false,is_approve: false,doctorName:doctorName });
    
    return res.status(200).json({
      message: "Fetched doctor appointment successfully",
      appointments: appointments,
    });

  } catch (error) {
    console.error("Error fetching appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};


exports.appointmentCancelByDoctorName = async (req, res) => {
  try {
    const { id } = req.params; 

    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required." });
    }

    const appointment = await Appointment.findOne({ is_delete: false, _id: id });

    if (!appointment) {
      console.log("Appointment ID does not exist.");
      return res.status(404).json({ message: "This appointment does not exist!" });
    }

    appointment.is_approve = true;

    const updatedAppointment = await appointment.save();

    return res.status(200).json({
      message: "Appointment canceled successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};
