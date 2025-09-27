// 1) Quick single-param example (using params)
import { test, expect, APIResponse } from '@playwright/test';

const BASE = 'https://reqres.in';
const ENDPOINT = '/api/users';
const USERID = 2;

// Example: Path Param with Playwright
// Suppose endpoint hai: GET /users/{id} → e.g. https://reqres.in/api/users/2
test('GET single path param using params option', async ({ request }) => {
    const headers = { 'x-api-key': 'reqres-free-v1' };

    // Playwright supports a 'params' option
    const res: APIResponse = await request.get(`${BASE}${ENDPOINT}/${USERID}`, {
        headers,
    });

    console.log('Status:', res.status());
    const body = await res.json();
    console.log('Response body:', JSON.stringify(body, null, 2));

    expect(res.ok()).toBeTruthy();
});

// Playwright me path param aur query param ek sath pass karne ka tarika simple hai:
// Example: Path + Query Param together
// Suppose API endpoint hai: GET /users/{id}?delay=3
// Matlab → https://reqres.in/api/users/2?delay=3
// delay=5 Matlab: server 5 seconds ka delay karega response bhejne se pehle.

test('GET path + query param together', async ({ request }) => {
    const headers = { 'x-api-key': 'reqres-free-v1' };

    const userId = 2; // path param
    const res: APIResponse = await request.get(`${BASE}${ENDPOINT}/${userId}`, {
        headers,
        params: { delay: '5' },   // query param
    });

    console.log('Status:', res.status());
    const body = await res.json();
    console.log('Response body:', JSON.stringify(body, null, 2));

    expect(res.ok()).toBeTruthy();
    expect(body.data.id).toBe(userId);
});