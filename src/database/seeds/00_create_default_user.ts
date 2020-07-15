import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('users').insert([
        { name: 'Test Name', username: 'test', password: 'test' }
    ]);
}
