module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [96, 128, 256],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/webs/adbee/adbee_SG",
  // basePath: "/webs/baxiang/baxiang_main__new", // [*] 2022.06.14

  // async rewrites() {
  //   return [
  //     {
  //       source: `/favicon.ico`,
  //       destination: `/web/baxiang/baxiang_main_new_6/favicon.ico`,
  //       basePath: false,
  //     },
  //   ];
  // },

  // async redirects() {
  //   return [
  //     {
  //       // does not add /docs since basePath: false is set
  //       source: "/favicon.ico",
  //       destination: "/web/baxiang/baxiang_main_new_6/favicon.ico",
  //       basePath: false,
  //       permanent: false,
  //     },
  //   ];
  // },

  distDir: "build", // [*]

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220616";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
