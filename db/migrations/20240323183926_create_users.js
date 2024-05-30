/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
        table.string('user_id', 10).notNullable().unique().primary();
        table.string('type').notNullable();
        table.string('email',50).notNullable();
        table.string('state',50);
        table.boolean('can_watch');
        table.boolean('can_edit');
        table.integer('phone_number');
        table.string('name', 50)
        table.text('description');
        table.timestamp('last_login');
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
