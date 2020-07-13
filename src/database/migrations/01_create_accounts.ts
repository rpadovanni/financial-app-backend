import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('accounts', table => {
        table.increments('account_id').primary();
        table.string('title').notNullable();
        table.decimal('balance').defaultTo(0);
        table.integer('user_id').references('user_id').inTable('users').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('accounts');
}
