const { configureSeleniumSetupAndTeardown } = require('../utils');
const logInPage = require('./01-logInPage');
const searchPage = require('./02-searchPage');
const listsPage = require('./03-listsPage');

describe('TMDB Web App', () => {
	configureSeleniumSetupAndTeardown();
	// logInPage();
	// searchPage();
	listsPage();
});
