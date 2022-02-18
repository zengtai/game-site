module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,

  // basePath: "/webs/adbee/main", // adbee路径1
  basePath: "/webs/adbee/main_", // adbee路径2
  // basePath: "/www/channel/baxiang", // 测试用
  distDir: "build",
  trailingSlash: true,
  // assetPrefix: ".",
};
