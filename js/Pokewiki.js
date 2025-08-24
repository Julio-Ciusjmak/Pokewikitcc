function login() {
    alert("Login clicado! (A funcionalidade pode ser implementada aqui)");
  }
  
  function search() {
    const searchQuery = document.getElementById('search-bar').value;
    if (searchQuery) {
      alert("Buscando por: " + searchQuery);
    } else {
      alert("Por favor, insira um Pokémon para buscar.");
    }
  }
  