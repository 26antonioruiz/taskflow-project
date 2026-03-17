/* ================= STATE ================= */

const houseLogos = {
	stark:"img/stark.png",
	lannister:"img/lannister.png",
	targaryen:"img/targaryen.png",
	baratheon:"img/baratheon.png"
};

let tasks = JSON.parse(localStorage.getItem("tasks"))

if (!tasks || tasks.length === 0) {
	tasks = defaultTasks
	localStorage.setItem("tasks", JSON.stringify(tasks))
};
let filterHouseValue = "all";
let priorityFilter = "all";
let statusFilter = "all";
let searchText = "";
let dragged = null;
let boardMode = false;

/* ================= DOM ================= */

const DOM = {
	list: document.getElementById("tasks"),
	completed: document.getElementById("completedTasks"),
	status: document.getElementById("status"),
	progress: document.getElementById("progress"),
	search: document.getElementById("search"),
	input: document.getElementById("taskInput"),
	house: document.getElementById("houseSelect"),
	priority: document.getElementById("prioritySelect"),
	themeBtn: document.getElementById("themeBtn"),
	sound: document.getElementById("completeSound")
};

/* ================= THEME ================= */

DOM.themeBtn.onclick = () => {
	document.documentElement.classList.toggle("dark");
	localStorage.setItem("theme",
		document.documentElement.classList.contains("dark") ? "dark" : "light"
	);
};

if(localStorage.getItem("theme")==="dark"){
	document.documentElement.classList.add("dark");
}

/* ================= STORAGE ================= */

const save = () => localStorage.setItem("tasks", JSON.stringify(tasks));

/* ================= TASKS ================= */

function addTask(){
	const text = DOM.input.value.trim();
	if(!text) return;

	tasks.unshift({
		id: Date.now(),
		text,
		house: DOM.house.value,
		priority: DOM.priority.value,
		completed: false
	});

	DOM.input.value = "";
	save();
	renderView();
}

function toggleTask(id){
	const t = tasks.find(t=>t.id===id);
	t.completed = !t.completed;
	if(t.completed) playFX();
	save();
	renderView();
}

function deleteTask(id){
	tasks = tasks.filter(t=>t.id!==id);
	save();
	renderView();
}

function editTask(id){
	const t = tasks.find(t=>t.id===id);
	const text = prompt("Editar misión", t.text);
	if(!text) return;
	t.text = text;
	save();
	renderView();
}

/* ================= FX ================= */

function playFX(){
	DOM.sound.currentTime = 0;
	DOM.sound.play();
}

/* ================= FILTERS ================= */

function filterHouse(v, el){
	filterHouseValue = v;
	setActive(".menu-item", el);
	renderView();
}

function filterPriority(v, el){
	priorityFilter = v;
	setActive(".priority", el);
	renderView();
}

function filterStatus(v, el){
	statusFilter = v;
	setActive(".status", el);
	renderView();
}

function setActive(selector, el){
	document.querySelectorAll(selector)
	.forEach(e=>e.classList.remove("menu-active"));
	if(el) el.classList.add("menu-active");
}

/* ================= CARD ================= */

function createCard(t){

	const el = document.createElement("div");
	el.className = "task flex border border-yellow-600 rounded-xl overflow-hidden";
	el.draggable = !t.completed;

	el.onclick = () => toggleTask(t.id);

	el.addEventListener("dragstart", ()=> dragged = t);
	el.addEventListener("dragover", e=>e.preventDefault());

	el.addEventListener("drop", ()=>{
		if(dragged.completed !== t.completed) return;

		const a = tasks.indexOf(dragged);
		const b = tasks.indexOf(t);

		tasks.splice(a,1);
		tasks.splice(b,0,dragged);

		save();
		renderView();
	});

	const colors = {alta:"#dc2626",media:"#f59e0b",baja:"#22c55e"};

	el.innerHTML = `
	<div style="width:8px;background:${colors[t.priority]}"></div>

	<div class="flex-1 p-6">
	<h3>${t.text}</h3>
	<p>Casa ${t.house}</p>
	</div>

	<div class="relative w-64">
	<img src="${houseLogos[t.house]}" class="w-full h-full object-cover">

	<div class="absolute top-2 right-2 flex gap-2">
	<button onclick="event.stopPropagation();editTask(${t.id})">✏️</button>
	<button onclick="event.stopPropagation();deleteTask(${t.id})">X</button>
	</div>
	</div>
	`;

	if(t.completed) el.classList.add("completed","glow");

	return el;
}

