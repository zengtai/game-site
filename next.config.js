module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/webs/youle", // youle
  // basePath: "/webs/youle_1", // youle_1 2022.05.24

  // basePath: "/webs/youle_2", // youle_2 2022.05.30
  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    // return "20220517";
    // return "20220524";
    return "20220530";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
