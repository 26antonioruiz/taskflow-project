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