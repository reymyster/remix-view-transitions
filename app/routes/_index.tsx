import {
  MetaFunction,
  redirect,
  LoaderFunctionArgs,
  json,
} from "@vercel/remix";
import { useLoaderData, Link } from "@remix-run/react";

import { getPokemonList } from "~/pokemon";

export const meta: MetaFunction = () => {
  return [
    { title: "View Transition Test" },
    {
      name: "description",
      content: "Testing View Transitions - Utilizing Pokemon",
    },
  ];
};

export const loader = async () => {
  const pokemon = await getPokemonList();

  return json({ pokemon });
};

export default function Index() {
  const { pokemon } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center bg-slate-600">
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-5 lg:gap-8">
        {pokemon.results.map((mon) => (
          <div
            key={mon.id}
            className="rounded-md shadow-lg bg-slate-900 border border-slate-900 hover:border-slate-300 p-2"
          >
            <Link to={`/pokemon/${mon.id}`} unstable_viewTransition>
              <img
                src={mon.img}
                style={{ viewTransitionName: `pokemon-img-${mon.id}` }}
                className="size-24"
                alt={`Pokemon Number ${mon.id}`}
              />
              <div
                className="text-center text-sm text-white/80"
                style={{ viewTransitionName: `pokemon-name-${mon.id}` }}
              >
                {mon.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
