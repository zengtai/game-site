import Link from "next/link";
import Image from "next/image";
import { toSlug } from "../lib/api";
import { toTitle } from "../lib/api";
export default function GameList({ title, games, icon, cols }) {
  const gamesList = games.map((game) => (
    <li key={game.id}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="block rounded-2xl overflow-hidden shadow-lg shadow-slate-900/30 bg-loading bg-center bg-no-repeat">
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
    </li>
  ));
  const setCol = () => (cols ? true : false);
  if (games.length != 0) {
    if (title === undefined) {
      return (
        <>
          <ul
            className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`}
          >
            {gamesList}
          </ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="flex items-center px-3 py-2 pb-0 md:text-sm font-semibold text-slate-600 space-x-2">
            {icon}
            <span>{title}</span>
          </h2>
          <ul
            className={
              setCol()
                ? `grid-cols-${cols} grid sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
                : `grid-cols-4 grid sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
            }
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
