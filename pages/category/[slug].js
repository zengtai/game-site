import Layout from "../../components/Layout";
import GameList from "../../components/GameList";
import { useRouter } from "next/router";
import { getGamesByCategory, getCategories } from "../../lib/api";
import Head from "next/head";
import { SITE_NAME } from "../../lib/constants";
import AdsenseFixed from "../../components/AdsenseFixed";
import Adsense from "../../components/Adsense";

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  // console.log({ slug });
  const categoryName = slug.toString().replace(/^\S/, (s) => s.toUpperCase());
  // console.log(categoryName);
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>
            {categoryName} Games | Play {categoryName} Games on {SITE_NAME}
          </title>
        </Head>

        <AdsenseFixed height={`h-[100px]`} slot="7572322975" />

        <div className="grow p-4 md:p-8">
          <h1 className="px-2 pb-2 md:pb-3 text-center text-2xl font-semibold text-cyan-900/80 capitalize">
            {categoryName} Games
          </h1>
          <GameList cols="4" games={games} />
        </div>

        <AdsenseFixed height={`h-[200px]`} slot="7572322975" />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGamesByCategory(`${context.params.slug}`);
  const categories = await getCategories();

  return {
    props: {
      games,
      categories,
    },
  };
}

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: {
      slug: category,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
