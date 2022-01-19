import Image from "next/image";
import Link from "next/link";
import { toTitle } from "../lib/api";

export default function GameDetail({ game }) {
  return (
    <>
      <div className="flex flex-col md:flex-row bg-slate-100/80 rounded-[2rem] p-5 shadow-lg shadow-amber-900/10">
        <div className="block text-center">
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            width={150}
            height={150}
            quality="83"
            className="rounded-xl"
            layout="fixed"
          />
        </div>
        <div className="text-center md:text-left md:px-5">
          <h1 className="py-2 text-2xl font-semibold text-stone-900/80">
            <span>{toTitle(game.name)}</span>
          </h1>
          <p className="capitalize">
            <Link href={`/category/${game.category.toLowerCase()}`}>
              <a className="text-xs py-1 px-2 bg-orange-600 text-slate-100/90 rounded-md shadow-md shadow-amber-900/30">
                {game.category.toLowerCase()}
              </a>
            </Link>
          </p>
          <p className="py-3 text-left">{game.description}</p>
        </div>
      </div>
      <p className="py-5">
        <Link href={game.url}>
          <a
            className="block md:w-96 mx-auto bg-orange-600 text-center p-3 text-lg font-semibold text-slate-100 rounded-full shadow-lg shadow-amber-700/40"
            title={`Play ${game.name} now`}
          >
            Play now
          </a>
        </Link>
      </p>
    </>
  );
}
