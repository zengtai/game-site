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
  // basePath: "/webs/adbee/adbee_SG", // [*]
  // basePath: "/webs/adbee/adbee__SG", // [*] input

  // distDir: "build", // [*]

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220616";
  },
  trailingSlash: true,
  // assetPrefix: `./`,
};
