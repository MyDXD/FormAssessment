var express = require('express');
var router = express.Router();
const userController = require('./userController'); // นำเข้า controller

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ที่มี role เป็น teacher
router.get('/teachers', userController.getTeachers);
router.get('/:userid', userController.getUserById);


module.exports = router;
