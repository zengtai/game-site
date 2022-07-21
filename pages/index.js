import Head from "next/head";
import { useEffect, useState } from "react";
import {
  fireIcon,
  topIcon,
  gameIcon,
  categoryIcon,
  historyIcon,
} from "../components/Icons";
import { getGames } from "../lib/api";

import Layout from "../components/Layout";
import { ADS_SLOT_ID, SITE_META, FEATURED_GAMES } from "../lib/constants";
import GameList from "../components/GameList";
import PlayedList from "../components/PlayedList";
import CategoryList from "../components/CategoryList";

import dynamic from "next/dynamic";

// const Banner = dynamic(() => import("../components/Banner"), {
//   loading: () => <div>Loading...</div>,
// });

import Banner from "../components/Banner";

const InfiniteList = dynamic(() => import("../components/InfiniteList"), {
  loading: () => <div>Loading...</div>,
});

export default function Home({ games, newGames, featuredGames, categories }) {
  const [playedGames, setPlayedGames] = useState();

  useEffect(() => {
    let playedGamesBySlug;
    // if (typeof window !== "undefined") {
    let playedGames = JSON.parse(localStorage.getItem("playedGames")) || [];
    if (playedGames.length) {
      playedGamesBySlug = games.filter((game) =>
        playedGames.includes(game.slug)
      );
      setPlayedGames(() => playedGamesBySlug);
    }
    // }
  }, [games]);

  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>{`${SITE_META.name} | Play Free Games Online`}</title>
        </Head>
        <div className="relative z-30 grow pt-12 md:pt-0">
          <GameList
            icon={fireIcon()}
            iconClassName="text-orange-500"
            title="Popular This Week"
            games={featuredGames}
            isPriority
            cols="3"
          />

          <Banner
            className={`banner`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />

          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            isPriority
            cols="4"
            className={`special:col-span-2 special:row-span-2 special:md:col-auto special:md:row-auto`}
          />

          <Banner
            className={`banner rectangle`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await getGames();

  const games = data.basicData;

  const newGames = games.slice(0, 20);
  const featuredGames = games.filter((game) =>
    FEATURED_GAMES.includes(game.name)
  );
  const categories = data.categories;

  return {
    props: {
      games: games.reverse(),
      newGames,
      featuredGames,
      categories,
    },
  };
};
