# ⚔ Consejo Real de Poniente – TaskFlow

Aplicación web de gestión de tareas inspirada en *Game of Thrones*, desarrollada como proyecto de práctica de **frontend**.  
Permite crear, organizar y completar misiones asignadas a las Grandes Casas de Poniente con distintos niveles de prioridad.

La interfaz está diseñada con **Tailwind CSS** e incluye **modo oscuro**, sistema de prioridades y almacenamiento local.

---

## 🚀 Demo

Aplicación desplegada en Vercel:

👉 https://taskflow-project-176y.vercel.app

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
- Asignar una misión a una casa  
- Definir prioridad de misión (Alta, Media, Baja)  
- Marcar misiones como completadas  
- Eliminar misiones  
- Barra de progreso basada en misiones completadas  
- Contador de prioridades  
- Estadísticas por casa  
- Filtrar misiones por casa  
- Búsqueda de misiones  
- Modo oscuro / modo claro  
- Guardado automático en LocalStorage  

---

## 🎨 Sistema de diseño

La interfaz utiliza **Tailwind CSS** para mantener coherencia visual mediante:

- Escala de espaciado consistente  
- Sistema de colores  
- Componentes reutilizables  
- Clases de utilidad

También incluye:

- Efectos *hover* en tarjetas  
- Transiciones suaves  
- Estados *focus* accesibles  
- Dark mode mediante la clase `dark`

---

## 🌙 Modo oscuro

El modo oscuro se activa mediante un botón que alterna la clase `dark`.



Durante el desarrollo del proyecto se utilizó **inteligencia artificial** para generar una primera versión de la documentación y sugerir mejoras en el código.

Posteriormente, la documentación fue **revisada manualmente**, corrigiendo posibles errores y adaptándola al funcionamiento real del proyecto.

El objetivo fue mejorar la calidad del código y facilitar que otros desarrolladores puedan entender el proyecto.

---

# 📚 Documentación de funciones principales

A continuación se describen algunas de las funciones más importantes del archivo `app.js`.

---

## addTask()

Esta función se encarga de crear una nueva misión en el sistema.

### Pasos que realiza

1. Obtiene el texto de la misión desde el campo de entrada.
2. Obtiene la casa seleccionada.
3. Obtiene el nivel de prioridad.
4. Crea un nuevo objeto de tarea.
5. Guarda la tarea en el array `tasks`.
6. Guarda los datos en `localStorage`.
7. Vuelve a renderizar la lista de tareas.

---

## toggleTask(id)

Permite marcar una misión como **completada o pendiente**.

Recibe el identificador de la tarea y cambia el valor de la propiedad `completed`.

Después:

- Guarda los cambios
- Actualiza la interfaz

Esto permite completar misiones simplemente haciendo clic sobre la tarjeta.

---

## deleteTask(id)

Esta función elimina una tarea del sistema.

### Proceso

1. Busca la tarea en el array `tasks`.
2. Filtra el array para eliminarla.
3. Guarda los cambios en `localStorage`.
4. Actualiza la interfaz.

---

## editTask(id)

Permite modificar el nombre de una misión existente.

El sistema muestra un `prompt` donde el usuario introduce el nuevo nombre.

Después:

- Se guarda la tarea actualizada
- Se actualiza la interfaz

---

## updateStats()

Actualiza las estadísticas del tablero.

Calcula:

- Número de tareas activas
- Número de tareas completadas
- Porcentaje de progreso del reino
- Contadores de prioridad

También llama a la función `updateHouseStats()` para actualizar el panel **Estado del Reino**.

---

# 🧪 Ejemplos de uso

## Crear una nueva misión

1. Escribir el nombre de la misión en el campo **Nueva misión**.
2. Seleccionar la casa correspondiente.
3. Seleccionar la prioridad.
4. Pulsar el botón **Añadir**.

La nueva misión aparecerá automáticamente en el tablero.

---

## Completar una misión

Para marcar una misión como completada:

Haz clic sobre la tarjeta de la misión.

La tarjeta cambiará de estilo indicando que la misión ha sido completada y se actualizarán las estadísticas.

---

## Filtrar misiones por casa

En el panel lateral puedes seleccionar una casa específica para mostrar únicamente las tareas asociadas a esa casa.

Esto permite visualizar rápidamente las misiones de cada casa del reino.

---

## Reordenar misiones

Las tareas pueden reorganizarse **arrastrando una tarjeta sobre otra**.

Esta funcionalidad permite gestionar el orden de las misiones de forma visual.

---

# 🔍 Revisión manual de la documentación

La documentación generada con ayuda de IA fue revisada manualmente para:

- Corregir posibles errores
- Mejorar la claridad del texto

Esto garantiza que la documentación final sea **precisa, clara y útil para otros desarrolladores**.
