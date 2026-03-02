const houseItems = document.querySelectorAll('aside li');
const tasks = document.querySelectorAll('.task');
const summaryText = document.getElementById('summary-text');
const membersSummary = document.getElementById('members-summary');

const houseData = {
    Stark: {
        summary: "La Casa Stark es la noble familia del Norte, conocida por su honor, justicia y su lema 'Se acerca el Invierno'. Su sede es Winterfell. Los Stark han defendido el Norte durante siglos y son famosos por su resiliencia y lealtad.",
        members: {
            "Eddard Stark": "Señor de Winterfell, famoso por su honor y liderazgo.",
            "Catelyn Stark": "Esposa de Eddard, madre protectora.",
            "Robb Stark": "Hijo mayor, Rey en el Norte.",
            "Sansa Stark": "Hija mayor, inteligente y diplomática.",
            "Arya Stark": "Hija menor, hábil guerrera.",
            "Jon Snow": "Hijo bastardo, líder en la lucha contra los Caminantes Blancos."
        }
    },
    Lannister: {
        summary: "La Casa Lannister, poderosa familia del Oeste, es conocida por su riqueza y su lema 'Oye mi rugido'. Su sede es Roca Casterly.",
        members: {
            "Tywin Lannister": "Patriarca y estratega político.",
            "Cersei Lannister": "Reina de los Siete Reinos.",
            "Jaime Lannister": "Guerrero hábil y hermano de Cersei.",
            "Tyrion Lannister": "Intelectual y diplomático.",
            "Joffrey Baratheon": "Rey joven, cruel y arrogante."
        }
    },
    Targaryen: {
        summary: "La Casa Targaryen gobernó los Siete Reinos con dragones y su lema es 'Fuego y Sangre'.",
        members: {
            "Aegon I": "El Conquistador que unificó los Siete Reinos.",
            "Daenerys Targaryen": "Madre de dragones.",
            "Viserys Targaryen": "Hermano ambicioso."
        }
    },
    Baratheon: {
        summary: "La Casa Baratheon gobierna desde Bastión de Tormentas y Desembarco del Rey. Su lema es 'Nuestra es la Furia'.",
        members: {
            "Robert Baratheon": "Rey de los Siete Reinos.",
            "Stannis Baratheon": "Hermano de Robert, riguroso.",
            "Renly Baratheon": "Hermano menor, carismático."
        }
    },
    Greyjoy: {
        summary: "La Casa Greyjoy gobierna las Islas del Hierro, su lema es 'Nosotros no sembramos'.",
        members: {
            "Balon Greyjoy": "Señor de las Islas del Hierro.",
            "Yara Greyjoy": "Hija valiente.",
            "Theon Greyjoy": "Secuestrado, busca redención."
        }
    },
    Tyrell: {
        summary: "La Casa Tyrell, con sede en Altojardín, es rica y diplomática. Su lema es 'Crecer fuerte'.",
        members: {
            "Margaery Tyrell": "Astuta y carismática.",
            "Olenna Tyrell": "La Reina de Espinas.",
            "Loras Tyrell": "Hijo caballeroso."
        }
    },
    Martell: {
        summary: "La Casa Martell gobierna Dorne, famosa por su cultura liberal. Su lema: 'Nunca doblegado, nunca roto'.",
        members: {
            "Doran Martell": "Príncipe prudente.",
            "Oberyn Martell": "El Víbora Roja.",
            "Arianne Martell": "Hija ambiciosa."
        }
    },
    Arryn: {
        summary: "La Casa Arryn gobierna el Valle desde el Nido de Águilas. Su lema es 'Tan alto como honor'.",
        members: {
            "Jon Arryn": "Guardián de los Siete Reinos.",
            "Lysa Arryn": "Madre protectora.",
            "Robin Arryn": "Hijo frágil heredero del Valle."
        }
    },
    Tully: {
        summary: "La Casa Tully gobierna Aguasdulces. Su lema es 'Familia, deber, honor'.",
        members: {
            "Hoster Tully": "Patriarca rígido.",
            "Catelyn Stark": "Hija protectora.",
            "Edmure Tully": "Heredero noble pero inexperto."
        }
    },
    Bolton: {
        summary: "La Casa Bolton, famosa por su crueldad. Su lema: 'Nosotros guardamos los secretos'.",
        members: {
            "Roose Bolton": "Señor cruel y calculador.",
            "Ramsay Bolton": "Hijo sádico."
        }
    },
    Frey: {
        summary: "La Casa Frey controla el Paso de los Gemelos y es famosa por la Boda Roja.",
        members: {
            "Walder Frey": "Patriarca ambicioso y traicionero."
        }
    },
    Mormont: {
        summary: "La Casa Mormont es del Norte, leal a los Stark. Su lema: 'Aquí estamos'. Sede: Isla del Oso.",
        members: {
            "Jeor Mormont": "Lord Comandante de la Guardia de la Noche.",
            "Lyanna Mormont": "Joven y valiente líder."
        }
    }
};

houseItems.forEach(item => {
    item.addEventListener('click', () => {
        houseItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const house = item.dataset.house;
        const houseInfo = houseData[house];

        // Filtrar tareas
        tasks.forEach(task => {
            if(task.dataset.house === house) {
                task.style.display = 'flex';
                setTimeout(()=> task.style.opacity='1',50);
            } else {
                task.style.opacity='0';
                setTimeout(()=> task.style.display='none',300);
            }
        });

        // Mostrar resumen de casa
        summaryText.style.opacity = 0;
        membersSummary.style.opacity = 0;
        setTimeout(() => {
            summaryText.textContent = houseInfo.summary;

            membersSummary.innerHTML = '';
            for(const [name, desc] of Object.entries(houseInfo.members)) {
                const div = document.createElement('div');
                div.className = 'member';
                div.innerHTML = `<strong>${name}:</strong> ${desc}`;
                membersSummary.appendChild(div);
            }

            summaryText.style.opacity = 1;
            membersSummary.style.opacity = 1;
        }, 300);
    });
});

// Completar tareas
tasks.forEach(task => {
    task.addEventListener('click', () => {
        task.classList.toggle('completed');
    });
});