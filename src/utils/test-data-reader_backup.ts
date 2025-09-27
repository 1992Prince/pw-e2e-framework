// // test-data.ts
// import fs from "fs";
// import path from "path";

// const DEFAULT_TEST_DATA_PATH = path.resolve(__dirname, "../resources/data/global.json");

// // Internal state
// let testDataPath: string | null = process.env.TEST_DATA_PATH || DEFAULT_TEST_DATA_PATH;
// let testDataObject: Record<string, any> | null = null;
// let testDataCache: Record<string, any> | null = null;

// /** Set the file path to read test data from (clears object override & cache). */
// export function setTestDataPath(p: string) {
//     testDataPath = p;
//     testDataObject = null;
//     testDataCache = null;
// }

// /** Set an in-memory object to use as test data (clears file path & caches object). */
// export function setTestDataObject(obj: Record<string, any>) {
//     if (typeof obj !== "object" || obj === null) {
//         throw new Error("setTestDataObject expects a non-null object");
//     }
//     testDataObject = obj;
//     testDataCache = obj;
//     testDataPath = null;
// }

// /** Reset to defaults (useful for teardown). */
// export function resetTestData() {
//     testDataPath = process.env.TEST_DATA_PATH || DEFAULT_TEST_DATA_PATH;
//     testDataObject = null;
//     testDataCache = null;
// }

// /**
//  * Always returns a non-null parsed object or throws.
//  * Type signature is Record<string, any> (non-nullable).
//  */
// function loadTestData(): Record<string, any> {
//     // Return cached if present
//     if (testDataCache !== null) {
//         return testDataCache;
//     }

//     // If an object override was set, use it
//     if (testDataObject !== null) {
//         testDataCache = testDataObject;
//         return testDataCache;
//     }

//     // Ensure we have a path to read from
//     if (!testDataPath) {
//         throw new Error("No test data path configured. Call setTestDataPath or setTestDataObject.");
//     }

//     if (!fs.existsSync(testDataPath)) {
//         throw new Error(`Test data file not found: ${testDataPath}`);
//     }

//     const rawData = fs.readFileSync(testDataPath, "utf-8");
//     let parsed: Record<string, any>;
//     try {
//         parsed = JSON.parse(rawData) as Record<string, any>;
//     } catch (err) {
//         throw new Error(`Failed to parse JSON from test data file: ${testDataPath} — ${(err as Error).message}`);
//     }

//     // Cache and return (guaranteed non-null)
//     testDataCache = parsed;
//     return testDataCache;
// }

// /** Get a simple string value from test data */
// export function getTestData(key: string): string {
//     const testData = loadTestData();

//     if (!(key in testData)) {
//         throw new Error(`Key "${key}" not found in test data`);
//     }

//     const value = testData[key];
//     if (typeof value !== "string") {
//         throw new Error(`Key "${key}" does not contain a string value`);
//     }

//     return value;
// }

// /** Get a JSON object value (not an array) */
// export function getJsonObject(key: string): Record<string, any> {
//     const testData = loadTestData();

//     if (!(key in testData)) {
//         throw new Error(`Key "${key}" not found in test data`);
//     }

//     const value = testData[key];
//     if (typeof value !== "object" || Array.isArray(value) || value === null) {
//         throw new Error(`Key "${key}" does not contain a JSON object`);
//     }

//     return value as Record<string, any>;
// }

// /** Get a JSON array */
// export function getJsonArray(key: string): any[] {
//     const testData = loadTestData();

//     if (!(key in testData)) {
//         throw new Error(`Key "${key}" not found in test data`);
//     }

//     const value = testData[key];
//     if (!Array.isArray(value)) {
//         throw new Error(`Key "${key}" does not contain a JSON array`);
//     }

//     return value;
// }

// /** Optional helper to return full data */
// export function getAllTestData(): Record<string, any> {
//     return loadTestData();
// }
