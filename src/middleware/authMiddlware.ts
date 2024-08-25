import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import UserModel from "../models/users.model";
import config from "config";

/**
 * Common function to verify JWT token and return the decoded payload.
 */
const verifyToken = async (token: string): Promise<JwtPayload | null> => {
    try {
        const publicKey = config.get<string>('publicKey');
        return jwt.verify(token, publicKey) as JwtPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new Error("Token has expired");
        }
        throw new Error("Invalid token");
    }
};

/**
 * Middleware used to protect routes from unauthorized users.
 */
const protect = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        const token = authorizationHeader.split(" ")[1];

        try {
            const decoded = await verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: "User not found" });
            }

            req.body.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: error });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

/**
 * Middleware used to protect routes from users who are not flagged as admin.
 */
const admin = async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        const token = authorizationHeader.split(" ")[1];

        try {
            const decoded = await verifyToken(token);
            if (!decoded) {
                return res.status(401).json({ message: "User not found" });
            }

            const user = await UserModel.findById(decoded._id);
            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: "Not authorized as an admin" });
            }

            req.body.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: error });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

export { protect, admin };
