const Student = require('../models/Student');

exports.addStudent = async (req, res) => {
    try {
      console.log("Student data:", req.body);
  
      const {
        studentName,
        usersId,
        create_date,
        create_time,
        grade,
        age
      } = req.body;
  
      if (
        !studentName ||
        !usersId ||
        !create_date ||
        !create_time ||
        !grade ||
        !age
      ) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
  
      const student = new Student({
        studentName,
        usersId,
        create_date,
        create_time,
        grade,
        age,
        is_delete: req.body.is_delete ?? false
      });
  
      const studentSave = await student.save();
  
      return res.status(201).json({
        message: "Student added successfully",
        studentSave: studentSave,
      });
    } catch (error) {
      console.error("Error in adding Student:", error);
      return res
        .status(500)
        .json({ message: "Server error, please try again later" });
    }
  };


  exports.getAllStudents = async (req, res) => {
    try {
  
      const {id} = req.params;
  
      const students = await Student.find({ is_delete: false,usersId:id });
      
      return res.status(200).json({
        message: "Fetched students successfully",
        students: students,
      });
  
    } catch (error) {
      console.error("Error gettting students:", error);
      return res.status(500).json({ message: "Server error, please try again later" });
    }
  };


  exports.deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
  
      console.log("Student delete ID:", id);
  
    
      const existingStudent = await Student.findById(id);
      console.log("Appointment object:", existingStudent);
  
      if (!existingStudent) {
        console.log("Student ID does not exist.");
        return res.status(404).json({ message: "This student does not exist!" });
      }
  
      await Student.deleteOne({ _id: id });
      console.log("Student deleted successfully.");
  
      return res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
      console.error("Error deleting appointment:", error);
      return res.status(500).json({ message: "Server error, please try again later." });
    }
  };


  exports.updateStudent = async (req, res) => {
  
    try {
  
      console.log("Student data:", req.body);
  
      const { studentName,
        create_date,
        create_time,
        grade,
        age} = req.body;
      const {id} = req.params;
  
      console.log("Student Id : ",id);
  
  
      const exitStudent =  await Student.findById(id);
      console.log("Student object : ",exitStudent);
  
      if(!exitStudent){
        return res.status(404).json({ message: "Student not found!" });
      }
  
      if (studentName) exitStudent.studentName = studentName;
      if (create_date) exitStudent.create_date = create_date;
      if (create_time) exitStudent.create_time = create_time;
      if (grade) exitStudent.grade = grade;
      if (age) exitStudent.age = age;
      
      
  
      const updateStudent = await exitStudent.save();
  
      return res.status(200).json({
        message: "Student updated successfully",
        category: updateStudent,
      });
      
      }
  
    catch (error) {
      console.error("Error updating student:", error);
      return res.status(500).json({ message: "Server error, please try again later" });
    }
  };
  
  