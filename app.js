/* =========================
STATE
========================= */

const houseLogos = {
	stark: "img/stark.png",
	lannister: "img/lannister.png",
	targaryen: "img/targaryen.png",
	baratheon: "img/baratheon.png"
}

const defaultTasks = [

	{id:1,text:"Defender Invernalia",house:"stark",priority:"alta",completed:false},
	{id:2,text:"Entrenar nuevos soldados",house:"stark",priority:"media",completed:false},
	{id:3,text:"Patrullar el norte",house:"stark",priority:"baja",completed:false},
	{id:4,text:"Proteger el muro",house:"stark",priority:"alta",completed:false},
	{id:5,text:"Reforzar Winterfell",house:"stark",priority:"media",completed:false},

	{id:6,text:"Recaudar impuestos",house:"lannister",priority:"media",completed:false},
	{id:7,text:"Fortificar Roca Casterly",house:"lannister",priority:"alta",completed:false},
	{id:8,text:"Negociar alianzas",house:"lannister",priority:"baja",completed:false},
	{id:9,text:"Supervisar tesoro",house:"lannister",priority:"alta",completed:false},
	{id:10,text:"Enviar espías",house:"lannister",priority:"media",completed:false},

	{id:11,text:"Entrenar dragones",house:"targaryen",priority:"alta",completed:false},
	{id:12,text:"Expandir flota",house:"targaryen",priority:"media",completed:false},
	{id:13,text:"Preparar invasión",house:"targaryen",priority:"alta",completed:false},
	{id:14,text:"Conquistar fortalezas",house:"targaryen",priority:"media",completed:false},
	{id:15,text:"Proteger huevos",house:"targaryen",priority:"baja",completed:false},

	{id:16,text:"Organizar torneo",house:"baratheon",priority:"baja",completed:false},
	{id:17,text:"Entrenar caballeros",house:"baratheon",priority:"media",completed:false},
	{id:18,text:"Proteger Bastión",house:"baratheon",priority:"alta",completed:false},
	{id:19,text:"Reclutar tropas",house:"baratheon",priority:"media",completed:false},
	{id:20,text:"Vigilar la tormenta",house:"baratheon",priority:"alta",completed:false}

]

let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks

let filter = "all"
let searchText = ""
let dragged = null


/* =========================
DOM
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

themeBtn.addEventListener("click", () => {

	document.documentElement.classList.toggle("dark")

	localStorage.setItem(
		"theme",
		document.documentElement.classList.contains("dark")
			? "dark"
			: "light"
	)

})

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
SAVE
========================= */

function saveTasks() {

	localStorage.setItem("tasks", JSON.stringify(tasks))

}


/* =========================
ADD TASK
========================= */

