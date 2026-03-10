/* =========================
   STATE
========================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

let filter = "all"
let searchText = ""

/* =========================
   DOM ELEMENTS
========================= */

const list = document.getElementById("tasks")
const status = document.getElementById("status")
const progress = document.getElementById("progress")

const alta = document.getElementById("altaCount")
const media = document.getElementById("mediaCount")
const baja = document.getElementById("bajaCount")

const houseStats = document.getElementById("houseStats")
const searchInput = document.getElementById("search")

/* =========================
   DARK MODE
========================= */

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

if (localStorage.getItem("theme") === "dark") {
	document.documentElement.classList.add("dark")
}

/* =========================
   SEARCH
========================= */

searchInput.addEventListener("input", e => {

	searchText = e.target.value.toLowerCase()
	render()

})

/* =========================
   VALIDATION
========================= */

/**
 * Valida los datos de una tarea antes de crearla
 * @param {string} text
 * @param {string} house
 * @param {string} priority
 * @returns {boolean}
 */
function validateTask(text, house, priority) {

	if (!text || text.length < 3) {
		alert("La misión debe tener al menos 3 caracteres")
		return false
	}

	if (!house) {
		alert("Selecciona una casa")
		return false
	}

	if (!priority) {
		alert("Selecciona una prioridad")
		return false
	}

	return true
}

/* =========================
   ADD TASK
========================= */

/**
 * Crea una nueva tarea
 */
function addTask() {

	const text = document.getElementById("taskInput").value.trim()
	const house = document.getElementById("houseSelect").value
	const priority = document.getElementById("prioritySelect").value

	if (!validateTask(text, house, priority)) return

	tasks.push({
		id: Date.now(),
		text,
		house,
		priority,
		completed: false
	})

	saveTasks()
	render()

	document.getElementById("taskInput").value = ""
}

/* =========================
   EDIT TASK
========================= */

/**
 * Edita el texto de una tarea
 * @param {number} id
 */
function editTask(id) {

	const task = tasks.find(t => t.id === id)

	if (!task) return

	const newText = prompt("Editar misión:", task.text)

	if (!newText) return

	task.text = newText.trim()

	saveTasks()
	render()

}

/* =========================
   DELETE TASK
========================= */

/**
 * Elimina una tarea
 * @param {number} id
 */
function deleteTask(id) {

	tasks = tasks.filter(task => task.id !== id)

	saveTasks()
	render()

}

/* =========================
   COMPLETE TASK
========================= */

/**
 * Cambia el estado de completado de una tarea
 * @param {number} id
 */
function toggleTask(id) {

	const task = tasks.find(t => t.id === id)

	if (!task) return

	task.completed = !task.completed

	saveTasks()
	render()

}

/* =========================
   SORT BY PRIORITY
========================= */

function sortByPriority() {

	const order = {
		alta: 1,
		media: 2,
		baja: 3
	}

	tasks.sort((a, b) => order[a.priority] - order[b.priority])

	render()

}

/* =========================
   STORAGE
========================= */

/**
 * Guarda las tareas en LocalStorage
 */
function saveTasks() {

	localStorage.setItem("tasks", JSON.stringify(tasks))

}

/* =========================
   FILTER HOUSE
========================= */

function filterHouse(house) {

	filter = house
	render()

}

/* =========================
   PRIORITY COLOR
========================= */

/**
 * Devuelve el color de la prioridad
 */
function getPriorityColor(priority) {

	const colors = {
		alta: "#dc2626",
		media: "#f59e0b",
		baja: "#22c55e"
	}

	return colors[priority] || "#999"

}

/* =========================
   CREATE TASK CARD
========================= */

function createTaskCard(t) {

	const card = document.createElement("div")

	card.className =
		"task flex border border-yellow-600 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-800 shadow-md transition-all duration-300"

	if (t.completed) {
		card.classList.add("opacity-40", "grayscale", "scale-95")
	}

	card.onclick = () => toggleTask(t.id)

	const priorityBar = document.createElement("div")
	priorityBar.style.width = "8px"
	priorityBar.style.background = getPriorityColor(t.priority)

	const content = document.createElement("div")
	content.className = "flex-1 p-6"

	const title = document.createElement("h3")
	title.className = "text-lg font-bold"
	title.innerText = t.text

	const house = document.createElement("p")
	house.innerText = "Casa " + t.house

	const buttons = document.createElement("div")
	buttons.className = "flex gap-3 mt-3"

	const editBtn = document.createElement("button")
	editBtn.innerText = "✏️"
	editBtn.className = "bg-yellow-600 px-2 rounded"

	editBtn.onclick = (e) => {
		e.stopPropagation()
		editTask(t.id)
	}

	const del = document.createElement("button")
	del.innerText = "X"
	del.className = "bg-red-600 px-2 rounded"

	del.onclick = (e) => {
		e.stopPropagation()
		deleteTask(t.id)
	}

	buttons.append(editBtn, del)
	content.append(title, house, buttons)
	card.append(priorityBar, content)

	return card

}

/* =========================
   RENDER
========================= */

function render() {

	list.innerHTML = ""

	let filteredTasks = tasks

	if (filter !== "all") {
		filteredTasks = filteredTasks.filter(t => t.house === filter)
	}

	if (searchText) {
		filteredTasks = filteredTasks.filter(t =>
			t.text.toLowerCase().includes(searchText)
		)
	}

	filteredTasks.forEach(t => {
		list.appendChild(createTaskCard(t))
	})

	updateStats()

}

/* =========================
   STATS
========================= */

function updateStats() {

	const completed = tasks.filter(t => t.completed).length
	const total = tasks.length

	status.innerText = `${total - completed} activas · ${completed} completadas`

	const percent = total ? (completed / total) * 100 : 0
	progress.style.width = percent + "%"

	alta.innerText = tasks.filter(t => t.priority === "alta").length
	media.innerText = tasks.filter(t => t.priority === "media").length
	baja.innerText = tasks.filter(t => t.priority === "baja").length

}

/* =========================
   INIT
========================= */

render()