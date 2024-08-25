import mongoose, { Schema, Document, Types } from "mongoose";

export interface ProductInput {
    name: string;
    brand: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    sku: string;
    images: string[];
    ratings?: number;
    reviews?: string[];
}

export interface ProductDocument extends ProductInput, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    images: [{
        type: String
    }],
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [{
        type: String
    }]
}, {
    timestamps: true
});

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;
