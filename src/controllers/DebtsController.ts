import { Request, Response } from 'express';
import knex from '../database/connection';

const userId = 1; // Get via JWT in the future

export default {
    async index(req: Request, res: Response) {
        const debts = await knex('debts').select('*').where('user_id', userId);
        return res.json(debts);
    },

    async create(req: Request, res: Response) {
        const newDebt = req.body;

        try {
            await knex('debts').insert(newDebt);
            return res.json({ message: 'Debt Created!', account: newDebt });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const debtId = req.params.id;
        const account = await knex('debts')
            .where({ user_id: userId, debt_id: debtId })
            .first();

        if (!account) {
            return res.status(404).json({ message: 'Debt not found :(' });
        }

        return res.json(account);
    },

    async update(req: Request, res: Response) {
        const debtId = req.params.id;
        const newDebt = req.body;

        const trx = await knex.transaction();

        const account = await trx('debts')
            .where({ user_id: userId, debt_id: debtId })
            .first();

        if (!account) {
            trx.rollback();
            return res.status(404).json({ message: 'Debt not found :(' });
        }

        try {
            await trx('debts').where({ user_id: userId, debt_id: debtId }).update({
                title: newDebt.title,
                balance: newDebt.balance,
                updated_at: knex.fn.now(),
            });

            await trx.commit();
            return res.json({ message: 'Debt Updated!', updatedUser: newDebt });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const debtId = req.params.id;

        const trx = await knex.transaction();

        const user = await trx('debts').where('debt_id', debtId).first();

        if (!user) {
            trx.rollback();
            return res.status(404).json({ message: 'Debt not found :(' });
        }

        try {
            await trx('debts').where('debt_id', debtId).del();
            trx.commit();
            return res.json({ message: 'Debt Deleted!' });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },
};
