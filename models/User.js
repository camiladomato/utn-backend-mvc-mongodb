const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  email: { 
    type: String, 
    required: [true, 'El correo es obligatorio'], 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es obligatoria'] 
  }
}, { 
  timestamps: true 
});

module.exports = model('User', UserSchema);