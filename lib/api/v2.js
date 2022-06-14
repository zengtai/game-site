import {
  API_URL,
  GAME_PATH,
  SELECTED_GAMES,
  EXCLUDED_GAMES,
} from "../constants";

async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getGameBySlug(slug) {
  const data = await fetchAPI(
    `
  query GameBySlug($filter: JSON) {
    games(filters: $filter) {
      data {
        attributes {slug}
      }
    }
  }
  `,
    {
      variables: {
        filter: {
          slug: {
            eq: slug,
          },
        },
      },
    }
  );
  return data?.games[0];
}

export async function getAllGamesWithSlug() {
  const data = fetchAPI(`
    {
      games{
        data {
          attributes {slug}
        }
      }
    }
  `);
  return data?.games;
}

export async function getAllGamesForHome(preview) {
  const data = await fetchAPI(
    `
    query Games($publicationState: ENUM){
      games(sort: "creation_date:DESC", pagination: {limit:10}, publicationState: $publicationState) {
        slug
        appid
        icon_url
        category {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        publicationState: {
          ...(preview ? `PREVIEW` : `LIVE`),
        },
      },
    }
  );
  return data?.games;
}

export async function getGameAndRelatedGames(slug, limit = 10, preview) {
  const data = await fetchAPI(
    `
    query GameBySlug($where: JSON, $where_ne: JSON, $limit: Int) {
      games(filters: $where, publicationState: $publicationState) {
        title
        slug
        description
        last_update
        icon_url
        game_url
        category {
          data {
            attributes {
              name
              slug
            }
          }
        }
      }
      relatedGames: games(sort: "creation_date:DESC", limit: $limit, filters: $where_ne, publicationState: $publicationState) {
        title
        slug
        icon_url
      }
    }
  `,
    {
      variables: {
        where: {
          slug: {
            eq: slug,
          },
        },
        where_ne: {
          slug: {
            ne: slug,
          },
        },
        limit: limit,
        publicationState: {
          ...(preview ? `PREVIEW` : `LIVE`),
        },
      },
    }
  );
  return data;
}

// 获取分类游戏
export async function getGamesByCategory(category, limit = 10) {
  const data = await fetchAPI(
    `
    query GamesByCategory($filter: JSON, $limit: Int) {
      games(filters: $filter, pagination:{limit:$limit} ) {
        data {
          attributes {
            slug
            appid
            icon_url
            category {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      variables: {
        filter: {
          category: { slug: { eq: category } },
        },
        limit: limit,
      },
    }
  );
  return data?.games;
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
      // return getRange(10, 50, latest) + `k`;
      return getRange(100, 200, latest) + `k`; // 增加量 2022.06.13
    } else if (level == "featured") {
      // return getRange(110, 200, featured) + `k`;
      return getRange(400, 600, featured) + `k`; // 增加量 2022.06.13
    }
  } else {
    // return getRange(60, 100, normal) + `k`;
    return getRange(210, 390, normal) + `k`; // 增加量 2022.06.13
  }
}
