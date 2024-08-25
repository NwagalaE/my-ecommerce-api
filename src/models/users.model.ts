import mongoose, { Schema, Document, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string;
    fullname: string;
    phonenumber: string; // Changed to string for better phone number handling
    password: string;
    isAdmin: boolean;
    otp?: number;
    otp_expiration? : Date;
    isVerified? : boolean;
}

export interface UserDocument extends UserInput, Document {
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String, // Changed to string
        required: true
    },
    otp: {
        type: Number,
        default: null // Added default value
    },
    otp_expiration: {
        type: Date,
        default: null // Added default value
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false // Added default value
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    const user = this as unknown as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }
    
    try {
        const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(); // Pass error to the next middleware
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error); // Improved error logging
        return false;
    }
};

const UserModel = mongoose.model<UserDocument>('User', userSchema); // Changed collection name to 'User'

export default UserModel;
