const pokemonContainer = document.querySelector('.pokemon-container');
const buscador = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado')

function filtrar(){
    const texto=formulario.value.toLowerCase();
    const URI=`https://pokeapi.co/api/v2/pokemon?limit=100`;
    axios.get(URI)
    .then(response => {
        if(response.data.results.name ===texto)
            crearPokemon(texto)
            console.log(texto);
    })
    .catch(err => {
        console.error(err)
    });
}

function crearPokemon (pokemon) {
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

    pokemonContainer.appendChild(card)

}


boton.addEventListener('click',filtrar)