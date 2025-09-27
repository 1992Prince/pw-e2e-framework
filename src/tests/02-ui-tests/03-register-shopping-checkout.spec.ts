import logger from '../../loggers/LoggerUtil';
import { test } from '../../utils/test-fixture';
import path from 'path';
import { setTestDataPath, getJsonArray } from '../../utils/test-data-reader';
import { commonConfig } from '../../config/common-config';
//import { AdvantageHomePage } from '../../pages/AdvantageHomePage';


// in beforeEach we can check is application correct page is opened before we start execution test
test.beforeEach(async ({ pm }) => {

    // below validation will make sure that application is in correct page wch is homepage here
    pm.advantageHomePage.isAt();
});

// set path synchronously at module load
const myPath = path.resolve(__dirname, '../../resources/data/advantageAppTestData.json');
setTestDataPath(myPath);


const test1TestData = getJsonArray('Validate_User_Registration');

test1TestData.forEach((data, index) => {
    test('Validate_User_Registration', async ({ pm }, testInfo) => {
        logger.info("Test Started : Validate User Registration");

        // fetch env details and printing it
        const env = testInfo.config.metadata.customEnv;
        console.log("URL - ", env.baseURL);
        console.log("Username - ", env.username);
        console.log("Password - ", env.password);

        console.log();
        // fetching common config variables
        console.log("APPLICATION :", commonConfig.APPLICATION);
        console.log("Release no :", commonConfig.RELEASE_NO);

        await pm.advantageHomePage.registerUser();

        await pm.advantageRegisterPage.fillAccountDetails(data.username, data.email, data.password);
        await pm.advantageRegisterPage.fillPersonalDetails(data.fname, data.lname, data.phoneno);
        await pm.advantageRegisterPage.fillAddressDetails(data.country, data.city, data.city,
            data.state, data.postalcode);
        logger.info("------------Test Completed : Validate User Registration------------------")
    });
});

test1TestData.forEach((data, index) => {
    test('Validate_User_Registration_Failed_Test', async ({ pm }, testInfo) => {

        // fetch env details and printing it
        const env = testInfo.config.metadata.customEnv;
        console.log("URL - ", env.baseURL);
        console.log("Username - ", env.username);
        console.log("Password - ", env.password);

        console.log();
        // fetching common config variables
        console.log("APPLICATION :", commonConfig.APPLICATION);
        console.log("Release no :", commonConfig.RELEASE_NO);


        logger.info("Test Started : Validate User Registration");
        await pm.advantageHomePage.negativeRegisterUserFlow();

        await pm.advantageRegisterPage.fillAccountDetails(data.username, data.email, data.password);
        await pm.advantageRegisterPage.fillPersonalDetails(data.fname, data.lname, data.phoneno);
        await pm.advantageRegisterPage.fillAddressDetails(data.country, data.city, data.city,
            data.state, data.postalcode);
        logger.info("------------Test Completed : Validate User Registration------------------")
    });
});






