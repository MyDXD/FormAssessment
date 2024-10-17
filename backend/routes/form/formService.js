const MedicalPerformanceForm = require("../../models/form/medicalPerformanceForm.model");
const Approval = require("../../models/form/approval.model");
const mongoose = require("mongoose"); // นำเข้า mongoose

// ฟังก์ชันสำหรับเลือกโมเดลที่ถูกต้องตามประเภทของฟอร์ม
const selectModel = (formType) => {
  try {
    switch (formType) {
      case "medical":
        return MedicalPerformanceForm;
      // เพิ่มฟอร์มอื่นๆ
      // case "document":
      //   return DocumentForm;
      default:
        throw new Error("Unknown form type");
    }
  } catch (error) {
    throw new Error(
      `Invalid form type: ${formType}. Please check the form type.`
    );
  }
};

// สร้างแบบฟอร์มใหม่
exports.createForm = async (formData) => {
  const model = selectModel(formData.type); // ตรวจสอบประเภทฟอร์มจากฟิลด์ `type`

  // const totalScore = formData.topics.reduce(
  //   (sum, topic) => sum + topic.score,
  //   0
  // );
  // formData.total = totalScore;

  const form = new model(formData);
  return await form.save();
};

// ดึงข้อมูลแบบฟอร์มทั้งหมดตามประเภทฟอร์ม
exports.getForms = async (formType) => {
  const model = selectModel(formType);
  return await model.find();
};

// ดึงข้อมูลแบบฟอร์มตาม id และประเภทฟอร์ม
exports.getFormById = async (formType, Id) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const form = await model.findById(Id);
    return form;
  } catch (error) {
    throw new Error("Error fetching form by ID");
  }
};

// ดึงข้อมูลแบบฟอร์มตาม id และประเภทฟอร์ม
exports.getFormsByStudentId = async (formType, studentId) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const form = await model.find({student : studentId});
    return form;
  } catch (error) {
    throw new Error("Error fetching form by ID");
  }
};

// อัปเดตข้อมูลแบบฟอร์มตาม id และประเภทฟอร์ม
exports.updateFormById = async (formType, Id, updatedData) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const updatedForm = await model.findByIdAndUpdate(Id, updatedData, {
      new: true,
    });
    return updatedForm;
  } catch (error) {
    throw new Error("Error updating form by ID");
  }
};

// อัปเดตข้อมูลแบบฟอร์ม status success ตาม id และประเภทฟอร์ม
exports.sendFormById = async (formType, Id, updatedData) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const updatedForm = await model.findByIdAndUpdate(Id, updatedData, {
      new: true,
    });
    return updatedForm;
  } catch (error) {
    throw new Error("Error sending form by ID");
  }
};

// ฟังก์ชันค้นหาแบบฟอร์มที่ต้องอนุมัติโดย teacherId
exports.getFormsForApproval = async (formType, teacherId) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const forms = await model.find({ approver: teacherId });
    return forms; // คืนค่า forms ที่พบ
  } catch (error) {
    throw new Error("Error fetching forms for approval");
  }
};

// ฟังก์ชันอนุมัติฟอร์มที่ได้รับมอบหมาย
exports.approveForm = async (formType, formId, teacherId) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const form = await model.findById(formId).populate("approver approvals");

    if (!form) {
      throw new Error("Form not found");
    }
    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    // ตรวจสอบว่าผู้ใช้งานเป็นหนึ่งในผู้อนุมัติ

    const isApprover = form.approver.some((approver) =>
      approver.equals(teacherObjectId)
    );

    console.log(isApprover);

    if (!isApprover) {
      throw new Error("You are not authorized to approve this form");
    }

    console.log("ผ่าน");

    // ตรวจสอบว่าผู้อนุมัติคนนี้ได้อนุมัติไปแล้วหรือยัง
    const existingApproval = await Approval.findOne({
      form: formId,
      approver: teacherId,
    });
    if (existingApproval) {
      throw new Error("You have already approved this form");
    }

    // สร้างการอนุมัติใหม่
    const newApproval = new Approval({
      form: formId,
      approver: teacherId,
      status: "approved",
      approvedAt: new Date(),
    });
    await newApproval.save();

    // เพิ่มการอนุมัติลงในฟอร์ม
    form.approvals.push(newApproval._id);

    // ตรวจสอบว่ามีผู้อนุมัติครบหรือยัง
    if (form.approvals.length === form.approver.length) {
      form.status = "approved"; // เปลี่ยนสถานะเป็น "approved" เมื่อครบแล้ว
    }

    // บันทึกการเปลี่ยนแปลง
    await form.save();

    return form;
  } catch (error) {
    throw new Error(`Error approving form: ${error.message}`);
  }
};
