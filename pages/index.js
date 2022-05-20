import Head from "next/head";
import { useState } from "react";
import { fireIcon, topIcon, gameIcon, categoryIcon } from "../components/Icons";
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
  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>{SITE_META.name} | Play Free Games Online</title>
        </Head>
        <div className="relative z-30 grow pt-12">
          <h2 className="flex items-center space-x-1 py-2 px-4 pb-0 font-semibold text-yellow-100/70 md:px-12 md:text-lg">
            <span className="text-orange-500">{fireIcon()}</span>
            <span>Popular This Week</span>
          </h2>

          <GameList games={featuredGames} isPriority cols="3" />

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
            <span>All Games</span>
          </h2>
          <InfiniteList games={games} />

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
