📚 Book Tracker

Aplicación Full Stack para gestionar libros (CRUD), desarrollada con React + TypeScript en el frontend y FastAPI + PostgreSQL en el backend.
El frontend está desplegado en Netlify y el backend en Railway.

🚀 Demo en Producción

🌐 Frontend (Netlify)
👉 <https://book-tracker1.netlify.app>

⚙️ Backend API (Railway)
👉 <https://bountiful-imagination-production.up.railway.app>

👉 Swagger Docs: /docs
`🧱 Arquitectura
Frontend (React + Vite + TS)
|
| Axios (REST)
|
Backend (FastAPI)
|
| SQLAlchemy + Databases
|
PostgreSQL (Railway)`
🛠️ Tecnologías
Frontend

React

TypeScript

Vite

Axios

Context API

Netlify (deploy)

Backend

FastAPI

Python 3.11

SQLAlchemy

Databases

PostgreSQL

Uvicorn

Docker

Railway (deploy)

📦 Funcionalidades

✔️ Listar libros
✔️ Crear libros
✔️ Editar libros
✔️ Eliminar libros
✔️ Estado de lectura
✔️ Persistencia en base de datos
✔️ CORS configurado para producción
`📁 Estructura del Proyecto
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
└── .env`
⚙️ Variables de Entorno
Frontend (frontend/.env)
VITE_API_URL=<https://bountiful-imagination-production.up.railway.app>

Backend (backend/.env)
DATABASE_URL=postgresql://user:password@host:port/database

📌 En producción, estas variables se configuran directamente en Railway y Netlify.

▶️ Ejecutar el Proyecto en Local
1️⃣ Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

Backend disponible en:

<http://127.0.0.1:8000>

2️⃣ Frontend
cd frontend
npm install
npm run dev

Frontend disponible en:

<http://localhost:5173>

🔒 CORS

El backend está configurado para aceptar peticiones desde:

<http://localhost:5173>

<https://book-tracker1.netlify.app>

📌 Endpoints Principales
Método Endpoint Descripción
GET /books Obtener libros
POST /books Crear libro
PUT /books/{id} Actualizar libro
DELETE /books/{id} Eliminar libro
📄 Documentación API

FastAPI genera documentación automática:

Swagger UI → /docs

ReDoc → /redoc

🚀 Deploy
Backend

Dockerizado

Deploy en Railway

PostgreSQL gestionado por Railway

Frontend

Build con Vite

Deploy en Netlify

Variables de entorno configuradas en Netlify

📌 Próximas Mejoras

🔐 Autenticación con JWT

👤 Usuarios y sesiones

🧪 Tests (Pytest + Vitest)

📦 Migraciones con Alembic

🧹 Clean Architecture

👨‍💻 Autor

Proyecto desarrollado por:
Juan David Valencia
Ingeniero de Software
