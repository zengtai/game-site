import Image from "./Image";
import Link from "next/link";
import { starIcon } from "./Icons";

export default function GameDetail({ game }) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      let currentPlayedGames =
        JSON.parse(localStorage.getItem("playedGames")) || [];
      currentPlayedGames.push(game.slug);
      localStorage.setItem("playedGames", JSON.stringify(currentPlayedGames));
    }
  };
  return (
    <>
      <div className="mx-4 flex flex-col items-center rounded-[2rem] border-8 border-sky-100 bg-white p-5 text-emerald-700 shadow-lg shadow-black/10 md:mx-0 md:flex-row md:items-start">
        <div className="aspect-square h-24 w-24 shrink-0 md:h-40 md:w-40">
          <Image
            className="rounded-xl bg-black/5"
            src={game.icon}
            alt={game.title}
            width={100}
            height={100}
            layout={`responsive`}
          />
        </div>
        <div className="text-center md:px-5 md:text-left">
          <h1 className="py-2 text-xl font-semibold md:text-3xl">
            <span>{game.title}</span>
          </h1>
          <p className="capitalize">
            <Link href={`/category/${game.category.toLowerCase()}`}>
              <a className="rounded-md bg-emerald-600/80 py-1 px-2 text-xs text-emerald-100/90 shadow-md shadow-emerald-500/30">
                {game.category.toLowerCase()}
              </a>
            </Link>
          </p>
          <p className="mt-3 flex flex-row items-center justify-center space-x-3 md:justify-start">
            <span className="text-2xl font-bold">
              <span className="flex flex-row text-orange-500">
                {starIcon()}
                {game.stars}
              </span>
            </span>
            <span className="opacity-80">{game.played} played</span>
          </p>
          <p className="py-3 text-left text-xs text-slate-500 md:text-sm">
            {game.description}
          </p>
        </div>
      </div>
      <p className="mx-4 py-4 md:pt-2">
        <Link href={game.url}>
          <a
            className="mx-auto block rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 p-3 text-center text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:shadow-2xl md:hover:shadow-black/40 md:hover:delay-100 lg:p-4 lg:text-2xl"
            title={`Play ${game.title} now`}
            onClick={handleClick}
          >
            PLAY NOW
          </a>
        </Link>
      </p>
    </>
  );
}