function addTask() {

	const text = document.getElementById("taskInput").value.trim()
	const house = document.getElementById("houseSelect").value
	const priority = document.getElementById("prioritySelect").value

	if (!text) return

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
DELETE
========================= */

function deleteTask(id) {

	tasks = tasks.filter(t => t.id !== id)

	saveTasks()
	render()

}


/* =========================
EDIT
========================= */

function editTask(id) {

	const task = tasks.find(t => t.id === id)

	const newText = prompt("Editar misión:", task.text)

	if (!newText) return

	task.text = newText

	saveTasks()
	render()

}


/* =========================
TOGGLE
========================= */

function toggleTask(id) {

	const task = tasks.find(t => t.id === id)

	task.completed = !task.completed

	saveTasks()
	render()

}


/* =========================
FILTER
========================= */

function filterHouse(house, el) {

	filter = house

	document.querySelectorAll(".house").forEach(h => {
		h.classList.remove("house-active")
	})

	if (el) {
		el.classList.add("house-active")
	}

	render()

}


/* =========================
PRIORITY COLOR
========================= */

function getPriorityColor(priority) {

	const colors = {
		alta: "#dc2626",
		media: "#f59e0b",
		baja: "#22c55e"
	}

	return colors[priority]

}


/* =========================
SORT PRIORITY
========================= */

function sortByPriority(arr) {

	const order = {
		alta: 1,
		media: 2,
		baja: 3
	}

	return arr.sort((a, b) => order[a.priority] - order[b.priority])

}


/* =========================
CREATE CARD
========================= */

function createTaskCard(t) {

	const card = document.createElement("div")

	card.dataset.id = t.id

	card.className = "task flex border border-yellow-600 rounded-xl bg-gray-100 dark:bg-slate-800 shadow-md overflow-hidden"
	card.draggable = true


	/* DRAG */

	card.addEventListener("dragstart", () => {
		dragged = t
	})

	card.addEventListener("dragover", (e) => {
		e.preventDefault()
	})

	card.addEventListener("drop", () => {

		const targetIndex = tasks.indexOf(t)
		const draggedIndex = tasks.indexOf(dragged)

		tasks.splice(draggedIndex, 1)
		tasks.splice(targetIndex, 0, dragged)

		saveTasks()
		render()

	})


	/* PRIORITY BAR */

	const bar = document.createElement("div")

	bar.style.width = "8px"
	bar.style.background = getPriorityColor(t.priority)


	/* CONTENT */

	const content = document.createElement("div")

	content.className = "flex-1 p-6"

	const title = document.createElement("h3")

	title.className = "text-xl font-semibold"
	title.innerText = t.text

	const houseName = document.createElement("p")

	houseName.className = "opacity-70"
	houseName.innerText = "Casa " + t.house

	content.append(title, houseName)


	/* RIGHT SIDE */

	const right = document.createElement("div")

	right.className = "relative w-64"


	/* LOGO */

	const logo = document.createElement("img")

	logo.src = houseLogos[t.house]
	logo.className = "w-full h-full object-cover"


	/* BUTTONS */

	const actions = document.createElement("div")

	actions.className = "absolute top-2 right-2 flex gap-2"


	const edit = document.createElement("button")

	edit.innerText = "✏️"
	edit.className = "bg-yellow-600 px-2 py-1 rounded"

	edit.onclick = (e) => {
		e.stopPropagation()
		editTask(t.id)
	}


	const del = document.createElement("button")

	del.innerText = "X"
	del.className = "bg-red-600 px-2 py-1 rounded"

	del.onclick = (e) => {
		e.stopPropagation()
		deleteTask(t.id)
	}


	actions.append(edit, del)

	right.append(logo, actions)

	card.append(bar, content, right)

	card.onclick = () => toggleTask(t.id)

	if (t.completed) {
		card.classList.add("completed")
	}

	return card

}


/* =========================
RENDER
========================= */

function render() {

	list.innerHTML = ""

	let filtered = [...tasks]

	if (filter !== "all") {
		filtered = filtered.filter(t => t.house === filter)
	}

	if (searchText) {
		filtered = filtered.filter(t =>
			t.text.toLowerCase().includes(searchText)
		)
	}

	filtered = sortByPriority(filtered)

	filtered.forEach(t => {
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

	alta.innerHTML = "🔴 " + tasks.filter(t => t.priority === "alta").length
	media.innerHTML = "🟠 " + tasks.filter(t => t.priority === "media").length
	baja.innerHTML = "🟢 " + tasks.filter(t => t.priority === "baja").length

	updateHouseStats()

}


/* =========================
HOUSE STATS
========================= */

function updateHouseStats() {

	let stark = 0
	let lannister = 0
	let targaryen = 0
	let baratheon = 0

	tasks.forEach(t => {

		if (t.house === "stark") stark++
		if (t.house === "lannister") lannister++
		if (t.house === "targaryen") targaryen++
		if (t.house === "baratheon") baratheon++

	})

	houseStats.innerHTML = `

<li class="flex justify-between hover:text-yellow-400 transition">
<span>🐺 Casa Stark</span>
<span class="font-bold">${stark}</span>
</li>

<li class="flex justify-between hover:text-yellow-400 transition">
<span>🦁 Casa Lannister</span>
<span class="font-bold">${lannister}</span>
</li>

<li class="flex justify-between hover:text-yellow-400 transition">
<span>🐉 Casa Targaryen</span>
<span class="font-bold">${targaryen}</span>
</li>

<li class="flex justify-between hover:text-yellow-400 transition">
<span>🦌 Casa Baratheon</span>
<span class="font-bold">${baratheon}</span>
</li>

`

}


/* =========================
INIT
========================= */

render()