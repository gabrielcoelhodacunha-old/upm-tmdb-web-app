const {
	Eyes,
	ClassicRunner,
	Target,
	Configuration,
} = require('@applitools/eyes-selenium');
const { getDriver } = require('../utils');

const APPLITOOLS_APP = 'TMDB Web App';

let eyesConfig;
let eyes;
const getEyesConfig = () => eyesConfig;
const getEyes = () => eyes;

function configureApplitoolsEyesSetupAndTeardown() {
	let runner;

	beforeAll(async () => {
		eyesConfig = new Configuration();
		eyesConfig.setApiKey(process.env.APPLITOOLS_API_KEY);
		runner = new ClassicRunner();
	});

	beforeEach(async () => {
		eyes = new Eyes(runner);
		eyes.setConfiguration(eyesConfig);
		await eyes.open(
			getDriver(),
			APPLITOOLS_APP,
			expect.getState().currentTestName
		);
	});

	afterEach(async () => {
		await eyes.closeAsync();
	});

	afterAll(async () => {
		await runner.getAllTestResults();
	});
}

async function useEyesToCheckWholePage(description) {
	await getEyes().check(Target.window().fully().withName(description));
}

module.exports = {
	APPLITOOLS_APP,
	getEyesConfig,
	getEyes,
	configureApplitoolsEyesSetupAndTeardown,
	useEyesToCheckWholePage,
};
