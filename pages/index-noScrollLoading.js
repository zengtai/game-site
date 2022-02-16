import Head from "next/head";

import { hotIcon, topIcon, gameIcon, categoryIcon } from "../components/Icons";

import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Adsense from "../components/Adsense";

export default function Home({ games, newGames, featuredGames, categories }) {
  // const initGames = games.slice(0, 24);
  // const total = games.length;
  // const [scrollGames, setScrollGames] = useState(initGames);
  // const [hasMore, setHasMore] = useState(true);

  // const getMoreGames = () => {
  //   const newScrollGames = games.slice(
  //     scrollGames.length,
  //     scrollGames.length + 12
  //   );
  //   setScrollGames((game) => [...game, ...newScrollGames]);

  //   if (scrollGames.length >= total) {
  //     setHasMore(!hasMore);
  //   }
  // };

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
            <Adsense slot="6305173453" />
          </div>
          <GameList
            icon={topIcon()}
            games={newGames}
            title="New Games"
            cols="5"
          />
          <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[200px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
            <Adsense slot="6305173453" />
          </div>
          {/* <GameList
            icon={gameIcon()}
            games={games}
            title="All Games"
            className="third:col-span-2 md:third:col-auto third:row-span-2 md:third:row-auto"
          /> */}
          <h2 className="flex items-center py-2 pb-0 md:text-lg font-semibold text-sky-100/80 space-x-2">
            <span className="text-orange-500">{hotIcon()}</span>
            <span>All Games</span>
          </h2>
          {/* <InfiniteScroll
            dataLength={scrollGames.length}
            next={getMoreGames}
            hasMore={hasMore}
            loader={<div className="my-2 text-center">Loading...</div>}
          >
            <ul>
              {scrollGames.map((game) => (
                <li key={game.id} className={className}>
                  <Link href={`/game/${toSlug(game.name)}`}>
                    <a className="group aspect-square relative block md:hover:origin-bottom md:hover:scale-110 md:delay-50 transition duration-400 ease-in-out rounded-2xl overflow-hidden shadow-md hover:shadow-lg shadow-black/30 hover:shadow-black/40">
                      <Image
                        src={game.icon}
                        alt={toTitle(game.name)}
                        width={200}
                        height={200}
                        className="w-full bg-loading bg-center bg-no-repeat"
                      />
                      <div className="absolute hidden sm:flex justify-center items-end w-full h-full font-semibold -bottom-[150%] md:group-hover:bottom-0 group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 text-center text-xs">
                        <div className="p-2 h-auto w-full text-ellipsis text-center">
                          <h3 className="leading-4">{game.title}</h3>
                          <p className="flex flex-row justify-center items-center text-xl font-bold text-orange-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="-ml-1 h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {game.stars}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </InfiniteScroll> */}
          <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[200px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
            <Adsense slot="6305173453" />
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