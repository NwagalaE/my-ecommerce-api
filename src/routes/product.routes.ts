import { Router } from 'express';
import {
    createProductHandler,
    getProductHandler,
    updateProductHandler,
    deleteProductHandler,
    getAllProductsHandler
} from '../controllers/products.controller';
import validateRequest from '../middleware/validateRequest';
import {
    createProductSchema,
    getProductSchema,
    updateProductSchema,
    deleteProductSchema
} from '../schema/products.schema';

const router = Router();

// Create a new product
router.post('/add',
   // validateRequest(createProductSchema),
    createProductHandler
);

// Get a specific product by ID
router.get('/get:productId',
   // validateRequest(getProductSchema),
    getProductHandler
);

// Update a specific product by ID
router.put('/update:productId',
   // validateRequest(updateProductSchema),
    updateProductHandler
);

// Delete a specific product by ID
router.delete('/delete:productId',
   // validateRequest(deleteProductSchema),
    deleteProductHandler
);

// Get all products (assuming you have a handler for this)
router.get('/getall',
    getAllProductsHandler
);

export default router;