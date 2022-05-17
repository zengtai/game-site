import Layout from "../../components/Layout";
import { getGameBySlug, getGames } from "../../lib/api";
import GameDetail from "../../components/GameDetail";
import CustomGameList from "../../components/CustomGameList";
import Link from "next/link";
import Head from "next/head";
import { ADS_SLOT_ID, SITE_META } from "../../lib/constants";
import Banner from "../../components/Banner";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGames,
}) {
  return (
    <>
      <Layout navItems={categories}>
        <Head>
          <title>
            {game.title} | Play {game.title} on {SITE_META.name}
          </title>
        </Head>
        <Banner
          className={`banner`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.detail}
          responsive="false"
        />

        <div className="grow p-4 md:p-8 relative z-30">
          <div className="grid xl:grid-cols-12 xl:grid-rows-5 gap-3 md:gap-6">
            <div className="xl:col-start-3 xl:row-start-1 xl:col-span-8 xl:row-span-3">
              <div className="pb-3 flex flex-row">
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
              <GameDetail game={game} />
            </div>
            <h3 className="flex flex-row text-lg text-yellow-100/70 font-semibold px-2 xl:sr-only">
              <span className="mr-1 text-yellow-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </span>
              You may also like
            </h3>
            <div className="xl:col-start-1 xl:row-start-1 xl:col-span-2 xl:row-span-5 ">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-2 gap-3 md:gap-6">
                <CustomGameList games={leftGames} />
              </ul>
            </div>
            <div className="xl:col-start-11 xl:row-start-1 xl:col-span-2 xl:row-span-5">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-2 gap-3 md:gap-6">
                <CustomGameList games={rightGames} />
              </ul>
            </div>
            <div className="xl:col-start-3 xl:row-start-4 xl:col-span-8 xl:row-span-2">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-8 gap-3 md:gap-6">
                <CustomGameList games={bottomGames} />
              </ul>
            </div>
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
      bottomGames: relatedGames.slice(22, 38),
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
