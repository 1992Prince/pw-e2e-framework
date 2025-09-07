import { test } from '@playwright/test';
import path from 'path';
import { setTestDataPath, getJsonArray } from '../utils/test-data-reader';


// set path synchronously at module load
const myPath = path.resolve(__dirname, '../data/orders.json');
setTestDataPath(myPath);

// Loop over test1 data
const test1TestData = getJsonArray('test1');
test1TestData.forEach((data, index) => {
    test(`iteration ${index + 1} — ${data.username}`, async () => {
        console.log(
            `Test1 iteration ${index + 1}:`,
            data.username,
            data.password,
            data.productName
        );
    });
});


// Loop over test2 data
const test2TestData = getJsonArray('test2');
test2TestData.forEach((data, index) => {
    test(`iteration ${index + 1} — ${data.username}`, async () => {
        console.log(
            `Test2 iteration ${index + 1}:`,
            data.username,
            data.password,
            data.productName
        );
    });
});