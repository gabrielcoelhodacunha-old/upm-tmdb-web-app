const { Builder, By, until } = require('selenium-webdriver');

const PAGES = {
	LOGIN: 'Login',
	SEARCH: 'Search',
	LISTS: 'Lists',
};
const SCREEN = {
	WIDTH: 1024,
	HEIGHT: 768,
};

let driver;
// Permite utilizacao de mesma instancia em outros arquivos
const getDriver = () => driver;

/**
 * @summary Configura passos anteriores e posteriores dos testes Selenium
 */
function configureSeleniumSetupAndTeardown() {
	// Antes de cada teste
	beforeEach(async () => {
		// Cria e configura instancia de Chrome Web Driver.
		driver = await configureChromeWebDriver();
		// Acessa a pagina da aplicação
		await getPage();
	});
	// Apos cada teste
	afterEach(async () => {
		// Fecha a instancia do Chrome Web Driver
		await driver.quit();
	});
}

/**
 * @summary Cria e configura instancia de Chrome Web Driver.
 */
async function configureChromeWebDriver() {
	// Cria instancia
	const driver = new Builder()
		.withCapabilities({
			// define navegador
			browserName: 'chrome',
			// habilita configuracoes adicionais
			'goog:chromeOptions': {
				args: [],
			},
		})
		.build();
	// Configura o tempo de espera para cada passo da instancia em 1 segundo
	await driver.manage().setTimeouts({ implicit: 1000 });
	// Configura a janela da instancia
	await driver.manage().window().setRect({
		// topo da pagina
		x: 0,
		y: 0,
		// resolucao de 1024x768
		width: SCREEN.WIDTH,
		height: SCREEN.HEIGHT,
	});
	return driver;
}

/**
 * @summary Acessa localhost na porta 3000 na page
 * @param {string} page
 */
async function getPage(page = '') {
	await getDriver().get(`http://localhost:3000/${page}`);
}

async function goToPageByClickingButton(buttonText) {
	await getDriver()
		.wait(until.elementLocated(By.xpath(`//button[text()='${buttonText}']`)))
		.click();
}

async function waitUntilLogOutIsComplete() {
	await getDriver()
		.wait(until.elementLocated(By.id('logOut')))
		.click();
	while ((await getDriver().executeScript(() => localStorage.length)) > 0);
}

async function acceptAlert() {
	await getDriver().wait(until.alertIsPresent());
	await getDriver().switchTo().alert().accept();
}

module.exports = {
	PAGES,
	SCREEN,
	getDriver,
	configureSeleniumSetupAndTeardown,
	goToPageByClickingButton,
	waitUntilLogOutIsComplete,
	acceptAlert,
};
