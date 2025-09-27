import { chromium, test, expect, Browser, BrowserContext, Page } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.beforeAll(async ({ }) => {

    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Go to app and login
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator('#userEmail').fill('amrita101@mail.com');
    await page.locator('#userPassword').fill('root');
    await page.locator('#login').click();
    await expect(page.locator('//p[contains(text(),"Automation Practice")]')).toBeVisible();
});

test.beforeEach(async () => {
    // here we need to make sure application is in that state so that all test can be resumed
    // since this will be executed before each test 

    //here we need to check if this element is not available on page i.e. - //*[@id='products']
    // then click on this element //*[contains(text(),' HOME ')] wch is at the top on all page so that
    // you will again come to home page of application

    // or refresh or reopen the url so that u come to same Home page 

    // I will go with first approach

    const bool = await page.locator('//*[@id="products"]').isVisible()
    if (!bool) {
        await page.locator('//*[contains(text()," HOME ")]').click();
    }

});


test.afterAll(async () => {
    await page.locator('//*[contains(text()," Sign Out ")]').click();
    expect(await page.locator('//h1[@class="login-title"]')).toHaveText('Log in');
    await context.close();
    await browser.close();
});

test('Test 1 - Validating Laptop Product', async () => {
    await page.locator('//*[contains(text()," View")]').first().click();
    await expect(page.locator('//*[contains(text(),"product details")]')).toBeVisible();
});

test('Test 2 - Validating Zara Coat', async () => {
    await page.locator('//*[contains(text()," View")]').nth(1).click();
    await expect(page.locator('//*[contains(text(),"product details")]')).toBeVisible();
});


