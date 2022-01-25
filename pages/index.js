import Head from "next/head";
import { hotIcon, topIcon, gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Adsense from "../components/Adsense";

export default function Home({ games, newGames, featuredGames, categories }) {
  // console.log(gamesSortedByTime);
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{SITE_NAME} | Play Free Games Online</title>
        </Head>
        <div className="grow p-4 md:px-8 md:py-4 relative z-30">
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-cyan-900/80 space-x-2">
            {hotIcon()}
            <span>Popular This Week</span>
          </h2>
          <GameList games={featuredGames} cols="3" />
          <div
            aria-hidden={true}
            className="mx-auto h-[100px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
          </div>
          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            cols="4"
          />
          <div
            aria-hidden={true}
            className="mx-auto h-[100px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
          </div>
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-cyan-900/80 space-x-2">
            {gameIcon()}
            <span>All Games</span>
          </h2>
          <GameList games={games} cols="4" begin="1" end="24" />
          {/* <GameList
            icon={gameIcon()}
            games={games}
            title="All Games"
            className="third:col-span-2 md:third:col-auto third:row-span-2 md:third:row-auto"
          /> */}
          <div
            aria-hidden={true}
            className="mx-auto h-[100px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
          </div>
          <GameList games={games} cols="4" begin="25" end="48" />
          <div
            aria-hidden={true}
            className="mx-auto h-[100px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
          </div>
          <GameList games={games} cols="4" begin="49" end="72" />
          <div
            aria-hidden={true}
            className="mx-auto h-[250px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
          </div>
          <GameList games={games} cols="4" begin="73" />
          <div
            aria-hidden={true}
            className="mx-auto h-[250px] w-[300px] md:h-[90px] md:w-[970px] sm:w-[728px]"
          >
            <Adsense slot="8902411049" />
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
  const games = await getGames();
  const newGames = await getGames("NEW", 12);
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
