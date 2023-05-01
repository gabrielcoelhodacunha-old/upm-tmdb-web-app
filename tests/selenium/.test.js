const { configureSeleniumSetupAndTeardown } = require('../utils');
const logIn = require('./01-logIn');
const searchMovies = require('./02-searchMovies');

describe('TMDB Web App', () => {
	configureSeleniumSetupAndTeardown();
	// logIn();
	searchMovies();
});
