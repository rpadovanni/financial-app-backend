import { Request, Response } from 'express';
import knex from '../database/connection';

const userId = 1; // Get via JWT in the future

export default {
    async index(req: Request, res: Response) {
        const cards = await knex('cards').select('*').where('user_id', userId);
        return res.json(cards);
    },

    async create(req: Request, res: Response) {
        const newCard = req.body;

        try {
            await knex('cards').insert(newCard);
            return res.json({ message: 'Card Created!', account: newCard });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const cardId = req.params.id;
        const account = await knex('cards')
            .where({ user_id: userId, card_id: cardId })
            .first();

        if (!account) {
            return res.status(404).json({ message: 'Card not found :(' });
        }

        return res.json(account);
    },

    async update(req: Request, res: Response) {
        const cardId = req.params.id;
        const newCard = req.body;

        const trx = await knex.transaction();

        const account = await trx('cards')
            .where({ card_id: cardId, user_id: userId })
            .first();

        if (!account) {
            trx.rollback();
            return res.status(404).json({ message: 'Card not found :(' });
        }

        try {
            await trx('cards').where({ card_id: cardId, user_id: userId }).update({
                name: newCard.name,
                updated_at: knex.fn.now(),
            });

            await trx.commit();
            return res.json({ message: 'Card Updated!', updatedCard: newCard });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async delete(req: Request, res: Response) {
        const cardId = req.params.id;

        const trx = await knex.transaction();

        const user = await trx('cards').where('card_id', cardId).first();

        if (!user) {
            trx.rollback();
            return res.status(404).json({ message: 'Card not found :(' });
        }

        try {
            await trx('cards').where('card_id', cardId).del();
            trx.commit();
            return res.json({ message: 'Card Deleted!' });
        } catch (err) {
            trx.rollback();
            return res.json({ message: 'Something went wrong :(', err });
        }
    },
};
