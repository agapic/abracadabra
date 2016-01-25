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
]).then(function (done){
    console.log(done);
});





// var connectionString = require('./connection.js').connection;
// var client = new pg.Client(connectionString);

// var matchTable = client.query('CREATE TABLE IF NOT EXISTS match (\
//                               id BIGINT PRIMARY KEY,\
//                               region TEXT,\
//                               matchType TEXT,\
//                               matchVersion TEXT)'
//                              );

// var matchVersionTable = client.query('CREATE TABLE IF NOT EXISTS matchversion (\
//                               matchversion_id integer PRIMARY KEY,\
//                               matchVersion TEXT)'
//                              );

// var teamTable = client.query('CREATE TABLE IF NOT EXISTS team (\
//                               matchid BIGINT REFERENCES match(id),\
//                               id INTEGER,\
//                               PRIMARY KEY(matchid, id),\
//                               winner TEXT)'
//                             );

/*Todo: add player table inside. Was not practical to start it off that way as the older
match version API does not have summonerids available in the API request. Just need to reference
it in the participant table.*/
/*var playerTable = client.query('CREATE TABLE IF NOT EXISTS player (\
                                id INTEGER PRIMARY KEY,\
                                name INTEGER)'
                              );
*/
// var championTable = client.query('CREATE TABLE IF NOT EXISTS champion (\
//                                   id INTEGER PRIMARY KEY,\
//                                   version TEXT,\
//                                   name TEXT)'
//                                 );

// var itemTable = client.query('CREATE TABLE IF NOT EXISTS item (\
//                               id INTEGER PRIMARY KEY,\
//                               name TEXT)'
//                             );

// var participantTable = client.query('CREATE TABLE IF NOT EXISTS participant (\
//                                      PRIMARY KEY(matchid, id),\
//                                      id INTEGER NOT NULL,\
//                                      matchid BIGINT REFERENCES match(id),\
//                                      championid INTEGER REFERENCES champion(id),\
//                                      teamid INTEGER,\
//                                      FOREIGN KEY (matchid, teamid) REFERENCES team(matchid, id),\
//                                      magicDamageDealtToChampions REAL,\
//                                      damageDealtToChampions REAL,\
//                                      item0 TEXT,\
//                                      item1 TEXT,\
//                                      item2 TEXT,\
//                                      item3 TEXT,\
//                                      item4 TEXT,\
//                                      item5 TEXT,\
//                                      highestAchievedSeasonTier TEXT)'
//                                    );
// client.connect();
// client.on('drain', function() { client.end(); });
