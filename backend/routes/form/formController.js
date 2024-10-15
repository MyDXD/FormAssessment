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


// ฟังก์ชันสำหรับดึงแบบฟอร์มตาม id
exports.getFormsById = async (req, res) => {
  try {
    const formId = req.params.id;
    
    const form = await formService.getFormsById(formId);
    
    if (form) {
      res.status(200).json(form);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    // Error handling
    res.status(500).json({ error: 'Error fetching form', details: error.message });
  }
};

// ฟังก์ชันสำหรับอัปเดตแบบฟอร์มตาม id
exports.updateFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedData = req.body; // ข้อมูลที่ต้องการอัปเดตส่งมาจาก request body

    const updatedForm = await formService.updateFormById(formId, updatedData);

    if (updatedForm) {
      res.status(200).json(updatedForm);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    // Error handling
    res.status(500).json({ error: 'Error updating form', details: error.message });
  }
};

// ฟังก์ชันสำหรับอัปเดตแบบฟอร์มตาม id
exports.sendFormById = async (req, res) => {
  try {
    const formId = req.params.id;
    const updatedData = req.body; // ข้อมูลที่ต้องการอัปเดตส่งมาจาก request body

    const sendForm = await formService.sendFormById(formId, updatedData);

    if (sendForm) {
      res.status(200).json(sendForm);
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    // Error handling
    res.status(500).json({ error: 'Error updating form', details: error.message });
  }
};
