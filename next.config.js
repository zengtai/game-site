// const nextBuildId = require("next-build-id"); // 插件，设置buildid
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
  // generateBuildId: () => nextBuildId({ dir: __dirname }), // 设置为git hash
  generateBuildId: () => "adbee_input", // 设置为固定id
};
