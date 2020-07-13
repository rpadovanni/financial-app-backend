import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('accounts').insert([
        { title: 'Test Account', user_id: 1 }
    ]);
}
