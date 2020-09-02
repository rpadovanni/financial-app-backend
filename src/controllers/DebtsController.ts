import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        const userId = req.userId as number;
        const debts = await knex('debts').select('*').where('user_id', userId);

        return res.json(debts);
    },

    async create(req: Request, res: Response) {
        const newDebt = req.body;

        try {
            await knex('debts').insert(newDebt);
            return res.json({ message: 'Debt Created!', newDebt: newDebt });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const userId = req.userId as number;
        const debtId = req.params.id;

        const debt = await knex('debts')
            .where({ user_id: userId, debt_id: debtId })
            .first();

        if (!debt) {
            return res.status(404).json({ message: 'Debt not found :(' });
        }

        return res.json(debt);
    },

    async update(req: Request, res: Response) {
        const userId = req.userId as number;
        const debtId = req.params.id;
        const newDebt = req.body;

        const trx = await knex.transaction();

        const debt = await trx('debts')
            .where({ debt_id: debtId, user_id: userId })
            .first();

        if (!debt) {
            trx.rollback();
            return res.status(404).json({ message: 'Debt not found :(' });
        }

        try {
            await trx('debts').where({ debt_id: debtId, user_id: userId }).update({
                title: newDebt.title,
                balance: newDebt.balance,
                updated_at: knex.fn.now(),
            });

            await trx.commit();
            return res.json({ message: 'Debt Updated!', updatedDebt: newDebt });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const debtId = req.params.id;

        const trx = await knex.transaction();

        const debt = await trx('debts').where('debt_id', debtId).first();

        if (!debt) {
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
