/* Initialize tables in database schema */

var pg = require('pg');
var fileConnector = require('./connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);

var matchTable = client.query('CREATE TABLE IF NOT EXISTS match (\
                              id BIGINT PRIMARY KEY,\
                              region TEXT,\
                              matchType TEXT,\
                              matchVersion TEXT)'
                             );

var teamTable = client.query('CREATE TABLE IF NOT EXISTS team (\
                              matchid BIGINT REFERENCES match(id),\
                              id INTEGER,\
                              PRIMARY KEY(matchid, id),\
                              winner TEXT)'
                            );

/*Todo: add player table inside. Was not practical to start it off that way as the older
match version API does not have summonerids available in the API request. Just need to reference
it in the participant table.*/
/*var playerTable = client.query('CREATE TABLE IF NOT EXISTS player (\
                                id INTEGER PRIMARY KEY,\
                                name INTEGER)'
                              );
*/
var championTable = client.query('CREATE TABLE IF NOT EXISTS champion (\
                                  id INTEGER PRIMARY KEY,\
                                  version TEXT,\
                                  name TEXT)'
                                );

var participantTable = client.query('CREATE TABLE IF NOT EXISTS participant (\
                                     PRIMARY KEY(matchid, id),\
                                     id INTEGER NOT NULL,\
                                     matchid BIGINT REFERENCES match(id),\
                                     championid INTEGER REFERENCES champion(id),\
                                     teamid INTEGER,\
                                     FOREIGN KEY (matchid, teamid) REFERENCES team(matchid, id),\
                                     magicDamageDealtToChampions REAL,\
                                     damageDealtToChampions REAL,\
                                     item0 TEXT,\
                                     item1 TEXT,\
                                     item2 TEXT,\
                                     item3 TEXT,\
                                     item4 TEXT,\
                                     item5 TEXT,\
                                     highestAchievedSeasonTier TEXT)'
                                   );
client.connect();
client.on('drain', function() { client.end(); });
