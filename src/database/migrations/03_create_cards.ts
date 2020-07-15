import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('cards', table => {
        table.increments('card_id').primary();
        table.string('name').notNullable();
        table.integer('user_id').references('user_id').inTable('users').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('cards');
}
