import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'http';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
// import swaggerDocs from '../utils/swagger';
import appError from './utils/appError';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import http from 'http';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server); // Socket.io setup

// Middleware setup
app.use(express.json());
app.use(morgan('tiny')); // HTTP request logger
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Secure HTTP headers
app.use(express.static('public')); // Serve static files
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// Rate Limiting middleware (optional, but recommended)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Custom middleware for error handling
app.use(appError);

// Routes and API documentation
routes(app);
// swaggerDocs(app, process.env.PORT || '8009');

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler (optional)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err.message || 'Internal Server Error');
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Define the port
const port = process.env.PORT || 8009;

// Start the server
server.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);

  await connect(); // Connect to the database
});