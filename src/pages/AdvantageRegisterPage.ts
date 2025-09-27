import { Page, test } from '@playwright/test';
import allLocators from '../resources/locators/advantageAppLocators.json';
import { AdvantageHomePage } from './AdvantageHomePage';
import logger from '../loggers/LoggerUtil';

// This page is reflection of ApplicationPage - where all common functionalities to all pages and locators are kept
export class AdvantageRegisterPage extends AdvantageHomePage {

    constructor(page: Page) {
        super(page);
    }

    private registerPagelocators = allLocators.RegisterPage;

    /**
     * Fill account details like username, email, and password.
     */
    async fillAccountDetails(username: string, email: string, password: string): Promise<void> {
        await test.step('Fill account details', async () => {
            logger.info('Filling account details...');
            try {
                await this.fill(this.registerPagelocators.usernameTxtBx, username);
                await this.fill(this.registerPagelocators.emailTxtBx, email);
                await this.fill(this.registerPagelocators.passTxtBx, password);
                await this.fill(this.registerPagelocators.confirmTxtBx, password);
                logger.info('✔️ Account details filled successfully');
            } catch (err: any) {
                logger.error(`❌ Failed to fill account details: ${err.message}`);
                throw err;
            }
        });
    }

    /**
     * Fill personal details like first name, last name and phone number.
     */
    async fillPersonalDetails(fname: string, lname: string, phoneno: string): Promise<void> {
        await test.step('Fill personal details', async () => {
            logger.info('Filling personal details...');
            try {
                await this.fill(this.registerPagelocators.fNameTxtBx, fname);
                await this.fill(this.registerPagelocators.LNameTxtBx, lname);
                await this.fill(this.registerPagelocators.phoneTxtBx, phoneno);
                logger.info('✔️ Personal details filled successfully');
            } catch (err: any) {
                logger.error(`❌ Failed to fill personal details: ${err.message}`);
                throw err;
            }
        });
    }

    /**
     * Fill address details and submit the registration form.
     */
    async fillAddressDetails(
        country: string,
        city: string,
        address: string,
        state: string,
        postalcode: string
    ): Promise<void> {
        await test.step('Fill address details & submit registration', async () => {
            logger.info('Filling address details & submitting form...');
            try {
                await this.page.locator(this.registerPagelocators.countryDrpDwn).selectOption(country);
                await this.fill(this.registerPagelocators.cityTxtBx, city);
                await this.fill(this.registerPagelocators.addressTxtBx, address);
                await this.fill(this.registerPagelocators.stateTxtBx, state);
                await this.fill(this.registerPagelocators.postalCode, postalcode || '244019');

                await this.click(this.registerPagelocators.iagreeChkbox);
                await this.click(this.registerPagelocators.registerBtn);

                // simple validation after registration
                await this.page.locator(this.registerPagelocators.homePageLogo).isVisible();

                logger.info('✔️ Registration completed successfully');
            } catch (err: any) {
                logger.error(`❌ Failed during registration: ${err.message}`);
                throw err;
            }
        });
    }
}


/**
✅ Best practices (team template)

    - Keep these as rules for all page objects:
    - Use logger at start/end of every action.
    - Wrap in try/catch → log error and rethrow (so report shows failure trace).
    - No assertions inside page object (except basic visibility checks). Assertions belong in tests.
    - Use defaults for non-critical fields (like I did for address).
    - Don’t log sensitive data (mask passwords/emails if needed).
    - Keep page object methods short and descriptive — one method = one user action.
    - Add clear JSDoc so new members know what each method does.
    - Use base class for common things (isAt(), click(), fill() etc.).
 */

/**
Doubt: 
bhai yeh bata na, in each page object method in catch block u did log(err) and throw err, isse kya hoga?

In your page object methods you’re doing this pattern:

    try {
    // do action
    } catch (err: any) {
    logger.error(`❌ Failed ...: ${err.message}`);
    throw err;   // <--- this is key
    }

What happens here?

    If action succeeds →
    It runs normally, logs success (logger.info(...)), test continues.

    If action fails (e.g. locator not found, timeout, etc.) →
    catch block runs.
    You log the error with a friendly/custom message (❌ Failed ...).
    Then you throw err again.

Why rethrow?
    If you only log and don’t rethrow → Playwright thinks the step passed. The test won’t fail, even though 
    something went wrong. ❌
    By rethrowing → the error bubbles up to Playwright test runner. So test is marked FAILED and full error trace 
    (locator info, stacktrace, timeout details) is visible in the HTML report. ✅

Result in report
    You’ll see both:
        Your custom error message in logs (logger.error...)
        Playwright’s native error trace in report (with locator details, stack, etc.).

Example
Suppose in fillAccountDetails the email textbox locator is wrong.
Without throw err:
You’d only see your error log: ❌ Failed to fill account details: Timeout 20s
Test would not fail (dangerous).
With throw err:
You still see your log.
Plus Playwright fails the test, showing step name, locator trace, line numbers in the report.


👉 So basically:
Log = for humans, nice readable context.
Throw = for Playwright, to mark test as failed and show full debug info.
 */