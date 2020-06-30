import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entity/User';

export default {
    async index(req: Request, res: Response) {
        const users = await getRepository(User).find();
        return res.json(users);
    },

    async createUser(req: Request, res: Response) {
        console.log('Body', req.params.id);
        // return res.status(200);
        // const newUser = getRepository(User).create(req.body);
        // const result = await getRepository(User).save(newUser);
        // return res.json(result);
    },

    async getUser(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await getRepository(User).findOne(userId);
        return res.json(user);
    },

    async updateUser(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await getRepository(User).findOne(userId);

        if (user) {
            getRepository(User).merge(user, req.body);
            const result = await getRepository(User).save(user);
            return res.json(result);
        }

        return res.status(404).json({ msg: 'User not found!' });
    },

    async deleteUser(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await getRepository(User).delete(userId);
        return res.json(user);
    },
};
