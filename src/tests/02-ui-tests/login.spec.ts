import { test } from '@playwright/test';
import path from 'path';
import { setTestDataPath, getJsonArray } from '../../utils/test-data-reader';
import logger from '../../loggers/LoggerUtil';


// set path synchronously at module load
const myPath = path.resolve(__dirname, '../../resources/data/login.json');
setTestDataPath(myPath);

const test1TestData = getJsonArray('Login_with_valid_credentials');
test1TestData.forEach((data, index) => {
    test(`Login with valid credentials ${index}`, async ({ page }) => {
        logger.info("------------ Login with valid credentials execution begins ------------------")
        logger.info("Login with valid credentials - Opening url - https://rahulshettyacademy.com/client/")
        await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('#userEmail').fill(data.username);
        logger.info("Login with valid credentials - entered password")
        await page.locator('#userPassword').fill(data.password);
        logger.info("Login with valid credentials - clicked")
        await page.locator('#login').click();
        logger.info("------------ Login with valid credentials execution completed ------------------")

    });
});


const test2TestData = getJsonArray('Login_with_invalid_credentials');
test2TestData.forEach((data, index) => {
    test('Login with invalid credentials ${index}', async ({ page }) => {

        await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('#userEmail').fill(data.username);
        await page.locator('#userPassword').fill(data.password);
        await page.locator('#login').click();

    });
});