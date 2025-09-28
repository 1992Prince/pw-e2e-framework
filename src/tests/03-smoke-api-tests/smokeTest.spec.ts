import { APILogger } from '../../loggers/apiLogger';
import { test } from '../../utils/api-test-fixture';

// https://conduit.bondaracademy.com
let token: string;
let slugId: string;

test.beforeAll('Login to Conduit API', async ({ request }) => {

    const loginResp = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": {
                "email": "testbondar1@gmail.com",
                "password": "testbondar1"
            }
        }
    });

    const loginRespJson = await loginResp.json();
    token = loginRespJson.user.token;

});


test('Get All Articles', async ({ api }) => {

    // query params object
    const queryParams = {
        limit: 10,
        offset: 0
    };


    const response = await api
        //  .url('https://conduit-api.bondaracademy.com/api') // beasUrl is already set in fixture but u can also pass it from here also
        .path('/articles') // path will be diff for each api call so lets pass it from here
        .params(queryParams)
        .getRequest();

    const allLogs = api.getAllLogs();

    await test.info().attach('Get All Articles Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

    console.log("Response Status:", response.status());
    console.log("Response Body:", await response.json());

});

test('Get All Tags', async ({ api }) => {
    const response = await api
        //  .url('https://conduit-api.bondaracademy.com/api') // beasUrl is already set in fixture but u can also pass it from here also
        .path('/tags') // path will be diff for each api call so lets pass it from here
        .headers({ Authorization: 'authToken', contentType: 'application/json' })
        .getRequest();

    console.log("Response Status:", response.status());
    console.log("Response Body:", await response.json());

    const allLogs = api.getAllLogs();

    await test.info().attach('Get All Tags Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

});

// Token based example POST request

test('Create Article', async ({ api }) => {

    // define headers separately
    const headers = {
        Authorization: `Token ${token}`,  // or Bearer depending on API
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };

    const reqPayload = {
        "article": {
            "title": "Post from API Framework",
            "description": "Post from API Framework",
            "body": "Post from API Framework",
            "tagList": ['Delete']
        }
    }

    const response = await api
        .path('/articles')
        .headers(headers)
        .body(reqPayload)
        .postRequest();

    const respBody = await response.json();
    slugId = respBody.article.slug;

    // console.log("Response Status:", response.status());
    // console.log("Response Body:", await response.json());

    const allLogs = api.getAllLogs();

    await test.info().attach('Create Article Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

});

test('Update Article', async ({ api }) => {


    const reqPayload = {
        "article": {
            "title": "Update Conduit Article",
            "description": "Update Conduit Article",
            "body": "Update Conduit Article",
            "tagList": ['Update']
        }
    }

    const updateArticleResponse = await api
        .path(`/articles/${slugId}`)
        .headers({ Authorization: `Token ${token}` })
        .body(reqPayload)
        .putRequest();

    const updateResp = await updateArticleResponse.json();
    slugId = updateResp.article.slug; // updating the slugid after update as it may change

    const allLogs = api.getAllLogs();

    await test.info().attach('Update Article Logs', {
        body: allLogs,
        contentType: 'text/plain'
    });

});


test('Delete Article', async ({ api }) => {

    const delResponse = await api
        .path(`/articles/${slugId}`)
        .headers({ Authorization: `Token ${token}` })
        .deleteRequest();

    console.log("Response Status:", delResponse.status());

    const allLogs = api.getAllLogs();

    await test.info().attach('Delete Article', {
        body: allLogs,
        contentType: 'text/plain'
    });

});

test.skip('Logger Test', async ({ api }) => {

    const logger = new APILogger();
    logger.logRequest('POST', 'https://test.com/api', { Authorization: 'token' }, { foo: 'bar' });
    logger.logResponse(200, { success: true });

    const logs = logger.getRecentLogs();
    console.log(logs);
})

