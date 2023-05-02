const { until, By } = require('selenium-webdriver');
const {
	getPage,
	waitUntilLogOutIsComplete,
	getDriver,
	generateRandomString,
	acceptAlert,
} = require('../utils');
const { logInWithCredentials } = require('./01-logInPage');

const LISTS_CONTAINER_XPATH = "//div[@id='lists_container']";

function listsPage() {
	describe('User at lists page', () => {
		beforeEach(async () => {
			await getPage();
			await logInWithCredentials();
			await getDriver()
				.wait(until.elementLocated(By.xpath("//button[text()='Lists']")))
				.click();
			await getDriver().findElements(By.xpath('//table'));
		});

		describe('can create a list', () => {
			it('with name and description', async () => {
				await createList(generateRandomString(), generateRandomString());
			});
		});

		describe("can't create a list", () => {
			it('with empty name', async () => {
				await createList('');
				await acceptAlert();
			});

			it('with same name as existing one', async () => {
				const name = generateRandomString();
				await createList(name);
				await getDriver().wait(
					until.elementLocated(
						By.xpath(`${LISTS_CONTAINER_XPATH}//p[text()='${name}']`)
					)
				);
				await createList(name);
				await acceptAlert();
			});
		});

		afterEach(async () => {
			await deleteLists();
			await waitUntilLogOutIsComplete();
		});
	});
}

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
	await nameInput.click();
	await getDriver()
		.wait(
			until.elementLocated(
				By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Create List']`)
			)
		)
		.click();
}

async function deleteLists() {
	const deleteButtons = await getDriver().findElements(
		By.xpath(`${LISTS_CONTAINER_XPATH}//button[text()='Delete list']`)
	);
	deleteButtons.forEach(async (button) => await button.click());
}

module.exports = { listsPage, createList, deleteLists };
