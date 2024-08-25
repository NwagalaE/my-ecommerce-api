"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dayjs_1 = __importDefault(require("dayjs"));
const log = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty', // Pretty-printing for development
        options: {
            colorize: true, // Enable colorization
        },
    },
    base: {
        pid: false, // Remove process ID from logs
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format('YYYY-MM-DD HH:mm:ss')}"`, // Use a more readable timestamp format
});
exports.default = log;
