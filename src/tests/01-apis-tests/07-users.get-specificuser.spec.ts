import { test, expect } from '@playwright/test';

// Get a single user: Retrieve details of a specific user by ID.
test('GET specific user and validate firstname', async ({ request }) => {
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
    const resp = await request.get(`${baseURL}${path}`, { headers });

    // --- validations: status & headers ---
    expect(resp.status()).toBe(200); // assert OK
    expect(resp.headers()['content-type']).toContain('application/json');

    // --- parse JSON safely ---
    const body = await resp.json();

    // basic shape sanity checks
    expect(body).toBeTruthy();
    expect(typeof body.id).toBe('number');
    expect(body.id).toBe(1);

    // validate firstname (trim + case-insensitive check to be robust)
    const firstname = String(body.name?.firstname ?? '').trim();
    console.log("firstName: ", firstname);  // firstName:  john
    expect(firstname.length).toBeGreaterThan(0);
    expect(firstname.toLowerCase()).toBe('john');


    // check geolocation parseable to number
    const latNum = Number(body.address.geolocation.lat);
    const longNum = Number(body.address.geolocation.long);
    console.log("latNum and longNum values are: ", latNum, " and ", longNum) // latNum and longNum values are:  -37.3159  and  81.1496
});

/**
1. expect(body).toBeTruthy();

body → yeh JSON object hai jo API se mila (resp.json() se).
.toBeTruthy() → Playwright ka matcher hai jo check karta hai ki value truthy hai ya nahi.

👉 Truthy matlab:

Valid values: objects, non-zero numbers, non-empty strings, true
Falsy values: null, undefined, false, 0, '' (empty string), NaN
So:
expect(body).toBeTruthy();
ka matlab hai ki response JSON empty ya null na ho — atleast kuch object mila ho.



2. const firstname = String(body.name?.firstname ?? '').trim();
Is line ka breakdown:

body.name?.firstname
?. (optional chaining): agar name exist karta hai tabhi firstname access karega,
warna undefined dega instead of crashing with error.
Example:
{ name: { firstname: "john" } } → "john"
{ } → undefined (safe, no crash)
?? ''

Nullish coalescing operator: agar left side (body.name?.firstname) null ya undefined hua toh empty 
string '' assign karega.
Example:
undefined ?? '' → ''
'john' ?? '' → 'john'

String(...)
Ensures value is cast into a string always (even if it was number or boolean).

.trim()
Removes extra spaces from start and end.
" john " → "john"

👉 Net result:
firstname me hamesha ek safe, trimmed string milega. Agar API me firstname missing hai, toh firstname = ''. Agar API me "john" mila toh firstname = "john".
 */