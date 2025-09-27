import { test, expect } from '@playwright/test';

test('GET /users validations', async ({ request }) => {
    const start = Date.now();

    // 1) Perform GET request
    const response = await request.get('https://fakestoreapi.com/users', {
        headers: { 'Accept': 'application/json' }
    });

    const durationMs = Date.now() - start;

    // 2) Status code validation
    expect(response.status()).toBe(200);

    // 3) Response time validation (< 2000 ms is acceptable)
    expect(durationMs).toBeLessThan(2000);

    // 4) Header validation
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('application/json');

    // 5) Parse response body
    const body = await response.json();

    // 6) Response type validation → Array or Object
    expect(Array.isArray(body)).toBeTruthy(); // check if returned resp is array or not
    if (Array.isArray(body)) {
        expect(body.length).toBeGreaterThan(0); // must have at least 1 user

        // Pick first user for validation
        const user = body[0];

        // 7) Field existence + value validation
        expect(user).toHaveProperty('id', 1);               // exact value
        expect(user).toHaveProperty('email', 'john@gmail.com');
        expect(user).toHaveProperty('username', 'johnd');
        expect(user).toHaveProperty('password');            // exists
        expect(user.password.length).toBeGreaterThan(5);    // value check

        expect(user.name).toHaveProperty('firstname', 'john');
        expect(user.name).toHaveProperty('lastname', 'doe');

        expect(user).toHaveProperty('phone');
        expect(user.phone).toMatch(/^\d|^\d-/);             // simple regex check

        // 5. when you only wants to validate property exists in reponse payload without its values
        const user2 = body[0];
        expect(user2).toHaveProperty('id');
        expect(user2).toHaveProperty('email');
        expect(user2).toHaveProperty('username');
        expect(user2).toHaveProperty('password');
        expect(user2.name).toHaveProperty('firstname');
        expect(user2.name).toHaveProperty('lastname');
        expect(user2).toHaveProperty('phone');

    } else if (typeof body === 'object') {
        // if response is single object instead of array
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('number');
    } else {
        throw new Error('Unexpected response type: not array or object');
    }

    console.log();
    console.log("****************Headers print**************************")
    console.log();
    // print all headers via iteratiing and specific headers
    console.log('saare headers as object')
    console.log(await response.headers()); // saare headers as object
    console.log();
    console.log('via iteration');
    for (const h of await response.headersArray()) {
        console.log(h.name, h.value); // ek-ek header print
    }
    console.log();
    console.log("print specific header");
    console.log(response.headers()['content-type']); // specific header

});

const BASE = 'https://fakestoreapi.com';

test('Negative - wrong endpoint with invalid param should return error body', async ({ request }) => {
    const response = await request.get(`${BASE}/users/swrs`);

    // 1) Status code (generally 400 or 404) → yaha fakestore returns 400
    expect([400, 404]).toContain(response.status());

    // 2) Parse body
    const body = await response.json();

    // 3) Validate error structure
    expect(body).toHaveProperty('status', 'error');
    expect(body).toHaveProperty('message', 'user id should be provided');

    // 4) Negative assurance: body must not be empty
    expect(Object.keys(body).length).toBeGreaterThan(0);


});