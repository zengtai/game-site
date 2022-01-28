import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames, toSlug } from "../../lib/api";
import GameDetail from "../../components/GameDetail";
import CustomGameList from "../../components/CustomGameList";
import Link from "next/link";
import Adsense from "../../components/Adsense";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGamesX44,
}) {
  // console.log(game);
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Layout list={categories}>
        <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[100px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
          <Adsense slot="2156785701" />
        </div>
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
                  Action
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
                {game.title}
              </div>
              <GameDetail game={game} />
            </div>
            <h3 className="flex flex-row text-lg text-sky-100/80 font-semibold px-2 xl:sr-only">
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
                <CustomGameList games={bottomGamesX44} />
              </ul>
            </div>
          </div>
        </div>
        <div className="before:content-['Advertisement'] before:absolute before:left-1/2 before:-translate-x-1/2 before:opacity-50 mx-auto w-[300px] h-[200px] md:h-[90px] md:w-[728px] lg:w-[970px] bg-black/10">
          <Adsense slot="2156785701" />
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
  games.sort(function (a, b) {
    return Date.parse(a) > Date.parse(b) ? 1 : -1;
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
