import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export const generateJwtToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};