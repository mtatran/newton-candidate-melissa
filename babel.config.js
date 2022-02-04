const enviroments = require('./tests/config/jest-transform');

module.exports = {
	plugins: [
		['styled-components', { ssr: true, displayName: true, preprocess: false }],
		[
			'module-resolver',
			{
				root: ['./']
			}
		]
	],
	env: {
		dev: {
			plugins: [
				['transform-define', enviroments],
				['module-resolver', { root: ['./'] }],
				'transform-decorators-legacy',
				'transform-class-properties'
			]
		},
		build: {
			plugins: [
				['transform-define', enviroments],
				['module-resolver', { root: ['./'] }],
				'transform-decorators-legacy',
				'transform-class-properties'
			]
		},
		production: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							browsers: ['last 1 version', 'ie >= 11']
						}
					}
				],
				[
					'minify',
					{
						mangle: false,
						evaluate: false
					}
				]
			],
			plugins: [
				['transform-define', enviroments],
				['@babel/plugin-proposal-decorators', { legacy: true }],
				['@babel/plugin-proposal-class-properties', { loose: true }],
				['module-resolver', { root: ['./'] }]
			],
			comments: false,
			compact: true,
			minified: true
		}
	}
};
