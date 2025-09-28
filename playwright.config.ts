import { defineConfig, devices } from '@playwright/test';
import { commonConfig, logCommonConfig } from "./src/config/common-config";

import { on } from 'events';

// log only once when config.ts loads
logCommonConfig(commonConfig);



/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

// 🔑 Choose env name from CLI ya hardcode
const ENV = process.env.ENV || "prod_config";
// e.g. run: ENV=PROD_DEMO npx playwright test

// Dynamic import of env config
const envConfig = require(`./src/config/${ENV}.ts`).default;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html']
  ],

  timeout: 20000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: envConfig.baseURL,
    video: 'on',
    trace: 'on',
    screenshot: 'only-on-failure',
    headless: false,
    browserName: 'chromium',
    //channel: 'chrome',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // for this project u can pass specfic config.ts properties from here or override above specified
      // properties wch will be applicable to this project only
      // above all properties are commmon to all tests of framework and this is specific to this project
      // properties like timeout, expect timeout etc. but I ignore it but we can
      // Prince list all properties wch can be set from here for carwale-app
      // even u can write regex for spec files to match instead of writing full name
      // for some project load time can be more and for some it can be less so as per project u can specify properties

      // npx playwright test --project=carwale-app
      name: 'carwale-app',   // 👈 your custom project
      testMatch: [
        '01-homepage.spec.ts',
        '02-findnewcar.spec.ts'
      ],
    }, {
      // npx playwright test --project=advantage-app
      name: 'advantage-app',   // 👈 your custom project
      testMatch: [
        '03-register-shopping-checkout.spec.ts',
      ],
    },
    {
      // npx playwright test --project=ecom-api
      name: 'ecom-api',   // 👈 your custom project
      testMatch: [
        'ecom-e2e-smokeTest.spec.ts',
        'smokeTest.spec.ts',
      ],
    },

  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  // 👇 custom properties as global config

  metadata: {
    customEnv: envConfig, // you can access in tests
  },
});

// npx playwright test src/tests/03-smoke-api-tests/smokeTest.spec.ts