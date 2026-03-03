const sidebarItems = document.querySelectorAll('.sidebar li');
const missions = document.querySelectorAll('.mission-card');
const missionsCount = document.getElementById('missions-count');
const missionsCompleted = document.getElementById('missions-completed');
const mainContent = document.querySelector('.main-content');

function updateCompletedCounter() {
  const completed = document.querySelectorAll('.mission-card.completed').length;
  const total = missions.length;
  missionsCompleted.textContent = `${completed} completadas / ${total}`;
}

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i=>i.classList.remove('active'));
    item.classList.add('active');

    const house = item.dataset.house;
    let visibleCount=0;
    missions.forEach(m=>{
      if(house==='all'||m.dataset.house===house){ m.style.display='flex'; visibleCount++; }
      else { m.style.display='none'; }
    });
    missionsCount.textContent = `${visibleCount} activas`;

    // Cambiar fondo según la casa
    switch(house){
      case 'stark': mainContent.style.backgroundImage="url('stark.png')"; break;
      case 'lannister': mainContent.style.backgroundImage="url('lannister.png')"; break;
      case 'targaryen': mainContent.style.backgroundImage="url('targaryen.png')"; break;
      case 'baratheon': mainContent.style.backgroundImage="url('baratheon.png')"; break;
      default: mainContent.style.backgroundImage="url('medieval-bg.jpg')";
    }
  });
});

// Tarjetas clicables
missions.forEach(card=>{
  card.addEventListener('click',()=>{
    card.classList.toggle('completed');
    updateCompletedCounter();
  });
});

// Inicializa contador
updateCompletedCounter();