/**
 * URL del API: misma máquina y puerto que la página si sirves con Express (puerto 3000).
 * Si usas Live Server u otro puerto, apunta al backend en localhost:3000.
 */
export function getTasksApiBase() {
	if (typeof window === "undefined") {
		return "http://localhost:3000/api/v1/tasks";
	}
	const { protocol, port, origin } = window.location;
	if (protocol === "file:") {
		return "http://localhost:3000/api/v1/tasks";
	}
	if (port === "3000") {
		return `${origin}/api/v1/tasks`;
	}
	return "http://localhost:3000/api/v1/tasks";
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
	const res = await fetch(`${getTasksApiBase()}/${id}`, {
		method: "DELETE"
	});

	if (!res.ok) throw new Error("Error al eliminar");
};
