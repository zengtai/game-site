import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../lib/api";

export default function CustomGameList({ games }) {
  const gamesList = games.map((game) => (
    <li
      key={game.id}
      className="hover:scale-125 transition ease-in-out duration-500"
    >
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="block rounded-xl overflow-hidden shadow-md shadow-slate-900/30 bg-loading bg-center bg-no-repeat">
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
    return <>{gamesList}</>;
  } else {
    return <></>;
  }
}
