let playerHouse = null;

const houses = {
    "Stark": {
        characters: ["Eddard", "Arya", "Jon"],
        power: 80,
        image: "stark.png"
    },
    "Lannister": {
        characters: ["Tywin", "Cersei", "Tyrion"],
        power: 85,
        image: "lannister.png"
    },
    "Targaryen": {
        characters: ["Daenerys", "Viserys", "Rhaegar"],
        power: 90,
        image: "targaryen.png"
    }
};

function chooseHouse(house) {
    playerHouse = house;
    const infoDiv = document.getElementById('character-info');
    infoDiv.innerHTML = `<h3>${house}</h3>`;
    
    houses[house].characters.forEach(character => {
        const div = document.createElement('div');
        div.classList.add('character-card');
        div.innerHTML = `<img src="images/${houses[house].image}" alt="${character}"><p>${character}</p>`;
        infoDiv.appendChild(div);
    });

    document.getElementById('battle-result').innerHTML = "";
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

    if (playerPower > enemyPower) {
        resultText += `<strong>¡Has ganado la batalla!</strong>`;
    } else if (playerPower < enemyPower) {
        resultText += `<strong>¡Has perdido la batalla!</strong>`;
    } else {
        resultText += `<strong>¡Empate!</strong>`;
    }

    document.getElementById('battle-result').innerHTML = resultText;
}