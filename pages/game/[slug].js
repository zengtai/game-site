import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames, toSlug } from "../../lib/api";
import GameDetail from "../../components/GameDetail";

export default function Games({ game, categories }) {
  // console.log(games);
  // console.log(game);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  // console.log({ slug });
  return (
    <>
      <Layout list={categories}>
        <div className="px-3 grow">
          <h1 className="pt-2 pb-1 text-center text-lg font-semibold text-stone-900/80">
            <span>{game.name}</span>
          </h1>
          <GameDetail game={game} />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGames();
  const categories = await getCategories();
  let game = games.filter(
    (game) => toSlug(game.name) == `${context.params.slug}`
  );

  return {
    props: {
      game: game[0],
      categories,
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
