import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames, toSlug } from "../../lib/api";
import GameDetail from "../../components/GameDetail";
import Container from "../../components/Container";
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
        <Container>
          <h1>
            <span>{game.name}</span>
          </h1>
          <GameDetail game={game} />
        </Container>
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
