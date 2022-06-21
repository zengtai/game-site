import { useState } from "react";
import Image from "./Image";
import Link from "next/link";
import { starIcon } from "./Icons";

export default function GameDetail({ game, handlePlay }) {
  const [isShowAll, setIsShowAll] = useState(false);

  function toggle() {
    setIsShowAll(!isShowAll);
  }

  const setHistory = () => {
    if (typeof window !== "undefined") {
      let currentPlayedGames =
        JSON.parse(localStorage.getItem("playedGames")) || [];
      currentPlayedGames.push(game.slug);
      console.log(`currentPlayedGames`, currentPlayedGames);

      localStorage.setItem(
        "playedGames",
        JSON.stringify([...new Set(currentPlayedGames)])
      );
    }
  };

  function handlePcClick() {
    setHistory();
    handlePlay(game.url);
  }

  return (
    <>
      <div className="mx-4 flex flex-row flex-wrap items-center rounded-[2rem] border-8 border-sky-100 bg-white p-4 text-sky-700 shadow-lg shadow-black/10 md:mx-0 md:items-start md:p-5">
        <div className="flex space-x-3 md:space-x-6">
          <div className="aspect-square h-20 w-20 shrink-0 xl:h-36 xl:w-36">
            <Image
              className="rounded-xl bg-black/5"
              src={game.icon}
              alt={game.title}
              width={100}
              height={100}
              layout={`responsive`}
            />
          </div>
          <div>
            <h1 className="pb-2 text-xl font-semibold md:text-3xl">
              <span>{game.title}</span>
            </h1>
            <p className="uppercase">
              <Link href={`/category/${game.category.toLowerCase()}`}>
                <a className="rounded-md bg-sky-600/80 py-1 px-2 text-xs text-sky-100/90 shadow-md shadow-sky-500/30 xl:hover:bg-sky-600">
                  {game.category}
                </a>
              </Link>
            </p>
            <p className="mt-3 flex flex-row items-center justify-center space-x-2 md:justify-start xl:space-x-3">
              <span className="flex flex-row items-center text-lg font-bold text-orange-500 xl:text-2xl">
                <b className="h-6 w-6 md:h-8 md:w-8">{starIcon()}</b>
                {game.stars}
              </span>
              <span className="text-sm opacity-80">{game.played} played</span>
            </p>
          </div>
        </div>
        <div
          onClick={toggle}
          className={`
            ${
              isShowAll ? `h-auto` : `max-h-16`
            } relative w-full overflow-hidden text-ellipsis py-3 text-slate-500 after:absolute after:left-0 after:bottom-0 after:h-5 after:w-full after:bg-gradient-to-t after:from-white after:to-white/0`}
        >
          {game.description}
        </div>
      </div>
      <p className="mx-4 py-4 md:hidden md:pt-2">
        <Link href={game.url}>
          <a
            className="mx-auto block rounded-full bg-lime-500 p-3 text-center text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:delay-100 lg:p-4 lg:text-2xl"
            title={`Play ${game.title} now`}
            onClick={setHistory}
          >
            PLAY NOW
          </a>
        </Link>
        {/* <button
          className="mx-auto block rounded-full bg-lime-500 p-3 text-center text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:delay-100 lg:p-4 lg:text-2xl"
          title={`Play ${game.title} now`}
          onClick={handleClick}
        >
          PLAY NOW
        </button> */}
      </p>
      <button className="mx-auto hidden py-4 md:block md:pt-2">
        <span
          className="mx-auto block rounded-full bg-lime-500 p-3 text-center text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:delay-100 lg:p-4 lg:text-2xl"
          title={`Play ${game.title} now`}
          onClick={handlePcClick}
        >
          PLAY NOW
        </span>
      </button>
    </>
  );
}
