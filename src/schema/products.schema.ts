import { z } from 'zod';

// Schema for handling product details
export const productSchema = z.object({
    name: z.string().min(1, {
        message: "Product name is required",
    }),
    brand: z.string().min(1, {
        message: "Brand is required",
    }),
    description: z.string().min(1, {
        message: "Product description is required",
    }),
    price: z.number({
        invalid_type_error: "Price must be a number",
        required_error: "Price is required",
    }).positive("Price must be a positive number"),
    category: z.string().min(1, {
        message: "Category is required",
    }),
    stock: z.number({
        invalid_type_error: "Stock must be a number",
        required_error: "Stock is required",
    }).int("Stock must be an integer").nonnegative("Stock must be a non-negative integer"),
    sku: z.string().min(1, {
        message: "SKU is required",
    }),
    images: z.array(z.string().url({
        message: "Each image must be a valid URL",
    })).optional(),
    ratings: z.number().min(0).max(5).optional(), // Assuming ratings are from 0 to 5
    reviews: z.array(z.string()).optional(),
});

// Schema for creating a new product
export const createProductSchema = productSchema.extend({
    // Creation time can be added if needed
    createdAt: z.date().optional().default(new Date()),
});

// Schema for updating product information
export const updateProductSchema = productSchema.partial();

// Schema for getting a product (typically by ID)
export const getProductSchema = z.object({
    productId: z.string({
        invalid_type_error: "Product ID must be a string",
        required_error: "Product ID is required",
    }).uuid("Product ID must be a valid UUID"), // Assuming UUIDs for product IDs
});

// Schema for deleting a product by ID
export const deleteProductSchema = z.object({
    productId: z.string({
        invalid_type_error: "Product ID must be a string",
        required_error: "Product ID is required",
    }).uuid("Product ID must be a valid UUID"), // Assuming UUIDs for product IDs
});

// TypeScript types derived from the schemas
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type GetProductInput = z.infer<typeof getProductSchema>;
export type DeleteProductInput = z.infer<typeof deleteProductSchema>;