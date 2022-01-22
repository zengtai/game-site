import Link from "next/link";
// import Image from "next/image";
import { toSlug, toTitle } from "../lib/api";
import { starIcon } from "./Icons";
export default function GameList({ title, games, icon, cols, className }) {
  const setCol = () => (cols !== undefined ? true : false);
  const gamesList = games.map((game) => (
    <li key={game.id} className={className}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="group relative block md:hover:origin-bottom md:hover:scale-110 md:delay-50 transition duration-400 ease-in-out rounded-2xl overflow-hidden shadow-md hover:shadow-lg shadow-black/30 hover:shadow-black/40 bg-loading bg-center bg-no-repeat">
          <img src={game.icon} alt={toTitle(game.name)} className="w-full" />
          <div className="absolute flex justify-center items-end w-full h-full font-semibold md:group-hover:bottom-0 group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 text-center text-xs">
            <div className="p-2 h-auto w-full text-ellipsis text-center">
              <h3 className="leading-4">{game.title}</h3>
              <p className="flex flex-row justify-center items-center text-xl font-bold text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="-ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {game.stars}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  ));
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid ${setCol() ? `grid-cols-${cols}` : `grid-cols-3`}
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
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-sky-100/80 space-x-2">
            <span className="text-cyan-500">{icon}</span>
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
