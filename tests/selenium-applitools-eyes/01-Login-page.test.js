'use strict'

const { Builder, By } = require('selenium-webdriver');
const { Eyes, 
    ClassicRunner, 
    Target, 
    RectangleSize, 
    Configuration, 
    BatchInfo } = require('@applitools/eyes-selenium');

const SCREEN_WIDTH = 1366
const SCREEN_HEIGHT = 768

describe('Login page', () => {
    // Test control inputs to read once and share for all tests
    var applitoolsApiKey;
    var headless;

    // Applitools objects to share for all tests
    let batch;
    let config;
    let runner;
    
    // Test-specific objects
    let driver;
    let eyes;
    
    beforeAll(async () => {
        // This method sets up the configuration for running visual tests locally using the classic runner.
        // The configuration is shared by all tests in a test suite, so it belongs in a `before` method.
        // If you have more than one test class, then you should abstract this configuration to avoid duplication. 


        // Read the Applitools API key from an environment variable.
        // To find your Applitools API key:
        // https://applitools.com/tutorials/getting-started/setting-up-your-environment.html
        applitoolsApiKey = process.env.APPLITOOLS_API_KEY;

        // Read the headless mode setting from an environment variable.
        // Use headless mode for Continuous Integration (CI) execution.
        // Use headed mode for local development.
        headless = process.env.HEADLESS? ['headless'] : []

        // Create the classic runner.
        runner = new ClassicRunner();

        // Create a new batch for tests.
        // A batch is the collection of visual checkpoints for a test suite.
        // Batches are displayed in the Eyes Test Manager, so use meaningful names.
        batch = new BatchInfo('TMDB Web App: login page');

        // Create a configuration for Applitools Eyes.
        config = new Configuration();
        
        // Set the Applitools API key so test results are uploaded to your account.
        // If you don't explicitly set the API key with this call,
        // then the SDK will automatically read the `APPLITOOLS_API_KEY` environment variable to fetch it.
        config.setApiKey(applitoolsApiKey);

        // Set the batch for the config.
        config.setBatch(batch);

        //This method sets up each test with its own ChromeDriver and Applitools Eyes objects.
       
        // Open the browser with the ChromeDriver instance.
        driver = new Builder()
        .withCapabilities({
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: headless,
            },
        })
        .build()
        
        // Set an implicit wait of 10 seconds.
        // For larger projects, use explicit waits for better control.
        // https://www.selenium.dev/documentation/webdriver/waits/
        // The following call works for Selenium 4:
        await driver.manage().setTimeouts( { implicit: 10000 } );
        
        await driver.manage().window().maximize()
    });
    
    beforeEach(async function() {
        //This method sets up each test with its own ChromeDriver and Applitools Eyes objects.
        // Create the Applitools Eyes object connected to the ClassicRunner and set its configuration.
        eyes = new Eyes(runner);
        eyes.setConfiguration(config);

        // Open Eyes to start visual testing.
        // It is a recommended practice to set all four inputs:
        // await eyes.open(
            
        //     // WebDriver object to "watch".
        //     driver,
            
        //     // The name of the application under test.
        //     // All tests for the same app should share the same app name.
        //     // Set this name wisely: Applitools features rely on a shared app name across tests.
        //     'TMDB Web App',
            
        //     // The name of the test case for the given application.
        //     // Additional unique characteristics of the test may also be specified as part of the test name,
        //     // such as localization information ("Home Page - EN") or different user permissions ("Login by admin"). 
        //     expect.getState().currentTestName,
            
        //     // The viewport size for the local browser.
        //     // Eyes will resize the web browser to match the requested viewport size.
        //     // This parameter is optional but encouraged in order to produce consistent results.
            // new RectangleSize(SCREEN_WIDTH, SCREEN_HEIGHT)
        // );
    })

    describe()

    test('should log in', async () => {
        // This test covers login for the Applitools demo site, which is a dummy banking app.
        // The interactions use typical Selenium calls,
        // but the verifications use one-line snapshot calls with Applitools Eyes.
        // If the page ever changes, then Applitools will detect the changes and highlight them in the Eyes Test Manager.
        // Traditional assertions that scrape the page for text values are not needed here.

        // Load the login page.
        await driver.get("http://localhost:3000");

        await driver.findElement(By.id("username")).sendKeys(process.env.TMDB_USERNAME);
        await driver.findElement(By.id("password")).sendKeys(process.env.TMDB_PASSWORD);
        await driver.findElement(By.id("apiKey")).sendKeys(process.env.TMDB_API_KEY);
        await driver.findElement(By.id("logIn")).click()
        

        // // Verify the full login page loaded correctly.
        // await eyes.check(Target.window().fully().withName("Login page"));

        // // Perform login.
        // await driver.findElement(By.css("#username")).sendKeys("andy");
        // await driver.findElement(By.css("#password")).sendKeys("i<3pandas");
        // await driver.findElement(By.id("log-in")).click();

        // // Verify the full main page loaded correctly.
        // // This snapshot uses LAYOUT match level to avoid differences in closing time text.
        // await eyes.check(Target.window().fully().withName("Main page").layout());
    }, 120000);
    
    afterEach(async function() {

        // Close Eyes to tell the server it should display the results.
        // await eyes.closeAsync();

        await driver.findElement(By.id("logOut")).click()
        // Quit the WebDriver instance.
        // await driver.quit();

        // Warning: `eyes.closeAsync()` will NOT wait for visual checkpoints to complete.
        // You will need to check the Eyes Test Manager for visual results per checkpoint.
        // Note that "unresolved" and "failed" visual checkpoints will not cause the Mocha test to fail.

        // If you want the ACME demo app test to wait synchronously for all checkpoints to complete, then use `eyes.close()`.
        // If any checkpoints are unresolved or failed, then `eyes.close()` will make the ACME demo app test fail.
    
    });
    
    afterAll(async () => {
        // Close the batch and report visual differences to the console.
        // Note that it forces Mocha to wait synchronously for all visual checkpoints to complete.
        const allTestResults = await runner.getAllTestResults();
        console.log(allTestResults);
    });
})