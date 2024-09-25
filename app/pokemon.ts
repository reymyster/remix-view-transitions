function getImage(id: string) {
  const pokemon = `00${id}`.slice(-3);
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemon}.png`;
}

interface IPokemon {
  name: string;
  url: string;
}

interface IPokemonList {
  count: number;
  next?: string;
  previous?: string;
  results: IPokemon[];
}

export async function getPokemonList() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const obj: IPokemonList = await res.json();

  const transformed = {
    ...obj,
    results: obj.results.map((o) => {
      const match = o.url.match(/\/(\d+)\/$/);
      const id = match?.[1] ?? "1";
      return {
        ...o,
        id,
        img: getImage(id),
      };
    }),
  };

  return transformed;
}
