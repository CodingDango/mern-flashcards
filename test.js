const pokemonNames = ["ditto", "pikachuuu", "charizard"];
const apiEndpoint = "https://pokeapi.co/api/v2/pokemon";

const promises = pokemonNames.map((pokemonName) =>
  fetch(`${apiEndpoint}/${pokemonName}`)
);

Promise.allSettled(promises).then((results) => {
  results.forEach((promise, idx) => {
    const statusCode = promise.value.status;

    if (statusCode === 200) {
      console.log(`Fetch is successful for pokemon ${pokemonNames[idx]}`);
    } else if (statusCode === 404) {
      console.log(`Fetch is failed for pokemon ${pokemonNames[idx]}`);
    } else {
      console.log(
        `Fetch is status for pokemon ${pokemonNames[idx]} is ${statusCode}`
      );
    }
  });
});