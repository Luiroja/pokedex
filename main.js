//video tutorial https://www.youtube.com/watch?v=NduleX-AC74

const pokemonContainer = document.querySelector('.pokemon-container');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');
const spinner = document.querySelector('#spinner');

const previous = document.querySelector('#previous');
const next = document.querySelector('#next');


let offset = 1;
let limit =9;

previous.addEventListener('click', ()=>{
    if (offset !=1) {
        offset -=9
        removeChildNodes(pokemonContainer);
    obtenerPokemones (offset, limit);
    }
    
})

next.addEventListener('click', ()=>{
    offset +=9
    removeChildNodes(pokemonContainer);
    obtenerPokemones (offset, limit);
})


function obtenerPokemon(name) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(response => {
        crearPokemon(response.data)
        spinner.style.display = 'none';
    })
    .catch(err => {
        console.error(err)
    });
}


function obtenerPokemones (offset, limit) {
    spinner.style.display = 'block';
    for (let i = offset; i < offset + limit; i++) {
        obtenerPokemon(i)
    }
}


function crearPokemon (pokemon) {
    const flipCard =document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer)


    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');
    

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = pokemon.id;

    const name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-card-back');
    
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard)

}


function progressBars(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');

    for (let i = 0; i < 3; i++) {
        const stat= stats[i];

        const statPercent = stat.base_state/ 2 + "%";
        const statContainer = document.createElement('stat-container');
        statContainer.classList.add('stat-container');

        const statName =document.createElement('p');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add('progress');

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

function removeChildNodes(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


obtenerPokemones(offset, limit)



