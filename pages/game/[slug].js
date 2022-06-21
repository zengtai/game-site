import { useState } from "react";

import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";

import Layout from "../../components/Layout";
import GameListItem from "../../components/GameListItem";
import GameDetail from "../../components/GameDetail";
import { sparkleIcon } from "../../components/Icons";

import { getGameBySlug, getGames } from "../../lib/api";
import { ADS_SLOT_ID, SITE_META, LANDSCAPE_GAMES } from "../../lib/constants";

const Banner = dynamic(() => import("../../components/Banner"), {
  loading: () => <div>Loading...</div>,
});

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGames,
}) {
  const [isPlay, setIsPlay] = useState(false);
  const [url, setUrl] = useState();

  function setState(url) {
    console.log(`From Parent`, url);
    setIsPlay(!isPlay);
    setUrl(url);
    // return state;
  }

  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>
            {`${game.title} | Play ${game.title} on ${SITE_META.name}`}
          </title>
        </Head>

        <div className="relative z-30 mt-10 grow py-4 md:mt-0 md:px-6 xl:px-10">
          <div className="grid gap-3 md:gap-4 xl:grid-cols-12 xl:grid-rows-5 xl:gap-6">
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-4 xl:row-start-1">
              <div className="flex flex-row px-4 pb-3">
                <Link href={`/`}>Home</Link>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <Link href={`/category/${game.category.toLowerCase()}`}>
                  <a title={game.category}>{game.category}</a>
                </Link>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span className="opacity-50">{game.title}</span>
              </div>
              <Banner
                className={`banner safe mb-3 xl:mb-6`}
                style={{ display: "block" }}
                slot={ADS_SLOT_ID.detail}
                responsive="false"
              />
              <GameDetail game={game} handlePlay={setState} />
            </div>
            <h3 className="flex flex-row px-4 text-lg font-semibold text-sky-100/70 xl:sr-only">
              <span className="mr-1 text-yellow-500">{sparkleIcon()}</span>
              You may also like
            </h3>
            <div className="xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1 ">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-4 md:px-0 xl:grid-cols-2 xl:gap-6">
                {/* <CustomGameList games={leftGames} /> */}
                <GameListItem games={leftGames} />
              </ul>
            </div>
            <div className="xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-4 md:px-0 xl:grid-cols-2 xl:gap-6">
                {/* <CustomGameList games={rightGames} /> */}
                <GameListItem games={rightGames} />
              </ul>
            </div>
            <div className="xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-5">
              <ul className="grid grid-cols-5 gap-3 px-4 md:grid-cols-10 md:gap-4 md:px-0 xl:grid-cols-8 xl:gap-6">
                {/* <CustomGameList games={bottomGames} /> */}
                <GameListItem games={bottomGames} />
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`${
            isPlay ? `z-[100]` : `-z-10 hidden`
          } fixed top-0 left-0 h-screen w-full overflow-hidden bg-[#000000d0]`}
          onClick={() => {
            setIsPlay(!isPlay);
          }}
        >
          <div className="fixed left-0 top-0 z-[120] my-3 h-full w-full overflow-hidden">
            <iframe
              className={`${
                LANDSCAPE_GAMES.includes(game.name)
                  ? `aspect-[16/9]`
                  : `aspect-[9/16]`
              } fixed left-1/2 top-1/2 h-[96vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden border-0 bg-white`}
              src={isPlay && url ? url : null}
            ></iframe>
          </div>
        </div>
        <Banner
          className={`banner rectangle`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.detail}
          responsive="false"
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const categories = await getGames().then((res) => res.categories);
  let game = await getGameBySlug(`${context.params.slug}`);

  const relatedGames = await getGames()
    .then((res) => res.basicData)
    .then((res) =>
      res.filter((game) => game.slug !== `${context.params.slug}`)
    );

  return {
    props: {
      game: game[0],
      categories,
      rightGames: relatedGames.slice(0, 10),
      leftGames: relatedGames.slice(11, 21),
      bottomGames: relatedGames.slice(22, 30),
    },
  };
}

export const getStaticPaths = async () => {
  const games = await getGames().then((res) => res.basicData);
  const paths = games.map((game) => ({
    params: {
      slug: game.slug.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
