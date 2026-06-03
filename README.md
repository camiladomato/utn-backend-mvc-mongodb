# Servidor Backend Express + MongoDB (Arquitectura MVC)

Este proyecto es una API REST desarrollada con **Node.js** y **Express** para la gestión de tareas (Tasks). Implementa una arquitectura **MVC (Modelo-Vista-Controlador)**, persistencia de datos en **MongoDB** a través de Mongoose, encriptación de contraseñas con **bcryptjs**, y protección de rutas mediante tokens **JWT (JSON Web Tokens)**.

Proyecto desarrollado para el Trabajo Práctico de la **Universidad Tecnológica Nacional (UTN)**.

---

## 🛠️ Tecnologías Utilizadas

* **Node.js** & **Express** - Entorno de ejecución y framework web.
* **MongoDB** & **Mongoose** - Base de datos NoSQL y ODM para el modelado de datos.
* **JWT (jsonwebtoken)** - Autenticación basada en tokens de acceso.
* **bcryptjs** - Encriptación y cifrado seguro de contraseñas.
* **cors** - Middleware para permitir peticiones de origen cruzado.
* **dotenv** - Gestión de variables de entorno de forma segura.

---

## 📂 Estructura del Proyecto (MVC)

La arquitectura está modularizada de la siguiente manera:

```text
├── config/
│   └── db.js              # Configuración y conexión a MongoDB
├── controllers/
│   ├── auth.controller.js # Lógica de negocio para registro y login
│   └── task.controller.js # Lógica del CRUD de tareas (Entidad protegida)
├── middlewares/
│   ├── auth.middleware.js # Guardián de rutas (Validación de JWT)
│   └── error.middleware.js# Manejo centralizado y global de errores
├── models/
│   ├── User.js            # Modelo de esquema para Usuarios
│   └── Task.js            # Modelo de esquema para Tareas (Relacionado a User)
├── routes/
│   ├── auth.routes.js     # Definición de endpoints públicos de acceso
│   └── task.routes.js     # Definición de endpoints privados de tareas
├── .env.example           # Plantilla de variables de entorno requeridas
├── app.js                 # Configuración central de Express y middlewares globales
├── index.js               # Punto de entrada de la aplicación (Inicio del servidor)
└── README.md

🚀 Instalación y Ejecución
Sigue estos pasos para clonar de forma local y ejecutar el proyecto:

1. Clonar el repositorio e instalar dependencias
Bash
git clone <URL_DE_TU_REPOSITORIO>
cd utn-backend-mvc-mongodb
npm install
2. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto tomando como referencia el archivo .env.example:

Fragmento de código
PORT=5000
MONGO_URI=mongodb://localhost:27017/utn_tasks_db
JWT_SECRET=TuPalabraSecretaSuperSegura123!
NODE_ENV=development
3. Ejecutar el servidor
Para entorno de Desarrollo (con reinicio automático mediante nodemon):

Bash
npm run dev
Para entorno de Producción:

Bash
npm start
🔌 Detalle de Endpoints (API Reference)
🔓 Autenticación (Públicos)
POST /api/auth/register
Descripción: Crea una nueva cuenta de usuario y retorna sus datos junto con el token de acceso.

Cuerpo de la petición (JSON):

JSON
{
  "name": "Camila",
  "email": "camila@example.com",
  "password": "password123"
}
POST /api/auth/login
Descripción: Valida las credenciales del usuario y retorna el token JWT necesario para las rutas protegidas.

Cuerpo de la petición (JSON):

JSON
{
  "email": "camila@example.com",
  "password": "password123"
}
🔒 Entidad Protegida: Tareas (Privados)
⚠️ Requisito: Todas las siguientes peticiones requieren incluir el header:

Authorization: Bearer <TU_TOKEN_JWT>

GET /api/tasks
Descripción: Retorna una lista con únicamente las tareas que pertenezcan al usuario autenticado.

POST /api/tasks
Descripción: Crea una nueva tarea asociada automáticamente al ID del usuario que realiza la petición.

Cuerpo de la petición (JSON):

JSON
{
  "title": "Estudiar para el parcial de Backend",
  "description": "Repasar controladores, rutas e integración con Mongoose"
}
PATCH /api/tasks/:id
Descripción: Modifica los campos de una tarea específica, siempre y cuando pertenezca al usuario autenticado.

Cuerpo de la petición (JSON parcial):

JSON
{
  "completed": true
}
DELETE /api/tasks/:id
Descripción: Elimina definitivamente una tarea si el ID provisto pertenece al catálogo del usuario logueado.

🧪 Pruebas con Postman / Thunder Client
Para testear la API de forma ágil:

Importa una nueva colección en tu cliente de pruebas (Postman/Thunder Client).

Ejecuta el endpoint de Register o Login.

Copia el string del campo token que viene en la respuesta.

En las solicitudes de la entidad Tasks, dirígete a la pestaña de Auth, selecciona Bearer Token y pega el código copiado.