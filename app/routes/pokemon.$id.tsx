import { json, type LoaderFunctionArgs } from "@vercel/remix";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getPokemonList } from "~/pokemon";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(
    params.id && !isNaN(Number(params.id)),
    "Missing or invalid pokemon id.",
  );

  const list = await getPokemonList();

  const pokemon = list.results.find((item) => item.id === params.id);

  if (!pokemon) throw new Response("Pokemon Not Found", { status: 404 });

  return json({ pokemon });
};

export default function Pokemon() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="fixed top-0 left-0 p-8 text-xl">
        <Link to={"/"} unstable_viewTransition>
          &lt;- Back
        </Link>
      </div>
      <h1
        style={{ viewTransitionName: `pokemon-name-${pokemon.id}` }}
        className="text-2xl p-2"
      >
        {pokemon.name}
      </h1>
      <div>
        <img
          src={pokemon.img}
          alt={pokemon.name}
          style={{ viewTransitionName: `pokemon-img-${pokemon.id}` }}
          className="size-96"
        />
      </div>
    </div>
  );
}
