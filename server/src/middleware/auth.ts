import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'default-key'

declare global {
    namespace Express {
        interface Request {
            userId: number,
            userRole: string,
        }
        interface Response {
            userId: number,
            userRole: string,
        }
    }
}

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as any;
        req.userId = decoded.userId;
        req.userRole = decoded.userRole;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

export const authMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.userRole;
        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ error: 'Forbidden' });
            return;
        }
        next();
    };
};
