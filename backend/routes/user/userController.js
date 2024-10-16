const userService = require('./userService'); // นำเข้า service

// Controller สำหรับดึงข้อมูลของผู้ใช้ที่มี role เป็น "teacher"
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await userService.getTeachers(); // เรียกใช้ service

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ error: "No teachers found" });
    }

    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching teachers", details: error.message });
  }
};
