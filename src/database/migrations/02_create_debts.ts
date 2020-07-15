import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('debts', table => {
        table.increments('debt_id').primary();
        table.string('title').notNullable();
        table.string('description');
        table.decimal('amount').notNullable();
        table.date('due_date');
        table.integer('user_id').references('user_id').inTable('users').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('debts');
}
