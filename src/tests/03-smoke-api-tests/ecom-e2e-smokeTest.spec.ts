import { log } from 'console';
import { APILogger } from '../../loggers/apiLogger';
import logger from '../../loggers/LoggerUtil';
import { test } from '../../utils/api-test-fixture';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import path = require('path');


let token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzJmZjgzMGM0ZDBjNTFmNGYyYmIyYzgiLCJ1c2VyRW1haWwiOiJhbXJpdGExMDFAbWFpbC5jb20iLCJ1c2VyTW9iaWxlIjoxMjMxMjMxMjMxLCJ1c2VyUm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzU5MDQxNDA4LCJleHAiOjE3OTA1OTkwMDh9.rubJNUjG0Ow-49DcahwoDjoSex7EVkQ12pin5GIHpVs";
let userId: string = "632ff830c4d0c51f4f2bb2c8";
let productId: string = '68d8dd3af669d6cb0aeea71c';
let orderId: string = '68d8e28ef669d6cb0aeeb413';

test.beforeAll('Generate App token', async ({ api }, testInfo) => {

    // test.setTimeout(150000); // 120000 is 2 mins
    // logger.info("Test Started : Generate Ecom token");


    // // fetch env details and log it
    // const env = testInfo.config.metadata.customEnv;
    // logger.info("BaseURI - ", env.shettyBaseUri);
    // logger.info("Username - ", env.username);
    // logger.info("Password - ", env.password);

    // const payload = {
    //     userEmail: env.username,
    //     userPassword: env.password
    // };

    // const tokenResponse = await api
    //     .url(env.shettyBaseUri)
    //     .path(env.tokenEndpoint)
    //     .headers({ contentType: 'application/json' })
    //     .body(payload)
    //     .postRequest();


    // const allLogs = api.getAllLogs();

    // await test.info().attach('Create Token Logs', {
    //     body: allLogs,
    //     contentType: 'text/plain'
    // });

    // // Assert that API call is successful
    // expect(tokenResponse.status()).toBe(200);

    // const loginRespJson = await tokenResponse.json();
    // token = loginRespJson.token;
    // logger.info("Generated Token : ", token);
    // console.log("Generated Token : ", token);

    // userId = loginRespJson.userId;

    // // Assertions on response body
    // expect(loginRespJson).toHaveProperty('token');
    // expect(loginRespJson).toHaveProperty('userId');
    // expect(loginRespJson.message).toBe('Login Successfully');

    // // Assert token is not null/empty
    // expect(loginRespJson.token).toBeTruthy();
    // expect(typeof loginRespJson.token).toBe('string');
});


