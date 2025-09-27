import { test as base, expect } from '@playwright/test';
import { RequestHandler } from './request-handler';
import { APILogger } from '../loggers/apiLogger';


/**
 * RequestHandler class have all the methods to make api calls
 * We don't want to let developer to create instance of RequestHandler class for everytest
 * So we will create a test fixture which will create instance of RequestHandler class and 
 * it is responsibility of test fixture to provide that instance to the test
 * api is that fixture which will provide instance of RequestHandler class to the test
 * 
 * APILogger class obj will also be provided from this fixture
 */

type TestOptions = {
    api: RequestHandler;
};

export const test = base.extend<TestOptions>({
    api: async ({ request }, use, testInfo) => {

        // envConfig utha lo metadata se
        const env = testInfo.config.metadata.customEnv;

        // request fixture is coming from Playwright
        //const baseUrl = env.baseConduitURL || 'https://conduit-api.dummy.com/api';
        const baseUrl = 'https://conduit-api.bondaracademy.com/api';

        const apiLogger = new APILogger();
        const requestHandler = new RequestHandler(request, apiLogger, baseUrl);
        await use(requestHandler);
    }
});
