const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  formsSubmitted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
});

module.exports = mongoose.model('Student', studentSchema);
