import Image from "next/image";
import Link from "next/link";

export default function GameDetail({ game }) {
  return (
    <>
      <div className="text-center">
        <Image
          src={game.icon}
          alt={game.title}
          width={100}
          height={100}
          quality="83"
          className="rounded-xl"
        />
      </div>
      <p className="text-center mt-2 capitalize">
        <Link href={`/category/${game.category.toLowerCase()}`}>
          <a className="text-xs py-1 px-2 bg-yellow-900 text-slate-100/60 rounded-full shadow-md shadow-amber-900/30">
            {game.category.toLowerCase()}
          </a>
        </Link>
      </p>
      <p>
        <Link href={game.url}>
          <a
            className="block m-3 bg-orange-600 text-center p-3 font-semibold text-slate-100 rounded-full shadow-lg shadow-amber-700/40"
            title={`Play ${game.name} now`}
          >
            Play now
          </a>
        </Link>
      </p>
      <p className="p-3">{game.description}</p>
    </>
  );
}
