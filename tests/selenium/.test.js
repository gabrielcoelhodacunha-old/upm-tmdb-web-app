const { configureSeleniumSetupAndTeardown } = require('../utils');
const logInPage = require('./loginPage');
const searchPage = require('./searchPage');
const listsPage = require('./listsPage');

describe('TMDB Web App', () => {
	configureSeleniumSetupAndTeardown();
	logInPage();
	searchPage();
	listsPage();
});
