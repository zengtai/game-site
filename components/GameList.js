import Link from "next/link";
import Image from "next/image";
import { toSlug } from "../lib/api";
export default function GameList({ title, games }) {
  const gamesList = games.map((game) => (
    <li key={game.id}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="block rounded-2xl overflow-hidden shadow-md shadow-yellow-900/30">
          <Image
            src={game.icon}
            alt={game.name}
            height={200}
            width={200}
            quality={83}
            layout="responsive"
          />
        </a>
      </Link>
    </li>
  ));
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
          <h2 className="px-4 pt-2 pb-0 text-xs md:text-sm font-semibold text-stone-900/70">
            {title}
          </h2>
          <ul
            className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`}
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
