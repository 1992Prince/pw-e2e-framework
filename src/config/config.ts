/**
 *
import dotenv from "dotenv";
import path from "path";
import logger from '../loggers/LoggerUtil';

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Reusable env reader
function getEnvVar(key: string, defaultValue?: string, required = false): string {
    const value = process.env[key];

    if (value) return value; // ✅ Prefer CI/CD or .env
    if (defaultValue !== undefined) return defaultValue; // ✅ fallback
    if (required) throw new Error(`❌ Missing required environment variable: ${key}`);

    return "";
}

const processENV = process.env.TEST_ENV;
const env = processENV || "advantage"; // default = dev

logger.info(`👉 Test environment is: ${env}`);

const config = {
    baseURL: "",
    userEmail: "",
    userPassword: "",
};

// Default = dev
if (env === "dev") {
    config.baseURL = getEnvVar("DEV_BASE_URL", "https://www.carwale.com/");
    config.userEmail = getEnvVar("DEV_USERNAME", "dev@email.com");
    config.userPassword = getEnvVar("DEV_PASSWORD", "devpassword123");
}

if (env === "qa") {
    config.baseURL = getEnvVar("QA_BASE_URL", "https://www.qacarwale.com/");
    config.userEmail = getEnvVar("QA_USERNAME", "qapkp@email.com");
    config.userPassword = getEnvVar("QA_PASSWORD", "qapassword121");
}

if (env === "prod") {
    config.baseURL = getEnvVar("PROD_BASE_URL", "https://www.carwale.com/");
    config.userEmail = getEnvVar("PROD_USERNAME", undefined, true);
    config.userPassword = getEnvVar("PROD_PASSWORD", undefined, true);
}

if (env === "advantage") {
    config.baseURL = getEnvVar("PROD_BASE_URL", "https://www.advantageonlineshopping.com/#/");
    config.userEmail = getEnvVar("PROD_USERNAME", undefined, true);
    config.userPassword = getEnvVar("PROD_PASSWORD", undefined, true);
}

// ✅ Debug log of loaded config (masking password)
function logConfig(cfg: typeof config) {
    const maskedPassword = cfg.userPassword ? "********" : "NOT SET";

    logger.info("🔧 Loaded Config:");
    logger.info(`   🌍 baseURL      : ${cfg.baseURL}`);
    logger.info(`   👤 userEmail    : ${cfg.userEmail}`);
    logger.info(`   🔑 userPassword : ${maskedPassword}`);
}

logConfig(config);

export { config };

 */