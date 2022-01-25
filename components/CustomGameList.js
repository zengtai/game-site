import Link from "next/link";
import Image from "next/image";
import { toSlug, toTitle } from "../lib/api";

export default function CustomGameList({ games }) {
  const gamesList = games.map((game) => (
    <li key={game.id}>
      <Link href={`/game/${toSlug(game.name)}`}>
        <a className="block md:hover:scale-125 transition duration-200 ease-out rounded-lg md:rounded-2xl overflow-hidden shadow-md hover:shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/40 bg-loading bg-center bg-no-repeat">
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            className="w-fit bg-loading bg-center bg-no-repeat"
            width={200}
            height={200}
            layout="responsive"
          />
          {/* <img
            src={game.icon}
            alt={toTitle(game.name)}
            className="w-fit bg-loading bg-center bg-no-repeat"
            loading="lazy"
          /> */}
        </a>
      </Link>
    </li>
  ));
  if (games.length != 0) {
    return <>{gamesList}</>;
  } else {
    return <></>;
  }
}
