# 📦 Sistema CRUD Full-Stack MVC — Distritos

Proyecto académico SENATI  
Stack: **Node.js + Express + MySQL2 (Backend)** | **Vite + Vanilla JS (Frontend)**

---

## 📁 Estructura de Carpetas

```
crud-distritos/
├── database/
│   └── ventas_db.sql          ← Script SQL (tabla + 30 registros)
│
├── backend/
│   ├── config/
│   │   └── db.js              ← Pool de conexión MySQL2
│   ├── models/
│   │   └── distrito.model.js  ← Consultas SQL con Promesas
│   ├── controllers/
│   │   └── distrito.controller.js  ← Lógica de negocio
│   ├── routes/
│   │   └── distritos.routes.js     ← Endpoints RESTful
│   ├── server.js              ← Punto de entrada Express
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api.js             ← Módulo de consumo fetch
    │   ├── index.js           ← Lógica tabla principal
    │   ├── nuevo.js           ← Lógica formulario nuevo
    │   └── style.css          ← Estilos globales
    ├── index.html             ← Grilla + buscador + paginación
    ├── nuevo.html             ← Formulario de registro
    └── package.json
```

---

## ⚙️ Configuración Paso a Paso

### 1. Base de Datos

1. Abre **MySQL Workbench** o tu cliente MySQL favorito.
2. Ejecuta el archivo `database/ventas_db.sql`:
   ```sql
   SOURCE /ruta/al/proyecto/database/ventas_db.sql;
   ```
   Esto crea la base `ventas_db`, la tabla `distritos` y carga 30 registros de prueba.

### 2. Backend

```bash
cd backend

# Instalar dependencias
npm install

# Editar credenciales MySQL en config/db.js
#   host: 'localhost'
#   user: 'root'
#   password: ''   ← pon tu contraseña aquí

# Iniciar servidor (producción)
npm start

# Iniciar con auto-recarga (desarrollo)
npm run dev
```

El backend queda disponible en **http://localhost:3000**

### 3. Frontend

```bash
cd frontend

# Instalar dependencias (solo Vite)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend queda disponible en **http://localhost:5173**

---

## 🔌 Endpoints de la API

| Método | Ruta                          | Descripción                          |
|--------|-------------------------------|--------------------------------------|
| GET    | `/api/distritos`              | Listar (con `page`, `limit`, `search`) |
| GET    | `/api/distritos/:id`          | Obtener uno por ID                   |
| POST   | `/api/distritos`              | Crear nuevo distrito                 |
| PUT    | `/api/distritos/:id`          | Actualizar distrito                  |
| DELETE | `/api/distritos/:id`          | Eliminar distrito                    |

### Ejemplo de respuesta GET paginado

```json
{
  "data": [
    { "id_dis": 1, "nom_dis": "Miraflores", "cod_postal": "15074" }
  ],
  "total": 30,
  "totalPages": 3,
  "page": 1,
  "limit": 10
}
```

---

## ✅ Funcionalidades

- **CRUD completo**: Crear, listar, editar y eliminar distritos.
- **Paginación**: 10 registros por página con controles de navegación.
- **Buscador multicriterio**: filtra por ID, Nombre o Código Postal (LIKE).
- **Modal de edición**: sin cambiar de página.
- **Redirección automática** después de crear un registro.
- **Validación de formularios** en el frontend.

---

## 🛠️ Dependencias

### Backend
| Paquete   | Versión  | Uso                   |
|-----------|----------|-----------------------|
| express   | ^4.18.2  | Servidor HTTP         |
| mysql2    | ^3.6.5   | Driver MySQL          |
| cors      | ^2.8.5   | Permitir requests     |
| nodemon   | ^3.0.2   | Recarga automática    |

### Frontend
| Paquete | Versión | Uso                       |
|---------|---------|---------------------------|
| vite    | ^5.0.8  | Servidor de desarrollo    |
