const { configureSeleniumSetupAndTeardown } = require('./utils');
const loginPage = require('./loginPage');
const searchPage = require('./searchPage');
const listsPage = require('./listsPage');

describe('TMDB Web App:', () => {
	configureSeleniumSetupAndTeardown();
	loginPage();
	searchPage();
	listsPage();
});
