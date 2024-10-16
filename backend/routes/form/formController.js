const formService = require("./formService");

// ฟังก์ชันสำหรับสร้างแบบฟอร์ม
exports.createForm = async (req, res) => {
  try {
    const form = await formService.createForm(req.body);
    const { type } = req.body; //
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }

    res
      .status(201)
      .json({ message: "Form created successfully", data: form, type: type });
  } catch (error) {
    res.status(400).json({ error: "Error creating form", details: error });
  }
};

// ฟังก์ชันสำหรับดึงแบบฟอร์มทั้งหมด
exports.getForms = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const forms = await formService.getForms(type);
    res.status(200).json({ data: forms });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching forms", details: error.message });
  }
};

// ฟังก์ชันสำหรับดึงแบบฟอร์มตาม id
exports.getFormsById = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const formId = req.params.id;

    const form = await formService.getFormById(type, formId);

    if (form) {
      res.status(200).json({ data: form, type: type });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    // Error handling
    res
      .status(500)
      .json({ error: "Error fetching form", details: error.message });
  }
};

// ฟังก์ชันสำหรับดึงแบบฟอร์ม ของ student
exports.getFormsByStudentId = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const studentId = req.params.studentId;
    const form = await formService.getFormsByStudentId(type, studentId);

    if (form) {
      res.status(200).json({ data: form, type: type });
    } else {
      res.status(404).json({ message: "Form not found" });
    }

  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching form", details: error.message });
  }
};

// ฟังก์ชันสำหรับอัปเดตแบบฟอร์มตาม id
exports.updateFormById = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const formId = req.params.formId;
    const teacherId = req.params.teacherId;
    const updatedData = req.body; // ข้อมูลที่ต้องการอัปเดตส่งมาจาก request body

    const updatedForm = await formService.updateFormById(
      type,
      formId,
      updatedData,
      teacherId
    );

    if (updatedForm) {
      res.status(200).json({ data: updatedForm, type: type });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    // Error handling
    res
      .status(500)
      .json({ error: "Error updating form", details: error.message });
  }
};

// ฟังก์ชันสำหรับอัปเดตแบบฟอร์มตาม id
exports.sendFormById = async (req, res) => {
  try {
    const { type } = req.query; // รับประเภทฟอร์มจาก query parameter
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const formId = req.params.formId;
    const teacherId = req.params.teacherId;
    const updatedData = req.body;
    const sendForm = await formService.sendFormById(type, formId, updatedData, teacherId);

    if (sendForm) {
      res.status(200).json({ data: sendForm, type: type });
    } else {
      res.status(404).json({ message: "Form not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating form", details: error.message });
  }
};

// ฟังก์ชันดึงข้อมูลฟอร์มที่ teacher ต้องอนุมัติ
exports.getFormsForApproval = async (req, res) => {
  try {
    
    // ดึง type จาก query parameter
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const teacherId = req.params.teacherId

    // เรียกใช้ service เพื่อนำฟอร์มที่ต้องอนุมัติมาแสดง
    const form = await formService.getFormsForApproval(type, teacherId);

    if (!form) {
      return res.status(404).json({ message: "Form not found or not for this teacher" });
    }

    // ส่งกลับข้อมูลฟอร์มที่ต้องอนุมัติ
    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching forms", details: error.message });
  }
};

// ฟังก์ชันดึงข้อมูลฟอร์มที่ teacher ต้องอนุมัติ (เฉพาะใบที่เลือก)
exports.getFormsForApprovalByIdForm = async (req, res) => {
  try {
    // ดึง type จาก query parameter
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }
    const teacherId = req.params.teacherId
    const formId = req.params.formId

    // เรียกใช้ service เพื่อนำฟอร์มที่ต้องอนุมัติมาแสดง
    const form = await formService.getFormsForApprovalByIdForm(type, teacherId, formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found or not for this teacher" });
    }

    // ส่งกลับข้อมูลฟอร์มที่ต้องอนุมัติ
    res.status(200).json(form);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching forms", details: error.message });
  }
};


exports.approveForm = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({
        message: "Error: form type is required",
      });
    }

    const formId = req.params.formId;
    const teacherId = req.params.teacherId;
    

    // เรียกใช้ service เพื่ออนุมัติฟอร์ม
    const form = await formService.approveForm(type ,formId, teacherId);

    res.status(200).json({ message: "Form approved successfully", form });
  } catch (error) {
    res.status(500).json({ error: "Error approving form", details: error.message });
  }
};
