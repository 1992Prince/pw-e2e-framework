import { test, expect, APIResponse } from '@playwright/test';

const BASE = 'https://demo.playwright.dev/';
const ENDPOINT = '/api-mocking/';

/*
when url is hit then in network tab you can see the request : 
https://demo.playwright.dev/api-mocking/api/v1/fruits is hit and we will mock it with StrawberryAlbania fruit
and doesn't let server to send response.

under network tab go to Response tab and you can see the JSON payload and like that
we need to create our mock response payload.

Here we are only mocking response payload but u can also mock headers and status code as well.

Now when u run the code u will see StrawberryAlbania fruit in the UI instead of Strawberry fruit.
and make sure to put assert on this text else, sometimes UI loads old cached response and 
u will not be able to see the mocked fruit in the UI.

You can see from the trace of the example test that the API was never called, 
it was however fulfilled with the mock data.
*/
test("mocks a fruit and doesn't call api", async ({ page }) => {

    // Mock the api call before navigating
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'StrawberryAlbania', id: 21 }];
        await route.fulfill({ json });
    });

    // Go to the page
    await page.goto(`${BASE}${ENDPOINT}`);

    // Assert that the Strawberry fruit is visible
    await expect(page.getByText('Strawberry')).toBeVisible();
});


test('Modify API Resp: gets the json from api and adds a new fruit', async ({ page }) => {

    // Get the response and add to it
    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        //json.push({ name: 'Lioness', id: 100 });

        // Add new item at the beginning instead of end
        json.unshift({ name: 'Lioness', id: 100 });

        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json });
    });

    // Go to the page
    await page.goto(`${BASE}${ENDPOINT}`);

    // Assert that the new fruit is visible
    await expect(page.getByText('Lioness', { exact: true })).toBeVisible();
});