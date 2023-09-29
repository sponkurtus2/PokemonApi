const ApiURl = "https://pokeapi.co/api/v2/pokemon/rayquaza";

const fetchData = async () => {
  try {
    const response = await fetch(ApiURl);
    const data = await response.json();

    showPokemon(data);
  } catch (error) {
    console.log(error);
  }
};

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
