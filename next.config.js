module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  // basePath: "/webs/baxiang_main__new", // baxiang_input

  // distDir: "build",

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220613";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
