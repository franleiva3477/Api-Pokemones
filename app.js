document.addEventListener('DOMContentLoaded', function() {
    let currentPage = 1;
    const pokemonsPerPage = 50;
    const totalPages = 3;
    let allPokemons = [];

    loadAllPokemons();

    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        filterPokemons(query);
    });

    function loadAllPokemons() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            .then(response => response.json())
            .then(data => {
                allPokemons = data.results;
                loadPokemons(currentPage);
            })
            .catch(error => {
                console.error('Error fetching Pokémon list:', error);
            });
    }

    function loadPokemons(page) {
        const pokemonList = document.getElementById('pokemonList');
        pokemonList.innerHTML = ''; // Clear previous results
        const offset = (page - 1) * pokemonsPerPage;

        for (let i = offset + 1; i <= offset + pokemonsPerPage; i++) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(response => response.json())
                .then(data => {
                    displayPokemon(data);
                })
                .catch(error => {
                    console.error('Error fetching Pokémon:', error);
                });
        }
        updatePagination(page);
    }

    function filterPokemons(query) {
        const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.includes(query));
        const pokemonList = document.getElementById('pokemonList');
        pokemonList.innerHTML = ''; // Clear previous results

        filteredPokemons.slice(0, 50).forEach(pokemon => {
            fetch(pokemon.url)
                .then(response => response.json())
                .then(data => {
                    displayPokemon(data);
                })
                .catch(error => {
                    console.error('Error fetching Pokémon:', error);
                });
        });
    }

    function displayPokemon(pokemon) {
        const pokemonList = document.getElementById('pokemonList');

        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('col-md-2', 'pokemon');
        pokemonDiv.style.cursor = 'pointer';

        const pokemonName = document.createElement('h5');
        pokemonName.textContent = pokemon.name;

        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;
        pokemonImage.classList.add('img-fluid');

        const pokemonDetails = document.createElement('p');
        pokemonDetails.textContent = `Altura: ${pokemon.height}, Peso: ${pokemon.weight}`;

        pokemonDiv.appendChild(pokemonName);
        pokemonDiv.appendChild(pokemonImage);
        pokemonDiv.appendChild(pokemonDetails);

        pokemonDiv.addEventListener('click', function() {
            window.location.href = `details.html?name=${pokemon.name}`;
        });

        pokemonList.appendChild(pokemonDiv);
    }

    function updatePagination(page) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = ''; // Clear previous pagination buttons

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('btn', 'btn-secondary', 'mx-1');
            if (i === page) {
                pageButton.classList.add('btn-primary');
                pageButton.classList.remove('btn-secondary');
            }

            pageButton.addEventListener('click', function() {
                loadPokemons(i);
            });

            pagination.appendChild(pageButton);
        }
    }
});
