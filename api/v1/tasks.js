const tasks = [
  { id: 1, text: "Defender Invernalia", house: "stark", priority: "alta", completed: false },
  { id: 2, text: "Entrenar nuevos soldados", house: "stark", priority: "media", completed: false },
  { id: 3, text: "Patrullar el norte", house: "stark", priority: "baja", completed: false },
  { id: 4, text: "Proteger el muro", house: "stark", priority: "alta", completed: false },
  { id: 5, text: "Reforzar Winterfell", house: "stark", priority: "media", completed: false },
  { id: 6, text: "Recaudar impuestos", house: "lannister", priority: "media", completed: false },
  { id: 7, text: "Fortificar Roca Casterly", house: "lannister", priority: "alta", completed: false },
  { id: 8, text: "Negociar alianzas", house: "lannister", priority: "baja", completed: false },
  { id: 9, text: "Supervisar tesoro", house: "lannister", priority: "alta", completed: false },
  { id: 10, text: "Enviar espías", house: "lannister", priority: "media", completed: false },
  { id: 11, text: "Entrenar dragones", house: "targaryen", priority: "alta", completed: false },
  { id: 12, text: "Expandir flota", house: "targaryen", priority: "media", completed: false },
  { id: 13, text: "Preparar invasión", house: "targaryen", priority: "alta", completed: false },
  { id: 14, text: "Conquistar fortalezas", house: "targaryen", priority: "media", completed: false },
  { id: 15, text: "Proteger huevos", house: "targaryen", priority: "baja", completed: false },
  { id: 16, text: "Organizar torneo", house: "baratheon", priority: "baja", completed: false },
  { id: 17, text: "Entrenar caballeros", house: "baratheon", priority: "media", completed: false },
  { id: 18, text: "Proteger Bastión", house: "baratheon", priority: "alta", completed: false },
  { id: 19, text: "Reclutar tropas", house: "baratheon", priority: "media", completed: false },
  { id: 20, text: "Vigilar la tormenta", house: "baratheon", priority: "alta", completed: false }
];

export default function handler(req, res) {
  // GET
  if (req.method === "GET") {
    return res.status(200).json(tasks);
  }

  // POST
  if (req.method === "POST") {
    const { text, house, priority } = req.body;

    if (!text || text.length < 3) {
      return res.status(400).json({ error: "Texto inválido" });
    }

    const newTask = {
      id: Date.now(),
      text,
      house,
      priority,
      completed: false
    };

    tasks.unshift(newTask);

    return res.status(201).json(newTask);
  }

  // DELETE
  if (req.method === "DELETE") {
    const id = Number(req.query.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index !== -1) {
      tasks.splice(index, 1);
    }

    return res.status(204).end();
  }

  // PATCH
  if (req.method === "PATCH") {
    const id = Number(req.query.id);
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({ error: "No encontrada" });
    }

    task.completed = !task.completed;

    return res.json(task);
  }

  res.status(405).end();
}