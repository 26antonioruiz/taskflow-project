// Datos iniciales
let tasksData = [
    {house:'Stark', text:'Patrullar el Norte', priority:'high', completed:false},
    {house:'Lannister', text:'Recoger impuestos en Desembarco del Rey', priority:'medium', completed:false},
    {house:'Targaryen', text:'Entrenar dragones jóvenes', priority:'high', completed:false},
    {house:'Stark', text:'Reparar muros de Winterfell', priority:'low', completed:false},
    {house:'Lannister', text:'Organizar banquete real', priority:'medium', completed:false},
];

// Guardado localStorage
if(localStorage.getItem('tasks')) tasksData = JSON.parse(localStorage.getItem('tasks'));
let battlePoints = localStorage.getItem('battlePoints') || 0;

// Guardar función
function saveTasks(){ 
    localStorage.setItem('tasks', JSON.stringify(tasksData)); 
    localStorage.setItem('battlePoints', battlePoints);
}

// Renderizar tareas
let currentHouse = 'Stark';
function renderTasks(filterHouse=currentHouse){
    const container = document.getElementById('tasks');
    container.innerHTML='';
    tasksData.forEach((task,index)=>{
        if(task.house===filterHouse){
            const section = document.createElement('section');
            section.className='task';
            if(task.completed) section.classList.add('completed');
            section.dataset.index=index;
            section.draggable=true;
            section.innerHTML=`<span>${task.text}</span><span class="badge ${task.priority}">${task.priority.toUpperCase()}</span>`;
            
            // Click para completar
            section.addEventListener('click',()=>{
                toggleComplete(index);
            });

            container.appendChild(section);
        }
    });
    updateBattleBar();
}

// Toggle completado
function toggleComplete(i){
    if(!tasksData[i].completed){
        tasksData[i].completed=true;
        battlePoints = parseInt(battlePoints)+10; // 10 pts por tarea
        saveTasks();
        renderTasks(currentHouse);
    }
}

// Actualizar barra de batalla
function updateBattleBar(){
    const fill = document.getElementById('battle-fill');
    const points = document.getElementById('battle-points');
    let percent = Math.min((battlePoints/100)*100,100);
    fill.style.width = percent+'%';
    points.textContent = battlePoints+' pts';
}

// Filtrar por casa
document.querySelectorAll('aside li').forEach(li=>{
    li.addEventListener('click',()=>{
        currentHouse = li.dataset.house;
        renderTasks(currentHouse);
        document.querySelectorAll('aside li').forEach(i=>i.classList.remove('active'));
        li.classList.add('active');
    });
});

// Hamburger móvil
document.getElementById('hamburger').addEventListener('click',()=>{
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display==='block'?'none':'block';
});

// Render inicial
renderTasks();