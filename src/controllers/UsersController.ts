import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        const users = await knex('users').select('*');
        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const newUser = req.body;

        try {
            await knex('users').insert(newUser);
            return res.json({ message: 'User Created!', user: newUser });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const userId = req.params.id;
        const user = await knex('users').where('user_id', userId).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found :(' });
        }

        return res.json(user);
    },

    async update(req: Request, res: Response) {
        const userId = req.params.id;
        const newUser = req.body;

        const trx = await knex.transaction();

        const user = await trx('users').where('user_id', userId).first();

        if (!user) {
            trx.rollback();
            return res.status(404).json({ message: 'User not found :(' });
        }

        try {
            await trx('users')
                .where('user_id', userId)
                .update({ name: newUser.name, password: newUser.password });

            await trx.commit();
            return res.json({ message: 'User Updated!', updatedUser: newUser });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const userId = req.params.id;

        const trx = await knex.transaction();

        const user = await trx('users').where('user_id', userId).first();

        if (!user) {
            trx.rollback();
            return res.status(404).json({ message: 'User not found :(' });
        }

        try {
            await trx('users').where('user_id', userId).del();
            trx.commit();
            return res.json({ message: 'User Deleted!' });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },
};
