"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogStream = exports.appLogger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const rotating_file_stream_1 = require("rotating-file-stream");
const logsDir = path_1.default.resolve(process.cwd(), 'logs');
if (!fs_1.default.existsSync(logsDir))
    fs_1.default.mkdirSync(logsDir, { recursive: true });
exports.appLogger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            format: process.env.NODE_ENV === 'production'
                ? winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.simple())
                : winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
        new winston_daily_rotate_file_1.default({
            dirname: logsDir,
            filename: 'app-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
            maxSize: '20m',
            zippedArchive: true,
        }),
        new winston_daily_rotate_file_1.default({
            dirname: logsDir,
            filename: 'error-%DATE%.log',
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
            maxSize: '20m',
            zippedArchive: true,
        }),
    ],
    exitOnError: false,
});
exports.accessLogStream = (0, rotating_file_stream_1.createStream)('access.log', {
    interval: '1d',
    path: logsDir,
    size: '20M',
    maxFiles: 30,
    compress: 'gzip',
});
//# sourceMappingURL=logger.js.map