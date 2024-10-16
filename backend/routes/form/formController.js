const formService = require('./formService');

// ฟังก์ชันสำหรับสร้างแบบฟอร์ม
exports.createForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    const { type } = req.body; // 

    console.log(type)
    res.status(201).json({ message: 'Form created successfully', data : form , type : type});
  } catch (error) {
    res.status(400).json({ error: 'Error creating form', details: error });
  }
};

// ฟังก์ชันสำหรับดึงแบบฟอร์มทั้งหมด
exports.getForms = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    const forms = await formService.getForms(type);
    res.status(200).json({data : forms});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching forms', details: error.message ,type : type});
  }
};


// ฟังก์ชันสำหรับดึงแบบฟอร์มตาม id
exports.getFormsById = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    const formId = req.params.id;
    
    const form = await formService.getFormById(type , formId);
    
    if (form) {
      res.status(200).json({data : form , type : type});
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
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    const formId = req.params.id;
    const updatedData = req.body; // ข้อมูลที่ต้องการอัปเดตส่งมาจาก request body

    const updatedForm = await formService.updateFormById(type ,formId, updatedData);

    if (updatedForm) {
      res.status(200).json({data : updatedForm, type : type});
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
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    const formId = req.params.id;
    const updatedData = req.body; 
    const sendForm = await formService.sendFormById(type ,formId, updatedData);

    if (sendForm) {
      res.status(200).json({data : sendForm , type : type});
    } else {
      res.status(404).json({ message: 'Form not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating form', details: error.message });
  }
};
