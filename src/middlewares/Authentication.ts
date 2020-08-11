import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (req.path === '/authenticate' || req.path === '/signup') {
        return next();
    }

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided :/' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token error :(' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Badly formatted token :(' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token :(' });
        }
        
        req.userId = decoded.id;
        return next();
    });
};

export default authenticationMiddleware;
