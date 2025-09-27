// 1) Quick single-param example (using params)
import { test, expect, APIResponse } from '@playwright/test';

const BASE = 'https://reqres.in';
const ENDPOINT = '/api/users';

test('GET single query param using params option', async ({ request }) => {
    const headers = { 'x-api-key': 'reqres-free-v1' };

    // Playwright supports a 'params' option
    const res: APIResponse = await request.get(`${BASE}${ENDPOINT}`, {
        params: { page: '2' },               // <-- single query param
        headers,
    });

    console.log('Status:', res.status());
    const body = await res.json();
    console.log('Response body:', JSON.stringify(body, null, 2));

    expect(res.ok()).toBeTruthy();
    expect(body.page).toBe(2); // reqres returns page in body
});

/**
 * 
 * 
Query parameter — kya hota hai, purpose, aur kaise use karte hain (basic)

Query parameter (query param) URL ka vo hissa hota hai jo ? ke baad aata hai aur key-value pairs ki form me 
hota hai.
Example: https://example.com/search?page=2&sort=asc

Purpose (kyun use karte hain)
    Pagination — ?page=2&per_page=20 (kaunsi page chahiye).
    Filtering — ?status=active&role=admin (results ko narrow karna).
    Searching — ?q=playwright (search text).
    Sorting — ?sort=createdAt&order=desc.
    Tracking / optional flags — ?utm_source=mail ya ?debug=true.


Single query param — example

    URL form: https://reqres.in/api/users?page=2

    Playwright (simple) — params option use kar ke:

    const res = await request.get('https://reqres.in/api/users', {
    params: { page: '2' },
    headers: { 'x-api-key': 'reqres-free-v1' }
    });


    Is se Playwright internally URL banayega: https://reqres.in/api/users?page=2.



Multiple query params — example

    URL form: https://reqres.in/api/users?page=2&per_page=3&filter=active

    Playwright params:

    const res = await request.get('https://reqres.in/api/users', {
    params: { page: '2', per_page: '3', filter: 'active' },
    headers: { 'x-api-key': 'reqres-free-v1' }
    });

---------------------------------------------------------

1) Pagination — kya hota hai aur purpose

Pagination ka matlab server response ko chhote chunks (pages) me todna. Purpose:

    Performance: ek request se saara bada data na bheje — network aur server load kam.
    UX: client (web/mobile) ko manageable amount of items dikhana (infinite scroll / paged UI).
    Control: client decide kare kitne items per page (per_page / limit) aur kaunsi page chahiye (page / offset).
    Predictability: backend consistent response shape aur metadata (total, total_pages) deta hai, taaki client pagination UI bana sake.

Types: page-based (page, per_page) aur offset-based (limit, offset) aur cursor-based (token-based)


Query params server ko batate hain kaunse resources/subset chahiye without changing endpoint path.
     * 🔍 What is a Query Parameter?
     * A query parameter is part of a URL used to pass key-value pairs of data to the server.
     * They follow a ? in the URL and are typically used to filter, sort, or paginate results.
     * <p>
     * Example: https://reqres.in/api/users?page=2
     * <p>
     * Here, page=2 is the query parameter.
     * It tells the API to return users from page 2.
     * <p>
     * 📌 Use Case of Query Parameters
     * Use cases include:
     * - Pagination: ?page=2
     * - Filtering: ?status=active
     * - Sorting: ?sort=desc
     * - Searching: ?query=John
     *
     * 📦 What is equalTo() and notNullValue()?
     * they come from the Hamcrest library, which provides matchers for writing readable test assertions.
     *
     * page and data are fields/keys in json resp object, we are getting resp like below json object
     * {
     *   "page": 2,
     *   "data": [
     *     { "id": 7, "first_name": "Michael" },
     *     { "id": 8, "first_name": "Lindsay" }
     *   ]
     * }
     *
     * ✅ This is a JSON object at the root level, with keys like page, data.
     */