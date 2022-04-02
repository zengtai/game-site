import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames } from "../../lib/api";
import { toSlug } from "../../utils/generator";
import GameDetail from "../../components/GameDetail";
import CustomGameList from "../../components/CustomGameList";
import Head from "next/head";
import SITE_NAME from "../../lib/constants";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGamesX44,
}) {
  // console.log(games);
  const router = useRouter();
  // const { slug } = router.query;

  return (
    <>
      <Layout list={categories}>
        <Head>
          <title>
            Play {game} on {SITE_NAME}
          </title>
        </Head>
        <div className="grow p-3 md:px-6 xl:p-8 relative z-30">
          <div className="grid xl:grid-cols-12 xl:grid-rows-5 gap-3 xl:gap-6">
            <div className="xl:col-start-3 xl:row-start-1 xl:col-span-8 xl:row-span-3">
              <GameDetail game={game} />
            </div>
            <h3 className="text-lg font-semibold px-2 xl:sr-only">
              You may also like
            </h3>
            <div className="xl:col-start-1 xl:row-start-1 xl:col-span-2 xl:row-span-5 ">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-2 gap-3 xl:gap-6">
                <CustomGameList games={leftGames} />
              </ul>
            </div>
            <div className="xl:col-start-11 xl:row-start-1 xl:col-span-2 xl:row-span-5">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-2 gap-3 xl:gap-6">
                <CustomGameList games={rightGames} />
              </ul>
            </div>
            <div className="xl:col-start-3 xl:row-start-4 xl:col-span-8 xl:row-span-2">
              <ul className="grid grid-cols-5 md:grid-cols-10 xl:grid-cols-8 gap-3 xl:gap-6">
                <CustomGameList games={bottomGamesX44} />
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  let games = await getGames();
  const categories = await getCategories();
  let game = games.filter(
    (game) => toSlug(game.name) == `${context.params.slug}`
  );
  // console.log(game);
  const currentGameIndex = games.findIndex(
    (g) => toSlug(g.name) == `${context.params.slug}`
  );
  // console.log(currentGameIndex);
  games.splice(currentGameIndex, 1);
  games.sort(function () {
    return 0.5 - Math.random();
  });
  return {
    props: {
      game: game[0],
      categories,
      rightGames: games.slice(0, 10),
      leftGames: games.slice(11, 21),
      bottomGamesX44: games.slice(22, 38),
      games,
    },
    revalidate: 10,
  };
}

export const getStaticPaths = async () => {
  const games = await getGames();
  const paths = games.map((game) => ({
    params: {
      slug: toSlug(game.name),
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
