// import useSWR from "swr";

import {
  API_URL,
  SELECTED_GAMES,
  NEW_GAMES,
  FEATURED_GAMES,
} from "./constants";

async function fetchAPI() {
  const res = await fetch(API_URL);

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  // console.log(json);
  return json.gamelist;
}

export const toSlug = (name) =>
  name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, "3D")
    .replace(/ /g, "-")
    .toLowerCase();

export async function getGames(type) {
  const data = await fetchAPI();
  // console.log(data);
  let gamesName = [];
  data.map((game) => gamesName.push(game.name));
  let games = [];
  if (type === undefined) {
    if (SELECTED_GAMES.length != 0) {
      games = data.filter((game) => SELECTED_GAMES.includes(game.name));
    } else {
      games = [...data];
    }
  } else if (type === "NEW")
    games = data.filter((game) => NEW_GAMES.includes(game.name));
  else if (type === "FEATURED")
    games = data.filter((game) => FEATURED_GAMES.includes(game.name));
  // console.log(games);

  // games = games.map((game) => {
  //   game["title"] = game.name
  //     .toString()
  //     .replace(/([A-Z])/g, " $1")
  //     .trim()
  //     .replace(/3 D/g, " 3D");
  // });
  return games;
}

export async function getCategories() {
  const games = await getGames();
  let categories = games.map((game) => game.category.toLowerCase());
  categories = [...new Set(categories)];
  // categories = categories.sort();
  return categories;
}

export async function getGamesByCategory(genre) {
  let games = await getGames();
  games = games.filter((game) => game.category.toLowerCase() == genre);
  // console.log(games);

  return games;
}

export async function getGamesSlugs(slug) {
  const games = await getGames();

  // slugs = games.map((game) => game.name.replace(/A-Z/g, " $1"));

  return games.map((game) => {
    return {
      params: {
        slug: game
          .replace(/([A-Z])/g, " $1")
          .trim()
          .replace(/3 D/g, "3D"),
      },
    };
  });
}
