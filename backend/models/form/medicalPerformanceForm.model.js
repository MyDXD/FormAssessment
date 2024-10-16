const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicalPerformanceSchema = new Schema(
  {
    //ส่วนที่ 1 ข้อมูลทั่วไป
    title: { type: String, required: true }, // คำนำหน้า
    prefix: { type: String, required: true }, // คำนำหน้า
    firstName: { type: String, required: true }, //ชื่อ
    lastName: { type: String, required: true }, //นามสกุล
    student: {
      type: Schema.Types.ObjectId, // ลิงก์กับ student ที่ส่งฟอร์ม
      ref: "User",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId, // ลิงก์กับ teacher ที่อนุมัติฟอร์ม
      ref: "User",
    },
    education: { type: String, required: true }, //สถาบันที่สำเร็จการศึกษา
    graduationYear: { type: String, required: true }, //ปีที่สำเร็จการศึกษา
    hospital: { type: String, required: true }, // ปฏิบัติงานโรงพยาบาล
    province: { type: String, required: true }, // จังหวัด
    scheduleWork: { type: String, required: true }, // กำหนดการปฏิบัติงาน
    startDate1: { type: Date, required: true }, //วันเริ่ม
    endDate1: { type: Date, required: true }, //วันจบ

    // กลุ่มงาน
    departmentInfo: {
      department: { type: String, required: true },
      details: {
        // ข้อมูลเพิ่มเติมที่เปลี่ยนไปตาม department
        hospitalName: { type: String }, // ใช้เมื่อเลือกโรงพยาบาลชุมชน
        bedSize: { type: Number }, // ใช้เมื่อเลือกโรงพยาบาลชุมชน
        electiveSubject: { type: String }, // ใช้เมื่อเลือกวิชาเลือก
      },
    },

    //ส่วนที่ 2
    periodWork: { type: String, required: true }, // ระยะเวลาปฏิบัติงาน
    startDate2: { type: Date, required: true },
    endDate2: { type: Date, required: true },

    sickLeave: { type: Number, required: true }, // ลาป่วย...วัน
    personalLeave: { type: Number, required: true }, // ลากิจ...วัน
    withoutLeave: { type: Number, required: true }, // ขาดงานไม่มีการลา...วัน
    workPercentage: { type: Number, required: true }, // ระยะเวลาปฏิบัติงานร้อยละ
    withoutNotification: { type: Number, required: true }, // ไม่อยู่เวรโดยไม่แจ้งให้ทราบ

    //ส่วนที่ 3 การประเมินผล
    topics: [
      {
        score: { type: Number, required: true }, // ชื่อหัวข้อย่อย
      },
    ],
    total: {
      type: Number, // เก็บผลรวมของคะแนน
      required: true,
      default: 0,
    },

    report: { type: String }, // ข้อควรปรับปรุง

    //สถานะเอกสาร
    status: {
      type: String,
      enum: ["new", "success"],
      default: "new",
    },
  },
  {
    type: { type: String, required: true }, // ชนิดเอกสาร
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "MedicalPerformanceForm",
  medicalPerformanceSchema
);
