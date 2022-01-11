const pokemonContainer = document.querySelector('.pokemon-container');



function obtenerPokemon(name) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then(response => {
        crearPokemon(response.data)
        console.log(response.data);
    })
    .catch(err => {
        console.error(err)
    });
}


function obtenerPokemones (number) {
    for (let i = 0; i < number; i++) {
        obtenerPokemon(i)
    }
}


function crearPokemon (pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = pokemon.id;

    const name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card)

}



obtenerPokemones(100)



