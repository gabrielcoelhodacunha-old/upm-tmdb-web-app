const { By } = require('selenium-webdriver');
const { PAGES } = require('../selenium/utils');
const { LISTS_CONTAINER_XPATH } = require('../selenium/listsPageUtils');
const { getEyes, getTargetWindow } = require('./utils');

async function checkListsPageWithList(
	checkpointDescription,
	name,
	description = ''
) {
	await getEyes().check(
		getTargetWindow(PAGES.LISTS, checkpointDescription, true).ignoreRegions(
			By.xpath(`${LISTS_CONTAINER_XPATH}/table//p[text()='${name}']`),
			By.xpath(`${LISTS_CONTAINER_XPATH}/table//p[text()='${description}']`)
		)
	);
}

module.exports = { checkListsPageWithList };
