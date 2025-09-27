// utils/test-base.ts
import { test as baseTest, expect as baseExpect, TestInfo } from '@playwright/test';
import logger from '../loggers/LoggerUtil';
import { PageManager } from '../pages/PageManager';



// extend test with a new fixture `pm` (PageManager)
type Fixtures = {
    pm: PageManager;
    //config: typeof config;
};

export const test = baseTest.extend<Fixtures>({
    pm: async ({ page }, use, testInfo) => {

        // envConfig utha lo metadata se
        const env = testInfo.config.metadata.customEnv;

        // create PageManager and perform the common navigation/setup
        const pm = new PageManager(page);
        logger.info('BaseTest - Navigating to home page (fixture)');
        //await pm.homePage.navigateToHomePage(config.baseURL);
        await pm.homePage.navigateToHomePage(env.baseURL);

        // give fixture to the test
        await use(pm);

        // (optional) cleanup after test if PageManager has cleanup
        // await pm.dispose?.();
    },
    // config: async ({ }, use) => {
    //     await use(config);
    // }
});

// Hook to run after each test to log failures & attachments
test.afterEach(async ({ }, testInfo: TestInfo) => {
    if (testInfo.status === 'failed') {
        logger.error(`Test failed: ${testInfo.title}`);
        logger.error(`File: ${testInfo.file} | Line: ${testInfo.line}`);
        logger.error(`Duration(ms): ${testInfo.duration}`);

        const err = testInfo.error;
        if (err) {
            logger.error('Error message: ' + (err.message ?? String(err)));
            if ((err as any).stack) {
                logger.error('Stack trace:\n' + (err as any).stack);
            }
            const { name, ...rest } = err as any;
            const extra = Object.keys(rest).length ? `Extra error fields: ${JSON.stringify(rest, null, 2)}` : '';
            if (extra) logger.debug(extra);
        } else {
            logger.error('No `testInfo.error` object available from Playwright.');
        }

        if (testInfo.attachments && testInfo.attachments.length) {
            logger.debug(`Attachments for failed test (${testInfo.attachments.length}):`);
            for (const a of testInfo.attachments) {
                logger.debug(` - ${a.name} | contentType: ${a.contentType} | path: ${a.path ?? '<inline>'}`);
            }
        } else {
            logger.debug('No attachments recorded for this failed test.');
        }

        logger.debug(`Test Worker: ${testInfo.workerIndex} | Project: ${testInfo.project?.name ?? 'unknown'}`);
        logger.debug(`Current date/time: ${new Date().toISOString()}`);
    }
});

export const expect = baseExpect;
