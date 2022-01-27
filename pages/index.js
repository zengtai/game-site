import Head from "next/head";
import { hotIcon, topIcon, gameIcon, categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Adsense from "../components/Adsense";
import AdsenseFixed from "../components/AdsenseFixed";

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
        <div className="grow relative z-30 p-4 md:px-8 md:py-4">
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-cyan-900/80 space-x-2">
            {hotIcon()}
            <span>Popular This Week</span>
          </h2>
          <GameList games={featuredGames} cols="3" />
          {/* ads 01 */}
          <div className="mx-auto w-[300px] h-[100px]">
            <Adsense slot="6305173453" h="100px" />
          </div>
          {/* ads 01 */}
          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            cols="4"
          />

          {/* <div className="w-[320px] h-[200px] mx-auto">
            <Adsense slot="8902411049" h="200px" />
          </div> */}
          {/* ads 02 */}
          <Adsense slot="8902411049" />
          {/* ads 02 */}
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-cyan-900/80 space-x-2">
            {gameIcon()}
            <span>All Games</span>
          </h2>
          <GameList games={games} cols="4" begin="1" end="36" />
          {/* ads 03 */}
          <AdsenseFixed slot="8902411049" />
          {/* ads 03 */}
          <GameList games={games} cols="4" begin="37" end="72" />
          {/* ads 04 */}
          <AdsenseFixed slot="8902411049" />
          {/* ads 04 */}
          <GameList games={games} cols="4" begin="73" end="108" />
          {/* ads 05 */}
          <AdsenseFixed slot="8902411049" />
          {/* ads 05 */}
          <GameList
            games={games}
            cols="4"
            begin="109"
            className="third:col-span-2 md:third:col-auto third:row-span-2 md:third:row-auto"
          />
          {/* ads 06 */}
          <AdsenseFixed slot="8902411049" />
          {/* ads 06 */}
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
