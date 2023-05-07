const { configureSeleniumSetupAndTeardown } = require('../selenium/utils');
const { configureApplitoolsEyesSetupAndTeardown } = require('./utils');
const loginPage = require('./loginPage');
const searchPage = require('./searchPage');
const listsPage = require('./listsPage');

describe('TMDB Web App:', () => {
	configureSeleniumSetupAndTeardown();
	configureApplitoolsEyesSetupAndTeardown();
	loginPage();
	searchPage();
	listsPage();
});
