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

document.documentElement.classList.toggle("dark")

# Documentación asistida por IA

Durante esta fase del proyecto se utilizó inteligencia artificial para generar una primera versión mejorada de la documentación del proyecto.

Posteriormente la documentación fue revisada manualmente para corregir posibles errores, mejorar la claridad del texto y adaptarla a la estructura real del proyecto.

El objetivo de esta fase fue mejorar la calidad de la documentación y facilitar que otros desarrolladores puedan entender el funcionamiento del proyecto.

---

# Documentación de funciones principales

A continuación se describen algunas de las funciones más importantes del archivo `app.js`.

### addTask()

Esta función se encarga de crear una nueva tarea en el sistema.

Funcionamiento:

1. Obtiene el texto de la misión desde el campo de entrada.
2. Obtiene la casa seleccionada.
3. Obtiene el nivel de prioridad.
4. Crea un nuevo objeto de tarea.
5. Guarda la tarea en el array `tasks`.
6. Guarda los datos en `localStorage`.
7. Vuelve a renderizar la lista de tareas.

Esta función es el punto principal de entrada para crear nuevas misiones dentro del tablero.

---

### toggleTask(id)

Esta función permite marcar una tarea como completada o pendiente.

Recibe como parámetro el identificador de la tarea y cambia el valor de la propiedad `completed`.

Después de modificar el estado de la tarea:

- guarda los cambios
- actualiza la interfaz

Esto permite que el usuario pueda completar misiones simplemente haciendo clic sobre la tarjeta.

---

### deleteTask(id)

Esta función elimina una tarea del sistema.

El proceso consiste en:

1. Buscar la tarea en el array `tasks`.
2. Filtrar el array para eliminar esa tarea.
3. Guardar los cambios en `localStorage`.
4. Actualizar la interfaz.

Esto permite mantener la lista de tareas limpia y eliminar misiones que ya no sean necesarias.

---

### editTask(id)

Esta función permite modificar el nombre de una misión existente.

El sistema muestra un `prompt` donde el usuario puede introducir el nuevo nombre de la tarea.

Una vez modificado el texto:

- se guarda la tarea
- se actualiza la interfaz

---

### updateStats()

Esta función actualiza las estadísticas del tablero.

Se encarga de calcular:

- número de tareas activas
- número de tareas completadas
- porcentaje de progreso del reino
- contadores de prioridad

También llama a la función `updateHouseStats()` para actualizar el panel **Estado del Reino**.

---

# Ejemplos de uso del proyecto

A continuación se muestran algunos ejemplos de cómo utilizar la aplicación TaskFlow.

---

## Crear una nueva misión

1. Escribir el nombre de la misión en el campo **Nueva misión**.
2. Seleccionar la casa correspondiente.
3. Seleccionar la prioridad.
4. Pulsar el botón **Añadir**.

La nueva misión aparecerá automáticamente en el tablero.

---

## Completar una misión

Para marcar una misión como completada:

1. Hacer clic sobre la tarjeta de la misión.

La tarjeta cambiará de estilo indicando que la misión ha sido completada y se actualizarán las estadísticas.

---

## Filtrar misiones por casa

En el panel lateral se puede seleccionar una casa específica para mostrar únicamente las tareas asociadas a esa casa.

Esto permite visualizar rápidamente las misiones de cada casa del reino.

---

## Reordenar misiones

Las tareas pueden reorganizarse arrastrando una tarjeta y soltándola sobre otra.

Esta funcionalidad permite gestionar el orden de las misiones de forma visual.

---

# Revisión manual de la documentación

La documentación generada con ayuda de inteligencia artificial fue revisada manualmente para:

- corregir posibles errores
- mejorar la claridad del texto
- adaptar la documentación al funcionamiento real del proyecto

Esto garantiza que la documentación final sea precisa y útil para otros desarrolladores.