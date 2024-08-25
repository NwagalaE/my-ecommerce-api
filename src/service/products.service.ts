import ProductModel, { ProductDocument } from "../models/products.model";
import {
    CreateProductInput,
    UpdateProductInput,
    GetProductInput,
    DeleteProductInput,
} from "../schema/products.schema";

/**
 * Create a new product
 */
export const createProduct = async (
    input: CreateProductInput
): Promise<ProductDocument> => {
    try {
        const product = new ProductModel(input);
        await product.save();
        return product;
    } catch (error) {
        throw new Error("Error creating product: " + error);
    }
};

/**
 * Update an existing product
 */
export const updateProduct = async (
    params: GetProductInput,
    input: UpdateProductInput
): Promise<ProductDocument | null> => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            params.productId,
            input,
            { new: true, runValidators: true }
        );
        return updatedProduct;
    } catch (error) {
        throw new Error("Error updating product: " + error);
    }
};

/**
 * Get a product by ID
 */
export const getProduct = async (
    params: GetProductInput
): Promise<ProductDocument | null> => {
    try {
        const product = await ProductModel.findById(params.productId);
        return product;
    } catch (error) {
        throw new Error("Error fetching product: " + error);
    }
};

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<ProductDocument[]> => {
    try {
        const products = await ProductModel.find({});
        return products;
    } catch (error) {
        throw new Error("Error fetching products: " + error);
    }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (
    params: DeleteProductInput
): Promise<ProductDocument | null> => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(
            params.productId
        );
        return deletedProduct;
    } catch (error) {
        throw new Error("Error deleting product: " + error);
    }
};