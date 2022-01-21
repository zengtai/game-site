import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames, toSlug } from "../../lib/api";
import GameDetail from "../../components/GameDetail";
import CustomGameList from "../../components/CustomGameList";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGamesX44,
}) {
  // console.log(games);
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Layout list={categories}>
        <div className="grow p-4 md:p-8 relative z-30">
          <div className="grid xl:grid-cols-12 xl:grid-rows-5 gap-3 md:gap-6">
            <div className="xl:col-start-3 xl:row-start-1 xl:col-span-8 xl:row-span-3">
              <GameDetail game={game} />
            </div>
            <h3 className="text-lg text-cyan-900/80 font-semibold px-2 xl:sr-only">
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
    fallback: false,
  };
};
