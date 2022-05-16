import Link from "next/link";
import Image from "./Image";

export default function CustomGameList({ games }) {
  console.log(games);
  const gamesList = games.map((game) => (
    <li key={game.id}>
      <Link href={`/game/${game.slug}`}>
        <a className="group aspect-square relative block md:hover:origin-bottom md:hover:scale-110 md:delay-50 transition duration-400 ease-in-out rounded-2xl overflow-hidden shadow-md hover:shadow-lg shadow-black/30 hover:shadow-black/40">
          <Image
            src={game.icon}
            alt={game.title}
            className="bg-black/10 bg-loading bg-center bg-no-repeat"
            width={200}
            height={200}
          />
          <div className="absolute flex justify-center items-end w-full h-full font-semibold md:group-hover:bottom-0 group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 text-center text-xs">
            <div className="p-2 h-auto w-full text-ellipsis text-center">
              {game.title}
            </div>
          </div>
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
