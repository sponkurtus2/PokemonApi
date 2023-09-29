const fetchData = async () => {
  try {
    var pokemonToSearch = document
      .getElementById("pokemonToSearch")
      .value.toLowerCase()
      .trim();

    if (pokemonToSearch === "") {
      Toastify({
        text: "Por favor, ingresa un nombre de Pokémon.",
        duration: 1000,
        gravity: "top",
        position: "right",
        close: true,
        style: {
          background: "linear-gradient(to right, #ffdb4a, #ffcd00)",
          color: "#333",
        },
      }).showToast();
    } else {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonToSearch}`
      );

      if (response.status === 404) {
        // Capturamos el error cuando la respuesta es un 404 (Not Found)
        Toastify({
          text: "¡Pokemon no encontrado!",
          duration: 1000,
          gravity: "top",
          position: "right",
          close: true,
          style: {
            background: "linear-gradient(to right, #ffdb4a, #ffcd00)",
            color: "#333",
          },
        }).showToast();
      } else {
        const data = await response.json();

        if (data.name) {
          showPokemon(data);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
function handleKeyPress(event) {
  if (event.key === "Enter") {
    searchPokemon();
  }
}

const showPokemon = (data) => {
  // Nombre
  document.getElementById("name").textContent = data.name;

  // Foto
  const photoElement = document.getElementById("photo");
  const imageUrl = data.sprites.front_default;
  photoElement.src = imageUrl;

  // ID
  document.getElementById("pokemonNumber").textContent = "#" + data.id;

  // Stats
  const statsElement = document.getElementById("stats");
  const stats = data.stats;
  statsElement.innerHTML = "";

  stats.forEach((stat) => {
    const statItem = document.createElement("p");
    statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    statsElement.appendChild(statItem);
  });

  // Tipos
  const typesElement = document.getElementById("types");
  const types = data.types;
  typesElement.innerHTML = "";

  types.forEach((type) => {
    const typeItem = document.createElement("p");
    typeItem.textContent = type.type.name;
    typesElement.appendChild(typeItem);
  });
};

fetchData();

function searchPokemon() {
  var pokemonToSearch = document.getElementById("pokemonToSearch").value;
  var correctName = pokemonToSearch.toLowerCase();
  ApiURl = `https://pokeapi.co/api/v2/pokemon/${correctName}`;
  fetchData();
}
