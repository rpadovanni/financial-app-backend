import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('card_bills', table => {
        table.increments('card_bill_id').primary();
        table.date('due_date').notNullable();
        table.integer('card_id').references('card_id').inTable('cards');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('card_bills');
}
