import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        const cardId = req.params.cardId;
        const cards = await knex('card_bills').select('*').where('card_id', cardId);

        return res.json(cards);
    },

    async create(req: Request, res: Response) {
        const newCardBill = req.body;

        try {
            await knex('card_bills').insert(newCardBill);
            return res.json({ message: 'Card Bill Created!', cardBill: newCardBill });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const cardId = req.params.cardId;
        const cardBillId = req.params.cardBillId;

        const cardBill = await knex('card_bills')
            .where({ card_bill_id: cardBillId, card_id: cardId })
            .first();

        if (!cardBill) {
            return res.status(404).json({ message: 'Card Bill not found :(' });
        }

        return res.json(cardBill);
    },

    async update(req: Request, res: Response) {
        const cardId = req.params.cardId;
        const cardBillId = req.params.cardBillId;
        const newCardBill = req.body;

        const trx = await knex.transaction();

        const cardBill = await trx('card_bills')
            .where({ card_bill_id: cardBillId, card_id: cardId })
            .first();

        if (!cardBill) {
            trx.rollback();
            return res.status(404).json({ message: 'Card Bill not found :(' });
        }

        try {
            await trx('card_bills').where({ card_bill_id: cardBillId, card_id: cardId }).update({
                total: newCardBill.total,
                due_date: newCardBill.due_date,
                updated_at: knex.fn.now(),
            });

            await trx.commit();
            return res.json({ message: 'Card Bill Updated!', updatedCardBill: newCardBill });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const cardBillId = req.params.cardBillId;

        const trx = await knex.transaction();

        const cardBill = await trx('card_bills').where('card_bill_id', cardBillId).first();

        if (!cardBill) {
            trx.rollback();
            return res.status(404).json({ message: 'Card Bill not found :(' });
        }

        try {
            await trx('card_bills').where('card_bill_id', cardBillId).del();
            trx.commit();
            return res.json({ message: 'Card Bill Deleted!' });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },
};
