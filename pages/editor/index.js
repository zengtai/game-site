import { useState } from "react";
import Head from "next/head";
import useCurrentData from "../../data/CurrentData";
import moment from "moment";
import { getStars, toSlug, toTitle } from "../../utils/generator";
import { GAME_PATH, LANDSCAPE_GAMES } from "../../lib/constants";

export default function Editor({ data }) {
  function ShowCurrentData() {
    const { data, isLoading, isError } = useCurrentData();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Fail to load</div>;

    let games = [];
    let categories = [];

    function getCategoryID(category) {
      switch (category) {
        case `action`:
          return 1;
        case `puzzle`:
          return 2;
        case `puzzles`:
          return 2;
        case `casual`:
          return 3;
        case `simulation`:
          return 4;
        case `sports`:
          return 5;
        case `strategy`:
          return 6;
        case `defense`:
          return 7;
        case `racing`:
          return 8;
        case `shooting`:
          return 9;

        default:
          break;
      }
    }

    data.gamelist.map((item) => {
      let game = {};
      game.title = toTitle(
        item.name == `SharkisComing` ? `SharkIsComing` : item.name
      );
      game.slug = toSlug(
        item.name == `SharkisComing` ? `SharkIsComing` : item.name
      );
      game.gid = item.name == `SharkisComing` ? `SharkIsComing` : item.name;
      // game.category = {
      //   name:
      //     item.category.trim().toLowerCase() == `puzzles`
      //       ? `Puzzle`
      //       : item.category
      //           .trim()
      //           .toLowerCase()
      //           .replace(/^\S/, (s) => s.toUpperCase()),
      //   slug:
      //     item.category.trim().toLowerCase() == `puzzles`
      //       ? `puzzle`
      //       : item.category.trim().toLowerCase(),
      // };
      game.category = getCategoryID(item.category.trim().toLowerCase());
      game.description = item.description.trim();
      game.creation_date = new Date(item.time);
      game.game_url = `${GAME_PATH}${
        item.name == `SharkisComing` ? `SharkIsComing` : item.name
      }`;
      game.icon_url = `https://cdn.iwantalipstick.com/gameicon2/png/${
        item.name == `SharkisComing` ? `SharkIsComing` : item.name
      }.png`;
      game.rating = getStars();
      game.oritention = LANDSCAPE_GAMES.includes(item.name.trim())
        ? `landscape`
        : `portrait`;
      // game.tags = null;
      // game.status = `draft`;

      games.push(game);
      categories.push(
        item.category.trim().toLowerCase() == `puzzles`
          ? `Puzzle`
          : item.category
              .trim()
              .toLowerCase()
              .replace(/^\S/, (s) => s.toUpperCase())
      );
    });

    categories = [...new Set(categories)];

    return (
      <>
        <div className="my-4">Original Data: {data.gamelist.length}</div>
        <div className="flex flex-row gap-6">
          <table className="basis-1/2 table-auto text-sm leading-8">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" name="" id="" />
                </th>
                <th>#</th>
                <th>appid</th>
                <th>category</th>
                <th>creation_date</th>
              </tr>
            </thead>
            <tbody>
              {data.gamelist.map((game, index) => (
                <tr key={game.id}>
                  <td>
                    <input type="checkbox" name="" id={game.name} />
                  </td>
                  <td>{index + 1}</td>
                  <td>{game.name}</td>
                  <td>
                    {game.category[0] == game.category[0].toUpperCase() &&
                    game.category == game.category.trim() ? (
                      game.category
                    ) : (
                      <span className="text-red-500">{game.category}</span>
                    )}
                  </td>
                  <td>{moment(new Date(game.time)).format("MMM Do, YYYY")}</td>
                </tr>
              ))}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
          <textarea
            className="basis-1/2 select-all bg-slate-50 p-6"
            name=""
            id=""
            cols="30"
            rows="10"
            value={JSON.stringify(games, null, 4)}
          ></textarea>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="container mx-auto my-6 bg-white p-6">
        <h2>Fetch source data</h2>
        <div className="flex items-center gap-3">
          <lable>URL: </lable>
          <input
            className="w-1/2 border p-2"
            type="text"
            name="dataUrl"
            id="dataUrl"
          />
          <button className="bg-blue-600 p-2 text-white">Fetch</button>
        </div>
        <ShowCurrentData />
      </div>
    </>
  );
}

Editor.getInitialProps = async (ctx) => {
  return {
    data: null,
  };
};
