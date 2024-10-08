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
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_model_1 = __importDefault(require("../models/users.model"));
const config_1 = __importDefault(require("config"));
/**
 * Common function to verify JWT token and return the decoded payload.
 */
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicKey = config_1.default.get('publicKey');
        return jsonwebtoken_1.default.verify(token, publicKey);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new Error("Token has expired");
        }
        throw new Error("Invalid token");
    }
});
/**
 * Middleware used to protect routes from unauthorized users.
 */
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        const token = authorizationHeader.split(" ")[1];
        try {
            const decoded = yield verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: "User not found" });
            }
            req.body.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
});
exports.protect = protect;
/**
 * Middleware used to protect routes from users who are not flagged as admin.
 */
const admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        const token = authorizationHeader.split(" ")[1];
        try {
            const decoded = yield verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: "User not found" });
            }
            const user = yield users_model_1.default.findById(decoded._id);
            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: "Not authorized as an admin" });
            }
            req.body.user = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: error });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
});
exports.admin = admin;
