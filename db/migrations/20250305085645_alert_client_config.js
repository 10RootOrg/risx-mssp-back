/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("alert_client_config", (table) => {
    table.string("clientid", 300).notNullable().unique().primary();
    table.string("fqdn", 300)
    table.json("config");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("alert_client_config");
};
