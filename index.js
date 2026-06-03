
const { webcrypto } = require('crypto');
if (webcrypto && !globalThis.crypto) {
  globalThis.crypto = webcrypto;
} else if (webcrypto && globalThis.crypto && !globalThis.crypto.getRandomValues) {
  globalThis.crypto.getRandomValues = webcrypto.getRandomValues.bind(webcrypto);
}


const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT || 5000;


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('No se pudo iniciar el servidor debido a un error en la BD:', error.message);
});