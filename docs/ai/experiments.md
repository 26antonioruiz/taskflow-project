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

# Conectar servidores MCP

## Qué es el Model Context Protocol

El Model Context Protocol (MCP) es un protocolo que permite conectar asistentes de inteligencia artificial con herramientas externas como sistemas de archivos, repositorios Git, APIs o bases de datos.

Gracias a MCP, los modelos de IA pueden acceder al contexto real de un proyecto. Esto significa que el asistente puede analizar archivos del proyecto, leer código, buscar información en el repositorio o interactuar con otras herramientas de desarrollo.

En lugar de depender únicamente del texto proporcionado por el usuario, MCP permite que la IA trabaje directamente con el entorno del proyecto.

Esto amplía las capacidades de los asistentes de inteligencia artificial dentro del flujo de trabajo de desarrollo.

Algunas de las funcionalidades que permite MCP son:

- acceso directo a archivos del proyecto  
- análisis automático de repositorios  
- generación de documentación basada en el código  
- detección de errores  
- exploración de proyectos grandes  


---

## Instalación de un servidor MCP

Para este proyecto se utilizó un servidor MCP llamado **filesystem**, que permite que el asistente de IA acceda a los archivos del proyecto.

El servidor utilizado fue:

@modelcontextprotocol/server-filesystem

Este servidor permite que el asistente explore el sistema de archivos y analice directamente los archivos del proyecto.

Para ejecutarlo se utilizó el siguiente comando en la terminal:

npx @modelcontextprotocol/server-filesystem .

Este comando inicia el servidor MCP y da acceso al directorio actual del proyecto.


---

## Configuración de MCP en Cursor

Cursor permite configurar servidores MCP mediante archivos de configuración dentro del proyecto.

Para ello se creó la siguiente estructura dentro del proyecto:

.cursor/mcp.json

Dentro de este archivo se añadió la configuración del servidor filesystem.

El contenido del archivo fue el siguiente:

{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "@modelcontextprotocol/server-filesystem",
        "."
      ]
    }
  }
}

Esta configuración indica a Cursor que debe ejecutar el servidor MCP utilizando `npx` y darle acceso al directorio del proyecto.

Una vez configurado, Cursor puede utilizar este servidor para acceder a los archivos del proyecto.


---

## Comprobación del funcionamiento del servidor MCP

Para comprobar que el servidor MCP estaba funcionando correctamente se realizaron varias consultas desde el chat de Cursor.

Cuando se solicitó listar los archivos del proyecto, el asistente ejecutó un comando del sistema para obtener la información.

El comando ejecutado fue:

cmd /c dir /b

Este comando permite listar todos los archivos del directorio actual.

El hecho de que el asistente pudiera ejecutar este comando y mostrar los archivos del proyecto confirmó que el servidor MCP estaba funcionando correctamente.


---

## Consultas realizadas usando MCP

Durante el experimento se realizaron varias consultas al asistente para comprobar el acceso al proyecto.

Consulta 1  
List all files in this project

Consulta 2  
Open app.js and explain how tasks are stored

Consulta 3  
Find the functions responsible for creating and deleting tasks

Consulta 4  
Analyze the structure of the project and suggest improvements

Consulta 5  
Search for potential bugs in the JavaScript code of the project


Estas consultas permitieron que la IA explorara el proyecto y analizara directamente el código existente.


---

## Utilidad de MCP en proyectos reales

El Model Context Protocol puede resultar muy útil en proyectos reales de desarrollo de software.

Algunos ejemplos de uso son:

- análisis automático de repositorios completos  
- generación automática de documentación  
- revisión de código asistida por inteligencia artificial  
- detección de errores en proyectos grandes  
- exploración rápida de bases de código complejas  

Gracias a MCP, los asistentes de inteligencia artificial pueden integrarse mejor en el flujo de trabajo de los desarrolladores y proporcionar ayuda más contextualizada.


