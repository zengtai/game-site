import Head from "next/head";
import { hotIcon, topIcon, gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Adsense from "../components/Adsense";

export default function Home({ games, newGames, featuredGames, categories }) {
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{SITE_NAME} | Play Free Games Online</title>
        </Head>
        <div className="grow p-4 md:px-8 md:py-4 relative z-30">
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-sky-100/80 space-x-2">
            <span className="text-orange-500">{hotIcon()}</span>
            <span>Popular This Week</span>
          </h2>
          <GameList games={featuredGames} cols="3" />
          <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[100px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
            <Adsense slot="1977361307" />
          </div>
          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            cols="5"
          />
          <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[200px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
            <Adsense slot="1977361307" />
          </div>
          <GameList
            icon={gameIcon()}
            games={games}
            title="All Games"
            className="third:col-span-2 md:third:col-auto third:row-span-2 md:third:row-auto"
          />
          <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[200px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
            <Adsense slot="1977361307" />
          </div>
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
  // const games = await getGames();
  const games = await getGames("SELECTED");
  const newGames = await getGames("LATEST", 20);
  const featuredGames = await getGames("FEATURED");
  const categories = await getCategories();

  return {
    props: {
      games,
      newGames,
      featuredGames,
      categories,
    },
  };
};
