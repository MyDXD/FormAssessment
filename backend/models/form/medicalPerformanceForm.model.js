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
      type: Schema.Types.ObjectId, //student ที่ส่งฟอร์ม
      ref: "User",
      required: true,
    },
    approver: [
      // ผู้ที่อนุมัติฟอร์ม
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    approvals: [
      //  ผู้ที่อนุมัติแล้ว
      {
        type: Schema.Types.ObjectId,
        ref: "Approval",
      },
    ],
    education: { type: String, required: false }, //สถาบันที่สำเร็จการศึกษา
    graduationYear: { type: String, required: false }, //ปีที่สำเร็จการศึกษา
    hospital: { type: String, required: false }, // ปฏิบัติงานโรงพยาบาล
    province: { type: String, required: false }, // จังหวัด
    scheduleWork: { type: String, required: false }, // กำหนดการปฏิบัติงาน
    startDate1: { type: Date, required: false }, //วันเริ่ม
    endDate1: { type: Date, required: false }, //วันจบ

    // กลุ่มงาน
    departmentInfo: {
      department: { type: String, required: false },
      details: {
        // ข้อมูลเพิ่มเติมที่เปลี่ยนไปตาม department
        hospitalName: { type: String }, // ใช้เมื่อเลือกโรงพยาบาลชุมชน
        bedSize: { type: Number }, // ใช้เมื่อเลือกโรงพยาบาลชุมชน
        electiveSubject: { type: String }, // ใช้เมื่อเลือกวิชาเลือก
      },
    },

    //ส่วนที่ 2
    periodWork: { type: String, required: false }, // ระยะเวลาปฏิบัติงาน
    startDate2: { type: Date, required: false },
    endDate2: { type: Date, required: false },

    sickLeave: { type: Number, required: false }, // ลาป่วย...วัน
    personalLeave: { type: Number, required: false }, // ลากิจ...วัน
    withoutLeave: { type: Number, required: false }, // ขาดงานไม่มีการลา...วัน
    workPercentage: { type: Number, required: false }, // ระยะเวลาปฏิบัติงานร้อยละ
    withoutNotification: { type: Number, required: false }, // ไม่อยู่เวรโดยไม่แจ้งให้ทราบ

    //ส่วนที่ 3 การประเมินผล
    topics: [
      {
        score: { type: Number, required: false , default : 0}, // ชื่อหัวข้อย่อย
      },
    ],
    total: {
      type: Number, // เก็บผลรวมของคะแนน
      required: false,
      default: 0,
    },

    report: { type: String }, // ข้อควรปรับปรุง

    //สถานะเอกสาร
    status: {
      type: String,
      enum: ["new", "approved"],
      default: "new",
    },
    type: { type: String, required: true }, // ชนิดเอกสาร
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "MedicalPerformanceForm",
  medicalPerformanceSchema
);
