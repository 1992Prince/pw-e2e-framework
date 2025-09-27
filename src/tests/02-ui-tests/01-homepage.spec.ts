import logger from '../../loggers/LoggerUtil'
import { test } from '../../utils/test-fixture'
import { commonConfig } from '../../config/common-config'

//import { config } from '../config/config'; // accessing config values in test
// in beforeEach we can check is application correct page is opened before we start execution test
test.beforeEach(async ({ pm }) => {

    // below 3 properties are coming from config file and can be set via command line also
    // logger.info("Opened url is : ", config.baseURL);
    // logger.info("UserEmail is : ", config.userEmail);
    // logger.info("Password is : ", config.userPassword);

    // below details are captured from common-config
    logger.info("App name is : ", commonConfig.APPLICATION);
    logger.info("Build no is : ", commonConfig.BUILD_NO);

    // below validation will make sure that application is in correct page wch is homepage here
    pm.carBase.isAt();
});

test('Validate Search New Car Functionality', async ({ pm }) => {
    logger.info("Test Started : Validate Search New Car Functionality");
    await pm.carBase.searchCar();
    logger.info("------------Test Completed : Validate Search New Car Functionality------------------")
});

// this test must be at the last
test('Validate Find Location Functionality', async ({ pm }) => {
    logger.info("Test Started : Validate Find Location Functionality");
    await pm.carBase.findLocation();
    logger.info("------------Test Started : Validate Find Location Functionality------------------")
});

