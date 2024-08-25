import { Express, Request, Response } from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
//import cartRoutes from '../routes/cart.routes';
// import deadlineRoutes from "./routes/deadline.routes";
// import entityRoutes from "./routes/entities.routes";
// import filingRoutes from "./routes/filing.routes";
// import templateRoutes from "./routes/templates.routes";
// import fileuploadRoutes from "./routes/fileupload.routes";

export default function routes(app: Express) {
  // Basic health check route
  app.get('/', async (_req, res) => {
    res.send({ message: 'Welcome to the API' });
  });

  app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      uptime: process.uptime(),
      message: 'Healthy',
      timestamp: new Date(),
      // Add additional health checks here if needed, like database connectivity
    });
  });

  // Register routes
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  // app.use('/api/carts', cartRoutes);
  // app.use('/api/deadlines', deadlineRoutes);
  // app.use('/api/entities', entityRoutes);
  // app.use('/api/filings', filingRoutes);
  // app.use('/api/templates', templateRoutes);
  // app.use('/api/fileuploads', fileuploadRoutes);

  // Handle undefined routes
  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });
}
