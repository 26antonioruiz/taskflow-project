let tasks = JSON.parse(localStorage.getItem("tasks")) || [

{
id:1,
text:"Defender el Muro del Norte",
house:"stark",
priority:"alta",
completed:false
},

{
id:2,
text:"Reforzar Invernalia",
house:"stark",
priority:"media",
completed:false
},

{
id:3,
text:"Explorar Bosque de los Dioses",
house:"stark",
priority:"baja",
completed:false
},

{
id:4,
text:"Vigilar Caminantes Blancos",
house:"stark",
priority:"alta",
completed:false
},

{
id:5,
text:"Entrenar Guardia Stark",
house:"stark",
priority:"media",
completed:false
},

{
id:6,
text:"Recaudar oro en Roca Casterly",
house:"lannister",
priority:"media",
completed:false
},

{
id:7,
text:"Proteger a Tyrion",
house:"lannister",
priority:"alta",
completed:false
},

{
id:8,
text:"Espiar en Desembarco",
house:"lannister",
priority:"baja",
completed:false
},

{
id:9,
text:"Negociar con Tyrell",
house:"lannister",
priority:"media",
completed:false
},

{
id:10,
text:"Expandir ejército Lannister",
house:"lannister",
priority:"alta",
completed:false
},

{
id:11,
text:"Entrenar dragones",
house:"targaryen",
priority:"alta",
completed:false
},

{
id:12,
text:"Recuperar Meereen",
house:"targaryen",
priority:"media",
completed:false
},

{
id:13,
text:"Reclutar Inmaculados",
house:"targaryen",
priority:"media",
completed:false
},

{
id:14,
text:"Explorar Essos",
house:"targaryen",
priority:"baja",
completed:false
},

{
id:15,
text:"Fortalecer flota Targaryen",
house:"targaryen",
priority:"alta",
completed:false
},

{
id:16,
text:"Reforzar Bastión de Tormentas",
house:"baratheon",
priority:"media",
completed:false
},

{
id:17,
text:"Entrenar caballeros Baratheon",
house:"baratheon",
priority:"baja",
completed:false
},

{
id:18,
text:"Proteger costa del Este",
house:"baratheon",
priority:"media",
completed:false
},

{
id:19,
text:"Convocar Consejo de Guerra",
house:"baratheon",
priority:"alta",
completed:false
},

{
id:20,
text:"Patrullar Tierras de la Tormenta",
house:"baratheon",
priority:"baja",
completed:false
}

]
let filter = "all"

const list = document.getElementById("tasks")
const status = document.getElementById("status")
const progress = document.getElementById("progress")

const alta = document.getElementById("altaCount")
const media = document.getElementById("mediaCount")
const baja = document.getElementById("bajaCount")

const houseStats = document.getElementById("houseStats")


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
   ADD TASK
========================= */

function addTask() {

	const text = document.getElementById("taskInput").value
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

	save()
	render()

	document.getElementById("taskInput").value = ""
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

	tasks = tasks.filter(task => task.id !== id)

	save()
	render()
}


/* =========================
   COMPLETE TASK
========================= */

function toggleTask(id) {

	const task = tasks.find(t => t.id === id)

	task.completed = !task.completed

	save()
	render()
}


/* =========================
   SAVE LOCAL STORAGE
========================= */

function save() {
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
   RENDER
========================= */

function render() {

	list.innerHTML = ""

	let active = 0
	let completed = 0

	let altaC = 0
	let mediaC = 0
	let bajaC = 0

	let houseCount = {
		stark: 0,
		lannister: 0,
		targaryen: 0,
		baratheon: 0
	}


	tasks
		.filter(t => filter === "all" || t.house === filter)
		.forEach(t => {

			const card = document.createElement("div")
                if (t.completed) {
	            card.classList.add("opacity-40", "grayscale", "scale-95")
                    
            }

			card.className =
	            "task flex border border-yellow-600 rounded-xl overflow-hidden bg-gray-100 dark:bg-black transition-opacity duration-300"

			card.onclick = () => toggleTask(t.id)


			const priorityBar = document.createElement("div")
			priorityBar.style.width = "8px"

			if (t.priority === "alta") priorityBar.style.background = "#dc2626"
			if (t.priority === "media") priorityBar.style.background = "#f59e0b"
			if (t.priority === "baja") priorityBar.style.background = "#22c55e"


			const content = document.createElement("div")
			content.className = "flex-1 p-6"


			const title = document.createElement("h3")
			title.className = "text-lg font-bold"
			title.innerText = t.text


			if (t.completed) {
				title.classList.add("completed")
				completed++
			} else {
				active++
			}


			const house = document.createElement("p")
			house.innerText = "Casa " + t.house


			const del = document.createElement("button")
			del.innerText = "X"
			del.className = "mt-3 bg-red-600 text-white px-2 rounded"

			del.onclick = (e) => {
				e.stopPropagation()
				deleteTask(t.id)
			}


			content.append(title, house, del)


			const img = document.createElement("img")
			img.src = "img/" + t.house + ".png"
			img.className = "w-40 object-cover"


			card.append(priorityBar, content, img)

			list.appendChild(card)


			houseCount[t.house]++

			if (t.priority === "alta") altaC++
			if (t.priority === "media") mediaC++
			if (t.priority === "baja") bajaC++
		})


	status.innerText = `${active} activas · ${completed} completadas`

	progress.style.width = (completed / tasks.length * 100 || 0) + "%"

	alta.innerText = altaC
	media.innerText = mediaC
	baja.innerText = bajaC

	houseStats.innerHTML = `
		<li>Stark ${houseCount.stark}</li>
		<li>Lannister ${houseCount.lannister}</li>
		<li>Targaryen ${houseCount.targaryen}</li>
		<li>Baratheon ${houseCount.baratheon}</li>
	`
}

render()