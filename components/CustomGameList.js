import Link from "next/link";
import Image from "next/image";
import { toSlug } from "../lib/api";
export default function CustomGameList({ games }) {
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
    return <>{gamesList}</>;
  } else {
    return <></>;
  }
}
