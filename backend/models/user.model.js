const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    education: { type: String, required: true }, //สถาบันที่สำเร็จการศึกษา
    graduationYear: { type: String, required: true }, //ปีที่สำเร็จการศึกษา
    hospital: { type: String, required: true }, // ปฏิบัติงานโรงพยาบาล
    province: { type: String, required: true }, // จังหวัด
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student", // ค่าเริ่มต้นคือ "student" ถ้าไม่มีการส่งมา
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
