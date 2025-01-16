const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

// Define the log format
const logFormat = format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        logFormat
    ),
    transports: [
        // Create a transport for daily log rotation
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../../logs', '%DATE%-combined.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '6d',
            level: 'info',
            maxSize: '100m',
            zippedArchive: true,
            json: false,
            keep: 1,
            compress: false,
        }),
        new transports.DailyRotateFile({
            filename: path.join(__dirname, '../../logs', '%DATE%-error.log'),
            datePattern: 'YYYY-MM-DD',
            maxFiles: '6d',
            level: 'error',
            maxSize: '100m',
            zippedArchive: true,
            json: false,
            keep: 1,
            compress: false,
        }),
    ],
});

// If not in production, log to the console as well
if (process.env.NODE_ENV !== 'DEV' && process.env.NODE_ENV !== 'QA' && process.env.NODE_ENV !== 'STAGING'&& process.env.NODE_ENV !== 'LOCAL') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

module.exports = logger;
