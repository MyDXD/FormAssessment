const MedicalPerformanceForm = require("../../models/form/medicalPerformanceForm.model");
// เพิ่มโมเดลอื่นที่ต้องการ
// const DocumentForm = require("../../models/form/documentForm.model");

// ฟังก์ชันสำหรับเลือกโมเดลที่ถูกต้องตามประเภทของฟอร์ม
const selectModel = (formType) => {
  switch (formType) {
    case "medical":
      return MedicalPerformanceForm;
    // กรณีที่เพิ่มฟอร์มอื่น
    // case "document":
    //   return DocumentForm;
    default:
      throw new Error("Unknown form type");
  }
};

// สร้างแบบฟอร์มใหม่
exports.createForm = async (formData) => {
  const model = selectModel(formData.type); // ตรวจสอบประเภทฟอร์มจากฟิลด์ `type`
  const form = new model(formData); // ใช้โมเดลที่เลือก
  return await form.save();
};

// ดึงข้อมูลแบบฟอร์มทั้งหมดตามประเภทฟอร์ม
exports.getForms = async (formType) => {
  const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
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

// อัปเดตข้อมูลแบบฟอร์มตาม id และประเภทฟอร์ม
exports.updateFormById = async (formType, Id, updatedData) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    console.log(model)
    const updatedForm = await model.findByIdAndUpdate(Id, updatedData, { new: true });
    return updatedForm;
  } catch (error) {
    throw new Error("Error updating form by ID");
  }
};

// อัปเดตข้อมูลแบบฟอร์ม status success ตาม id และประเภทฟอร์ม
exports.sendFormById = async (formType, Id, updatedData) => {
  try {
    const model = selectModel(formType); // เลือกโมเดลที่ถูกต้อง
    const updatedForm = await model.findByIdAndUpdate(Id, updatedData, { new: true });
    return updatedForm;
  } catch (error) {
    throw new Error("Error sending form by ID");
  }
};
