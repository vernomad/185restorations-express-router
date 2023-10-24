const workboxBuild = require("workbox-build");

workboxBuild
  .generateSW({
    globDirectory: "./",
    globPatterns: [
      "**/*.{js,webmanifest,txt,json,ttf,png,ico,jpg,svg,css,scss,xml,ejs,html}",
    ],
    swDest: "public/sw.js",
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  })
  .then(() => {
    console.log(`Generated new service worker.`);
  })
  .catch((err) => {
    console.error(`Unable to generate a new service worker.`, err);
  });

module.exports = {
  globDirectory: "public/",
  globPatterns: [
    "**/*.{js,webmanifest,txt,json,ttf,png,ico,jpg,svg,css,scss,xml,ejs,html}",
  ],
  swDest: "public/sw.js",
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
