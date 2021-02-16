import express from "express";
import pokemon from "./pokemon.js";

const app = express();
const port = 3000;

const supportedTypes = pokemon.map((pokemon) => pokemon.type);

app.get("/", (request, response) => {
  const searchTerm = request.query.search?.toLowerCase() || "";
  const type = request.query.type?.toLowerCase() || "";
  let filteredPokemon = [...pokemon];

  if (type && !supportedTypes.includes(type)) {
    response
      .status(400)
      .json({ message: `Unsupported type: ${type}`, results: [] });
    return;
  }

  if (searchTerm) {
    filteredPokemon = filteredPokemon.filter((pokemon) =>
      pokemon.name.includes(searchTerm)
    );
  }

  if (type) {
    filteredPokemon = filteredPokemon.filter(
      (pokemon) => pokemon.type === type
    );
  }

  response.json({ results: filteredPokemon });
});

app.listen(port, () => console.log(`API is running on port ${port}`));
