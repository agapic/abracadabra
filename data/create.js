/* This creates the pgsql database for matches */

var pg = require('pg');
var fileConnector = require('./connection.js');

var connectionString = fileConnector.connection;


var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE IF NOT EXISTS match(id SERIAL,\
                                       champName TEXT,\
                                       region TEXT,\
                                       matchType TEXT,\
                                       item0 TEXT,\
                                       item1 TEXT,\
                                       item2 TEXT,\
                                       item3 TEXT,\
                                       item4 TEXT,\
                                       item5 TEXT,\
                                       matchVersion TEXT,\
                                       magicDamageDealtToChampions INTEGER,\
                                       highestAchievedSeasonTier TEXT,\
                                       lane TEXT)');
query.on('end', function() { client.end(); });

