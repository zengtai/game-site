import Layout from "../../components/Layout";
import GameList from "../../components/GameList";

import { getGamesByCategory, getCategories, getGames } from "../../lib/api";
import Head from "next/head";
import { SITE_META, ADS_SLOT_ID } from "../../lib/constants";
import Adsense from "../../components/Adsense";
import Banner from "../../components/Banner";

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);

  // console.log(router.query);
  // console.log({ slug });
  const categoryName = games[0].category;
  // console.log(categoryName);
  return (
    <>
      <Layout navItems={categories} isOpen>
        <Head>
          <title>
            {categoryName} Games | Play {categoryName} Games on {SITE_META.name}
          </title>
        </Head>

        <Banner
          className={`banner`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.category}
          responsive="false"
        />

        <div className="grow p-4 md:p-8">
          <h1 className="px-2 pb-2 md:pb-3 text-center text-xl md:text-3xl font-semibold text-sky-100/90 capitalize">
            {categoryName} Games
          </h1>
          <GameList cols="4" games={games} />
        </div>

        <Banner
          className={`banner rectangle`}
          style={{ display: "block" }}
          slot={ADS_SLOT_ID.category}
          responsive="false"
        />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGamesByCategory(`${context.params.slug}`);
  const categories = await getGames().then((res) => res.categories);

  return {
    props: {
      games,
      categories,
    },
  };
}

export const getStaticPaths = async () => {
  const categories = await getGames().then((res) => res.categories);
  const paths = categories.map((category) => ({
    params: {
      slug: category.toLowerCase(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
