import Head from "next/head";
import { topIcon, gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import ScrollGameList from "../components/ScrollGameList";

export default function Home({ games, newGames, featuredGames, categories }) {
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{SITE_NAME} | Play Free Games Online</title>
        </Head>
        <div className="grow relative z-30 md:px-4">
          {/* <h2 className="flex items-center px-3 xl:px-8 py-2 xl:pb-1 pb-0 md:text-sm xl:text-xl font-semibold text-slate-600 space-x-2">
            {hotIcon()}
            <span>Popular Games</span>
          </h2>
          <GameList games={featuredGames} cols="2" /> */}
          <h2 className="flex items-center px-3 xl:px-8 py-2 xl:pb-1 pb-0 md:text-sm xl:text-xl font-semibold text-slate-600 space-x-2">
            {topIcon()}
            <span>New Games</span>
          </h2>
          <GameList games={newGames} cols="3" />
          <ScrollGameList
            icon={gameIcon()}
            games={games}
            title="All Games"
            className="third:col-span-2 md:third:col-auto third:row-span-2 md:third:row-auto"
            init="36"
            step="12"
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
  const games = await getGames();
  const newGames = await getGames("LATEST", 12);
  const featuredGames = await getGames("FEATURED_GAMES");
  const categories = await getCategories();

  return {
    props: {
      games,
      newGames,
      featuredGames,
      categories,
    },
    revalidate: 60,
  };
};
