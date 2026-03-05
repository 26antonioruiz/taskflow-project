# ⚔ Consejo Real de Poniente – TaskFlow

Aplicación web de gestión de tareas inspirada en *Game of Thrones*, desarrollada como proyecto de práctica de frontend.  
Permite crear, organizar y completar misiones asignadas a las Grandes Casas de Poniente con diferentes niveles de prioridad.

La interfaz está diseñada con **Tailwind CSS** y cuenta con **modo oscuro**, sistema de prioridades y almacenamiento local.

---

## 🚀 Demo

Aplicación desplegada en Vercel:

👉 https://taskflow-project-tau.vercel.app

---

## 🧰 Tecnologías utilizadas

- HTML5
- JavaScript (Vanilla JS)
- Tailwind CSS
- LocalStorage
- Git & GitHub
- Vercel (deploy)

---

## 🎯 Funcionalidades

- Crear nuevas misiones
- Asignar misión a una casa
- Definir prioridad de misión (Alta, Media, Baja)
- Marcar misión como completada
- Eliminar misiones
- Barra de progreso basada en misiones completadas
- Contador de prioridades
- Estadísticas por casa
- Filtrar por casa
- Búsqueda de misiones
- Modo oscuro / modo claro
- Guardado automático en LocalStorage

---

## 🎨 Sistema de diseño

La interfaz utiliza **Tailwind CSS** para mantener coherencia visual mediante:

- Escala de espaciado
- Sistema de colores
- Componentes reutilizables
- Clases de utilidad

También incluye:

- Hover en tarjetas
- Transiciones suaves
- Estados focus accesibles
- Dark mode mediante clase `dark`

---

## 🌙 Modo oscuro

El modo oscuro se activa mediante un botón que alterna la clase:

```javascript
document.documentElement.classList.toggle("dark")
