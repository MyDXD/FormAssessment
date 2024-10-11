const MedicalPerformanceForm = require('../../models/form/medicalPerformanceForm.model');

// สร้างแบบฟอร์มใหม่
exports.createForm = async (formData) => {
  const form = new MedicalPerformanceForm(formData);
  return await form.save();
};

// ดึงข้อมูลแบบฟอร์มทั้งหมด
exports.getForms = async () => {
  return await MedicalPerformanceForm.find();
};
