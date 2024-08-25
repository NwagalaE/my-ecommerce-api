"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Middleware to validate request data using a Zod schema.
 * @param schema - The Zod schema to validate the request data.
 */
const validateRequest = (schema) => (req, res, next) => {
    try {
        // Validate request body, query, and params against the schema
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        // Send a structured error response
        return res.status(400).json({
            message: 'Invalid request data',
            errors: error.errors, // Assuming error.errors contains detailed validation issues
        });
    }
};
exports.default = validateRequest;
