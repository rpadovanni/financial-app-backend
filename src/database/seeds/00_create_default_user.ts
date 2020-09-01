import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('users').insert([
        {
            name: 'Test User',
            username: 'testname',
            email: 'test@test.com',
            password: 'test',
        },
    ]);
}
