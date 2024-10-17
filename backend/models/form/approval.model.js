const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// โมเดลการอนุมัติ
const approvalSchema = new Schema({
  form: { type: Schema.Types.ObjectId, ref: 'Form', required: true }, // ฟอร์มที่อนุมัติ
  approver: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // ผู้ที่อนุมัติ
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // สถานะการอนุมัติ
  approvedAt: { type: Date }, // เวลาที่อนุมัติ
}, { timestamps: true });

module.exports = mongoose.model('Approval', approvalSchema);
