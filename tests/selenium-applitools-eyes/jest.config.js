/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
	testTimeout: 120000,
	bail: 1,
	clearMocks: true,
	coverageProvider: 'v8',
	testMatch: ['**/tests/selenium-applitools-eyes/.test.js'],
};
