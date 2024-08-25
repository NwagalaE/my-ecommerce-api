"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const connect_1 = __importDefault(require("./utils/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const routes_1 = __importDefault(require("./routes"));
// import swaggerDocs from '../utils/swagger';
const appError_1 = __importDefault(require("./utils/appError"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_2 = __importDefault(require("http"));
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
const app = (0, express_1.default)();
const server = http_2.default.createServer(app);
const io = new http_1.Server(server); // Socket.io setup
// Middleware setup
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny')); // HTTP request logger
app.use((0, cors_1.default)()); // Enable Cross-Origin Resource Sharing
app.use((0, helmet_1.default)()); // Secure HTTP headers
app.use(express_1.default.static('public')); // Serve static files
app.use(body_parser_1.default.json()); // Parse incoming request bodies as JSON
// Rate Limiting middleware (optional, but recommended)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// Custom middleware for error handling
app.use(appError_1.default);
// Routes and API documentation
(0, routes_1.default)(app);
// swaggerDocs(app, process.env.PORT || '8009');
// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
// Global error handler (optional)
app.use((err, req, res, next) => {
    logger_1.default.error(err.message || 'Internal Server Error');
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
// Define the port
const port = process.env.PORT || 8009;
// Start the server
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server is running at http://localhost:${port}`);
    yield (0, connect_1.default)(); // Connect to the database
}));
