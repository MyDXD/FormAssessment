const formService = require('./formService');

// ฟังก์ชันสำหรับสร้างแบบฟอร์ม
exports.createForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    res.status(201).json({ message: 'Form created successfully', form });
  } catch (error) {
    res.status(400).json({ error: 'Error creating form', details: error });
  }
};

// ฟังก์ชันสำหรับดึงแบบฟอร์มทั้งหมด
exports.getForms = async (req, res) => {
  try {
    const forms = await formService.getForms();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forms', details: error });
  }
};
