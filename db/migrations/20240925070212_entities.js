/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("entities", (table) => {
    table
      .string("entities_id", 40)
      .defaultTo(knex.raw("(uuid())"))
      .primary()
      .unique()
      .notNullable();
    table.string("entity_name", 120);
    table.string("role", 120);
    table.string("organization", 240);
    table.string("department", 240);
    table.string("description", 1024);
    table.boolean("high_profile");
    table.string("category_type", 100);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("entities");
};
[
  {
    entities: [
      {
        role: "Head Filping",
        department: "HR",
        entitiesId: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
        entityName: "Filper",
        properties: [
          {
            type: "2004",
            tools: "2001004,2001008,2001009,2001013",
            checked: null,
            createdAt: "2024-09-25 10:15:30.000000",
            parent_id: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
            updatedAt: "2024-09-25 10:15:30.000000",
            monitoring: 0,
            description: "Fliper Phone",
            resource_id: "rb1051d030",
            resource_status: null,
            resource_string: "234235235235",
          },
          {
            type: "2003",
            tools: "2001004,2001008,2001009,2001013",
            checked: null,
            createdAt: "2024-09-25 08:19:27.000000",
            parent_id: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
            updatedAt: "2024-09-25 08:19:27.000000",
            monitoring: 0,
            description: "Username on twiter",
            resource_id: "rf461aaae5",
            resource_status: null,
            resource_string: "Fliper The Flip",
          },
        ],
        description: "He Likes To Flip",
        highProfile: 0,
        organization: "10Root",
      },
    ],
    categoryName: "users",
  },
][
  ({
    entities: [
      {
        role: "Head Filping",
        department: "HR",
        entitiesId: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
        entityName: "Filper",
        properties: [
          {
            type: "2004",
            tools: "2001004,2001008,2001009,2001013",
            checked: null,
            createdAt: "2024-09-25 10:15:30.000000",
            parent_id: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
            updatedAt: "2024-09-25 10:15:30.000000",
            monitoring: 0,
            description: "Fliper Phone",
            resource_id: "rb1051d030",
            resource_status: null,
            resource_string: "234235235235",
          },
        ],
        description: "He Likes To Flip",
        highProfile: 0,
        organization: "10Root",
      },
    ],
    categoryName: "users",
  },
  {
    entities: [
      {
        role: "Head Kilping",
        department: "HR",
        entitiesId: "650056e2-7b27-11ef-bf7b-000d3a684dce",
        entityName: "Kilper",
        properties: [
          {
            type: "2003",
            tools: "2001004,2001008,2001009,2001013",
            checked: null,
            createdAt: "2024-09-25 08:19:27.000000",
            parent_id:
              "3addc5d3-7b16-11ef-bf7b-000d3a684dce,650056e2-7b27-11ef-bf7b-000d3a684dce",
            updatedAt: "2024-09-25 08:19:27.000000",
            monitoring: 0,
            description: "Username on twiter",
            resource_id: "rf461aaae5",
            resource_status: null,
            resource_string: "Fliper The Flip",
          },
        ],
        description: "He Likes To Klip",
        highProfile: 0,
        organization: "10Root",
      },
    ],
    categoryName: "users",
  },
  {
    entities: [
      {
        role: "Head Filping",
        department: "HR",
        entitiesId: "3addc5d3-7b16-11ef-bf7b-000d3a684dce",
        entityName: "Filper",
        properties: [
          {
            type: "2003",
            tools: "2001004,2001008,2001009,2001013",
            checked: null,
            createdAt: "2024-09-25 08:19:27.000000",
            parent_id:
              "3addc5d3-7b16-11ef-bf7b-000d3a684dce,650056e2-7b27-11ef-bf7b-000d3a684dce",
            updatedAt: "2024-09-25 08:19:27.000000",
            monitoring: 0,
            description: "Username on twiter",
            resource_id: "rf461aaae5",
            resource_status: null,
            resource_string: "Fliper The Flip",
          },
        ],
        description: "He Likes To Flip",
        highProfile: 0,
        organization: "10Root",
      },
    ],
    categoryName: "users",
  })
];
