import UserModel from '../models/users.model';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

// Function to generate access and refresh tokens
export function makeToken(email: string, session: any) {
    // Create access token with expiration
    const accessToken = signJwt(
        { email, session: session._id },
        { expiresIn: config.get<string>("accessTokenTtl") } // Assuming these TTL values are set in config
    );

    // Create refresh token with expiration
    const refreshToken = signJwt(
        { email, session: session._id },
        { expiresIn: config.get<string>("refreshTokenTtl") } // Assuming these TTL values are set in config
    );

    return { accessToken, refreshToken };
}

// Function to generate a random OTP
export function generateOTP(length: number = 6): string {
    const charset = "0123456789";
    let otp = "";
    for (let i = 0; i < length; ++i) {
        otp += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return otp;
}

// Function to verify OTP and update user verification status
export async function validateUserOTP(email: string, otp: string) {
    try {
        // Find user with matching email and OTP
        const user = await UserModel.findOne({
            "email":email,
            "otp":otp
        });

        if (!user) return null;

        // Uncomment and update the following lines as needed for your OTP verification logic
        // const OTPExpired = new Date() > new Date(user.otp_expiration);
        // if (OTPExpired) throw new Error('OTP is expired');

        // const alreadyVerified = user.isVerified === true;
        // if (alreadyVerified) throw new Error('Email has been verified');

        // Update user verification status
        // await UserModel.updateOne(
        //     { email },
        //     { $set: { isVerified: true } }
        // );

        // Return updated user data or a success message
        // return await UserModel.findOne({ email });

        // Placeholder return statement
        return user;
    } catch (error) {
        throw new Error(`Failed to verify OTP: ${error}`);
    }
}