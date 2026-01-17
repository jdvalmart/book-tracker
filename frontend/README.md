# 📚 Book Tracker

**Book Tracker** es una aplicación **Full Stack** para la gestión de libros, que permite crear, listar, editar y eliminar libros, así como marcar su estado de lectura.  
El proyecto está construido con **React + TypeScript** en el frontend y **FastAPI + PostgreSQL** en el backend, siguiendo buenas prácticas de desarrollo y despliegue en la nube.

---

## 🌐 Demo en Producción

- **Frontend (Netlify)**  
  👉 <https://book-tracker1.netlify.app>

- **Backend API (Railway)**  
  👉 <https://bountiful-imagination-production.up.railway.app>  
  📘 **Swagger**: `/docs`

---

## 🧱 Arquitectura General

┌──────────────────────────┐
│ Frontend (React + TS) │
│ Vite + Context API │
└────────────┬─────────────┘
│ Axios (REST)
┌────────────▼─────────────┐
│ Backend (FastAPI) │
│ SQLAlchemy + Databases │
└────────────┬─────────────┘
│
┌────────────▼─────────────┐
│ PostgreSQL DB │
│ (Railway) │
└──────────────────────────┘

yaml
Copiar código

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- React
- TypeScript
- Vite
- Axios
- Context API
- Netlify (Deploy)

### Backend

- FastAPI
- Python 3.11
- SQLAlchemy
- Databases
- PostgreSQL
- Uvicorn
- Docker
- Railway (Deploy)

---

## ✨ Funcionalidades

- 📖 Listar libros
- ➕ Agregar libros
- ✏️ Editar libros
- 🗑️ Eliminar libros
- ✅ Marcar libros como leídos
- 🌐 Consumo de API REST
- 🔒 CORS configurado para producción
- 🗄️ Persistencia en PostgreSQL

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

### Frontend (`frontend/.env`)

```env
VITE_API_URL=https://bountiful-imagination-production.up.railway.app
Backend (backend/.env)
env
Copiar código
DATABASE_URL=postgresql://user:password@host:port/database
⚠️ En producción, estas variables se configuran directamente en Netlify y Railway.

▶️ Ejecución en Local
1️⃣ Backend
bash
Copiar código
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
📍 Backend disponible en:

cpp
Copiar código
http://127.0.0.1:8000
2️⃣ Frontend
bash
Copiar código
cd frontend
npm install
npm run dev
📍 Frontend disponible en:

arduino
Copiar código
http://localhost:5173
🔒 Configuración CORS
El backend permite solicitudes desde:

http://localhost:5173

https://book-tracker1.netlify.app

Configurado mediante CORSMiddleware en FastAPI.

📌 Endpoints de la API
Método Endpoint Descripción
GET /books Obtener libros
POST /books Crear libro
PUT /books/{id} Actualizar libro
DELETE /books/{id} Eliminar libro

📄 Documentación de la API
FastAPI genera documentación automática:

📘 Swagger UI → /docs

📙 ReDoc → /redoc

🚀 Despliegue
Backend
Contenerizado con Docker

Desplegado en Railway

Base de datos PostgreSQL administrada por Railway

Frontend
Build con Vite

Desplegado en Netlify

Variables de entorno configuradas desde Netlify UI

🧩 Próximas Mejoras
🔐 Autenticación y autorización (JWT)

👥 Gestión de usuarios

🧪 Tests automatizados (Pytest / Vitest)

🗂️ Migraciones con Alembic

🧼 Arquitectura limpia (Clean Architecture)

👨‍💻 Autor
Juan David Valencia
Ingeniero de Software
```