---

## Guardar los cambios en el repositorio

Una vez añadida esta documentación al proyecto, se guardaron los cambios utilizando los siguientes comandos de Git:

git add .  
git commit -m "docs: add MCP server installation and usage documentation"  
git push

Con esto queda documentado el proceso de instalación y uso de servidores MCP dentro del proyecto TaskFlow.


# Experimentos con IA en programación

## Objetivo

El objetivo de este experimento fue analizar cómo el uso de herramientas de inteligencia artificial puede afectar al proceso de desarrollo de software.

Para ello se resolvieron varios problemas de programación primero **sin utilizar IA** y posteriormente **con ayuda de IA**.

Se compararon los siguientes aspectos:

- tiempo invertido
- calidad del código generado
- comprensión del problema


---

# Experimento 1 — Función debounce

## Sin usar IA

Problema: implementar una función debounce en JavaScript.

Tiempo aproximado: 15 minutos.

Código implementado:

function debounce(fn, delay) {
  let timer;

  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

Observaciones:

La implementación requirió recordar cómo funcionan los closures y los temporizadores en JavaScript.


## Usando IA

Prompt utilizado:

Generate a JavaScript debounce function with a short explanation.

Tiempo aproximado: 2 minutos.

Código generado por IA:

function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

Observaciones:

La IA generó el código correcto inmediatamente y añadió una explicación del funcionamiento.


## Comparación

Sin IA:

- mayor tiempo invertido
- mejor comprensión del problema

Con IA:

- solución mucho más rápida
- código correcto desde el primer intento


---

# Experimento 2 — Filtrar tareas por prioridad

## Sin usar IA

Problema: crear una función que filtre tareas con prioridad alta.

Tiempo aproximado: 5 minutos.

Código implementado:

function filterHighPriority(tasks) {
  return tasks.filter(task => task.priority === "alta");
}

Observaciones:

La implementación fue relativamente sencilla.


## Usando IA

Prompt utilizado:

Write a JavaScript function that filters tasks with high priority.

Tiempo aproximado: 1 minuto.

Código generado:

function filterHighPriority(tasks) {
  return tasks.filter(task => task.priority === "alta");
}


## Comparación

En este caso la diferencia fue mínima, ya que el problema era simple.

La IA permitió obtener la solución más rápidamente.


---

# Experimento 3 — Validación de formulario

## Sin usar IA

Problema: validar que el texto de una tarea no esté vacío.

Tiempo aproximado: 6 minutos.

Código implementado:

function validateTask(text) {
  if (!text) {
    alert("La tarea no puede estar vacía");
    return false;
  }

  return true;
}


## Usando IA

Prompt utilizado:

Generate a simple JavaScript function that validates task input.

Tiempo aproximado: 1 minuto.

Código generado:

function validateTask(text) {
  if (!text || text.trim().length === 0) {
    return false;
  }

  return true;
}


## Comparación

La IA generó una validación ligeramente más robusta al incluir `trim()`.


---

# Experimentos relacionados con el proyecto TaskFlow

Además de los ejercicios anteriores, se realizaron experimentos utilizando código del propio proyecto.

---

# Experimento 4 — Refactorización de función

## Sin usar IA

Se intentó mejorar manualmente la función `getPriorityColor`.

Tiempo aproximado: 5 minutos.

Código original:

function getPriorityColor(priority) {

  if(priority==="alta") return "#dc2626"
  if(priority==="media") return "#f59e0b"
  if(priority==="baja") return "#22c55e"

}

## Usando IA

Prompt utilizado:

Refactor this function to make it cleaner.

Código generado:

function getPriorityColor(priority) {
  const colors = {
    alta: "#dc2626",
    media: "#f59e0b",
    baja: "#22c55e"
  };

  return colors[priority];
}

## Comparación

La versión generada por IA es más limpia y fácil de mantener.


---

# Experimento 5 — Generación de documentación

## Sin usar IA

Documentar manualmente funciones del proyecto utilizando comentarios.

Tiempo aproximado: 10 minutos.

## Usando IA

Prompt utilizado:

Write JSDoc documentation for this function.

Tiempo aproximado: 1 minuto.

Resultado:

La IA generó comentarios JSDoc automáticamente para varias funciones.


---

# Experimento 6 — Detección de errores

## Sin usar IA

Revisión manual del archivo `app.js` para detectar posibles errores.

Tiempo aproximado: 10 minutos.

## Usando IA

Prompt utilizado:

Find potential bugs in this JavaScript file.

Resultado:

La IA sugirió añadir comprobaciones para evitar errores cuando una tarea no existe.


---

# Conclusión

Los experimentos realizados muestran que el uso de inteligencia artificial puede mejorar significativamente la productividad en tareas de programación.

Principales conclusiones:

- la IA reduce el tiempo necesario para resolver problemas
- la IA puede generar código correcto rápidamente
- la revisión manual sigue siendo importante
- utilizar IA no sustituye la comprensión del problema

En el desarrollo del proyecto TaskFlow, la IA resultó especialmente útil para:

- refactorizar funciones
- generar documentación
- detectar errores
- sugerir mejoras en el código


## Ampliación de TaskFlow con ayuda de IA

Para ampliar las funcionalidades del proyecto TaskFlow se utilizó inteligencia artificial para generar ideas de mejora y ayudar en la implementación del código. A partir de estas sugerencias se añadieron nuevas funcionalidades al sistema de gestión de tareas.

Antes de integrar cualquier fragmento de código generado por IA, se revisó manualmente para asegurar su correcto funcionamiento y adaptarlo a la estructura del proyecto.

### Funcionalidades añadidas

#### 1. Orden automático por prioridad

Se implementó un sistema que ordena automáticamente las tareas según su nivel de prioridad.  
Las tareas se muestran en el siguiente orden:

- Alta
- Media
- Baja

Esto permite visualizar primero las tareas más importantes y facilita la gestión de las misiones dentro del tablero.

#### 2. Reordenar tareas mediante Drag & Drop

Se añadió una funcionalidad de **arrastrar y soltar (Drag & Drop)** similar a la que utilizan aplicaciones como Trello.

Esta funcionalidad permite reorganizar las tareas manualmente arrastrando una tarjeta sobre otra.  
El sistema actualiza automáticamente el orden de las tareas en memoria y guarda los cambios en `localStorage`.

Esto mejora la experiencia de usuario y permite organizar el flujo de trabajo de forma más flexible.

#### 3. Filtro de tareas por casa

Se añadió un sistema de filtrado que permite visualizar únicamente las tareas asociadas a una casa específica del universo de Juego de Tronos.

Las casas disponibles son:

- Stark
- Lannister
- Targaryen
- Baratheon

Al seleccionar una casa desde el panel lateral, el sistema filtra dinámicamente las tareas que pertenecen a esa casa.

#### 4. Contador dinámico de tareas por casa

Se implementó un panel llamado **Estado del Reino**, que muestra el número de tareas asignadas a cada casa.

El contador se actualiza automáticamente cuando ocurre cualquiera de estas acciones:

- se añade una nueva tarea
- se completa una tarea
- se elimina una tarea
- se reorganizan las tareas

Esto permite visualizar rápidamente la carga de trabajo de cada casa y mejora la comprensión del estado general del proyecto.

### Uso de inteligencia artificial

La inteligencia artificial se utilizó para:

- generar ideas de nuevas funcionalidades
- implementar la lógica de ordenación por prioridad
- implementar la funcionalidad de Drag & Drop
- mejorar el sistema de filtrado de tareas
- optimizar el cálculo de estadísticas y contadores

El código generado por IA fue revisado y adaptado manualmente para asegurar su correcta integración con el resto del proyecto.

---

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