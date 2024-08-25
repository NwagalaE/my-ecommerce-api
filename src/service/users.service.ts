import UserModel, { UserDocument, UserInput } from '../models/users.model';
import bcrypt from 'bcrypt';
import { generateOTP } from '../middleware/makeToken';
import nodemailer from 'nodemailer';
import config from 'config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for sensitive data
        pass: process.env.EMAIL_PASSWORD
    }
});

/**
 * Register a new user
 */
export const registerUser = async (input: UserInput): Promise<UserDocument> => {
    const existingUser = await UserModel.findOne({ email: input.email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const user = new UserModel(input);
    await user.save();
    return user;
};

/**
 * Log in a user
 */
export const loginUser = async (email: string, password: string): Promise<UserDocument | null> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
};

/**
 * Update user details
 */
export const updateUser = async (userId: string, updateData: Partial<UserInput>): Promise<UserDocument | null> => {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
        throw new Error('User not found');
    }

    return updatedUser;
};

/**
 * Request OTP
 */
export const requestOTP = async (email: string): Promise<void> => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const otp = generateOTP();
    user.otp = parseInt(otp);
    user.otp_expiration = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 15 minutes.`
    });
};

/**
 * Verify OTP
 */
export const verifyOTP = async (email: string, otp: string): Promise<UserDocument | null> => {
    const user = await UserModel.findOne({ email, otp: parseInt(otp) });
    if (!user) {
        throw new Error('Invalid or expired OTP');
    }

    const isValidOTP = user.otp === parseInt(otp) && user.otp_expiration && user.otp_expiration > new Date();
    if (!isValidOTP) {
        throw new Error('Invalid or expired OTP');
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otp_expiration = undefined;
    await user.save();

    return user;
};
