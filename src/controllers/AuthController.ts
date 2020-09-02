import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../database/connection';

// HELPERS
import { generateJwtToken } from '../helpers/authentication.helper';

export default {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        console.log('AUTH CONTROLLER', password);
        
        const user = await knex('users').where('email', email).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found :(' });
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(404).json({ message: 'Invalid password :/' });
        }

        const token = generateJwtToken({ id: user.user_id });

        return res.json({ user, token });
    },
};

