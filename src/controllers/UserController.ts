import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import EmailService from '../services/EmailService';
import { User } from '../entities/User';

// const users = [{ name: 'Rafael', email: 'rafael@padovani.com.br' }];

export default {
    async index(req: Request, res: Response) {
        const users = await getRepository(User).find();
        return res.json(users)
    },

    async create(req: Request, res: Response) {
        const emailService = new EmailService();

        emailService.sendMail({
            to: { name: 'Rafael Padovani', email: 'r.padovanni@hotmail.com' },
            message: { subject: 'Bem-vindo ao sistema', body: 'Seja bem-viado' },
        });

        return res.send();
    },
};
