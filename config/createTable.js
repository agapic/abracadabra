/* Initialize tables in database schema */
var knex = require('knex');
var filestr = require('./connection.js');
var c = filestr.connection
var pg = knex({
  client: 'pg',
  connection: 'postgres://postgres:$31=$1@159.203.43.207:5432/abracadabra'
});

return Promise.all([
  pg.schema.withSchema('public').createTable('matchversion', function (table) {
    table.increments('matchversion_id').primary();
    table.string('matchversion').unique().notNullable();
  }),

  pg.schema.withSchema('public').createTable('matchtype', function (table) {
    table.increments('matchtype_id').primary();
    table.string('matchtype').unique().notNullable();
  }),

  pg.schema.withSchema('public').createTable('region', function (table) {
    table.increments('region_id').primary();
    table.string('region').unique().notNullable();
  }),

  pg.schema.withSchema('public').createTable('match', function (table) {
    table.bigInteger('match_id').primary();
    table.integer('region_id').references('region');
    table.integer('matchtype_id').references('matchtype');
    table.integer('matchversion_id').references('matchversion');
  }),

  pg.schema.withSchema('public').createTable('champion', function (table) {
    table.integer('champion_id').primary();
    table.string('version');
    table.string('name');
  }),

  pg.schema.withSchema('public').createTable('participant', function (table) {
    table.increments('participant_id').primary();
    table.integer('champion_id').notNullable().references('champion');
    table.bigInteger('match_id').notNullable().references('match');
    table.decimal('magic_damage_dealt_to_champions');
    table.decimal('damage_dealt_to_champions');
    table.integer('item0');
    table.integer('item1');
    table.integer('item2');
    table.integer('item3');
    table.integer('item4');
    table.integer('item5');
    table.boolean('winner');
    table.string('highest_achieved_season_tier');
  }),

  pg.schema.withSchema('public').createTable('item', function (table) {
    table.integer('item_id').primary();
    table.string('name');
  })
]).then(function (done){
    console.log(done);
});
