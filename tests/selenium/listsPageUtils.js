const { until, By } = require('selenium-webdriver');
const { getDriver } = require('./utils');

const LISTS_CONTAINER_XPATH = "//div[@id='lists_container']";

async function createList(name, description = '') {
	const nameInput = await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//label[text()='Name']/input`)
		)
	);
	const descriptionTextArea = await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//label[text()='Description']/textarea`)
		)
	);
	await getDriver().executeScript(
		`
		arguments[0].value='${name}'
		arguments[1].value='${description}'
		`,
		nameInput,
		descriptionTextArea
	);
	await getDriver()
		.wait(
			until.elementLocated(
				By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Create List']`)
			)
		)
		.click();
}

async function waitUntilNewListAppears(name, description = null) {
	await getDriver().wait(
		until.elementLocated(
			By.xpath(`${LISTS_CONTAINER_XPATH}//p[text()='${name}']`)
		)
	);
	if (description) {
		await getDriver().wait(
			until.elementLocated(
				By.xpath(`${LISTS_CONTAINER_XPATH}//p[text()='${description}']`)
			)
		);
	}
}

async function waitUntilDeletedAllLists() {
	const deleteButtons = await getDriver().findElements(
		By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Delete list']`)
	);
	deleteButtons.forEach(async (button) => await button.click());
	while (
		(await getDriver().findElements(
			By.xpath(`${LISTS_CONTAINER_XPATH}/table`)
		)) > 0
	);
}

async function removeMovieFromList(list) {
	await waitUntilActionForListIsComplete('Remove movie', list);
}

async function waitUntilActionForListIsComplete(action, list) {
	const button = await findButtonInMoviesMenuOfList(action, list);
	await button.click();
	await getDriver().wait(until.elementIsDisabled(button));
}

async function findButtonInMoviesMenuOfList(button, list) {
	return await getDriver().wait(
		until.elementLocated(
			By.xpath(`${getMoviesMenuForListXpath(list)}/button[text()='${button}']`)
		)
	);
}

function getMoviesMenuForListXpath(list) {
	return `//p[text()='${list}']//ancestor::td[1]//following-sibling::td[2]/div`;
}

module.exports = {
	LISTS_CONTAINER_XPATH,
	createList,
	waitUntilNewListAppears,
	waitUntilDeletedAllLists,
	removeMovieFromList,
};
