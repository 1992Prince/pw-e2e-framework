import { test, expect, APIResponse } from '@playwright/test';
import { User } from '../../resources/data-models/UserPayload';
import { UserPayload } from '../../resources/data-models/User';
import path from 'path';


import { setTestDataPath, getJsonArray, resetTestDataPath } from '../../utils/test-data-reader';

// set path at module load time (this runs before Playwright test discovery finishes)
const myPath = path.resolve(__dirname, '../../resources/data/pojodemo-testdata.json');
setTestDataPath(myPath);


const BASE = 'https://reqres.in';
const ENDPOINT = '/api/users';

test.beforeAll(() => {
    // set path synchronously at module load
    // const myPath = path.resolve(__dirname, '../../resources/data/pojodemo-testdata.json');
    // console.log('DEBUG __dirname:', __dirname);
    // console.log('DEBUG resolved path:', myPath);
    // setTestDataPath(myPath);

});

test.afterAll(() => {
    resetTestDataPath();
});


// below we have POJO object with hardcoded data inside test
test.skip('POJO demo with simple JSON', async ({ request }) => {

    const headers = { 'x-api-key': 'reqres-free-v1' };

    // Create payload directly in test
    const payload: User = {
        name: 'Prince',
        job: 'QA Automation Engineer',
    };


    const res: APIResponse = await request.get(`${BASE}${ENDPOINT}`, {
        params: { page: '2' },
        headers,
        data: payload,   // send payload
    });

    console.log('Request Payload:', JSON.stringify(payload, null, 2));
    console.log('Status:', res.status());
    const body = await res.json();
    console.log('Response body:', JSON.stringify(body, null, 2));

    expect(res.ok()).toBeTruthy();
    expect(body.page).toBe(2); // reqres returns page in body
});


//const myPath = path.resolve(__dirname, '../../resources/data/pojodemo-testdata.json');
//setTestDataPath(myPath);

const testTestData = getJsonArray('pojo-demo1-tcname');

// below we have simple POJO object with data coming from json file
testTestData.forEach((data, index) => {
    test.skip(`POJO demo with simple JSON Data driven ${index}`, async ({ request }) => {

        const headers = { 'x-api-key': 'reqres-free-v1' };

        // Create payload directly in test
        const payload: User = {
            name: data.firstname,
            job: data.job,
        };


        const res: APIResponse = await request.get(`${BASE}${ENDPOINT}`, {
            params: { page: '2' },
            headers,
            data: payload,   // send payload
        });

        console.log('Request Payload:', JSON.stringify(payload, null, 2));
        console.log('Status:', res.status());
        const body = await res.json();
        console.log('Response body:', JSON.stringify(body, null, 2));

        expect(res.ok()).toBeTruthy();
        expect(body.page).toBe(2); // reqres returns page in body
    });
});


// below we have complex POJO object
testTestData.forEach((data, index) => {
    test(`POJO demo with complex JSON Data driven ${index}`, async ({ request }) => {

        const headers = { 'x-api-key': 'reqres-free-v1' };

        // Create payload directly in test
        const payload: UserPayload = {
            userId: 'U-1001',
            profile: {
                firstName: 'Riya',
                lastName: 'Sharma',
                email: 'riya.sharma@example.com',
                address: {
                    city: 'Delhi',
                    pin: '110011'
                }
            },
            roles: ['ADMIN', 'EDITOR'],
            preferences: {
                notifications: true,
                theme: 'dark'
            },
            orders: [
                {
                    orderId: 'ORD-001',
                    amount: 1200.5,
                    items: ['Laptop Bag', 'Mouse']
                },
                {
                    orderId: 'ORD-002',
                    amount: 499.99,
                    items: ['Headphones']
                }
            ]

        };


        const res: APIResponse = await request.get(`${BASE}${ENDPOINT}`, {
            params: { page: '2' },
            headers,
            data: payload,   // send payload
        });

        console.log('Request Payload:', JSON.stringify(payload, null, 2));
        console.log('Status:', res.status());
        const body = await res.json();
        console.log('Response body:', JSON.stringify(body, null, 2));

        expect(res.ok()).toBeTruthy();
        expect(body.page).toBe(2); // reqres returns page in body
    });
});