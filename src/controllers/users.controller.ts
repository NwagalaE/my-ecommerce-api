import { Request, Response } from 'express';
import * as userService from '../service/users.service';
import UserModel from '../models/users.model';
import { makeToken } from '../middleware/makeToken';

/**
 * Register a new user
 */
export const registerUserController = async (req: Request, res: Response) => {
    const userInput = req.body;

    try {
        const user = await userService.registerUser(userInput);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

/**
 * Log in a user
 */
export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const session = {}; // Implement session management if needed
        const tokens = makeToken(email, session);
        
        res.status(200).json(tokens);
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

/**
 * Update user details
 */
export const updateUserController = async (req: Request, res: Response) => {
    const userId = req.params.userId; // Extract userId from request parameters
    const updateData = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

/**
 * Request OTP
 */
export const requestOTPController = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        await userService.requestOTP(email);
        
        // Send the OTP via email (already handled in service)
        res.status(200).json({ message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Error requesting OTP", error });
    }
};

/**
 * Verify OTP
 */
export const verifyOTPController = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    try {
        const user = await userService.verifyOTP(email, otp);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
};
