"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = swaggerDocs;
const logger_1 = __importDefault(require("../utils/logger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'SLICE FINANCE API DOCUMENTATION',
            version: '1.0.0',
            description: 'API documentation for the SLICE FINANCE project',
        },
        servers: [
            {
                url: 'http://localhost:1133',
                description: 'Local server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes.ts'], // Path to your API docs
};
// Generate Swagger specs
const swaggerSpecs = (0, swagger_jsdoc_1.default)(options);
function swaggerDocs(app, port) {
    // Serve Swagger UI
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpecs));
    // Endpoint to retrieve Swagger JSON
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpecs);
    });
    logger_1.default.info(`The docs are available at: http://localhost:${port}/docs`);
}
