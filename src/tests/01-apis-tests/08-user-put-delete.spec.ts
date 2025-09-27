// tests/api/put-user-update.spec.ts
import { test, expect } from '@playwright/test';


test('Update specific user with PUT and validate response', async ({ request }) => {
    const baseURL = 'https://fakestoreapi.com';
    const path = '/users/1';

    // request payload
    const payload = {
        username: "john_doe_updated",
        email: "john.updated@example.com"
    };

    // headers
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    // send PUT request
    const resp = await request.put(`${baseURL}${path}`, {
        headers,
        data: payload
    });

    // --- basic validations ---
    expect(resp.status()).toBe(200); // successful update
    expect(resp.headers()['content-type']).toContain('application/json');

    // parse response JSON
    const body = await resp.json();

    // validate updated fields
    expect(body.username).toBe(payload.username);
    expect(body.email).toBe(payload.email);

    // extra safety checks
    expect(body.username).toMatch(/^john_doe/);
    expect(body.email).toContain('@');
});

/**
If and hardcoding headers and payload directly then req looks like below :
const resp = await request.put('https://fakestoreapi.com/users/1', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    data: {
      username: "john_doe_updated",
      email: "john.updated@example.com"
    }
  });
 */

// Delete a specific user by ID.

test('Delete a user', async ({ request }) => {
    // define baseURL locally inside the test (as you asked)
    const baseURL = 'https://fakestoreapi.com';

    // optional headers example: Accept & Authorization (show both)
    // If no auth is required, you can omit Authorization
    const headers = {
        'Accept': 'application/json',
        // 'Authorization': 'Bearer <token>', // uncomment if API needs auth
        'X-Client-Name': 'playwright-test' // custom header example
    };

    // path for specific user (id = 1)
    const path = '/users/1';

    // perform request with headers
    const resp = await request.delete(`${baseURL}${path}`, { headers });

    // --- validations: status & headers ---
    expect(resp.status()).toBe(200); // assert OK
    expect(resp.headers()['content-type']).toContain('application/json');

    // --- parse JSON safely ---
    const body = await resp.json();
    console.log("body: ", body);
});
