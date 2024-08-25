"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyOTPController = exports.requestOTPController = exports.updateUserController = exports.loginUserController = exports.registerUserController = void 0;
const userService = __importStar(require("../service/users.service"));
const users_model_1 = __importDefault(require("../models/users.model"));
const makeToken_1 = require("../middleware/makeToken");
/**
 * Register a new user
 */
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInput = req.body;
    try {
        const user = yield userService.registerUser(userInput);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});
exports.registerUserController = registerUserController;
/**
 * Log in a user
 */
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_model_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const session = {}; // Implement session management if needed
        const tokens = (0, makeToken_1.makeToken)(email, session);
        res.status(200).json(tokens);
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
});
exports.loginUserController = loginUserController;
/**
 * Update user details
 */
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId; // Extract userId from request parameters
    const updateData = req.body;
    try {
        const updatedUser = yield userService.updateUser(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
});
exports.updateUserController = updateUserController;
/**
 * Request OTP
 */
const requestOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        yield userService.requestOTP(email);
        // Send the OTP via email (already handled in service)
        res.status(200).json({ message: "OTP sent to email" });
    }
    catch (error) {
        res.status(500).json({ message: "Error requesting OTP", error });
    }
});
exports.requestOTPController = requestOTPController;
/**
 * Verify OTP
 */
const verifyOTPController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        const user = yield userService.verifyOTP(email, otp);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error verifying OTP", error });
    }
});
exports.verifyOTPController = verifyOTPController;
