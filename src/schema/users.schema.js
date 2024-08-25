"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = exports.otpSchema = void 0;
const zod_1 = require("zod");
// Schema for handling OTP
exports.otpSchema = zod_1.z.object({
    otp: zod_1.z.number({
        invalid_type_error: "OTP must be a number",
        required_error: "OTP is required",
    }).min(100000, "OTP must be a 6-digit number").max(999999, "OTP must be a 6-digit number"),
    otp_expiration: zod_1.z.date({
        required_error: "OTP expiration time is required",
    }),
});
// Extend the createUserSchema to include OTP validation
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }),
    fullname: zod_1.z.string().min(1, {
        message: "Full name is required",
    }),
    phonenumber: zod_1.z.string().min(10, {
        message: "Phone number must be at least 10 digits long",
    }),
    password: zod_1.z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    isAdmin: zod_1.z.boolean().optional().default(false),
    otp: exports.otpSchema.shape.otp.optional(), // Integrate OTP schema here
    otp_expiration: exports.otpSchema.shape.otp_expiration.optional(),
    isVerified: zod_1.z.boolean().optional().default(false),
});
// Schema for updating user information (if needed)
exports.updateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }).optional(),
    fullname: zod_1.z.string().min(1, {
        message: "Full name is required",
    }).optional(),
    phonenumber: zod_1.z.string().min(10, {
        message: "Phone number must be at least 10 digits long",
    }).optional(),
    password: zod_1.z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }).optional(),
    isAdmin: zod_1.z.boolean().optional(),
    otp: exports.otpSchema.shape.otp.optional(), // Integrate OTP schema here
    otp_expiration: exports.otpSchema.shape.otp_expiration.optional(),
    isVerified: zod_1.z.boolean().optional(),
});
// Schema for user login
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email({
        message: "Invalid email address",
    }),
    password: zod_1.z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});
