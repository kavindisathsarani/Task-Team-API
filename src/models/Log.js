const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  action: String,
  by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  meta: Object
}, { timestamps: true });

module.exports = mongoose.model('Log', LogSchema);
