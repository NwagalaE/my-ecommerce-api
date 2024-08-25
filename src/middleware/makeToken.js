"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeToken = makeToken;
exports.generateOTP = generateOTP;
exports.validateUserOTP = validateUserOTP;
const users_model_1 = __importDefault(require("../models/users.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
// Function to generate access and refresh tokens
function makeToken(email, session) {
    // Create access token with expiration
    const accessToken = (0, jwt_utils_1.signJwt)({ email, session: session._id }, { expiresIn: config_1.default.get("accessTokenTtl") } // Assuming these TTL values are set in config
    );
    // Create refresh token with expiration
    const refreshToken = (0, jwt_utils_1.signJwt)({ email, session: session._id }, { expiresIn: config_1.default.get("refreshTokenTtl") } // Assuming these TTL values are set in config
    );
    return { accessToken, refreshToken };
}
// Function to generate a random OTP
function generateOTP(length = 6) {
    const charset = "0123456789";
    let otp = "";
    for (let i = 0; i < length; ++i) {
        otp += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return otp;
}
// Function to verify OTP and update user verification status
function validateUserOTP(email, otp) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find user with matching email and OTP
            const user = yield users_model_1.default.findOne({
                "email": email,
                "otp": otp
            });
            if (!user)
                return null;
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
        }
        catch (error) {
            throw new Error(`Failed to verify OTP: ${error}`);
        }
    });
}
