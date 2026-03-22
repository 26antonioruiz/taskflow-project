import {
	getTasks,
	createTask,
	deleteTask as deleteTaskAPI,
	getTasksApiBase
} from "./api/client.js";

if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}

const SCROLL_KEY = "taskflow-scroll-y";
window.addEventListener("beforeunload", () => {
	try {
		sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
	} catch (_) {
	}
});

/* ================= STATE ================= */

const houseLogos = {
	stark:"img/stark.png",
	lannister:"img/lannister.png",
	targaryen:"img/targaryen.png",
	baratheon:"img/baratheon.png"
};

const INITIAL_TASKS = [
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

let tasks = [];

/* ================= RESTO IGUAL ================= */

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
	status: document.getElementById("statusMessage") || document.getElementById("status"),
	stats: document.getElementById("stats"), // ← AQUÍ
	progress: document.getElementById("progress"),
	search: document.getElementById("search"),
	input: document.getElementById("taskInput"),
	house: document.getElementById("houseSelect"),
	priority: document.getElementById("prioritySelect"),
	themeBtn: document.getElementById("themeBtn"),
	sound: document.getElementById("completeSound"),
	addBtn: document.getElementById("addTaskBtn"),
	kanbanBtn: document.getElementById("kanbanBtn")
};

function setStatusLine(text) {
	if (DOM.status) DOM.status.textContent = text;
}

function setUiReady(ready) {
	const d = !ready;
	DOM.input.disabled = d;
	DOM.house.disabled = d;
	DOM.priority.disabled = d;
	DOM.search.disabled = d;
	if (DOM.addBtn) DOM.addBtn.disabled = d;
	if (DOM.kanbanBtn) DOM.kanbanBtn.disabled = d;
}

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

/* ================= TASKS ================= */

async function addTask(){
	const text = DOM.input.value.trim();
	if(!text) return;

	try {
		setStatusLine("Añadiendo...");

		const nueva = await createTask({
			text,
			house: DOM.house.value,
			priority: DOM.priority.value
		});

		
		tasks.unshift(nueva);

		DOM.input.value = "";
		setStatusLine("");

		renderView();

	} catch (err) {
		setStatusLine(err.message);
	}
}

function taskById(id) {
	const n = Number(id);
	return tasks.find((x) => Number(x.id) === n);
}

async function toggleTask(id){
	const t = taskById(id);
	if (!t) return;

	const prev = t.completed;
	t.completed = !t.completed;
	setStatusLine("");
	renderView();

	try {
		const res = await fetch(
			`${getTasksApiBase()}?id=${Number(id)}`,
			{ method: "PATCH" }
		);
		if (!res.ok) throw new Error("No se pudo actualizar la misión");

		const serverTask = await res.json();
		if (typeof serverTask.completed === "boolean") {
			t.completed = serverTask.completed;
			renderView();
		}
	} catch (err) {
		t.completed = prev;
		renderView();
		setStatusLine(err.message || "Error al actualizar");
	}
}
async function deleteTask(id){
	try {
		await deleteTaskAPI(id);

		tasks = tasks.filter(t => t.id !== id);

		renderView();

	} catch (err) {
		setStatusLine(err.message);
	}
}

function editTask(id){
	const t = taskById(id);
	const text = prompt("Editar misión", t.text);
	if(!text) return;
	t.text = text;

	renderView();
}

async function loadTasks(retries = 3) {
	try {
		setStatusLine("Cargando...");
		renderView();

		const data = await getTasks();

		tasks = data;

		setStatusLine("");

		setUiReady(true);
		renderView();
	} catch (err) {
		if (retries > 0) {
			setTimeout(() => loadTasks(retries - 1), 500);
		} else {
			tasks = INITIAL_TASKS.map((t) => ({ ...t }));
			setStatusLine(
				"Sin servidor: en la raíz del proyecto ejecuta «npm run dev» (o doble clic en iniciar-servidor.bat) y abre http://localhost:3000"
			);
			setUiReady(true);
			renderView();
		}
	}
}

/* ================= FX ================= */

function playFX(){
	DOM.sound.currentTime = 0;
	DOM.sound.play();
}

/* ================= FILTERS ================= */

const HOUSE_FILTER_VALUES = ["all", "stark", "lannister", "targaryen", "baratheon"];
const PRIORITY_FILTER_VALUES = ["all", "alta", "media", "baja"];
const STATUS_FILTER_VALUES = ["all", "active", "completed"];

const FILTER_STORAGE_KEY = "taskflow-filters-v1";

function readFiltersFromStorage() {
	try {
		const raw = sessionStorage.getItem(FILTER_STORAGE_KEY);
		if (!raw) return;
		const j = JSON.parse(raw);
		if (j.house && HOUSE_FILTER_VALUES.includes(j.house)) filterHouseValue = j.house;
		if (j.priority && PRIORITY_FILTER_VALUES.includes(j.priority)) priorityFilter = j.priority;
		if (j.status && STATUS_FILTER_VALUES.includes(j.status)) statusFilter = j.status;
		if (typeof j.search === "string") {
			searchText = j.search.toLowerCase();
			if (DOM.search) DOM.search.value = j.search;
		}
	} catch (_) {
	}
}

