const { configureSeleniumSetupAndTeardown } = require('../utils');
const {
	configureApplitoolsEyesSetupAndTeardown,
} = require('./applitoolsEyesUtils');
const loginPage = require('./loginPage');
const searchPage = require('./searchPage');
const listsPage = require('./listsPage');

describe('TMDB Web App:', () => {
	configureSeleniumSetupAndTeardown();
	configureApplitoolsEyesSetupAndTeardown();
	loginPage();
	// searchPage();
	// listsPage();
});
