import { Request, Response } from 'express';
import knex from '../database/connection';

export default {
    async index(req: Request, res: Response) {
        const userId = req.userId as number;
        const cards = await knex('cards').select('*').where('user_id', userId);
        
        return res.json(cards);
    },

    async create(req: Request, res: Response) {
        const newCard = req.body;

        try {
            await knex('cards').insert(newCard);
            return res.json({ message: 'Card Created!', newCard: newCard });
        } catch (err) {
            return res.json({ message: 'Something went wrong :(', err });
        }
    },

    async show(req: Request, res: Response) {
        const userId = req.userId as number;
        const cardId = req.params.id;

        const card = await knex('cards')
            .where({ user_id: userId, card_id: cardId })
            .first();

        if (!card) {
            return res.status(404).json({ message: 'Card not found :(' });
        }

        return res.json(card);
    },

    async update(req: Request, res: Response) {
        const userId = req.userId as number;
        const cardId = req.params.id;
        const newCard = req.body;

        const trx = await knex.transaction();

        const card = await trx('cards')
            .where({ card_id: cardId, user_id: userId })
            .first();

        if (!card) {
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

        const card = await trx('cards').where('card_id', cardId).first();

        if (!card) {
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
