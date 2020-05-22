import { Request, Response } from 'express';
import EmailService from '../services/EmailService';

const users = [{ name: 'Rafael', email: 'rafael@padovani.com.br' }];

export default {
    async index(req: Request, res: Response) {
        return res.json(users);
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
