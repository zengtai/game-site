// import Image from "next/image";
import Link from "next/link";
import { toTitle } from "../lib/api";
import Head from "next/head";
import { SITE_NAME } from "../lib/constants";
import Adsense from "./Adsense";

export default function GameDetail({ game }) {
  return (
    <>
      <Head>
        <title>
          {toTitle(game.name)} | Play {toTitle(game.name)} on {SITE_NAME}
        </title>
      </Head>
      <div className="relative flex flex-col md:flex-row bg-white rounded-[2rem] p-5 shadow-lg shadow-cyan-600/10">
        <div className="block text-center shrink-0">
          <img
            src={game.icon}
            alt={toTitle(game.name)}
            className="mx-auto w-20 h-20 md:w-[150px] md:h-[150px] rounded-xl bg-loading bg-center bg-no-repeat"
          />
        </div>
        <div className="text-center md:text-left md:px-5">
          <h1 className="py-2 text-2xl font-semibold text-cyan-700">
            <span>{toTitle(game.name)}</span>
          </h1>
          <p className="capitalize">
            <Link href={`/category/${game.category.toLowerCase()}`}>
              <a className="text-xs py-1 px-2 bg-cyan-600/80 text-cyan-100/80 shadow-cyan-900/30 rounded-md shadow-md">
                {game.category.toLowerCase()}
              </a>
            </Link>
          </p>
          <p className="py-3 text-left text-xs md:text-sm">
            {game.description}
          </p>
        </div>
      </div>
      <p className="py-5">
        <Link href={game.url}>
          <a
            className="block md:hover:scale-110 transition-transform ease-in-out duration-500 md:w-96 mx-auto bg-orange-500 text-center p-3 text-lg font-semibold text-white rounded-full shadow-lg shadow-orange-400/40"
            title={`Play ${toTitle(game.name)} now`}
          >
            Play now
          </a>
        </Link>
      </p>

      {/* <Adsense slot="7173362568" /> */}
    </>
  );
}
