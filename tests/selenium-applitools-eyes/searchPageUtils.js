const { By } = require('selenium-webdriver');
const { PAGES } = require('../selenium/utils');
const { getListsMenuForMovieXpath } = require('../selenium/searchPageUtils');
const { getEyes, getTargetWindow } = require('./utils');

async function checkSearchPageResultsWithList(movie, description) {
	await getEyes().check(
		getTargetWindow(PAGES.SEARCH, description, true).ignoreRegions(
			By.xpath(`${getListsMenuForMovieXpath(movie)}/select`)
		)
	);
}

module.exports = { checkSearchPageResultsWithList };
