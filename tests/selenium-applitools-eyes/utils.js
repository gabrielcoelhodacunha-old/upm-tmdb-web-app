const {
	Eyes,
	Configuration,
	ClassicRunner,
	RectangleSize,
	BatchInfo,
	Target,
} = require('@applitools/eyes-selenium');
const { getDriver, SCREEN } = require('../selenium/utils');

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
			expect.getState().currentTestName,
			new RectangleSize(SCREEN.WIDTH, SCREEN.HEIGHT)
		);
	});

	afterEach(async () => {
		await eyes.closeAsync();
	});

	afterAll(async () => {
		// await runner.getAllTestResults();
	});
}

async function setBatchInfoForPage(page) {
	await getEyesConfig().setBatch(new BatchInfo(`${APPLITOOLS_APP} @ ${page}`));
}

async function checkPage(
	page,
	description = null,
	ignoreDisplacementsVal = false
) {
	await getEyes().check(
		getTargetWindow(page, description, ignoreDisplacementsVal)
	);
}

function getTargetWindow(page, description, ignoreDisplacementsVal) {
	return Target.window()
		.withName(getCheckpointName(page, description))
		.ignoreDisplacements(ignoreDisplacementsVal);
}

function getCheckpointName(page, description) {
	return `Página ${page}${description ? `: ${description}` : ''}`;
}

module.exports = {
	getEyesConfig,
	getEyes,
	configureApplitoolsEyesSetupAndTeardown,
	setBatchInfoForPage,
	checkPage,
	getTargetWindow,
};
