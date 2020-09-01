import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('users').insert([
        { name: 'Rafael Padovani', username: 'rpadovanni', email: 'r.padovanni@hotmail.com', password: 'test' }
    ]);
}
