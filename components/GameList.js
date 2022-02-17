import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../lib/api";
import GameListItem from "./GameListItem";
export default function GameList({ title, games, icon, cols, className }) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };

  const gamesList = games.map((game) => (
    <li
      key={game.id}
      className={`xl:hover:scale-125 transition ease-in-out duration-500 ${className}`}
    >
      <Link href={`/game/${toSlug(game.name)}`}>
        <a
          title={toTitle(game.name)}
          className="block rounded-2xl overflow-hidden shadow-lg shadow-slate-900/30 bg-loading bg-center bg-no-repeat"
        >
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            height={200}
            width={200}
            quality={83}
            layout="responsive"
          />
        </a>
      </Link>
      <h3 className="my-1 text-xs text-center leading-tight">
        {toTitle(game.name)}
      </h3>
    </li>
  ));
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid ${setCol()} sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 xl:gap-6 p-2 xl:py-4 xl:px-8`}
          >
            <GameListItem games={games} />
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center px-3 xl:px-8 py-2 xl:pb-1 pb-0 md:text-sm xl:text-xl font-semibold text-slate-600 space-x-2">
            {icon}
            <span>{title}</span>
          </h2>
          <ul
            className={`overflow-auto grid ${setCol()} sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-4 xl:gap-6 p-2 xl:py-4 xl:px-8`}
          >
            <GameListItem games={games} />
          </ul>
        </>
      );
    }
  } else {
    return <></>;
  }
}
