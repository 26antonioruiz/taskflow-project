const houseItems = document.querySelectorAll('aside li');
const tasks = document.querySelectorAll('.task');
const summaryText = document.getElementById('summary-text');
const membersSummary = document.getElementById('members-summary');

const houseData = {
    Stark: {
        summary: "La Casa Stark es la noble familia del Norte, conocida por su honor, justicia y su lema 'Se acerca el Invierno'. Su sede es Winterfell.",
        members: {
            "Eddard Stark": "Señor de Winterfell, famoso por su honor.",
            "Catelyn Stark": "Madre protectora.",
            "Robb Stark": "Rey en el Norte.",
            "Sansa Stark": "Hija diplomática.",
            "Arya Stark": "Hija guerrera.",
            "Jon Snow": "Líder contra los Caminantes Blancos."
        }
    },
    Lannister: {
        summary: "Casa Lannister del Oeste, conocida por su riqueza y lema 'Oye mi rugido'.",
        members: {
            "Tywin": "Patriarca y estratega.",
            "Cersei": "Reina de los Siete Reinos.",
            "Jaime": "Guerrero hábil.",
            "Tyrion": "Intelectual.",
            "Joffrey": "Rey cruel."
        }
    },
    Targaryen: {
        summary: "Casa Targaryen gobernó con dragones, lema 'Fuego y Sangre'.",
        members: {
            "Aegon I": "El Conquistador.",
            "Daenerys": "Madre de dragones.",
            "Viserys": "Hermano ambicioso."
        }
    },
    Baratheon: {
        summary: "Casa Baratheon de Bastión de Tormentas y Desembarco del Rey, lema 'Nuestra es la Furia'.",
        members: {
            "Robert": "Rey de los Siete Reinos.",
            "Stannis": "Hermano de Robert.",
            "Renly": "Hermano menor."
        }
    },
    Greyjoy: {
        summary: "Casa Greyjoy de las Islas del Hierro, lema 'Nosotros no sembramos'.",
        members: {
            "Balon": "Señor de las Islas del Hierro.",
            "Yara": "Hija valiente.",
            "Theon": "Busca redención."
        }
    },
    Tyrell: {
        summary: "Casa Tyrell de Altojardín, rica y diplomática, lema 'Crecer fuerte'.",
        members: {
            "Margaery": "Astuta y carismática.",
            "Olenna": "La Reina de Espinas.",
            "Loras": "Hijo caballeroso."
        }
    },
    Martell: {
        summary: "Casa Martell de Dorne, lema 'Nunca doblegado, nunca roto'.",
        members: {
            "Doran": "Príncipe prudente.",
            "Oberyn": "El Víbora Roja.",
            "Arianne": "Hija ambiciosa."
        }
    },
    Arryn: {
        summary: "Casa Arryn del Valle, lema 'Tan alto como honor'.",
        members: {
            "Jon Arryn": "Guardián de los Siete Reinos.",
            "Lysa": "Madre protectora.",
            "Robin": "Hijo heredero."
        }
    },
    Tully: {
        summary: "Casa Tully de Aguasdulces, lema 'Familia, deber, honor'.",
        members: {
            "Hoster": "Patriarca rígido.",
            "Catelyn": "Hija protectora.",
            "Edmure": "Heredero inexperto."
        }
    },
    Bolton: {
        summary: "Casa Bolton, famosa por su crueldad, lema 'Nosotros guardamos los secretos'.",
        members: {
            "Roose": "Señor cruel.",
            "Ramsay": "Hijo sádico."
        }
    },
    Frey: {
        summary: "Casa Frey del Paso de los Gemelos, famosa por la Boda Roja.",
        members: {
            "Walder": "Patriarca ambicioso."
        }
    },
    Mormont: {
        summary: "Casa Mormont del Norte, leal a los Stark. Lema: 'Aquí estamos'.",
        members: {
            "Jeor": "Lord Comandante de la Guardia de la Noche.",
            "Lyanna": "Joven y valiente líder."
        }
    }
};

// Interacción sidebar
houseItems.forEach(item => {
    item.addEventListener('click', () => {
        houseItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const house = item.dataset.house;
        const houseInfo = houseData[house];

        // Filtrar tareas
        tasks.forEach(task => {
            if(task.dataset.house === house) task.style.display = 'flex';
            else task.style.display = 'none';
        });

        // Mostrar resumen de casa y miembros
        summaryText.textContent = houseInfo.summary;
        membersSummary.innerHTML = '';
        for(const [name, desc] of Object.entries(houseInfo.members)) {
            const div = document.createElement('div');
            div.className = 'member';
            div.innerHTML = `<strong>${name}:</strong> ${desc}`;
            membersSummary.appendChild(div);
        }
    });
});

// Marcar tareas como completadas
tasks.forEach(task => {
    task.addEventListener('click', () => {
        task.classList.toggle('completed');
    });
});