test('Create Product', async ({ api }, testInfo) => {

    logger.info("Test Started : Create Product");


    // Create multipart form-data
    // prepare form params
    const form = {
        productName: 'Samsung',
        productAddedBy: userId,
        productCategory: 'device',
        productSubCategory: 'mobile',
        productPrice: '11500',
        productDescription: 'J7 Max',
        productFor: 'men',
        // file field (use createReadStream)
        productImage: fs.existsSync(path.join(__dirname, '../../resources/files/iphone.png'))
            ? fs.createReadStream(path.join(__dirname, '../../resources/files/iphone.png'))
            : undefined
    };


    const createProdResp = await api
        .url('https://rahulshettyacademy.com')
        .path('/api/ecom/product/add-product')
        .headers({ Authorization: `${token}` })
        .formParam(form)
        .postFormRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('Create Product Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    // ---- basic HTTP validations ----
    expect(createProdResp.status()).toBe(201);                         // status code
    expect(createProdResp.ok()).toBeTruthy();                         // ok() true for 2xx
    expect(createProdResp.headers()['content-type']).toContain('json'); // content-type contains json

    const loginRespJson = await createProdResp.json();

    // ---- body-level validations ----
    // structure + existence
    expect(loginRespJson).toBeTruthy();

    productId = loginRespJson.productId;

    expect(loginRespJson.productId).toBeDefined();
    expect(loginRespJson.message).toBeDefined();

    // exact message match
    expect(loginRespJson.message).toBe('Product Added Successfully');

    // productId type + non-empty
    expect(typeof loginRespJson.productId).toBe('string');
    expect(loginRespJson.productId.length).toBeGreaterThan(0);

});

test('Create Order', async ({ api }, testInfo) => {

    logger.info("Test Started : Create Order");


    // --- build the order payload (replaces {{productId}}) ---
    const orderPayload = {
        orders: [
            {
                country: 'Afghanistan',
                productOrderedId: productId,
            },
        ],
    };


    const createOrderResp = await api
        .url('https://rahulshettyacademy.com')
        .path('/api/ecom/order/create-order')
        .headers({ Authorization: `${token}` })
        .body(orderPayload)
        .postRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('Create Order Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    // ---- basic HTTP validations ----
    expect(createOrderResp.status()).toBe(201);                         // status code
    expect(createOrderResp.ok()).toBeTruthy();                         // ok() true for 2xx
    expect(createOrderResp.headers()['content-type']).toContain('json'); // content-type contains json



    const createOrderRespJson = await createOrderResp.json();

    // ---- body-level validations ----
    // structure + existence
    expect(createOrderRespJson).toBeTruthy();

    orderId = createOrderRespJson.orders[0];
    const productOrderId = createOrderRespJson.productOrderId;

    // exact message match
    expect(createOrderRespJson.message).toBe('Order Placed Successfully');

});

test('View Order', async ({ api }, testInfo) => {

    test.setTimeout(150000); // 120000 is 2 mins

    logger.info("Test Started : View Order");


    const ViewOrderResp = await api
        .url('https://rahulshettyacademy.com')
        .path(`/api/ecom/order/get-orders-details?id=${orderId}`)
        .headers({ Authorization: `${token}` })
        .getRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('View Order Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    // ---- basic HTTP validations ----
    expect(ViewOrderResp.status()).toBe(200);                         // status code
    expect(ViewOrderResp.ok()).toBeTruthy();                         // ok() true for 2xx
    expect(ViewOrderResp.headers()['content-type']).toContain('json'); // content-type contains json



    const viewOrderRespJson = await ViewOrderResp.json();

    // ✅ Extract values
    const actual_id = viewOrderRespJson.data._id;
    const actual_orderById = viewOrderRespJson.data.orderById;
    const actual_orderBy = viewOrderRespJson.data.orderBy;
    const actual_productOrderedId = viewOrderRespJson.data.productOrderedId;
    const actual_message = viewOrderRespJson.message;

    // ---- body-level validations ----
    // ✅ Validations
    expect(actual_id).toBe(orderId);
    expect(actual_orderById).toBe(userId);
    expect(actual_orderBy).toBe('amrita101@mail.com');
    expect(actual_productOrderedId).toBe(productId);
    expect(actual_message).toBe('Orders fetched for customer Successfully');

});

test('Delete Order', async ({ api }, testInfo) => {

    test.setTimeout(150000); // 120000 is 2 mins

    logger.info("Test Started : Delete Order");


    const deleteOrderResp = await api
        .url('https://rahulshettyacademy.com')
        .path(`/api/ecom/order/delete-order/${orderId}`)
        .headers({ Authorization: `${token}` })
        .deleteRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('Delete Order Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    expect(deleteOrderResp.status()).toBe(200);

});

test('Delete Product', async ({ api }, testInfo) => {

    test.setTimeout(150000); // 120000 is 2 mins

    logger.info("Test Started : Delete Product  ");


    const deleteOrderResp = await api
        .url('https://rahulshettyacademy.com')
        .path(`/api/ecom/product/delete-product/${productId}`)
        .headers({ Authorization: `${token}` })
        .deleteRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('Delete Product Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    expect(deleteOrderResp.status()).toBe(200);

});

