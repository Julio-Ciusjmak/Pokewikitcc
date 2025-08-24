let pokemonOffset = 0; // Variável para controlar o número de Pokémon já carregados
    const limit = 18; // Número de Pokémon a carregar por vez
    const max_pokemon = 1025;
    // Função para buscar Pokémon e exibir por ordem da Pokédex
    async function fetchPokemonList(offset, limit) {
      try {
        // Chama a API com o offset e o limite
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        
        const pokemonList = data.results;

        // Criar uma lista de promessas para pegar os detalhes de cada Pokémon
        const pokemonDetailsPromises = pokemonList.map(pokemon => 
          fetch(pokemon.url).then(response => response.json())
        );

        // Esperar todas as promessas serem resolvidas
        const allPokemonDetails = await Promise.all(pokemonDetailsPromises);

        // Selecionar o container para adicionar os Pokémon
        const ulElement = document.getElementById('pokemon-list');

        // Exibir cada Pokémon
        allPokemonDetails.forEach(pokemon => {
          const liElement = document.createElement('div');
          liElement.classList.add('pokemon-item');
          // Criando o conteúdo do Pokémon
          liElement.innerHTML = `
          <button onclick="PokemonInfo(${pokemon.id})">
            <div class="pokemon-number">#${pokemon.id}</div>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-image">
            <div class="pokemon-name"> ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </buttom></div>
          `;
          
          ulElement.appendChild(liElement);
        });
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      }
    }

    // Função para carregar mais Pokémon quando o botão "Ver mais" for clicado
    function loadMorePokemon() {
      pokemonOffset += limit; // Aumentar o offset
      fetchPokemonList(pokemonOffset, limit); // Carregar mais Pokémon
    };

    // Carregar os primeiros 15 Pokémon ao carregar a página
    fetchPokemonList(pokemonOffset, limit);

    async function PokemonInfo(id){


        window.location.href = `Pokemon_info.php?id=${id}`;
    }