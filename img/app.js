const taskList = document.getElementById("taskList")

let tasks = [

{ text:"Defender el Muro del Norte", house:"stark", priority:"alta", completed:false },
{ text:"Reforzar Invernalia", house:"stark", priority:"media", completed:false },
{ text:"Explorar Bosque de los Dioses", house:"stark", priority:"baja", completed:false },
{ text:"Vigilar Caminantes Blancos", house:"stark", priority:"alta", completed:false },
{ text:"Patrullar el Norte", house:"stark", priority:"media", completed:false },


{ text:"Blindar Desembarco del Rey", house:"lannister", priority:"alta", completed:false },
{ text:"Proteger el Banco de Hierro", house:"lannister", priority:"media", completed:false },
{ text:"Recaudar impuestos", house:"lannister", priority:"baja", completed:false },
{ text:"Asegurar rutas comerciales", house:"lannister", priority:"media", completed:false },
{ text:"Defender la Fortaleza Roja", house:"lannister", priority:"alta", completed:false },


{ text:"Entrenar dragones", house:"targaryen", priority:"alta", completed:false },
{ text:"Explorar Rocadragón", house:"targaryen", priority:"media", completed:false },
{ text:"Reclutar aliados", house:"targaryen", priority:"baja", completed:false },
{ text:"Conquistar territorios", house:"targaryen", priority:"alta", completed:false },
{ text:"Dominar el fuego", house:"targaryen", priority:"media", completed:false },


{ text:"Controlar tormentas", house:"baratheon", priority:"alta", completed:false },
{ text:"Fortificar Bastión de Tormentas", house:"baratheon", priority:"media", completed:false },
{ text:"Entrenar caballeros", house:"baratheon", priority:"baja", completed:false },
{ text:"Vigilar la costa", house:"baratheon", priority:"media", completed:false },
{ text:"Defender las tierras de la tormenta", house:"baratheon", priority:"alta", completed:false }

]

let currentFilter = "all"



/* AÑADIR MISIÓN */

function addTask(){

const text = document.getElementById("taskInput").value
const house = document.getElementById("houseSelect").value
const priority = document.getElementById("prioritySelect").value

if(text.trim()==="") return

tasks.push({

text,
house,
priority,
completed:false

})

document.getElementById("taskInput").value=""

render()

}



/* RENDERIZAR MISIONES */

function render(){

taskList.innerHTML=""

tasks
.filter(task => currentFilter==="all" || task.house===currentFilter)

.forEach((task,index)=>{

const card = document.createElement("div")

card.className = "mission " + task.house

if(task.completed){
card.classList.add("completed")
}

card.innerHTML = `

<h4>${task.text}</h4>
<p>Casa ${task.house}</p>

<button class="delete">✖</button>

`



/* COMPLETAR MISIÓN */

card.addEventListener("click",()=>{

task.completed = !task.completed

render()

})



/* ELIMINAR MISIÓN */

card.querySelector(".delete").addEventListener("click",(e)=>{

e.stopPropagation()

tasks.splice(index,1)

render()

})

taskList.appendChild(card)

})

updateStats()
updateProgress()

}



/* BARRA DE PROGRESO */

function updateProgress(){

const total = tasks.length

const completed = tasks.filter(t=>t.completed).length

const active = total - completed

document.getElementById("taskCounter").textContent =
`${active} activas ${completed} completadas`

const percent = total===0 ? 0 : (completed/total)*100

document.getElementById("progressBar").style.width = percent + "%"

}



/* ESTADÍSTICAS */

function updateStats(){

const houses = {

stark:0,
lannister:0,
targaryen:0,
baratheon:0

}

const priority = {

alta:0,
media:0,
baja:0

}

tasks.forEach(t=>{

houses[t.house]++
priority[t.priority]++

})

document.getElementById("countStark").textContent = houses.stark
document.getElementById("countLannister").textContent = houses.lannister
document.getElementById("countTargaryen").textContent = houses.targaryen
document.getElementById("countBaratheon").textContent = houses.baratheon

document.getElementById("altaCount").textContent = priority.alta
document.getElementById("mediaCount").textContent = priority.media
document.getElementById("bajaCount").textContent = priority.baja

}



/* FILTRO POR CASAS */

document.querySelectorAll(".sidebar-left li").forEach(item=>{

item.addEventListener("click",()=>{

document.querySelectorAll(".sidebar-left li")
.forEach(li=>li.classList.remove("active"))

item.classList.add("active")

const text = item.textContent.toLowerCase()

if(text.includes("stark")){

currentFilter="stark"

}
else if(text.includes("lannister")){

currentFilter="lannister"

}
else if(text.includes("targaryen")){

currentFilter="targaryen"

}
else if(text.includes("baratheon")){

currentFilter="baratheon"

}
else{

currentFilter="all"

}

render()

})

})



/* BUSCADOR */

document.getElementById("search").addEventListener("input",(e)=>{

const value = e.target.value.toLowerCase()

document.querySelectorAll(".mission").forEach(card=>{

const text = card.innerText.toLowerCase()

card.style.display = text.includes(value) ? "block" : "none"

})

})



/* INICIALIZAR */

render()