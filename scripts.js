// Datos iniciales de tareas
let tasksData = [
    {house:'Stark', text:'Patrullar el Norte', priority:'high', completed:false},
    {house:'Lannister', text:'Recoger impuestos en Desembarco del Rey', priority:'medium', completed:false},
    {house:'Targaryen', text:'Entrenar dragones jóvenes', priority:'high', completed:false},
    {house:'Stark', text:'Reparar muros de Winterfell', priority:'low', completed:false},
    {house:'Lannister', text:'Organizar banquete real', priority:'medium', completed:false},
];

// Cargar desde localStorage
if(localStorage.getItem('tasks')) tasksData = JSON.parse(localStorage.getItem('tasks'));

// Guardar
function saveTasks(){ localStorage.setItem('tasks', JSON.stringify(tasksData)); }

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
            
            // Completado al click
            section.addEventListener('click',()=>toggleComplete(index));

            // Drag & Drop
            section.addEventListener('dragstart',dragStart);
            section.addEventListener('dragover',dragOver);
            section.addEventListener('drop',drop);

            container.appendChild(section);
        }
    });
}

// Toggle completado
function toggleComplete(i){ tasksData[i].completed=!tasksData[i].completed; saveTasks(); renderTasks(currentHouse); }

// Filtrar por casa
document.querySelectorAll('aside li').forEach(li=>{
    li.addEventListener('click',()=>{
        currentHouse = li.dataset.house;
        renderTasks(currentHouse);
        document.querySelectorAll('aside li').forEach(i=>i.classList.remove('active'));
        li.classList.add('active');
    });
});

// Drag & Drop
let draggedIndex=null;
function dragStart(e){ draggedIndex=e.target.dataset.index; }
function dragOver(e){ e.preventDefault(); }
function drop(e){
    e.preventDefault();
    const targetIndex = e.target.closest('.task').dataset.index;
    const temp = tasksData[draggedIndex];
    tasksData.splice(draggedIndex,1);
    tasksData.splice(targetIndex,0,temp);
    saveTasks();
    renderTasks(currentHouse);
}

// Hamburger móvil
document.getElementById('hamburger').addEventListener('click',()=>{
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display==='block'?'none':'block';
});

// Render inicial
renderTasks();