module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/webs/baxiang_main_new",
  // basePath: "/webs/baxiang_main_new_6", // 2022.06.14

  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220614";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
