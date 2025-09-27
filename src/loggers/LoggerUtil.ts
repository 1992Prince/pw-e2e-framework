import winston from "winston";
import path from "path";
import moment from "moment-timezone";

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const loggingDir = path.resolve(srcDir, "logs");

// Color scheme for levels (optional)
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    verbose: "cyan",
    debug: "blue",
    silly: "gray",
};
winston.addColors(colors);

// Shared timestamp + message formatting (no color applied here)
const fileFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const timeZone = "Asia/Kolkata";

const logger = winston.createLogger({
    level: "debug",
    // Default format is minimal; each transport can override its own format.
    transports: [
        // Console: colorized output for humans
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
                }),
                winston.format.colorize({ all: true }), // apply ANSI colors for console only
                winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
            ),
        }),

        // Info+ logs to file (no color codes)
        new winston.transports.File({
            filename: path.join(loggingDir, "test_run.log"),
            level: "info",
            maxFiles: 5,
            maxsize: 300 * 1024,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
                }),
                // ensure no color codes in files
                winston.format.uncolorize(),
                fileFormat
            ),
        }),

        // Error-only file (no color codes)
        new winston.transports.File({
            filename: path.join(loggingDir, "test_error.log"),
            level: "error",
            maxFiles: 5,
            maxsize: 10 * 1024,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: () => moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss"),
                }),
                winston.format.uncolorize(),
                fileFormat
            ),
        }),
    ],
});

export default logger;
