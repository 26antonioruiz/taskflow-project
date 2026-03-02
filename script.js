let playerHouse = null;

const houses = {
    "Stark": {
        characters: ["Eddard Stark", "Arya Stark", "Jon Snow"],
        power: 80
    },
    "Lannister": {
        characters: ["Tywin Lannister", "Cersei Lannister", "Tyrion Lannister"],
        power: 85
    },
    "Targaryen": {
        characters: ["Daenerys Targaryen", "Viserys Targaryen", "Rhaegar Targaryen"],
        power: 90
    }
};

function chooseHouse(house) {
    playerHouse = house;
    const infoDiv = document.getElementById('character-info');
    infoDiv.innerHTML = `<h3>${house}</h3>`;
    const ul = document.createElement('ul');

    houses[house].characters.forEach(character => {
        const li = document.createElement('li');
        li.textContent = character;
        ul.appendChild(li);
    });

    infoDiv.appendChild(ul);
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