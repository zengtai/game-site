import { API_URL, GAME_PATH } from "./constants";
import { SELECTED_GAMES, EXCLUDED_GAMES } from "./constants";
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

async function fetchAPI(url) {
  const res = await fetch(url);
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API`);
  }

  return json;
}

function toTitle(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2");
}

function toSlug(name) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

function toFormat(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^\S/, (s) => s.toUpperCase());
}

export async function getGames() {
  const data = await fetchAPI(API_URL).then((res) => res.gamelist);

  // 默认按日期排序
  let games = data.sort((a, b) => (a.time < b.time ? 1 : -1));

  // 如存在要筛选的游戏
  if (SELECTED_GAMES.length)
    games = games.filter((game) => SELECTED_GAMES.includes(game.name));

  // 如存在要排除的游戏
  if (EXCLUDED_GAMES)
    games = games.filter((game) => !EXCLUDED_GAMES.includes(game.name));

  // fix
  games.map((game) => {
    game.name == "WoodisLand" ? (game.name = "WoodIsland") : null;
    game.name == "SharkisComing" ? (game.name = "SharkIsComing") : null;
  });

  let basicData = [];
  let categories = [];

  // 设置 title / slug / url
  games.map((game) => {
    game["title"] = toTitle(game.name);
    game["slug"] = toSlug(game.title);
    game["url"] = `${GAME_PATH}${game.name}`;
    game[
      "icon"
    ] = `https://cdn.iwantalipstick.com/gameicon2/png/${game.name}.png`;
  });

  // fix
  games.map((game) => {
    game.name == "AnipopLink"
      ? (game.icon = `https://cdn.iwantalipstick.com/gameicon2/png/AniPopLink.png`)
      : null;
    game.name == "MergeMagicJewellery"
      ? (game.icon = `https://cdn.iwantalipstick.com/gameicon2/png/MergeMagic.png`)
      : null;
  });

  // 添加附加属性
  games.map((game) => {
    game["stars"] = getStars();
    game["played"] = getCount();
  });

  // 生成包含基础属性的数组
  games.map((game) => {
    // 写入数组
    basicData.push({
      id: game.id,
      title: game.title,
      slug: game.slug,
      icon: game.icon,
      name: game.name,
      stars: game.stars,
      category: toFormat(game.category),
    });
    // 写入分类名称
    !categories.includes(toFormat(game.category))
      ? categories.push(toFormat(game.category))
      : null;
  });

  return { games, basicData, categories };
}

// 获取分类游戏
export async function getGamesByCategory(category) {
  const games = await getGames().then((res) => res.basicData);
  return games.filter((game) => game.category.toLowerCase() === category);
}

// 按 slug 获取游戏信息
export async function getGameBySlug(slug) {
  const game = await getGames()
    .then((res) => res.games)
    .then((res) => res.filter((game) => game.slug == slug));
  return game;
}

// 获取分类图标 ? 好像不需要
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
      return getRange(10, 50, latest) + `k`;
    } else if (level == "featured") {
      return getRange(110, 200, featured) + `k`;
    }
  } else {
    return getRange(60, 100, normal) + `k`;
  }
}
