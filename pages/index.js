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
import CategoryList from "../components/CategoryList";

import dynamic from "next/dynamic";

const Banner = dynamic(() => import("../components/Banner"), {
  loading: () => <div>Loading...</div>,
});

const InfiniteList = dynamic(() => import("../components/InfiniteList"), {
  loading: () => <div>Loading...</div>,
});

export default function Home({ games, newGames, featuredGames, categories }) {
  const [playedGames, setPlayedGames] = useState();

  useEffect(() => {
    let playedGamesBySlug;
    if (typeof window !== "undefined") {
      let playedGames = JSON.parse(localStorage.getItem("playedGames")) || [];
      if (playedGames.length) {
        playedGamesBySlug = games.filter((game) =>
          playedGames.includes(game.slug)
        );
        setPlayedGames(() => playedGamesBySlug);
      }
    }
  }, [games]);

  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>{SITE_META.name} | Play Free Games Online</title>
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

          {playedGames ? (
            <GameList
              icon={historyIcon()}
              iconClassName="text-purple-400"
              title="Continue Playing"
              games={playedGames}
              isPriority
              cols="4"
            />
          ) : null}

          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            isPriority
            cols="5"
          />

          <Banner
            className={`banner rectangle`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />

          <h2 className="flex items-center space-x-2 px-4 py-2 pb-0 font-semibold text-yellow-100/70 md:px-12 md:text-lg">
            <span className="text-yellow-500">{gameIcon()}</span>
            <span>
              All Games <b className="text-sm">({games.length})</b>
            </span>
          </h2>
          <InfiniteList games={games} />
          {/* <InfiniteList
            games={games.sort((a, b) => (a.created_at > b.created_at ? 1 : -1))}
          /> */}

          <Banner
            className={`banner rectangle`}
            style={{ display: "block" }}
            slot={ADS_SLOT_ID.home}
            responsive="false"
          />

          <CategoryList
            icon={categoryIcon()}
            title="Categories"
            categories={categories}
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
      games,
      newGames,
      featuredGames,
      categories,
    },
  };
};
