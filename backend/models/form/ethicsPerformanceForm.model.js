const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalPerformanceSchema = new Schema(
  {
    //ส่วนที่ 1 ข้อมูลทั่วไป
    medicName : { type: String, required: true }, // ชื่อแพทย์
    assessorName: { type: String, required: true }, //ชื่อผู้ประเมิน
    lastName: { type: String, required: true }, //นามสกุล
    education: { type: String, required: true }, //สถาบันที่สำเร็จการศึกษา
    graduationYear: { type: String, required: true }, //ปีที่สำเร็จการศึกษ

  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalPerformanceForm",medicalPerformanceSchema);
