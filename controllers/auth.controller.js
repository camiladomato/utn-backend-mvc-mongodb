const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validar que vengan los campos requeridos
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Por favor, completa todos los campos (name, email, password)');
    }

    // 2. Controlar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('El correo electrónico ya está registrado');
    }

    // 3. Encriptar la contraseña (Seguridad)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Crear el usuario en la base de datos
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5. Generar el Token JWT firmado con su ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 6. Responder al cliente
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
    next(error); // Envía el error al middleware global
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validar campos básicos
    if (!email || !password) {
      res.status(400);
      throw new Error('Por favor, ingresa email y contraseña');
    }

    // 2. Buscar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error('Credenciales incorrectas');
    }

    // 3. Comparar la contraseña ingresada con la encriptada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error('Credenciales incorrectas');
    }

    // 4. Generar un nuevo token JWT
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