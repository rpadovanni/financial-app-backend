import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        // const users = await getRepository(User).find();
        // return res.json(users);
        return res.json({ msg: 'Index Endpoint' });
    },

    async create(req: Request, res: Response) {
        // console.log('Body', req.params.id);
        // return res.status(200);
        // const newUser = getRepository(User).create(req.body);
        // const result = await getRepository(User).save(newUser);
        // return res.json(result);
        return res.json({ msg: 'Create Endpoint' });
    },

    async show(req: Request, res: Response) {
        // const userId = req.params.id;
        // const user = await getRepository(User).findOne(userId);
        // return res.json(user);
        return res.json({ msg: 'Show Endpoint' });
    },

    async update(req: Request, res: Response) {
        // const userId = req.params.id;
        // const user = await getRepository(User).findOne(userId);

        // if (user) {
        //     getRepository(User).merge(user, req.body);
        //     const result = await getRepository(User).save(user);
        //     return res.json(result);
        // }

        // return res.status(404).json({ msg: 'User not found!' });
        return res.json({ msg: 'Update Endpoint' });
    },

    async delete(req: Request, res: Response) {
        // const userId = req.params.id;
        // const user = await getRepository(User).delete(userId);
        // return res.json(user);
        return res.json({ msg: 'Delete Endpoint' });
    },
};
