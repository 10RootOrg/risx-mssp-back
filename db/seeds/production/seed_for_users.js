/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(
    [ 
    // parent_id
   {
    user_id: "ScTgY23fa3",
    type: "type1",
    email: "admin@admin",
    Address:"Harechev st. 4, Tel-Aviv",
    state: "Israel",
    user_name: "Admin",
    user_password: "12345678",
    // can_watch: true,
    // can_edit: true,
    phone_number: "+972-37763688",
    name: "First User",
 
    last_login: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
   }, 
 
  ]
);
};


 