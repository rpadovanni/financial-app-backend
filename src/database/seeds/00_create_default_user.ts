import bcrypt from 'bcrypt';
import Knex from 'knex';

export async function seed(knex: Knex) {
    const encryptedPassword = await bcrypt.hash('test', 10);

    await knex('users').insert([
        {
            name: 'Test User',
            username: 'testname',
            email: 'test@test.com',
            password: encryptedPassword,
        },
    ]);
}
