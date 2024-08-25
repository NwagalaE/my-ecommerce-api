import express, { Request, Express, Response } from 'express';
import log from '../utils/logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
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
const swaggerSpecs = swaggerJSDoc(options);

export default function swaggerDocs(app: Express, port: string) {
  // Serve Swagger UI
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  // Endpoint to retrieve Swagger JSON
  app.get('/swagger.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });

  log.info(`The docs are available at: http://localhost:${port}/docs`);
}
