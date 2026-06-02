const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  title: { 
    type: String, 
    required: [true, 'El título de la tarea es obligatorio'],
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { 
  timestamps: true 
});

module.exports = model('Task', TaskSchema);