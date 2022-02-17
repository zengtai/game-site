import Layout from "../../components/Layout";
import GameList from "../../components/GameList";
import { useRouter } from "next/router";
import { getGamesByCategory, getCategories } from "../../lib/api";
import Head from "next/head";
import { SITE_NAME, CAT_ADS_ID } from "../../lib/constants";
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
        <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[100px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
          <Adsense slot={CAT_ADS_ID} />
        </div>
        <div className="grow p-4 md:p-8">
          <h1 className="px-2 pb-2 md:pb-3 text-center text-xl md:text-3xl font-semibold text-sky-100/90 capitalize">
            {categoryName} Games
          </h1>
          <GameList cols="4" games={games} />
        </div>
        <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[100px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
          <Adsense slot={CAT_ADS_ID} />
        </div>
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
