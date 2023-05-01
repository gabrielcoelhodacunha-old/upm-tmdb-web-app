const { configureSetupAndTeardown } = require('./configureSetupAndTearDown');
const logIn = require('./01-logIn');

describe('Selenium tests', () => {
	configureSetupAndTeardown();
	logIn();
});
