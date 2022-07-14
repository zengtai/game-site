module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/webs/bxn/games", // pfg-bxn 2022.07.14
  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220714";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
