const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Por favor, completa todos los campos (name, email, password)');
    }

   
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('El correo electrónico ya está registrado');
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

 
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  
    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado con éxito',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    next(error); 
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      res.status(400);
      throw new Error('Por favor, ingresa email y contraseña');
    }


    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Credenciales incorrectas');
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Credenciales incorrectas');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      status: 'success',
      message: 'Login correcto',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };