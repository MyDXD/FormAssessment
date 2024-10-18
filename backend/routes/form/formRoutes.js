const express = require('express');
const router = express.Router();
const formController = require('./formController');

// เส้นทางสำหรับสร้างแบบฟอร์ม
router.post('/create', formController.createForm);

// เส้นทางสำหรับดึงแบบฟอร์มทั้งหมด
router.get('/', formController.getForms);
router.get('/:id', formController.getFormsById);
router.get('/student/:studentId', formController.getFormsByStudentId);

//ดูฟอร์มที่ต้องอนุมัติ
router.get('/pending-approval/:teacherId', formController.getFormsForApproval); //ดูทั้งหมด
router.get('/pending-approval/:formId/:teacherId', formController.getFormsForApprovalByIdForm); //ดูใบที่เลือก

// แก้ไขฟอร์ม
router.put('/:formId/:teacherId', formController.updateFormById);
router.patch('/:formId/:teacherId', formController.sendFormById);


//อนุมัติฟอร์มที่ตัวเองได้รับมอบหมาย
router.post('/approve/:formId/:teacherId', formController.approveForm);



module.exports = router;
