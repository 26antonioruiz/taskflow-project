let playerHouse = null;

const houses = {
    "Stark": {
        characters: [
            { name: "Jon", image: "stark-jon.png" },
            { name: "Arya", image: "stark-arya.png" },
            { name: "Ned", image: "stark-ned.png" }
        ],
        power: 80
    },
    "Lannister": {
        characters: [
            { name: "Tyrion", image: "lannister-tyrion.png" },
            { name: "Cersei", image: "lannister-cersei.png" },
            { name: "Tywin", image: "lannister-tywin.png" }
        ],
        power: 85
    },
    "Targaryen": {
        characters: [
            { name: "Daenerys", image: "targaryen-daenerys.png" },
            { name: "Rhaegar", image: "targaryen-rhaegar.png" },
            { name: "Viserys", image: "targaryen-viserys.png" }
        ],
        power: 90
    }
};

function chooseHouse(house) {
    playerHouse = house;
    const infoDiv = document.getElementById('character-info');
    const logoDiv = document.getElementById('house-logo');

    // Muestra la imagen de la casa
    logoDiv.innerHTML = `<img src="images/${house.toLowerCase()}-house.png" alt="${house}">`;

    // Muestra los personajes
    infoDiv.innerHTML = `<h3>${house}</h3>`;
    houses[house].characters.forEach(character => {
        const div = document.createElement('div');
        div.classList.add('character-card');
        div.innerHTML = `<img src="images/${character.image}" alt="${character.name}"><p>${character.name}</p>`;
        infoDiv.appendChild(div);
    });

    document.getElementById('battle-result').innerHTML = "";
}

// Función para animaciones de efectos
function createEffect(type, x, y) {
    const effectsDiv = document.getElementById('effects');
    const effect = document.createElement('div');
    effect.className = type;
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effectsDiv.appendChild(effect);
    setTimeout(() => effectsDiv.removeChild(effect), 1000);
}

function startBattle() {
    if (!playerHouse) {
        alert("¡Primero elige tu casa!");
        return;
    }

    const houseNames = Object.keys(houses).filter(h => h !== playerHouse);
    const enemyHouse = houseNames[Math.floor(Math.random() * houseNames.length)];

    const playerPower = houses[playerHouse].power + Math.floor(Math.random() * 20);
    const enemyPower = houses[enemyHouse].power + Math.floor(Math.random() * 20);

    let resultText = `Tu casa ${playerHouse} pelea contra ${enemyHouse}.<br>`;
    resultText += `Poder de tu casa: ${playerPower}<br>`;
    resultText += `Poder enemigo: ${enemyPower}<br>`;

    // Efectos según la casa
    if (playerHouse === "Targaryen") {
        createEffect('fire', Math.random()*window.innerWidth, Math.random()*300);
    } else if (playerHouse === "Stark") {
        createEffect('snowflake', Math.random()*window.innerWidth, -10);
    }

    if (playerPower > enemyPower) {
        resultText += `<strong>¡Has ganado la batalla!</strong>`;
    } else if (playerPower < enemyPower) {
        resultText += `<strong>¡Has perdido la batalla!</strong>`;
    } else {
        resultText += `<strong>¡Empate!</strong>`;
    }

    document.getElementById('battle-result').innerHTML = resultText;
}