/* ================= RENDER ================= */

function applyFilters(arr){

	let f = [...arr];

	if(filterHouseValue!=="all")
		f = f.filter(t=>t.house===filterHouseValue);

	if(priorityFilter!=="all")
		f = f.filter(t=>t.priority===priorityFilter);

	if(statusFilter==="active")
		f = f.filter(t=>!t.completed);

	if(statusFilter==="completed")
		f = f.filter(t=>t.completed);

	if(searchText)
		f = f.filter(t=>t.text.toLowerCase().includes(searchText));

	return f;
}

function render(){

	DOM.list.innerHTML = "";
	DOM.completed.innerHTML = "";

	const filtered = applyFilters(tasks);

	const active = filtered.filter(t=>!t.completed);
	const done = filtered.filter(t=>t.completed);

	active.forEach(t=>DOM.list.appendChild(createCard(t)));
	done.forEach(t=>DOM.completed.appendChild(createCard(t)));

	updateStats();
}

function renderBoard(){

	DOM.list.innerHTML = "";
	DOM.completed.innerHTML = "";

	const cols = ["alta","media","baja"];
	const container = document.createElement("div");
	container.className = "grid grid-cols-3 gap-6";

	const filtered = applyFilters(tasks);

	cols.forEach(p=>{

		const col = document.createElement("div");
		col.innerHTML = `<h3>${p.toUpperCase()}</h3>`;

		const zone = document.createElement("div");

		zone.addEventListener("dragover", e=>e.preventDefault());

		zone.addEventListener("drop", ()=>{
			if(!dragged || dragged.completed) return;
			dragged.priority = p;
			save();
			renderView();
		});

		filtered
		.filter(t=>!t.completed && t.priority===p)
		.forEach(t=>zone.appendChild(createCard(t)));

		col.appendChild(zone);
		container.appendChild(col);
	});

	filtered
	.filter(t=>t.completed)
	.forEach(t=>DOM.completed.appendChild(createCard(t)));

	DOM.list.appendChild(container);

	updateStats();
}

/* ================= STATS ================= */

function updateStats(){

	const active = tasks.filter(t=>!t.completed);
	const done = tasks.filter(t=>t.completed);

	DOM.status.textContent = `${active.length} activas · ${done.length} completadas`;
	DOM.progress.style.width = `${(done.length/tasks.length)*100}%`;

	updateCounters(active);
}

function updateCounters(active){

	["stark","lannister","targaryen","baratheon"]
	.forEach(h=>{
		document.getElementById(h+"Count").textContent =
		active.filter(t=>t.house===h).length;
	});

	document.getElementById("altaCount").textContent =
	active.filter(t=>t.priority==="alta").length;

	document.getElementById("mediaCount").textContent =
	active.filter(t=>t.priority==="media").length;

	document.getElementById("bajaCount").textContent =
	active.filter(t=>t.priority==="baja").length;
}

/* ================= EVENTS ================= */

DOM.search.addEventListener("input", e=>{
	searchText = e.target.value.toLowerCase();
	renderView();
});

/* ================= VIEW ================= */

function renderView(){
	boardMode ? renderBoard() : render();
}

function toggleBoard(){
	boardMode = !boardMode;
	renderView();
}

/* ================= INIT ================= */

renderView();