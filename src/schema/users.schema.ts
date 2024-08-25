import { z } from 'zod';

// Schema for handling OTP
export const otpSchema = z.object({
    otp: z.number({
        invalid_type_error: "OTP must be a number",
        required_error: "OTP is required",
    }).min(100000, "OTP must be a 6-digit number").max(999999, "OTP must be a 6-digit number"),
    
    otp_expiration: z.date({
        required_error: "OTP expiration time is required",
    }),
});

// Extend the createUserSchema to include OTP validation
export const createUserSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    fullname: z.string().min(1, {
        message: "Full name is required",
    }),
    phonenumber: z.string().min(10, {
        message: "Phone number must be at least 10 digits long",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
    isAdmin: z.boolean().optional().default(false),
    otp: otpSchema.shape.otp.optional(),  // Integrate OTP schema here
    otp_expiration: otpSchema.shape.otp_expiration.optional(),
    isVerified: z.boolean().optional().default(false),
});

// Schema for updating user information (if needed)
export const updateUserSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }).optional(),
    fullname: z.string().min(1, {
        message: "Full name is required",
    }).optional(),
    phonenumber: z.string().min(10, {
        message: "Phone number must be at least 10 digits long",
    }).optional(),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }).optional(),
    isAdmin: z.boolean().optional(),
    otp: otpSchema.shape.otp.optional(),  // Integrate OTP schema here
    otp_expiration: otpSchema.shape.otp_expiration.optional(),
    isVerified: z.boolean().optional(),
});

// Schema for user login
export const loginUserSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long",
    }),
});

// TypeScript types derived from the schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
export type OtpInput = z.infer<typeof otpSchema>;