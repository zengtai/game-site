import Head from "next/head";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { SITE_NAME } from "../lib/constants";
import { getGames, getCategories } from "../lib/api";
import GameList from "../components/GameList";
import CategoryList from "../components/CategoryList";

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
        <div className="grow">
          <GameList title="New Games" games={newGames} />
          <GameList title="Featured Games" games={featuredGames} />
          <GameList title="All Games" games={games} />
          <CategoryList title="Categories" categories={categories} />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const games = await getGames();
  const newGames = await getGames("NEW");
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
