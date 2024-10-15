const express = require('express');
const router = express.Router();
const formController = require('./formController');

// เส้นทางสำหรับสร้างแบบฟอร์ม
router.post('/create', formController.createForm);

// เส้นทางสำหรับดึงแบบฟอร์มทั้งหมด
router.get('/', formController.getForms);
router.get('/:id', formController.getFormsById);

// แก้ไขฟอร์ม
router.put('/:id', formController.updateFormById);


module.exports = router;
