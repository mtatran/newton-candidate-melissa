module.exports = {
	collectCoverageFrom: ['<rootDir>/tests/**/*.{js,jsx,mjs}'],
	testMatch: ['<rootDir>/tests/**/*.{js,jsx,mjs}', '<rootDir>/tests/?(*.)(spec|test).{js,jsx,mjs}'],
	transform: {
		'^.+\\.js$': '<rootDir>/tests/config/jest.transform.js'
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$']
};
