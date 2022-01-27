import { API_URL, GAME_PATH } from "./constants";
import { SELECTED, FEATURED, LATEST } from "./constants";
import {
  iconAction,
  iconCasual,
  iconDefense,
  iconPuzzles,
  iconShooting,
  iconSimulation,
  iconSports,
  iconStrategy,
} from "../components/Icons";

async function fetchAPI() {
  const res = await fetch(API_URL);
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API`);
  }

  return json;
}

// 获取游戏列表
/*
getGames();
getGames("SELECTED");
getGames("SELECTED", 10);
getGames("SELECTED", 10, "random");
getGames("FEATURED");
getGames("LASTEST");
getGames("puzzle");
getGames("puzzle", 10);
*/
export async function getGames(group, limit, order) {
  const data = await fetchAPI();
  let games = [...data.gamelist];
  // console.log(`默认按日期顺序排序`);
  games.sort((a, b) => {
    return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
  });
  let genres = games.map((game) => game.category);
  // console.log(`获取游戏分类合集`);
  let genreNames = [...new Set(genres)];
  // console.log(`提取分类名称`);
  // 选取条件
  if (group !== undefined && group.length !== 0) {
    // console.log(`按条件提取游戏`);
    if (group == "SELECTED") {
      // console.log(`匹配所选游戏`);
      if (SELECTED.length !== 0) {
        // 简单处理备选数据
        // let s = SELECTED.map((e) => e.trim());
        games = games.filter((game) => SELECTED.indexOf(game.name) != -1);
        let gameNames = games.map((g) => g.name);
        let err = SELECTED.filter((el) => gameNames.indexOf(el) == -1);
        // console.log(err);
      }
    }
    if (group == "FEATURED") {
      // console.log(`匹配推荐游戏`);
      if (FEATURED.length !== 0)
        games = games.filter((game) => FEATURED.indexOf(game.name) != -1);
    }
    if (group == "LATEST") {
      // console.log(`匹配新游戏`);
      if (LATEST.length !== 0)
        games = games.filter((game) => LATEST.indexOf(game.name) != -1);
      else {
        games.sort((a, b) => {
          return Date.parse(a.time) < Date.parse(b.time) ? 1 : -1;
        });
      }
    }
    if (genreNames.indexOf(group) != -1) {
      // console.log(`匹配分类游戏`);
      games = games.filter((game) => genreNames.indexOf(game.category) != -1);
    }
  }
  // 限制数量
  if (limit !== undefined) {
    // console.log(`提取指定数量的游戏`);
    games = games.slice(0, limit);
  }
  // 排序
  if (order !== undefined) {
    order == "random"
      ? games.sort(() => 0.5 - Math.random)
      : games.sort((a, b) => {
          return Date.parse(a.time) < Date.parse(b.time) ? 1 : -1;
        });
  }
  //   else {
  //   console.log(`默认按日期顺序排序`);
  //   games.sort((a, b) => {
  //     return Date.parse(a.time) > Date.parse(b.time) ? 1 : -1;
  //   });
  // }
  // 添加属性
  games.map((game) => {
    // console.log(`修改url`);
    game["url"] = `${GAME_PATH}${game.name}`;
    // console.log(`添加基本属性`);
    game["title"] = toTitle(game.name);
    game["slug"] = toSlug(game.name);
    game["featured"] =
      FEATURED.length != 0 && FEATURED.indexOf(game.name) ? `true` : `false`;
    game["lastest"] =
      LATEST.length != 0 && LATEST.indexOf(game.name) ? `true` : `false`;
  });
  games.map((game) => {
    // console.log(`添加附加属性`);
    game["stars"] = getStars();
    game["played"] = getCount();
  });

  return games;
}

// 处理数据格式
export function toTitle(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D");
}

export function toSlug(name) {
  return toTitle(name).toLowerCase().replace(/ /g, "-");
}

// 生成模拟数据
function getRange(m, n, o) {
  let min = m;
  let max = n;
  let range = max - min;
  return o
    ? ((Math.random() * range + min) * o).toFixed(1)
    : (Math.random() * range + min).toFixed(1);
}

function getStars(level) {
  if (level !== undefined) {
    if (level == "latest") return getRange(4, 4.8);
    else if (level == "featured") return getRange(4.5, 5);
  } else return getRange(4.1, 4.5);
}

function getCount(level) {
  let latest = 1;
  let normal = 2;
  let featured = 3;
  if (level !== undefined) {
    if (level == "latest") {
      return getRange(1, 5, latest) + `k`;
    } else if (level == "featured") {
      return getRange(11, 20, featured) + `k`;
    }
  } else {
    return getRange(6, 10, normal) + `k`;
  }
}

// 获取分类列表
export async function getCategories() {
  const allGames = await getGames();
  const seletedGames = await getGames("SELECTED");
  let categories = [];
  if (SELECTED.length != 0) {
    categories = seletedGames.map((game) => game.category.toLowerCase());
  } else {
    categories = allGames.map((game) => game.category.toLowerCase());
  }
  categories = [...new Set(categories)];
  categories = categories.sort();
  return categories;
}

// 按分类获取游戏列表
export async function getGamesByCategory(genre) {
  const allGames = await getGames();
  const seletedGames = await getGames("SELECTED");
  let games;
  if (SELECTED.length != 0) {
    games = seletedGames.filter((game) => game.category.toLowerCase() == genre);
  } else {
    games = allGames.filter((game) => game.category.toLowerCase() == genre);
  }
  return games;
}

// 获取分类图标
export function getIcon(genre) {
  const categoryIcons = {
    action: iconAction(),
    casual: iconCasual(),
    defense: iconDefense(),
    puzzles: iconPuzzles(),
    shooting: iconShooting(),
    simulation: iconSimulation(),
    sports: iconSports(),
    strategy: iconStrategy(),
  };
  return categoryIcons[genre];
}
