const express = require('express');
const router = express.Router();
const formController = require('./formController');

// เส้นทางสำหรับสร้างแบบฟอร์ม
router.post('/create', formController.createForm);

// เส้นทางสำหรับดึงแบบฟอร์มทั้งหมด
router.get('/', formController.getForms);

module.exports = router;
