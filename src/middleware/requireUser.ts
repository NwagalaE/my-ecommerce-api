import { Request, Response, NextFunction } from "express";

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user || res.locals.user;

    if (!user) {
        return res.status(403).json({ message: "Access forbidden. User not found." });
    }

    return next();
};

export default requireUser;