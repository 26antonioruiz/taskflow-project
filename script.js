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

    logoDiv.innerHTML = `<img src="images/${house.toLowerCase()}-house.png" alt="${house}">`;
    infoDiv.innerHTML = `<h3>${house}</h3>`;

    houses[house].characters.forEach(char => {
        const div = document.createElement('div');
        div.classList.add('character-card');
        div.innerHTML = `<img src="images/${char.image}" alt="${char.name}"><p>${char.name}</p>`;
        infoDiv.appendChild(div);
    });

    document.getElementById('battle-result').innerHTML = "";
}

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

    const enemyHouse = Object.keys(houses).filter(h => h !== playerHouse)[Math.floor(Math.random()*2)];
    const playerPower = houses[playerHouse].power + Math.floor(Math.random()*20);
    const enemyPower = houses[enemyHouse].power + Math.floor(Math.random()*20);

    let result = `Tu casa ${playerHouse} pelea contra ${enemyHouse}.<br>`;
    result += `Poder de tu casa: ${playerPower}<br>`;
    result += `Poder enemigo: ${enemyPower}<br>`;

    if (playerHouse === "Targaryen") createEffect('fire', Math.random()*window.innerWidth, Math.random()*300);
    if (playerHouse === "Stark") createEffect('snowflake', Math.random()*window.innerWidth, -10);

    if (playerPower > enemyPower) result += "<strong>¡Has ganado la batalla!</strong>";
    else if (playerPower < enemyPower) result += "<strong>¡Has perdido la batalla!</strong>";
    else result += "<strong>¡Empate!</strong>";

    document.getElementById('battle-result').innerHTML = result;
}

// Hacer accesibles las funciones a los botones
window.chooseHouse = chooseHouse;
window.startBattle = startBattle;