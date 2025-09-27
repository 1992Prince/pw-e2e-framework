import { test, expect, request } from '@playwright/test';

// form: {} option → automatically sends body as application/x-www-form-urlencoded.
// Agar form use karoge to Content-Type header set karna zaroori nahi, Playwright khud laga dega.
// json: {} → send karta hai as application/json.
test('POST with form params - replicate RestAssured', async ({ }) => {
    // Request context create karna (base URL ke sath)
    const apiContext = await request.newContext({
        baseURL: 'https://reqres.in/api',
        extraHTTPHeaders: {
            'x-api-key': 'reqres-free-v1',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    // POST call with form data
    const response = await apiContext.post('/users', {
        form: {
            name: 'John Doe',
            job: 'Developer'
        }
    });

    // Assertions
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(responseBody.name).toBe('John Doe');
    expect(responseBody.job).toBe('Developer');

    await apiContext.dispose();
});
