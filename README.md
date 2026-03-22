# ⚔ Consejo Real de Poniente – TaskFlow

Aplicación fullstack de gestión de tareas inspirada en *Game of Thrones*.

Permite crear, organizar y gestionar misiones asignadas a las Grandes Casas de Poniente con distintos niveles de prioridad.

El proyecto ha evolucionado desde un frontend con LocalStorage a una arquitectura cliente-servidor real con backend en Node.js.

---

## 🚀 Demo

Aplicación desplegada en Vercel:

👉 https://taskflow-project-176y.vercel.app

---

## 🧰 Tecnologías utilizadas

### 🎨 Frontend

* HTML5
* JavaScript (Vanilla JS)
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js
* dotenv
* cors

### 🛠 Herramientas

* Thunder Client / Postman
* Git & GitHub
* Vercel (deploy)

---

## 🧠 Arquitectura

El backend sigue una arquitectura por capas (Layered Architecture):

```
routes → controllers → services
```

### 🔹 Routes

Definen los endpoints HTTP y conectan con los controladores.

### 🔹 Controllers

Gestionan la petición y respuesta HTTP:

* Validan datos de entrada
* Llaman a los servicios
* Devuelven respuestas al cliente

### 🔹 Services

Contienen la lógica de negocio:

* Creación de tareas
* Eliminación
* Gestión de datos

Esta capa es independiente de Express, lo que facilita testing y escalabilidad.

---

## 🌐 API REST

Base URL:

```
http://localhost:3000/api/v1/tasks
```

### 📥 GET /tasks

Obtiene todas las tareas

---

### 📤 POST /tasks

Crea una nueva tarea

```json
{
  "text": "Nueva misión",
  "house": "stark",
  "priority": "alta"
}
```

Respuesta:

```json
{
  "id": 123456,
  "text": "Nueva misión",
  "house": "stark",
  "priority": "alta",
  "completed": false
}
```

---

### ❌ DELETE /tasks/:id

Elimina una tarea

Respuesta:

* 204 No Content

---

## ⚙️ Variables de entorno

Crear archivo `.env` en `/server`:

```
PORT=3000
```

---

## ▶️ Ejecución del proyecto

### 🔹 Backend

```bash
cd server
npm install
npm run dev
```

Servidor en:

```
http://localhost:3000
```

---

### 🔹 Frontend

Abrir `index.html` con Live Server

---

## ⚠️ Manejo de errores

El backend implementa manejo global de errores:

* 400 → datos inválidos
* 404 → recurso no encontrado
* 500 → error interno del servidor

Ejemplos:

* POST sin texto → 400
* DELETE con id inexistente → 404

---

## 🎯 Funcionalidades

* Crear nuevas misiones
* Eliminar misiones
* Filtrar por casa
* Filtrar por prioridad
* Filtrar por estado
* Búsqueda de misiones
* Drag & Drop
* Modo Kanban
* Barra de progreso
* Estadísticas por casa
* Persistencia en backend

---

## 🎨 Sistema de diseño

La interfaz utiliza Tailwind CSS:

* Sistema de colores consistente
* Componentes reutilizables
* Diseño responsive
* Dark mode mediante clase `dark`

Incluye:

* Animaciones hover
* Transiciones suaves
* Feedback visual

---

## 🌙 Modo oscuro

El modo oscuro se activa mediante un botón que alterna la clase `dark`.

---

## 🔄 Cambio de arquitectura

Inicialmente el proyecto utilizaba:

```
LocalStorage
```

Ahora utiliza:

```
Frontend → API → Backend
```

Esto permite:

* Persistencia real
* Escalabilidad
* Separación de responsabilidades

---

## 🧪 Testing

La API ha sido probada con:

* Thunder Client
* Postman

Incluyendo pruebas de error:

* Datos inválidos
* Recursos inexistentes

---

## 📚 Documentación adicional

Ver:

```
docs/backend-api.md
```

Incluye información sobre:

* Axios
* Postman
* Swagger
* Sentry

---

## 🤖 Uso de Inteligencia Artificial

Se utilizó IA para:

* Generación inicial de código
* Mejora de estructura
* Refactorización

La implementación final fue revisada manualmente.

---
