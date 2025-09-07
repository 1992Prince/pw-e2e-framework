import { test } from '@playwright/test';
import path from 'path';
import { setTestDataPath, getJsonArray } from '../utils/test-data-reader';


// set path synchronously at module load
const myPath = path.resolve(__dirname, '../data/login.json');
setTestDataPath(myPath);

const test1TestData = getJsonArray('Login_with_valid_credentials');
test1TestData.forEach((data, index) => {
    test(`Login with valid credentials ${index}`, async ({ page }) => {

        await page.goto('https://rahulshettyacademy.com/client/');
        await page.locator('#userEmail').fill(data.username);
        await page.locator('#userPassword').fill(data.password);
        await page.locator('#login').click();

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