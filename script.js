// Reproducir música de intro automática
const music = document.getElementById('theme-music');
window.addEventListener('load', () => {
  music.play().catch(()=>{ console.log('Autoplay bloqueado, haz click en el botón') });
});

// Botón Sentarse en el Trono
document.getElementById('throne-btn').addEventListener('click', () => {
  alert('🏰 Te has sentado en el Trono de Hierro. ¡Que reine tu poder!');
});