function persistFiltersToStorage() {
	try {
		sessionStorage.setItem(
			FILTER_STORAGE_KEY,
			JSON.stringify({
				house: filterHouseValue,
				priority: priorityFilter,
				status: statusFilter,
				search: DOM.search ? DOM.search.value : ""
			})
		);
	} catch (_) {
	}
}

function syncFilterUiFromState() {
	const aside = document.querySelector("aside");
	if (!aside) return;

	aside.querySelectorAll(".house-filter").forEach((el, i) => {
		el.classList.toggle("menu-active", filterHouseValue === HOUSE_FILTER_VALUES[i]);
	});
	aside.querySelectorAll(".filter-priority").forEach((el, i) => {
		el.classList.toggle("menu-active", priorityFilter === PRIORITY_FILTER_VALUES[i]);
	});
	const a = aside.querySelector("#filter-state-all");
	const b = aside.querySelector("#filter-state-active");
	const c = aside.querySelector("#filter-state-completed");
	if (a && b && c) {
		a.classList.toggle("menu-active", statusFilter === "all");
		b.classList.toggle("menu-active", statusFilter === "active");
		c.classList.toggle("menu-active", statusFilter === "completed");
	} else {
		aside.querySelectorAll(".filter-state").forEach((el, i) => {
			el.classList.toggle("menu-active", statusFilter === STATUS_FILTER_VALUES[i]);
		});
	}
}

function filterHouse(v, el){
	filterHouseValue = v;
	persistFiltersToStorage();
	renderView();
}

function filterPriority(v, el){
	priorityFilter = v;
	persistFiltersToStorage();
	renderView();
}

function filterStatus(v, el){
	statusFilter = v;
	persistFiltersToStorage();
	renderView();
}

/* ================= CARD ================= */

function createCard(t){


	
	const el = document.createElement("div");
	el.className = "task flex border border-yellow-600 rounded-xl overflow-hidden";

	const colors = { alta: "#dc2626", media: "#f59e0b", baja: "#22c55e" };

	el.innerHTML = `
	<div class="task-drag-handle shrink-0" style="width:8px;background:${colors[t.priority]};cursor:grab" title="Arrastrar para reordenar"></div>

	<div class="flex-1 p-6">
	<h3>${t.text}</h3>
	<p>Casa ${t.house}</p>
	</div>

	<div class="relative w-64">
	<img src="${houseLogos[t.house]}" class="w-full h-full object-cover" alt="">

	<div class="absolute top-2 right-2 flex gap-2">
	<button type="button" onclick="event.stopPropagation();editTask(${t.id})">✏️</button>
	<button type="button" onclick="event.stopPropagation();deleteTask(${t.id})"
	class="text-white opacity-70 hover:opacity-100 hover:text-red-500 transition">🗑️</button>
	</div>
	</div>
	`;


el.draggable = true;

el.dataset.id = t.id;

el.addEventListener("dragstart", () => {
dragged = t.id;
});

	const handle = el.querySelector(".task-drag-handle");
	handle.draggable = !t.completed;
	handle.addEventListener("dragstart", (e) => {
		dragged = t;
		e.dataTransfer.effectAllowed = "move";
	});

	el.addEventListener("click", (e) => {
		if (e.target.closest("button")) return;
		if (e.target.closest(".task-drag-handle")) return;
		toggleTask(t.id);
	});

	el.addEventListener("dragover", (e) => e.preventDefault());

	el.addEventListener("drop", () => {
		if (dragged.completed !== t.completed) return;

		const a = tasks.indexOf(dragged);
		const b = tasks.indexOf(t);

		tasks.splice(a, 1);
		tasks.splice(b, 0, dragged);

		renderView();
	});

	if (t.completed) el.classList.add("completed");

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

	DOM.stats.textContent = `${active.length} activas · ${done.length} completadas`;
	DOM.progress.style.width = tasks.length
		? `${(done.length / tasks.length) * 100}%`
		: "0%";

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
	persistFiltersToStorage();
	renderView();
});

/* ================= VIEW ================= */

function renderView(){
	boardMode ? renderBoard() : render();
	syncFilterUiFromState();
}

function toggleBoard(){
	boardMode = !boardMode;
	renderView();
}

window.addTask = addTask;
window.deleteTask = deleteTask;
window.editTask = editTask;
window.filterHouse = filterHouse;
window.filterPriority = filterPriority;
window.filterStatus = filterStatus;
window.toggleBoard = toggleBoard;


/* ================= INIT ================= */

readFiltersFromStorage();

(async () => {
	await loadTasks();
	try {
		const raw = sessionStorage.getItem(SCROLL_KEY);
		if (raw == null) return;
		sessionStorage.removeItem(SCROLL_KEY);
		const y = parseInt(raw, 10);
		if (!Number.isFinite(y)) return;
		requestAnimationFrame(() => {
			requestAnimationFrame(() => window.scrollTo(0, y));
		});
	} catch (_) {
	}

})();