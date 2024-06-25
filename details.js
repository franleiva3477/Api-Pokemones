document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('name');

    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => {
                displayPokemonDetails(data);
            })
            .catch(error => {
                console.error('Error fetching Pokémon details:', error);
            });
    }

    function displayPokemonDetails(pokemon) {
        document.getElementById('pokemonName').textContent = `Nombre: ${pokemon.name}`;
        document.getElementById('pokemonImage').src = pokemon.sprites.front_default;
        document.getElementById('pokemonImage').alt = pokemon.name;
        document.getElementById('pokemonWeight').textContent = `Peso: ${pokemon.weight} hectogramos`;
        document.getElementById('pokemonHeight').textContent = `Altura: ${pokemon.height} decímetros`;

        const defense = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
        const attack = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
        const hp = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
        document.getElementById('pokemonStats').textContent = `HP: ${hp}, Defensa: ${defense}, Ataque: ${attack}`;

        const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
        document.getElementById('pokemonAbilities').textContent = `Habilidades: ${abilities}`;
    }
});
