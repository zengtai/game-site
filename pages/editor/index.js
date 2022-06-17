import { useState } from "react";
import Head from "next/head";
import useCurrentData from "../../data/CurrentData";
import moment from "moment";

export default function Editor({ data }) {
  function ShowCurrentData() {
    const { data, isLoading, isError } = useCurrentData();
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Fail to load</div>;
    return (
      <>
        <div className="my-4">Original Data: {data.gamelist.length}</div>
        <table className="text-sm leading-8">
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
