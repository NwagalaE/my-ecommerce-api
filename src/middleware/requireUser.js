"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requireUser = (req, res, next) => {
    const user = req.body.user || res.locals.user;
    if (!user) {
        return res.status(403).json({ message: "Access forbidden. User not found." });
    }
    return next();
};
exports.default = requireUser;
