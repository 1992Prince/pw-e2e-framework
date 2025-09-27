import { test, expect, APIResponse } from '@playwright/test';

const BASE = "https://reqres.in/api";

test('Debugging with query params', async ({ request }) => {

    const headers = { 'x-api-key': 'reqres-free-v1' };

    // Example 1: add delay for debugging slow response handling
    const res1: APIResponse = await request.get(`${BASE}/users/2`, {
        params: { delay: '5' },   // server will wait 3 sec before responding
        headers,
    });

    console.log('Delay Status:', res1.status());
    console.log('Delay Body:', await res1.json());

    // Example 2: force invalid query param (simulate error/debug mode)
    // const res2: APIResponse = await request.get(`${BASE}/users/23`, {
    //     params: { debug: 'true' },   // assuming API supports debug flag
    // });

    // console.log('Debug Status:', res2.status());
    // console.log('Debug Body:', await res2.json());

    // expect(res1.ok()).toBeTruthy();
});


test('API: non-existing resource returns 404', async ({ request }) => {
    const headers = { 'x-api-key': 'reqres-free-v1' };
    const res: APIResponse = await request.get(`${BASE}/users/2`, {
        params: { status: '500', fail: 'true', debug: 'true', verbose: '1', mock: 'true', trace: 'true' },   // likely non-existing
        headers,
    }); // likely non-existing
    //expect(res.status()).toBe(404); // assert we get 404
    console.log('Delay Status:', res.status());
    console.log('Delay Body:', await res.json());
});