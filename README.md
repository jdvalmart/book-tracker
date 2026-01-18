# 📚 Book Tracker — Full Stack Portfolio Project

**Book Tracker** es una aplicación **Full Stack** desarrollada como
proyecto de portafolio para demostrar habilidades reales en desarrollo
frontend, backend, arquitectura, despliegue y consumo de APIs REST.

La aplicación permite gestionar libros mediante un CRUD completo y
controlar su estado de lectura, utilizando tecnologías modernas y un
flujo de despliegue en la nube.

---

## 🔗 Enlaces del Proyecto

- 🌐 **Demo en Producción (Frontend)**  
  <https://book-tracker1.netlify.app>

- 🔌 **API Backend (FastAPI)**  
  <https://bountiful-imagination-production.up.railway.app>

- 📘 **Documentación Swagger**  
  `/docs`

---

## 🧠 Objetivo del Proyecto

Este proyecto fue construido con fines demostrativos y educativos,
enfocado en:

- Diseño y consumo de APIs REST
- Separación de responsabilidades entre frontend y backend
- Manejo de estado global sin Redux
- Persistencia de datos en PostgreSQL
- Contenerización con Docker
- Despliegue en entornos productivos

---

## 🧱 Arquitectura

Frontend (React + TypeScript)
│
│ Axios (REST API)
▼
Backend (FastAPI)
│
▼
PostgreSQL (Railway)

yaml
Copiar código

---

## 🛠️ Stack Tecnológico

### Frontend

- React
- TypeScript
- Vite
- Axios
- Context API
- Netlify

### Backend

- FastAPI
- Python 3.11
- SQLAlchemy
- Databases
- PostgreSQL
- Uvicorn
- Docker
- Railway

---

## ✨ Funcionalidades

- 📖 Listado de libros
- ➕ Creación de libros
- ✏️ Edición de libros
- 🗑️ Eliminación de libros
- ✅ Marcado de libros como leídos
- 🌐 Integración con API REST
- 🔒 Configuración de CORS para producción
- 🗄️ Persistencia de datos en PostgreSQL

---

## 📁 Estructura del Proyecto

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

yaml
Copiar código

---

## ⚙️ Variables de Entorno

### Frontend

```env
VITE_API_URL=https://bountiful-imagination-production.up.railway.app
Backend
env
Copiar código
DATABASE_URL=postgresql://user:password@host:port/database
En producción, las variables de entorno se configuran directamente desde
Netlify y Railway.

▶️ Ejecución Local
Backend
bash
Copiar código
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
Backend disponible en:

cpp
Copiar código
http://127.0.0.1:8000
Frontend
bash
Copiar código
cd frontend
npm install
npm run dev
Frontend disponible en:

arduino
Copiar código
http://localhost:5173
🔒 Configuración CORS
El backend permite solicitudes desde los siguientes orígenes:

http://localhost:5173

https://book-tracker1.netlify.app

La configuración se realiza mediante CORSMiddleware en FastAPI.

📌 Endpoints Principales
Método Endpoint Descripción
GET /books Obtener libros
POST /books Crear libro
PUT /books/{id} Actualizar libro
DELETE /books/{id} Eliminar libro

📄 Documentación de la API
FastAPI genera documentación automática:

Swagger UI en /docs

ReDoc en /redoc

🚀 Despliegue
Backend
Contenerizado con Docker

Desplegado en Railway

Base de datos PostgreSQL administrada por Railway

Frontend
Build con Vite

Desplegado en Netlify

Variables de entorno configuradas desde Netlify

🧩 Mejoras Futuras
Autenticación y autorización con JWT

Gestión de usuarios

Tests automatizados con Pytest y Vitest

Migraciones de base de datos con Alembic

Implementación de Clean Architecture

👨‍💻 Autor
Juan David Valencia
Ingeniero de Software

Proyecto desarrollado como parte de mi portafolio profesional.
```
