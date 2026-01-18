📚 Book Tracker — Full Stack Portfolio Project

Book Tracker es una aplicación Full Stack desarrollada como proyecto de portafolio para demostrar habilidades reales en desarrollo frontend, backend, arquitectura, despliegue y consumo de APIs REST.

La aplicación permite gestionar libros (CRUD completo) y controlar su estado de lectura, utilizando tecnologías modernas y un flujo de despliegue en la nube.

🔗 Enlaces del Proyecto

🌐 Demo en Producción (Frontend)
<https://book-tracker1.netlify.app>

🔌 API Backend (FastAPI)
<https://bountiful-imagination-production.up.railway.app>

📘 Documentación Swagger
/docs

🧠 Objetivo del Proyecto

Este proyecto fue construido con fines demostrativos y educativos, enfocado en:

Diseño y consumo de APIs REST

Separación clara de responsabilidades entre frontend y backend

Manejo de estado global sin Redux

Persistencia de datos en PostgreSQL

Contenerización con Docker

Despliegue en entornos productivos (Netlify + Railway)

🧱 Arquitectura
Frontend (React + TypeScript)
│
│ Axios (REST API)
▼
Backend (FastAPI)
│
▼
PostgreSQL (Railway)

🛠️ Stack Tecnológico
Frontend

React

TypeScript

Vite

Axios

Context API

Netlify

Backend

FastAPI

Python 3.11

SQLAlchemy

Databases

PostgreSQL

Uvicorn

Docker

Railway

✨ Funcionalidades Clave

📖 Listado de libros

➕ Creación de libros

✏️ Edición de libros

🗑️ Eliminación de libros

✅ Marcar libros como leídos

🌐 Integración con API REST

🔒 Configuración de CORS para producción

🗄️ Persistencia de datos en PostgreSQL

📁 Estructura del Proyecto
book-tracker/
├── backend/
│ ├── main.py
│ ├── database.py
│ ├── models.py
│ ├── requirements.txt
│ ├── Dockerfile
│ └── .env
│
└── frontend/
├── src/
│ ├── context/
│ ├── components/
│ ├── types/
│ └── main.tsx
├── index.html
├── vite.config.ts
└── .env

⚙️ Variables de Entorno
Frontend
VITE_API_URL=<https://bountiful-imagination-production.up.railway.app>

Backend
DATABASE_URL=postgresql://user:password@host:port/database

En producción, las variables de entorno se gestionan directamente desde Netlify y Railway.

▶️ Ejecución Local
Backend
cd backend
python -m venv venv
source venv/bin/activate # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

📍 <http://127.0.0.1:8000>

Frontend
cd frontend
npm install
npm run dev

📍 <http://localhost:5173>

🔒 CORS

El backend permite solicitudes desde:

<http://localhost:5173>

<https://book-tracker1.netlify.app>

Configurado mediante CORSMiddleware en FastAPI.

📌 Endpoints Principales
Método Endpoint Descripción
GET /books Obtener libros
POST /books Crear libro
PUT /books/{id} Actualizar libro
DELETE /books/{id} Eliminar libro
📄 Documentación de la API

📘 Swagger UI → /docs

📙 ReDoc → /redoc

🚀 Despliegue

Backend

Dockerizado

Desplegado en Railway

PostgreSQL administrado por Railway

Frontend

Build con Vite

Desplegado en Netlify

🧩 Mejoras Futuras

🔐 Autenticación y autorización con JWT

👥 Gestión de usuarios

🧪 Testing automatizado (Pytest / Vitest)

🗂️ Migraciones con Alembic

🧼 Clean Architecture

👨‍💻 Autor

Juan David Valencia
Ingeniero de Software

📌 Proyecto desarrollado como parte de mi portafolio profesional.
