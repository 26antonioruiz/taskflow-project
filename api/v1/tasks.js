const tasks = [
  { id: 1, text: "Defender Invernalia", house: "stark", priority: "alta", completed: false },
  { id: 2, text: "Entrenar nuevos soldados", house: "stark", priority: "media", completed: false },
  { id: 3, text: "Patrullar el norte", house: "stark", priority: "baja", completed: false }
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