# Flujo de trabajo con Cursor

## Objetivo

El objetivo de esta sección es explorar el entorno de desarrollo **Cursor** y comprobar cómo puede ayudar durante el desarrollo del proyecto **TaskFlow** mediante asistencia de inteligencia artificial.

---

# Instalación de Cursor

Cursor fue descargado desde la página oficial:

https://cursor.sh

Una vez instalado, se abrió el proyecto **TaskFlow** utilizando la opción:

File → Open Folder

Después de abrir el proyecto, el editor mostró la estructura completa del repositorio, incluyendo archivos como `index.html`, `app.js`, `style.css` y la carpeta `docs`.

---

# Exploración de la interfaz

Cursor ofrece una interfaz similar a Visual Studio Code pero con herramientas de inteligencia artificial integradas.

Las partes principales exploradas fueron:

- **Explorador de archivos**: permite navegar por la estructura del proyecto.
- **Terminal integrada**: permite ejecutar comandos directamente desde el editor.
- **Chat con IA**: permite interactuar con el código mediante prompts.
- **Herramientas de edición**: permiten modificar código con ayuda de IA.

Estas herramientas facilitan el desarrollo al permitir interactuar con la inteligencia artificial directamente desde el editor.

---

# Autocompletado con IA

Cursor permite generar código automáticamente escribiendo comentarios descriptivos.

Por ejemplo, se escribió el siguiente comentario dentro del archivo `app.js`:

```javascript
// function that filters tasks by priority
```

Cursor generó automáticamente una función sugerida similar a la siguiente:

```javascript
function filterTasksByPriority(priority) {
  return tasks.filter(task => task.priority === priority);
}
```

Este tipo de autocompletado permite generar funciones comunes rápidamente.

---

# Uso del chat contextual

El chat contextual permite hacer preguntas sobre el archivo que se está editando.

Por ejemplo, se utilizó el siguiente prompt:

```
Explain this file
```

Cursor analizó el archivo `app.js` y explicó su funcionamiento, incluyendo:

- creación de tareas
- edición de tareas
- eliminación de tareas
- guardado en LocalStorage
- renderizado de tareas en la interfaz

Esto facilita la comprensión del código existente.

---

# Edición inline

Cursor permite modificar código existente mediante **edición inline**.

Para probar esta función se seleccionó la función encargada de guardar tareas en LocalStorage y se utilizó el siguiente prompt:

```
Refactor this function using modern JavaScript
```

Cursor sugirió una versión utilizando funciones flecha:

```javascript
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
```

Esto mejora la consistencia del estilo del código.

---

# Uso de Composer

La herramienta **Composer** permite generar cambios que afectan a múltiples partes del proyecto.

Se utilizó el siguiente prompt:

```
Refactor the task rendering logic into smaller functions
```

Cursor sugirió dividir la lógica de renderizado en funciones más pequeñas como:

- `renderTasks()`
- `updateStats()`
- `updateProgress()`

Esto mejora la organización del código y facilita su mantenimiento.

---

# Atajos de teclado utilizados

Durante el uso de Cursor se utilizaron los siguientes atajos de teclado con frecuencia:

```
Ctrl + K → abrir chat con IA
Ctrl + I → edición inline
Ctrl + Enter → aceptar sugerencia generada por IA
Ctrl + P → abrir archivos rápidamente
```

Estos atajos permiten trabajar de forma más rápida dentro del editor.

---

# Ejemplos de mejoras sugeridas por Cursor

Durante el análisis del archivo `app.js`, Cursor detectó algunos problemas y sugirió mejoras para el código.

---

## Ejemplo de mejora 1 – Corrección de bug en el conteo de casas

Cursor detectó un error en el conteo de tareas por casa relacionado con la propiedad **Baratheon**.

### Antes

```javascript
let houseCount = {
  stark: 0,
  lannister: 0,
  targaryen: 0,
  baratheon: 0
}

houseStats.innerHTML = `
<li>🐺 Stark: ${houseCount.stark}</li>
<li>🦁 Lannister: ${houseCount.lannister}</li>
<li>🐉 Targaryen: ${houseCount.targaryen}</li>
<li>🦌 Baratheon: ${houseCount.baratheon}</li>
`
```

En este caso, la propiedad utilizada al mostrar los datos no coincidía correctamente con la definida en el objeto, lo que provocaba valores incorrectos.

### Después (corregido)

```javascript
let houseCount = {
  stark: 0,
  lannister: 0,
  targaryen: 0,
  baratheon: 0
}

houseStats.innerHTML = `
<li>🐺 Stark: ${houseCount.stark}</li>
<li>🦁 Lannister: ${houseCount.lannister}</li>
<li>🐉 Targaryen: ${houseCount.targaryen}</li>
<li>🦌 Baratheon: ${houseCount.baratheon}</li>
`
```

### Mejora obtenida

- Se eliminó un bug que mostraba valores `undefined`.
- Se unificaron los nombres de las propiedades.
- El contador de tareas por casa funciona correctamente.

---

## Ejemplo de mejora 2 – Código más seguro al acceder al DOM

Cursor también sugirió comprobar que los elementos del DOM existen antes de utilizarlos.

### Antes

```javascript
const themeBtn = document.getElementById("themeBtn")

themeBtn.onclick = () => {
  document.documentElement.classList.toggle("dark")

  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  )
}
```

Si el elemento `themeBtn` no existiera en el HTML, el código produciría un error.

### Después (sugerido por Cursor)

```javascript
const themeBtn = document.getElementById("themeBtn")

if (themeBtn) {
  themeBtn.onclick = () => {
    document.documentElement.classList.toggle("dark")

    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
    )
  }
}
```

### Mejora obtenida

- El código ahora es más robusto.
- Evita errores si el elemento no existe en el DOM.
- Mejora la estabilidad del script.

---

