import logger from '../loggers/LoggerUtil';

export const commonConfig = {
    BASE_URL: process.env.BASE_URL || "https://default-app.com",
    APPLICATION: process.env.APPLICATION || "Advantage-Shopping-Application",
    ENV: process.env.ENV || "dev",
    TEST_TYPE: process.env.TEST_TYPE || "regression",
    RELEASE_NO: process.env.RELEASE_NO || "R1.0",
    BUILD_NO: process.env.BUILD_NO || "1.0.0",

    TIMEOUT: process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 30000,

    INTERACTIVE_MODE: process.env.INTERACTIVE_MODE === "true",
    PERSISTENT_MODE: process.env.PERSISTENT_MODE === "true",
    BROWSER_REUSE: process.env.BROWSER_REUSE === "true",
    HIGHLIGHT_ELEMENT: process.env.HIGHLIGHT_ELEMENT === "true",

    DEFAULT_PATH: process.env.DEFAULT_PATH || "./test-results"
};

// helper for logging
export function logCommonConfig(cfg: typeof commonConfig) {
    logger.info("⚙️ Execution Triggered → Loaded Common Config:");
    Object.entries(cfg).forEach(([key, value]) => {
        logger.info(`   ${key.padEnd(18)} : ${value}`);
    });
}

// // common-config.ts
// import logger from '../loggers/LoggerUtil';

// export const commonConfig = {
//     // 🌐 String values
//     BASE_URL: process.env.BASE_URL || "https://default-app.com",
//     APPLICATION: process.env.APPLICATION || "CRM-CUSTOMER-APP",
//     ENV: process.env.ENV || "dev",                 // dev | qa | staging | prod
//     TEST_TYPE: process.env.TEST_TYPE || "regression", // smoke | regression | sanity
//     RELEASE_NO: process.env.RELEASE_NO || "R1.0",
//     BUILD_NO: process.env.BUILD_NO || "1.0.0",

//     // 🔢 Number values
//     TIMEOUT: process.env.TIMEOUT ? Number(process.env.TIMEOUT) : 30000,

//     // ✅ Boolean values
//     INTERACTIVE_MODE: process.env.INTERACTIVE_MODE === "true",   // default false
//     PERSISTENT_MODE: process.env.PERSISTENT_MODE === "true",     // default false
//     BROWSER_REUSE: process.env.BROWSER_REUSE === "true",         // default false
//     HIGHLIGHT_ELEMENT: process.env.HIGHLIGHT_ELEMENT === "true", // default false

//     // 📂 Path or file location
//     DEFAULT_PATH: process.env.DEFAULT_PATH || "./test-results"
// };

// // ✅ Debug log of loaded commonConfig
// function logCommonConfig(cfg: typeof commonConfig) {
//     logger.info("⚙️ Loaded Common Config:");
//     logger.info(`   🌍 BASE_URL        : ${cfg.BASE_URL}`);
//     logger.info(`   📱 APPLICATION     : ${cfg.APPLICATION}`);
//     logger.info(`   🏷️ ENV             : ${cfg.ENV}`);
//     logger.info(`   🧪 TEST_TYPE       : ${cfg.TEST_TYPE}`);
//     logger.info(`   🚀 RELEASE_NO      : ${cfg.RELEASE_NO}`);
//     logger.info(`   🏗️ BUILD_NO        : ${cfg.BUILD_NO}`);
//     logger.info(`   ⏱️ TIMEOUT         : ${cfg.TIMEOUT}`);
//     logger.info(`   🎛️ INTERACTIVE_MODE: ${cfg.INTERACTIVE_MODE}`);
//     logger.info(`   📌 PERSISTENT_MODE : ${cfg.PERSISTENT_MODE}`);
//     logger.info(`   🔁 BROWSER_REUSE   : ${cfg.BROWSER_REUSE}`);
//     logger.info(`   ✨ HIGHLIGHT_ELEMENT: ${cfg.HIGHLIGHT_ELEMENT}`);
//     logger.info(`   📂 DEFAULT_PATH    : ${cfg.DEFAULT_PATH}`);
// }

// logCommonConfig(commonConfig);
