const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    usersId: {
      type: String,
      required: true,
    },
    create_date: {
      type: String, 
      required: true,
    },
    create_time: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    is_delete: {
      type: Boolean,
      default: false, 
    }
  }
);

module.exports = mongoose.model("Student", studentSchema);
