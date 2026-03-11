# Prompt Engineering aplicado al desarrollo

## Introducción

El prompt engineering consiste en diseñar instrucciones claras y estructuradas para obtener mejores respuestas de los modelos de inteligencia artificial.

En el desarrollo de software, un buen prompt puede ayudar a generar código, detectar errores, refactorizar funciones o crear documentación automáticamente.

Durante el desarrollo del proyecto TaskFlow se experimentó con distintos tipos de prompts para evaluar cómo afectan a la calidad de las respuestas generadas por la IA.


---

# Experimentos con distintos tipos de prompts

Durante el experimento se probaron diferentes técnicas de prompt engineering:

- definición de roles
- few-shot prompting (dar ejemplos)
- razonamiento paso a paso
- uso de restricciones claras

Estas técnicas ayudan a mejorar la precisión y utilidad de las respuestas generadas por la IA.


---

# Prompts utilizados

## Prompt 1 — Definir un rol experto

Prompt utilizado:

Actúa como un desarrollador frontend senior. Revisa el siguiente código JavaScript y sugiere mejoras para hacerlo más limpio y mantenible.

Por qué funciona:

Asignar un rol específico al modelo mejora la calidad de la respuesta, ya que la IA intenta comportarse como un experto en el área indicada.


---

## Prompt 2 — Explicación de código

Prompt utilizado:

Explain the following JavaScript function step by step.

Por qué funciona:

Pedir una explicación paso a paso obliga al modelo a estructurar mejor la respuesta y facilita la comprensión del código.


---

## Prompt 3 — Refactorización de código

Prompt utilizado:

Refactor this JavaScript function to make it cleaner, more readable and easier to maintain.

Por qué funciona:

Este prompt define claramente el objetivo (refactorizar) y los criterios de mejora (legibilidad y mantenimiento).


---

## Prompt 4 — Generación de documentación

Prompt utilizado:

Write JSDoc documentation for the following function.

Por qué funciona:

Especificar el formato de salida permite generar documentación estructurada automáticamente.


---

## Prompt 5 — Detección de errores

Prompt utilizado:

Find potential bugs in this JavaScript code and explain why they occur.

Por qué funciona:

Este prompt indica claramente que la IA debe analizar el código en busca de errores y explicar su causa.


---

## Prompt 6 — Generación de código con restricciones

Prompt utilizado:

Generate a JavaScript function that validates form inputs. The function must be simple, readable and under 20 lines of code.

Por qué funciona:

El uso de restricciones claras ayuda a controlar la complejidad del código generado.


---

## Prompt 7 — Few-shot prompting

Prompt utilizado:

Example:

Input: task = { text: "", completed: false }  
Output: Task text cannot be empty

Now generate similar validation logic for a task creation form.

Por qué funciona:

El few-shot prompting proporciona ejemplos que ayudan al modelo a entender mejor el tipo de respuesta esperada.


---

## Prompt 8 — Mejora de arquitectura

Prompt utilizado:

Suggest improvements for the architecture of this JavaScript project.

Por qué funciona:

Este prompt permite obtener recomendaciones sobre estructura del proyecto, organización del código y buenas prácticas.


---

## Prompt 9 — Optimización de código

Prompt utilizado:

Improve the performance of this function without changing its behavior.

Por qué funciona:

La restricción de mantener el mismo comportamiento evita que la IA cambie la lógica original del código.


---

## Prompt 10 — Explicación para principiantes

Prompt utilizado:

Explain this JavaScript code as if teaching a beginner developer.

Por qué funciona:

Este prompt adapta el nivel de explicación, haciendo que el contenido sea más fácil de entender.


---
