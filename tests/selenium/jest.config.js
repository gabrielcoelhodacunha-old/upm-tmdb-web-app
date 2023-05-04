/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
	testTimeout: 10000,
	bail: 1,
	clearMocks: true,
	coverageProvider: 'v8',
	testMatch: ['**/tests/selenium/.test.js'],
};
