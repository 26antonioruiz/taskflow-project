const fs = require('fs');
const path = require('path');
const os = require('os');

/* Datos fuera del proyecto: si el JSON está dentro de la carpeta que abre Live Server,
   cada guardado dispara recarga de la página (salto y vuelta arriba). tmpdir evita eso. */
const legacyPath = path.join(__dirname, '../data/tasks.json');
const filePath = path.join(os.tmpdir(), 'taskflow-consejo-poniente-tasks.json');

function readTasksFromDisk() {
	if (fs.existsSync(filePath)) {
		return JSON.parse(fs.readFileSync(filePath, 'utf8'));
	}
	if (fs.existsSync(legacyPath)) {
		const raw = fs.readFileSync(legacyPath, 'utf8');
		fs.writeFileSync(filePath, raw);
		return JSON.parse(raw);
	}
	return [];
}

let tasks = readTasksFromDisk();

const saveTasks = () => {
	fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const getAll = () => tasks;

const create = (data) => {
	const newTask = {
		id: Date.now(),
		...data,
		completed: false
	};

	tasks.unshift(newTask);

	saveTasks();

	return newTask;
};

const remove = (id) => {
	const index = tasks.findIndex((t) => t.id === id);

	if (index === -1) {
		throw new Error('NOT_FOUND');
	}

	tasks.splice(index, 1);

	saveTasks();
};

const toggleComplete = (id) => {
	const task = tasks.find((t) => t.id === id);

	if (!task) {
		throw new Error('NOT_FOUND');
	}

	task.completed = !task.completed;

	saveTasks();

	return task;
};

module.exports = {
	getAll,
	create,
	remove,
	toggleComplete
};
