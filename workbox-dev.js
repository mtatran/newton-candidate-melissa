module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "client.*.{js,css}",
    "**/*.{woff,woff2,webmanifest}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "app/src-sw.js",
  "maximumFileSizeToCacheInBytes": 10000000
};