/**
This will be main file responsible for all api requests
Every API req have basically 5 components:
URL, Path, Headers, Parameters, Body

for headers, params and body will pass as object since they can have multiple key value pairs
for url and path will pass as string since they are single string values

Here we are using builer pattern to create the request

Add Validation checks like if baseUrl is not provided throw error and path is not given throw error
since these are mandatory fields for any api request and other details

also add validation checks at fixture level since from there we are passing data here
*/

import { APIRequestContext } from "@playwright/test";
import { APILogger } from "../loggers/apiLogger";

export class RequestHandler {

    private request: APIRequestContext;
    private apiLogger: APILogger
    private baseUrl: string;
    private apiPath: string = '';     // assigning default value as empty string
    private queryParams: object = {}; // assigning default value as empty object
    private requestHeaders: Record<string, string> = {};
    private requestBody: object = {}; // assigning default value as empty object
    private formParams: Record<string, any> = {};

    // constructor injection
    constructor(request: APIRequestContext, apiLogger: APILogger, apiBaseUrl?: string,) {
        this.request = request;
        this.baseUrl = apiBaseUrl || ''; // if apiBaseUrl is provided use it otherwise use empty string
        this.apiLogger = apiLogger;
    }


    url(url: string) {
        this.baseUrl = url;
        return this; // returning the instance to allow method chaining
    }

    path(path: string) {
        this.apiPath = path;
        return this; // returning the instance to allow method chaining
    }

    params(params: object) {
        this.queryParams = params;
        return this;
    }

    headers(headers: Record<string, string>) {
        this.requestHeaders = headers;
        return this;
    }

    formParam(params: Record<string, any>) {
        this.formParams = params;
        return this; // chainable
    }

    body(body: object) {
        this.requestBody = body;
        return this;
    }

    async getRequest() {
        const url = this.getUrl();
        this.apiLogger.logRequest('GET', url, this.requestHeaders);
        const response = await this.request.get(url, {
            headers: this.requestHeaders,
        })

        this.cleanUpFields(); // clean up fields after request is made

        const actualStatusCode = response.status();
        const respBody = await response.json();
        this.apiLogger.logResponse(actualStatusCode, respBody);

        return response;
    }

    async postFormRequest() {
        const url = this.getUrl();
        this.apiLogger.logRequest('POST', url, this.requestHeaders, this.formParams);
        const response = await this.request.post(url, {
            headers: this.requestHeaders,
            multipart: this.formParams
        })

        this.cleanUpFields(); // clean up fields after request is made

        const actualStatusCode = response.status();
        const respBody = await response.json();
        this.apiLogger.logResponse(actualStatusCode, respBody);

        return response;
    }

    async postRequest() {
        const url = this.getUrl();
        this.apiLogger.logRequest('POST', url, this.requestHeaders, this.body);
        const response = await this.request.post(url, {
            headers: this.requestHeaders,
            data: this.requestBody
        })

        this.cleanUpFields(); // clean up fields after request is made

        const actualStatusCode = response.status();
        const respBody = await response.json();
        this.apiLogger.logResponse(actualStatusCode, respBody);

        return response;
    }

    async putRequest() {
        const url = this.getUrl();
        this.apiLogger.logRequest('PUT', url, this.requestHeaders, this.body);
        const response = await this.request.put(url, {
            headers: this.requestHeaders,
            data: this.requestBody
        })

        this.cleanUpFields(); // clean up fields after request is made

        const actualStatusCode = response.status();
        const respBody = await response.json();
        this.apiLogger.logResponse(actualStatusCode, respBody);

        return response;
    }

    // for delete req, we only need url and headers, no body or params
    async deleteRequest() {
        const url = this.getUrl();
        this.apiLogger.logRequest('DELETE', url, this.requestHeaders);
        const delResponse = await this.request.delete(url, {
            headers: this.requestHeaders
        })

        this.cleanUpFields(); // clean up fields after request is made

        const actualStatusCode = delResponse.status();
        console.log('actualStatusCode - ', actualStatusCode);
        // const respBody = await delResponse.json(); // don't use json() for delete req as it may not have body else u will get json token error
        this.apiLogger.logResponse(actualStatusCode);

        return delResponse;
    }

    private getUrl() {
        const url = new URL(`${this.baseUrl}${this.apiPath}`);

        // Object.enteries() will convert queryParams object to  array of key value pairs
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value.toString());
        }

        //console.log(url.toString()); // url is of type URL so converting to string
        return url.toString();

    }

    getAllLogs() {
        return this.apiLogger.getRecentLogs();
    }

    private cleanUpFields() {
        this.baseUrl = '';
        this.apiPath = '';
        this.queryParams = {};
        this.requestHeaders = {};
        this.requestBody = {};
    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number) {
        if (actualStatus !== expectedStatus) {
            const logs = this.apiLogger.getRecentLogs();
            const error = new Error(`Expected status code ${expectedStatus} but got ${actualStatus}\n\nRecent API Logs:\n${logs}`);
            throw error;
        }

    }
}
