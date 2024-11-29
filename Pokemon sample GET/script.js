const searchButton = document.getElementById("search-button");
const input = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const sprite = document.getElementById("sprite");

const searchCleaner = (text) => {
  return text.trim().toLowerCase();
};

const pokemonResult = async (nameId) => {
  try {
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchCleaner(
        nameId
      )}`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await res.json();
    console.log(json, "is Object ?", typeof json);
    return json;
  } catch (err) {
    console.error(err.message);
    alert("Pokémon not found");
  }
  return { name: "unknown", error: true };
};

searchButton.addEventListener("click", async () => {
  const response = await pokemonResult(input.value);
  types.innerHTML = "";
  if (response) {
    pokemonName.innerText = response.name.toUpperCase();
    pokemonId.textContent = response.id;
    weight.innerText = response.weight;
    height.innerText = response.height;
    hp.innerText = response.stats["0"].base_stat;
    attack.innerText = response.stats["1"].base_stat;
    defense.innerText = response.stats["2"].base_stat;
    specialAttack.innerText = response.stats["3"].base_stat;
    specialDefense.innerText = response.stats["4"].base_stat;
    speed.innerText = response.stats["5"].base_stat;
    sprite.src = response.sprites.front_default;
    response.types.forEach((type) => {
      types.innerHTML += `<li class="stat">${type.type.name.toUpperCase()}</li>`;
    });
  }
  /*
   */
});
