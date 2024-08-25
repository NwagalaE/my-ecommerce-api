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
exports.verifyOTP = exports.requestOTP = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const users_model_1 = __importDefault(require("../models/users.model"));
const makeToken_1 = require("../middleware/makeToken");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Use environment variables for sensitive data
        pass: process.env.EMAIL_PASSWORD
    }
});
/**
 * Register a new user
 */
const registerUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield users_model_1.default.findOne({ email: input.email });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const user = new users_model_1.default(input);
    yield user.save();
    return user;
});
exports.registerUser = registerUser;
/**
 * Log in a user
 */
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    const isMatch = yield user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    return user;
});
exports.loginUser = loginUser;
/**
 * Update user details
 */
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield users_model_1.default.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
        throw new Error('User not found');
    }
    return updatedUser;
});
exports.updateUser = updateUser;
/**
 * Request OTP
 */
const requestOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const otp = (0, makeToken_1.generateOTP)();
    user.otp = parseInt(otp);
    user.otp_expiration = new Date(Date.now() + 15 * 60 * 1000);
    yield user.save();
    yield transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 15 minutes.`
    });
});
exports.requestOTP = requestOTP;
/**
 * Verify OTP
 */
const verifyOTP = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findOne({ email, otp: parseInt(otp) });
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
    yield user.save();
    return user;
});
exports.verifyOTP = verifyOTP;
