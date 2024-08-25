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
exports.default = routes;
const user_routes_1 = __importDefault(require("./routes/user.routes"));
//import productRoutes from '../routes/product.routes';
//import cartRoutes from '../routes/cart.routes';
// import deadlineRoutes from "./routes/deadline.routes";
// import entityRoutes from "./routes/entities.routes";
// import filingRoutes from "./routes/filing.routes";
// import templateRoutes from "./routes/templates.routes";
// import fileuploadRoutes from "./routes/fileupload.routes";
function routes(app) {
    // Basic health check route
    app.get('/', (_req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send({ message: 'Welcome to the API' });
    }));
    app.get('/healthcheck', (req, res) => {
        res.status(200).json({
            status: 'OK',
            uptime: process.uptime(),
            message: 'Healthy',
            timestamp: new Date(),
            // Add additional health checks here if needed, like database connectivity
        });
    });
    // Register routes
    app.use('/api/users', user_routes_1.default);
    // app.use('/api/products', productRoutes);
    // app.use('/api/carts', cartRoutes);
    // app.use('/api/deadlines', deadlineRoutes);
    // app.use('/api/entities', entityRoutes);
    // app.use('/api/filings', filingRoutes);
    // app.use('/api/templates', templateRoutes);
    // app.use('/api/fileuploads', fileuploadRoutes);
    // Handle undefined routes
    app.use((req, res) => {
        res.status(404).json({ message: 'Route not found' });
    });
}
