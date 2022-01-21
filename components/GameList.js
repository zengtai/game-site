import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../lib/api";
export default function GameList({ title, games, icon, cols, className }) {
  const setCol = () => (cols ? true : false);
  const gamesList = games.map((game) => (
    <li key={game.id} className={className}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="block md:hover:origin-bottom md:hover:-rotate-6 hover:scale-125 transition duration-200 ease-out rounded-2xl overflow-hidden shadow-md hover:shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/40 bg-loading bg-center bg-no-repeat">
          <img src={game.icon} alt={toTitle(game.name)} className="w-fit" />
        </a>
      </Link>
    </li>
  ));
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid ${setCol() ? `grid-cols-${cols}` : `grid-cols-4`}
                 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 md:gap-6 py-3`}
            // className={
            //   setCol()
            //     ? `grid grid-cols-${cols} sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
            //     : `grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
            // }
          >
            {gamesList}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-cyan-900/80 space-x-2">
            {icon}
            <span>{title}</span>
          </h2>
          <ul
            className={`grid ${setCol() ? `grid-cols-${cols}` : `grid-cols-4`}
                 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 md:gap-6 py-3`}

            // className={
            //   setCol()
            //     ? `grid grid-cols-${cols} sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
            //     : `grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
          >
            {gamesList}
          </ul>
        </>
      );
    }
  } else {
    return <></>;
  }
}
