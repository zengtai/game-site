import Head from "next/head";
import { categoryIcon } from "../components/Icons";
import Layout from "../components/Layout";
import { SITE_META } from "../lib/constants";
import { getGames, getCategories, getGamesByCategory } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";
import Link from "next/link";
// import ScrollGameList from "../components/ScrollGameList";

export default function Home({ games, categories }) {
  // console.log(games);
  // console.log(categories);
  // const gameList = games.map((game) => <li key={game.id}>{game.name}</li>);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: SITE_META.url,
    logo: `/brand/uptapgame-logo.svg`,
  };
  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>{SITE_META.name} | Play Free Games Online</title>
        </Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="relative z-30 grow md:px-4">
          {categories.map((category) => {
            let categoryGames = games.filter(
              (game) => game.category.toLowerCase() == category
            );
            return (
              <div key={category}>
                <div className="flex flex-row items-center justify-between p-3 text-sm font-semibold xl:px-8 xl:pb-1">
                  <h2 className="text-lg capitalize text-slate-600 xl:text-xl">
                    {category} {categoryGames.length > 1 ? `Games` : `Game`}{" "}
                    <span className="text-md font-normal">
                      ({categoryGames.length})
                    </span>
                  </h2>
                  {categoryGames.length > 12 ? (
                    <div>
                      <Link href={`/category/${category}`}>
                        <a>MORE</a>
                      </Link>
                    </div>
                  ) : null}
                </div>
                <GameList games={categoryGames.slice(0, 12)} />
              </div>
            );
          })}
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
  // const newGames = await getGames("LATEST", 12);
  // const featuredGames = await getGames("FEATURED_GAMES");
  const categories = await getCategories();

  return {
    props: {
      games,
      categories,
    },
    // revalidate: 60,
  };
};
