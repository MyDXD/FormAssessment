const MedicalPerformanceForm = require('../../models/form/medicalPerformanceForm.model');

// สร้างแบบฟอร์มใหม่
exports.createForm = async (formData) => {
  console.log("back",formData);
  const form = new MedicalPerformanceForm(formData);
  return await form.save();
};

// ดึงข้อมูลแบบฟอร์มทั้งหมด
exports.getForms = async () => {
  return await MedicalPerformanceForm.find();
};
// ดึงข้อมูลแบบฟอร์มทั้งหมด
exports.getFormsById = async (Id) => {
  try {
    // Find the form by ID in the database
    const form = await MedicalPerformanceForm.findById(Id);
    
    // Return the form if found
    return form;
  } catch (error) {
    throw new Error('Error fetching form by ID');
  }
};