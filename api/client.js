export function getTasksApiBase() {
  return "/api/v1/tasks";
}

export const getTasks = async () => {
  const res = await fetch(getTasksApiBase());
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
};

export const createTask = async (task) => {
  const res = await fetch(getTasksApiBase(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error);
  }

  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${getTasksApiBase()}?id=${id}`, {
    method: "DELETE"
  });

  if (!res.ok) throw new Error("Error al eliminar");
};