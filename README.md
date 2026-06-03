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

Realizado por Camila Domato. Para UTN.