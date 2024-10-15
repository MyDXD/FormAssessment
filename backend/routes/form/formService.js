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


// ดึงข้อมูลแบบฟอร์มที่เลือก ตาม id
exports.getFormsById = async (Id) => {
  try {
    const form = await MedicalPerformanceForm.findById(Id);
    
    return form;
  } catch (error) {
    throw new Error('Error fetching form by ID');
  }
};

// อัปเดตข้อมูลแบบฟอร์มตาม id
exports.updateFormById = async (Id, updatedData) => {
  try {
    const updatedForm = await MedicalPerformanceForm.findByIdAndUpdate(Id, updatedData, { new: true });

    return updatedForm;
  } catch (error) {
    throw new Error('Error updating form by ID');
  }
};

// อัปเดตข้อมูลแบบฟอร์ม status succes
exports.sendFormById = async (Id, updatedData) => {
  try {

    const updatedForm = await MedicalPerformanceForm.findByIdAndUpdate(Id, updatedData, { new: true });

    return updatedForm;
  } catch (error) {
    throw new Error('Error send form by ID');
  }
};
