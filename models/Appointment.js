const mongoose = require("mongoose");

const appointSchema = new mongoose.Schema(
  {
    doctorName: {
      type: String,
      required: true,
    },
    usersId: {
      type: String,
      required: true,
    },
    appoint_date: {
      type: String, 
      required: true,
    },
    appoint_time: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["online", "offline"], 
    },
    des: {
      type: String,
      required: true,
    },
    is_delete: {
      type: Boolean,
      default: false, 
    },
    is_approve: {
      type: Boolean,
      default: true, 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Appointment", appointSchema);
