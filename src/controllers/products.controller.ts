import { Request, Response } from "express";
import {
    createProduct,
    updateProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
} from "../service/products.service";
import {
    CreateProductInput,
    UpdateProductInput,
    GetProductInput,
    DeleteProductInput,
} from "../schema/products.schema";

/**
 * Create a new product
 */
export const createProductHandler = async (
    req: Request<{}, {}, CreateProductInput>,
    res: Response
) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Update an existing product
 */
export const updateProductHandler = async (
    req: Request<{ productId: string }, {}, UpdateProductInput>,
    res: Response
) => {
    try {
        const { productId } = req.params; // Product ID from request parameters
        const updateData = req.body; // The rest of the update data from the request body

        const updatedProduct = await updateProduct({ productId }, updateData);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Get a product by ID
 */
export const getProductHandler = async (
    req: Request<{}, {}, GetProductInput>,
    res: Response
) => {
    try {
        const { productId } = req.body; // Access productId from req.body
        const product = await getProduct({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Get all products
 */
export const getAllProductsHandler = async (req: Request, res: Response) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

/**
 * Delete a product by ID
 */
export const deleteProductHandler = async (
    req: Request<{}, {}, DeleteProductInput>,
    res: Response
) => {
    try {
        const { productId } = req.body; // Access productId from req.body
        const deletedProduct = await deleteProduct({ productId });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
