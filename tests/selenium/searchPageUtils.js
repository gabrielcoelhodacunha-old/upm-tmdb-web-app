const { until, By } = require('selenium-webdriver');
const { getDriver } = require('../utils');

const SEARCH_CONTAINER_XPATH = "//div[@id='search_container']";

async function searchMovie(movie) {
	const input = await getDriver().wait(
		until.elementLocated(By.id('movie-to-search'))
	);
	await getDriver().executeScript(`arguments[0].value='${movie}'`, input);

	await getDriver()
		.wait(
			until.elementLocated(
				By.xpath(`${SEARCH_CONTAINER_XPATH}//button[text()='Search']`)
			)
		)
		.click();
}

async function waitUntilMovieAppears(movie) {
	await getDriver().wait(
		until.elementLocated(By.xpath(`//p[text()='${movie}']`))
	);
}

async function addMovieToList(movie) {
	await searchMovie(movie);
	await waitUntilActionForMovieIsComplete('Add', movie);
}

async function removeMovieFromList(movie) {
	await searchMovie(movie);
	await waitUntilActionForMovieIsComplete('Remove', movie);
}

async function waitUntilActionForMovieIsComplete(action, movie) {
	const button = await findButtonInListsMenuOfMovie(action, movie);
	await button.click();
	await getDriver().wait(until.elementIsDisabled(button));
}

async function findButtonInListsMenuOfMovie(button, movie) {
	return await getDriver().wait(
		until.elementLocated(
			By.xpath(`${getListsMenuForMovieXpath(movie)}/button[text()='${button}']`)
		)
	);
}

function getListsMenuForMovieXpath(movie) {
	return `//p[text()='${movie}']//ancestor::td[1]//following-sibling::td/div`;
}

module.exports = {
	SEARCH_CONTAINER_XPATH,
	searchMovie,
	waitUntilMovieAppears,
	addMovieToList,
	removeMovieFromList,
};
