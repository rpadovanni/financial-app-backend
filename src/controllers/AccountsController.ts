import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        const userId = req.userId as number;
        const accounts = await knex('accounts').select('*').where('user_id', userId);
        
        return res.json(accounts);
    },

    async create(req: Request, res: Response) {
        const newAccount = req.body;

        try {
            await knex('accounts').insert(newAccount);
            return res.json({ message: 'Account Created!', newAccount: newAccount });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const userId = req.userId as number;
        const accountId = req.params.id;

        const account = await knex('accounts')
            .where({ user_id: userId, account_id: accountId })
            .first();

        if (!account) {
            return res.status(404).json({ message: 'Account not found :(' });
        }

        return res.json(account);
    },

    async update(req: Request, res: Response) {
        const userId = req.userId as number;
        const accountId = req.params.id;
        const newAccount = req.body;

        const trx = await knex.transaction();

        const account = await trx('accounts')
            .where({ account_id: accountId, user_id: userId })
            .first();

        if (!account) {
            trx.rollback();
            return res.status(404).json({ message: 'Account not found :(' });
        }

        try {
            await trx('accounts').where({ account_id: accountId, user_id: userId }).update({
                title: newAccount.title,
                balance: newAccount.balance,
                updated_at: knex.fn.now(),
            });

            await trx.commit();
            return res.json({ message: 'Account Updated!', updatedAccount: newAccount });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const accountId = req.params.id;

        const trx = await knex.transaction();

        const account = await trx('accounts').where('account_id', accountId).first();

        if (!account) {
            trx.rollback();
            return res.status(404).json({ message: 'Account not found :(' });
        }

        try {
            await trx('accounts').where('account_id', accountId).del();
            trx.commit();
            return res.json({ message: 'Account Deleted!' });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },
};
