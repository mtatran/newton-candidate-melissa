module.exports = {
	globDirectory: '.',
	globPatterns: ['build/br/client.*.{js,css}', 'build/web/*.{woff,woff2,webmanifest}'],
	swDest: 'build/web/sw.js',
	swSrc: 'app/src-sw.js'
};
