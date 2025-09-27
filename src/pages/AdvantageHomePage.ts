import { Page, test } from '@playwright/test';
import { BasePage } from './BasePage';
import allLocators from '../resources/locators/advantageAppLocators.json';
import logger from '../loggers/LoggerUtil';

/**
 * Page Object for the Home Page of Advantage Application.
 *
 * ✅ Simple & clean template with steps in report:
 *  - Wrap actions in test.step for Playwright reports
 *  - Logs at start/end of each action
 *  - try/catch for error tracing
 *  - Re-throws errors so reports capture failures
 */
export class AdvantageHomePage extends BasePage {
    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    private appBaselocators = allLocators.HomePage;

    /**
     * Verify user is on Home Page by checking the logo visibility.
     */
    async isAt(): Promise<boolean> {
        return await test.step('Verify Home Page is displayed', async () => {
            logger.info('Verifying Home Page...');
            try {
                const visible = await this.page.locator(this.appBaselocators.logoTxt).isVisible();
                if (!visible) {
                    throw new Error('❌ Home Page logo not visible');
                }
                logger.info('✔️ User is at Home Page');
                return true;
            } catch (err: any) {
                logger.error(`❌ Failed verifying Home Page: ${err.message}`);
                throw err;
            }
        });
    }

    /**
     * Navigate to Register User page from Home.
     */
    async registerUser(): Promise<void> {
        await test.step('Navigate to Register User page', async () => {
            logger.info('Navigating to Register User page...');
            try {
                await this.click(this.appBaselocators.registerUserIcon);
                await this.click(this.appBaselocators.registerUser);
                logger.info('✔️ Register User navigation successful');
            } catch (err: any) {
                logger.error(`❌ Failed navigating to Register User page: ${err.message}`);
                throw err;
            }
        });
    }

    /**
     * Example for invalid element click (negative test scenario).
     */
    async negativeRegisterUserFlow(): Promise<void> {
        await test.step('Attempt navigation with invalid element (negative flow)', async () => {
            logger.info('Attempting Register User navigation with invalid element...');
            try {
                await this.page.waitForTimeout(5000); // wait for 2 seconds
                await this.click(this.appBaselocators.registerUserIcon);
                await this.click(this.appBaselocators.registerUserInvalidLoc); // invalid locator
                logger.info('✔️ Negative flow executed (invalid element clicked)');
            } catch (err: any) {
                logger.error(`❌ Failed navigating with invalid element: ${err.message}`);
                throw err;
            }
        });
    }
}

/**
✅ Best Practices Applied

    - isAt() returns boolean and logs both success/failure.
    - registerUserInvalidElement() left as is but wrapped in try/catch — useful for testing negative flows 
      (you can replace the second locator with an actually invalid one if needed).
    - Consistent logger usage (info for actions, error for failures).
    - Errors are re-thrown so Playwright reports capture them naturally.
 */