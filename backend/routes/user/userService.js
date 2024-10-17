const User = require("../../models/user.model"); // นำเข้าโมเดล User

// Service สำหรับดึงข้อมูลผู้ใช้ที่มี role เป็น "teacher"
exports.getTeachers = async () => {
  return await User.find({ role: "teacher" }); // ค้นหาผู้ใช้ที่มี role เป็น "teacher"
};
// Service สำหรับดึงข้อมูลผู้ใช้ที่มี role เป็น "teacher"
exports.getUserById = async (userId) => {
  const userdetail = await User.findById(userId).select('-password'); // ไม่แสดงฟิลด์ password
  return userdetail;
};
