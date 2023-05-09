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
// Permite utilizacao de mesma instancia em outros arquivos
const getEyesConfig = () => eyesConfig;
const getEyes = () => eyes;

/**
 * @summary Configura passos anteriores e posteriores dos testes com Applitools Eyes
 */
function configureApplitoolsEyesSetupAndTeardown() {
	let runner;
	// Antes de todos os testes
	beforeAll(async () => {
		// Cria instancia de configuracao
		eyesConfig = new Configuration();
		// Carrega a chave da API das variaveis de ambiente
		eyesConfig.setApiKey(process.env.APPLITOOLS_API_KEY);
		// Cria instancia para gerenciar os testes localmente
		runner = new ClassicRunner();
	});
	// Antes de cada teste
	beforeEach(async () => {
		// Cria instancia do Eyes, que realiza as comparacoes
		eyes = new Eyes(runner);
		// Define que a instancia Eyes utilize a configuracao atual
		eyes.setConfiguration(eyesConfig);
		await eyes.open(
			// Objeto driver a ser observado
			getDriver(),
			// Nome da aplicacao a ser testada
			APPLITOOLS_APP,
			// Nome do teste atual
			expect.getState().currentTestName,
			// Resolucao a ser testada de 1024x768
			new RectangleSize(SCREEN.WIDTH, SCREEN.HEIGHT)
		);
	});
	// Apos cada teste
	afterEach(async () => {
		// Fecha instancia do Eyes para que os testes fiquem disponiveis no painel da Applitools
		await eyes.closeAsync();
	});
	// Apos todos os testes
	afterAll(async () => {
		// Recupera todos os resultados dos testes
		await runner.getAllTestResults();
	});
}

/**
 * @summary Define a qual conjunto de testes o teste atual pertence de acordo com a pagina 'page'
 * @param {string} page
 */
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
