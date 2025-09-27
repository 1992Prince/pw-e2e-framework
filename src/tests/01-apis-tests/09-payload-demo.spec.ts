// users.post.spec.ts
import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import createBookingPayload from '../../resources/request-objects/POST-createbooking.json';
import { setTestDataPath, getJsonArray } from '../../utils/test-data-reader';
import path from 'path';

const BASE = 'https://restful-booker.herokuapp.com/booking';

test('POST request: log request and response details', async ({ request }) => {
    const url = BASE;

    // Prepare request options
    const options = {
        headers: { 'Content-Type': 'application/json' },
        data: createBookingPayload, // Playwright will serialize this
    };

    // ---- LOG REQUEST ----
    console.log('--- REQUEST DETAILS ---');
    console.log('URL:', url);
    console.log('Headers:', options.headers);
    console.log('Payload:', JSON.stringify(options.data, null, 2));

    // Perform request
    const res: APIResponse = await request.post(url, options);

    // ---- LOG RESPONSE ----
    console.log('--- RESPONSE DETAILS ---');
    console.log('Status:', res.status(), res.statusText());
    console.log('Headers:', res.headers());

    // Response body
    let body: any;
    try {
        body = await res.json();
    } catch (err) {
        body = await res.text(); // fallback if not JSON
    }
    console.log('Body:', body);

    // Assertion example
    expect(res.ok()).toBeTruthy();
});

/**
 * Above we passed the payload as it is to the request 
 * But in real time same payload can be used in diff requests with diff data or
 * same payload in diff envs might have diff data
 * so suppose now u r running same req in diff env and here below payload properties will be diff like
 * firstname, lastname and additionalneeds
 * 
 * then solution is before passing the payload to request lets modify this payload with diff env test data
 */
test('POST request: dynamic payload', async ({ request }) => {

    const url = BASE;

    // below we are modifying fields of json for this test and in framework this will come from testdata.json file
    // later data must come from testdata.json file so that we can run same test in diff envs with diff test data
    // also try to add condition like if env is STG then run this test with stg test data and if env
    // is prod the use this test data
    // for this u need to add some filter filed like env in testdata.json object and then compare before
    // running this test
    createBookingPayload.firstname = "James_STG";
    createBookingPayload.lastname = "Enevour_STG";
    createBookingPayload.additionalneeds = "Games_STG";

    // Prepare request options
    const options = {
        headers: { 'Content-Type': 'application/json' },
        data: createBookingPayload, // Playwright will serialize this
    };

    // ---- LOG REQUEST ----
    console.log('--- REQUEST DETAILS ---');
    console.log('URL:', url);
    console.log('Headers:', options.headers);
    console.log('Payload:', JSON.stringify(options.data, null, 2));

    // Perform request
    const res: APIResponse = await request.post(url, options);

    // ---- LOG RESPONSE ----
    console.log('--- RESPONSE DETAILS ---');
    console.log('Status:', res.status(), res.statusText());
    console.log('Headers:', res.headers());

    // Response body
    let body: any;
    try {
        body = await res.json();
    } catch (err) {
        body = await res.text(); // fallback if not JSON
    }
    console.log('Body:', body);

    // Assertion example
    expect(res.ok()).toBeTruthy();
});


/**
 * Below we are running same test with 2 diff test data
 * but
 * if your req is at stg env use diff testdata and at prod use diff testdata
 * then if u r checking data.env === 'stg' or data.env === 'prod'
 * so that only run test with stg env test data and it will run also but in report it will give 2 passed tests
 * since prod data is also loaded and skipped inside test but test ran so , result will be 2 tests passed
 * 
 * No handle it more proper way , what we can do it instead of checking stg or prod inside test
 * we can defined diff json object with for stg test data and for prod diff object inside [] like
 * {"stgtestdata":[{},{}], "prodtestdata":[{},{}]}  and now before loading testdata we can check
 * if env is stg then load stg env testdata and if env is prod then load only prod test data
 * and then run that test with 1 or multiple testdata specified in array of objects
 * Ths is optimized solution and here we are achiving 2 things
 * 1) running same test with multiple test data i.e. test parametrization and
 * 2) running same test with testdata specific to given env
 * */


// set path synchronously at module load
const myPath = path.resolve(__dirname, '../../resources/data/post-createbooking-payload.json');
setTestDataPath(myPath);

// here add below line in condition like if env is stg then load stg testdata and if env is prod then load that
const test1TestData = getJsonArray('Dynamic Payload POST Req');

test1TestData.forEach((data, index) => {
    test(`Dynamic Payload Test - ${index}`, async ({ request }) => {

        const url = BASE;

        // to avoid making changes in original json obj
        const reqPayload = JSON.parse(JSON.stringify(createBookingPayload));

        reqPayload.firstname = data.firstname;
        reqPayload.lastname = data.lastname;
        reqPayload.additionalneeds = data.additionalneeds;

        // Prepare request options
        const options = {
            headers: { 'Content-Type': 'application/json' },
            data: createBookingPayload, // Playwright will serialize this
        };

        // ---- LOG REQUEST ----
        console.log('--- REQUEST DETAILS ---');
        console.log('URL:', url);
        console.log('Headers:', options.headers);
        console.log('Payload:', JSON.stringify(options.data, null, 2));

        // Perform request
        const res: APIResponse = await request.post(url, options);

        // ---- LOG RESPONSE ----
        console.log('--- RESPONSE DETAILS ---');
        console.log('Status:', res.status(), res.statusText());
        console.log('Headers:', res.headers());

        // Response body
        let body: any;
        try {
            body = await res.json();
        } catch (err) {
            body = await res.text(); // fallback if not JSON
        }
        console.log('Body:', body);

        // Assertion example
        expect(res.ok()).toBeTruthy();

    })
});


/**
 * conclusion: what we achived
 * a) we are defining req payload in json files inside resources/request-objects
 * b) we can use same req payload with multiple reqs
 * c) we can also modify the payload inside test if any diff data is req for another req
 * d) we are reading data from testdata json file and then assigning values to payloads as per env
 * e) we can read env from config file 
 */