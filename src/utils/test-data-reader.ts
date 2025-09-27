/**
 * Test Data Reader Utility
 * ------------------------
 * Purpose:
 *   A minimal, predictable way to read JSON test data files for Playwright tests.
 *   Designed for both sequential and parallel execution modes.
 *
 * Key Design Decisions:
 * 1. Explicit Path Setting
 *    - By default, `testDataPath` is `null`.
 *    - Each spec file must explicitly call `setTestDataPath("<path-to-json>")`
 *      at module load before using `getJsonArray`.
 *    - This avoids hidden defaults and makes each spec self-contained.
 *
 * 2. Simple Lifecycle
 *    - `setTestDataPath(p)` → sets the JSON file path.
 *    - `getJsonArray(key)` → loads and parses the file synchronously,
 *      then returns the array at the given key.
 *    - `resetTestDataPath()` → optional cleanup (sets path back to null).
 *
 * 3. Error Safety
 *    - Throws meaningful errors if:
 *        • No file path has been set.
 *        • File does not exist at the given path.
 *        • File cannot be read.
 *        • JSON parsing fails.
 *        • Key not found in JSON object.
 *        • Key is present but not a JSON array.
 *
 * 4. Works in Sequential and Parallel Playwright Modes
 *    - Each Playwright worker process loads its own copy of this module.
 *    - The `testDataPath` is local to the worker’s process, so there are no
 *      conflicts across parallel workers.
 *    - The JSON file is read fresh once per worker when `getJsonArray` is called,
 *      ensuring isolation and consistency.
 *
 * 5. Test Data Loading Strategy
 *    - The file is read and parsed fully at once (no streaming).
 *    - Typically, each spec sets its JSON file path and calls `getJsonArray`
 *      once at module load to generate parameterized tests with a `forEach`.
 *    - Example:
 *
 *        const myPath = path.resolve(__dirname, "../../resources/data/my-tests.json");
 *        setTestDataPath(myPath);
 *        const rows = getJsonArray("my-key");
 *
 *        rows.forEach((row, idx) => {
 *          test(`case ${idx}`, async () => {
 *            // use row
 *          });
 *        });
 *
 * Benefits:
 * ---------
 * - Very small and easy to explain.
 * - Deterministic: no hidden caching, no defaults, no async surprises.
 * - Robust across serial and parallel execution modes.
 * - Clear, interviewer-friendly approach: "I designed my test data reader
 *   so each spec explicitly sets its own JSON file, the reader validates
 *   everything strictly, and tests can be parameterized safely in both
 *   sequential and parallel Playwright runs."
 */

import fs from "fs";
import path from "path";

// Always starts null, must be set from spec
let testDataPath: string | null = null;

/** Set the file path for test data (absolute or relative). */
export function setTestDataPath(p: string) {
    if (!p || typeof p !== "string") {
        throw new Error("setTestDataPath expects a non-empty string path.");
    }
    testDataPath = path.resolve(p);
}

/** Reset (optional helper, if you want to clear after suite). */
export function resetTestDataPath() {
    testDataPath = null;
}

/** Internal: load & parse JSON from the current file. */
function loadTestData(): Record<string, any> {
    if (!testDataPath) {
        throw new Error(
            'No test data path configured. Call setTestDataPath("<path-to-json>") before calling getJsonArray.'
        );
    }

    if (!fs.existsSync(testDataPath)) {
        throw new Error(`Test data file not found at: ${testDataPath}`);
    }

    let raw: string;
    try {
        raw = fs.readFileSync(testDataPath, "utf-8");
    } catch (err) {
        throw new Error(
            `Failed to read test data file at ${testDataPath}: ${(err as Error).message}`
        );
    }

    try {
        return JSON.parse(raw) as Record<string, any>;
    } catch (err) {
        throw new Error(
            `Failed to parse JSON in ${testDataPath}: ${(err as Error).message}`
        );
    }
}

/**
 * Return an array by key from the JSON file.
 * Throws error if key is missing or not an array.
 */
export function getJsonArray(key: string): any[] {
    const parsed = loadTestData();

    if (!(key in parsed)) {
        throw new Error(
            `Key "${key}" not found in test data file: ${testDataPath}`
        );
    }

    const value = parsed[key];
    if (!Array.isArray(value)) {
        throw new Error(
            `Key "${key}" in file ${testDataPath} is not a JSON array.`
        );
    }

    return value;
}


/**
🚀 How you can explain this to interviewer

“I created a small utility to manage test data. Each spec sets its own JSON file path explicitly, so there are no hidden defaults or shared state across specs.”

“When I call getJsonArray(key), it synchronously reads and parses the file, validates the key, and ensures the value is an array.”

“This design works in both sequential and parallel Playwright runs because each worker has its own copy of the module and its own test data path.”

“This way, I can easily parameterize tests by reading all data once at module load and generating test cases with a simple forEach loop.”
 */