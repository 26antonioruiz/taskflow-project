# Refactorización del proyecto TaskFlow usando IA

Durante esta fase del proyecto se utilizó inteligencia artificial para mejorar y refactorizar el código de la aplicación TaskFlow.

El objetivo fue mejorar la calidad del código, su legibilidad y su mantenimiento a largo plazo.

Las siguientes mejoras fueron implementadas con ayuda de IA.

---

# Mejora 1 — Validación del formulario

Inicialmente la función `addTask()` solo validaba si el campo de texto estaba vacío.

Se añadió una nueva función llamada `validateTask()` que verifica:

- que la misión tenga al menos 3 caracteres
- que se haya seleccionado una casa
- que se haya seleccionado una prioridad

Esto evita que el usuario cree tareas con datos incompletos o inválidos.

Esta mejora hace la aplicación más robusta y mejora la experiencia del usuario.

---

# Mejora 2 — Mejora de nombres de funciones

La función `save()` fue renombrada a `saveTasks()`.

El nombre anterior era demasiado genérico y no indicaba claramente qué hacía la función.

El nuevo nombre describe mejor su propósito: guardar las tareas en LocalStorage.

Este cambio mejora la legibilidad del código y facilita su mantenimiento.

---

# Mejora 3 — Documentación con JSDoc

Se añadieron comentarios JSDoc en varias funciones del proyecto, incluyendo:

- `addTask()`
- `toggleTask()`
- `deleteTask()`
- `editTask()`
- `saveTasks()`

Esto permite documentar el comportamiento de cada función y los parámetros que reciben.

La documentación facilita que otros desarrolladores puedan entender el código más rápidamente.

---

# Mejora 4 — Simplificación de lógica

La función `getPriorityColor()` utilizaba múltiples condicionales `if` para devolver un color según la prioridad.

Esta lógica fue refactorizada utilizando un objeto de mapeo.

Esto hace el código más limpio, más fácil de extender y reduce la complejidad.

---

# Mejora 5 — Manejo de errores

Se añadió una verificación en varias funciones para evitar errores si la tarea no existe.

Por ejemplo, en la función `toggleTask()` ahora se comprueba que la tarea exista antes de modificarla.

Esto evita errores potenciales en tiempo de ejecución y mejora la estabilidad de la aplicación.

---
