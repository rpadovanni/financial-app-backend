import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import knex from '../database/connection';
import IUser from '../interfaces/IUser';
import { generateJwtToken } from '../helpers/authentication.helper';

export default {
    async index(req: Request, res: Response) {
        const users = await knex('users').select('*');
        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const newUser = req.body;

        const encryptedPassword = await encryptPassword(newUser.password);
        newUser.password = encryptedPassword;

        const trx = await knex.transaction();

        try {
            const insertedIds = await trx('users').insert(newUser);
            const newUserId = insertedIds[0];
            const jwtToken = generateJwtToken({ id: newUserId });

            await trx.commit();

            return res.json({ 
                message: 'User Created!',
                user: newUser,
                token: jwtToken
            });
        } catch (err) {
            await trx.rollback();
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
            await trx('users').where('user_id', userId).update({
                name: newUser.name,
                password: newUser.password,
                updated_at: knex.fn.now(),
            });

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

const encryptPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};
