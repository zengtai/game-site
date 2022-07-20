/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.uptapgame.com",
  generateRobotsTxt: true, // (optional)
  exclude: [`/editor`],
  // ...other options
};
