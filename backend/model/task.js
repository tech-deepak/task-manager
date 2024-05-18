const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
