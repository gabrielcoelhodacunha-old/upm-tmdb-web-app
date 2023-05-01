const logIn = require('./01-logIn');
const { configureSeleniumSetupAndTeardown } = require('../selenium-utils');

describe('Selenium tests', () => {
	configureSeleniumSetupAndTeardown();
	logIn();
});
