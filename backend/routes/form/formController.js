const formService = require('./formService');

// ฟังก์ชันสำหรับสร้างแบบฟอร์ม
exports.createForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    console.log("form",form)
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

exports.getFormsById = async (req, res) => {
  try {
    // Correctly retrieve formId from request parameters
    const formId = req.params.id;
    
    // Call the service to get the form by ID
    const form = await formService.getFormsById(formId);
    
    // Return the form data as JSON
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
