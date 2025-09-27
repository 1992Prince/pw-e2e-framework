// import dotenv from 'dotenv';
// import path from 'path';
// //dotenv.config({ path: path.resolve(__dirname, '.env') }); // use 1) Use process.cwd() (most robust) instead of __dirname
// dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// const processENV = process.env.TEST_ENV; // we created this TEST_ENV variable and with help of this we can switch to dev, qa, prod

// // if u r runnng locally and want to run in qa then replace dev with qa
// // default is dev env and for dev config defalt poperites will be used
// const env = processENV || 'prod' // default - dev, change to qa or prod for changing the envs

// console.log('Test enviornment is: ', env);

// const config = {
//     baseURL: 'https://www.carwale.com/',
//     userEmail: 'pkp@email.com',
//     userPassword: 'password121'
// }

// if (env === 'qa') {
//     config.baseURL = 'https://www.qacarwale.com/',
//         config.userEmail = 'qapkp@email.com',
//         config.userPassword = 'qapassword121'
// }

// if (env === 'prod') {
//     // checking if both are empty or not available or passed from .env file then throw error
//     // if we will not check like below then it will throw error - Type 'string | undefined' is not assignable to type 'string'.
//     if (!process.env.PROD_USERNAME || !process.env.PROD_PASSWORD) {
//         throw Error("Missing required environment variables.")
//     }
//     config.baseURL = 'https://www.carwale.com/',
//         config.userEmail = process.env.PROD_USERNAME,
//         config.userPassword = process.env.PROD_PASSWORD
// }
// export { config }

// /**
//  * // if u r running from console from linux/mac then run like - TEST_ENV=dev npx playwright test
// // if u r running from console in windows then
// // 1. PowerShell syntax use karo - $env:TEST_ENV="prod"; npx playwright test tests/findnewcar-test.spec.ts
// // 2. Agar tum CMD (Command Prompt) use karna chahte ho - set TEST_ENV=prod && npx playwright test tests/findnewcar-test.spec.ts

// 3. Agar cross-platform solution chahiye

// cross-env package install kar lo: npm install --save-dev cross-env


// Phir command hamesha same chalega (Windows + Linux + Mac):
// npx cross-env TEST_ENV=prod npx playwright test tests/findnewcar-test.spec.ts

// 👉 Best practice: cross-env use karo taaki har OS par ek hi command chale.
//  */