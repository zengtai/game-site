import Image from "./Image";
import Link from "next/link";
import { toTitle } from "../lib/api";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";

export default function GameDetail({ game }) {
  return (
    <>
      <Head>
        <title>
          {toTitle(game.name)} | Play {toTitle(game.name)} on {SITE_NAME}
        </title>
      </Head>
      <div className="flex flex-col md:flex-row items-center md:items-start bg-white border-8 border-sky-100 rounded-[2rem] p-5 shadow-lg shadow-black/10 text-sky-700">
        <div className="md:w-40 md:h-40 shrink-0">
          <Image
            src={game.icon}
            alt={toTitle(game.name)}
            width={200}
            height={200}
            className="w-full rounded-xl bg-loading bg-center bg-no-repeat bg-black/10"
          />
        </div>
        <div className="text-center md:text-left md:px-5">
          <h1 className="py-2 text-xl md:text-3xl font-semibold">
            <span>{toTitle(game.name)}</span>
          </h1>
          <p className="capitalize">
            <Link href={`/category/${game.category.toLowerCase()}`}>
              <a className="text-xs py-1 px-2 bg-sky-600/80 text-sky-100/90 shadow-sky-500/30 rounded-md shadow-md">
                {game.category.toLowerCase()}
              </a>
            </Link>
          </p>
          <p className="flex flex-row justify-center md:justify-start items-center mt-3 space-x-3">
            <span className="text-2xl font-bold">
              <span className="flex flex-row text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {game.stars}
              </span>
            </span>
            <span className="opacity-50">{game.played} played</span>
          </p>
          <p className="py-3 text-left text-sky-800/80 text-xs md:text-sm">
            {game.description}
          </p>
        </div>
      </div>
      <p className="py-4 md:pt-2">
        <Link href={game.url}>
          <a
            className="block md:hover:scale-110 md:hover:shadow-2xl md:hover:delay-100 md:hover:shadow-black/40 transition-transform ease-in-out duration-300 md:w-96 mx-auto bg-lime-500 text-center p-3 lg:p-4 text-lg lg:text-2xl font-semibold text-white rounded-full shadow-xl shadow-black/20"
            title={`Play ${toTitle(game.name)} now`}
          >
            PLAY NOW
          </a>
        </Link>
      </p>
    </>
  );
}
