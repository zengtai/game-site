module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  // swcMinify: true,
  // basePath: "/webs/youle", // youle
  // distDir: "build",
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "20220517";
  },
  trailingSlash: true,
};
