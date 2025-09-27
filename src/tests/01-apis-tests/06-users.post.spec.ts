// users.post.spec.ts
import { test, expect, APIRequestContext } from '@playwright/test';

const BASE = 'https://fakestoreapi.com/users';
const MAX_RESPONSE_TIME_MS = 3000;

// helper: post user
async function postUser(request: APIRequestContext, payload: any) {
    const start = Date.now();
    const res = await request.post(BASE, {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(payload),
    });
    const duration = Date.now() - start;
    return { res, duration };
}

// helper: check plain object (not array)
function isPlainObjectNotArray(x: any) {
    return x !== null && typeof x === 'object' && !Array.isArray(x);
}

/**
 * Tests: Positive + Negative scenarios for POST /users
 *
 * Note (interview tip - hinglish):
 * - Har test me status, headers, body type aur response time check karo.
 * - json() parsed object deta hai; body() raw Buffer deta hai.
 * - API ki real behaviour variable ho sakti hai — agar actual API 400/201 behaviour different ho,
 *   assertions ko production ke hisaab se adjust kar lena.
 */

test.describe('Users API - POST /users', () => {
    test('Create user - positive case (201) and validate response schema', async ({ request }) => {
        // payload - valid
        const payload = {
            username: 'john_doe_' + Date.now(), // unique-ish
            email: `john_${Date.now()}@example.com`,
            password: 'pass123',
        };

        const { res, duration } = await postUser(request, payload);

        // Basic status + ok check
        // (expected 201 per API spec)
        expect(res.status()).toBe(201);
        expect(res.ok()).toBe(true);

        // Response time check
        expect(duration).toBeLessThan(MAX_RESPONSE_TIME_MS);

        // Headers checks
        const headersObj = await res.headers(); // lower-cased keys
        expect(headersObj['content-type']).toBeTruthy();
        expect(headersObj['content-type']).toContain('application/json');

        // Iterate and print headers (demo purpose)
        const headersArr = await res.headersArray();
        for (const h of headersArr) {
            // interview-friendly: print each header
            console.log('Header:', h.name, '=', h.value);
        }

        // Body checks: json() vs body()
        const bodyParsed = await res.json(); // parsed JS object
        // raw bytes (optional)
        const raw = await res.body(); // Buffer

        // Schema validation (basic)
        expect(isPlainObjectNotArray(bodyParsed)).toBeTruthy();
        expect(typeof bodyParsed.id).toBe('number');           // id integer


        // log useful info
        console.log('created id:', bodyParsed.id, 'time(ms):', duration);
    });

    test.skip('Negative: missing username -> expect 400 (Bad Request)', async ({ request }) => {
        const payload = {
            // username missing or mandatory fields missing - validate errors specifice in api doc with status code
            email: `no_user_${Date.now()}@example.com`,
            password: 'pass123',

        };

        const { res, duration } = await postUser(request, payload);

        // Many real APIs return 400 for missing required fields.
        // If API returns something else, update expected behaviour accordingly.
        expect(res.status()).toBe(400);

        // response should not be successful
        expect(res.ok()).toBe(false);

        // try parse JSON (if provided) for error message
        const ct = (await res.headers())['content-type'] || '';
        if (ct.includes('application/json')) {
            const body = await res.json();
            console.log('error body:', body);
        } else {
            const text = await res.text();
            console.log('error text:', text);
        }

        expect(duration).toBeLessThan(MAX_RESPONSE_TIME_MS);
    });

    test.skip('Negative: invalid email format -> expect 400', async ({ request }) => {
        const payload = {
            username: 'bad_email_' + Date.now(),
            email: 'not-an-email',
            password: 'pass123',
        };

        const { res } = await postUser(request, payload);
        expect(res.status()).toBe(400);
        expect(res.ok()).toBe(false);
    });

    test.skip('Negative: empty / too short password -> expect 400', async ({ request }) => {
        const payload = {
            username: 'short_pwd_' + Date.now(),
            email: `shortpwd_${Date.now()}@example.com`,
            password: '', // invalid
        };

        const { res } = await postUser(request, payload);
        expect(res.status()).toBe(400);
        expect(res.ok()).toBe(false);
    });

    test.skip('Duplicate username - handle both possible outcomes (201 or 409/400) gracefully', async ({ request }) => {
        const baseName = 'dup_user_' + Date.now();
        const payload = {
            username: baseName,
            email: `dup_${Date.now()}@example.com`,
            password: 'pass123',
        };

        // first create
        const first = await postUser(request, payload);
        expect([201, 200]).toContain(first.res.status()); // allow 200/201 depending on API

        // second create with same username
        const second = await postUser(request, payload);

        // Server could respond:
        // - 201 (idempotent creation or different id),
        // - 409 Conflict,
        // - 400 Bad Request
        // We assert that the API does not return 500 or other unexpected server error.
        expect([201, 200, 400, 409]).toContain(second.res.status());
        if (second.res.status() >= 500) {
            // fail loudly on server errors
            throw new Error('Server error on duplicate attempt: ' + second.res.status());
        }
    });

    test('Negative: payload not JSON (text) -> expect 400', async ({ request }) => {
        const start = Date.now();
        const res = await request.post(BASE, {
            headers: { 'Content-Type': 'application/json' },
            data: 'this is not json',
        });
        const duration = Date.now() - start;

        // should be bad request
        expect(res.status()).toBe(400);
        expect(res.ok()).toBe(false);
        expect(duration).toBeLessThan(MAX_RESPONSE_TIME_MS);
    });
});
