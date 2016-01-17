/* Initialize tables in database schema */

var pg = require('pg');
var fileConnector = require('./connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);

var matchTable = client.query('CREATE TABLE IF NOT EXISTS match (\
                              id INTEGER PRIMARY KEY,\
                              region TEXT,\
                              matchType TEXT,\
                              matchVersion TEXT)'
                             );

var teamTable = client.query('CREATE TABLE IF NOT EXISTS team (\
                              matchid INTEGER REFERENCES match(id),\
                              id INTEGER,\
                              PRIMARY KEY(matchid, id),\
                              winner INTEGER)'
                            );

var playerTable = client.query('CREATE TABLE IF NOT EXISTS player (\
                                id INTEGER PRIMARY KEY,\
                                name INTEGER)'
                              );

var championTable = client.query('CREATE TABLE IF NOT EXISTS champion (\
                              id INTEGER PRIMARY KEY,\
                              version TEXT,\
                              name TEXT)'
                            );

var participantTable = client.query('CREATE TABLE IF NOT EXISTS participant (\
                                     PRIMARY KEY(matchid, id),\
                                     id INTEGER NOT NULL,\
                                     matchid INTEGER REFERENCES match(id),\
                                     championid INTEGER REFERENCES champion(id),\
                                     playerid INTEGER REFERENCES player(id),\
                                     FOREIGN KEY (matchid, id) REFERENCES team(matchid, id),\
                                     magicDamageDealtToChampions REAL,\
                                     damageDealtToChampions REAL,\
                                     items JSON,\
                                     highestAchievedSeasonTier TEXT)'
                                   );
client.connect();
client.on('drain', function() { client.end(); });
