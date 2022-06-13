module.exports = {
  images: {
    loader: "custom",
    domains: ["cdn.iwantalipstick.com"],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  // basePath: "/webs/baxiang/baxiang_main_new", // 巴象路径1
  // basePath: "/webs/baxiang/baxiang_main__new", // 巴象路径2
  // basePath: "/www/channel/baxiang", // 测试用
  distDir: "build",
  trailingSlash: true,
  // assetPrefix: ".",
  generateBuildId: () => "baxiang_input",
};
