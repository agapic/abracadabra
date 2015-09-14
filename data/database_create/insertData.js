var pg = require('pg');
var fs = require('fs');
var champNames = require('./champNames');
var itemNames = require('./itemNames');
var regions = require('./regions');
var matchTypes = ['NORMAL_5X5', 'RANKED_SOLO'];
var patchVersions = ['5.11', '5.14'];

var fileConnector = require('./connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);
client.connect();

function insert() {
    'use strict';
    /*For loops to insert JSON files for every match type, patch version, region. Each region has 10 participants, which the
    is the purpose for the most inner loop*/
    var g, h, i, k, j, file, queryConfig, query;
    for (g = 0; g < patchVersions.length; g += 1) {
        for (h = 0; h < matchTypes.length; h += 1) {
            for (i = 0; i < regions.regionList().length; h += 1) {
                for (k = 0; k < 10000; k += 1) {
                    console.log("Finished " + k + " out of 10000 for region " + regions.regionList()[i] + " , game mode and patch " + matchTypes[1] + patchVersions[1]);
                    //file is an individual JSON file retrieved after making REST API calls; only specific data from it will be inserted into the database
                    file = JSON.parse(fs.readFileSync('../../' + patchVersions[g] + '/' + matchTypes[h] + '/' + regions.regionList()[i] + '/' + k + '.json', 'utf8'));
                    for (j = 0; j < file.participants.length; j += 1) {
                        try {
                            queryConfig = { //Insert JSON files from API calls into database
                                text: 'INSERT INTO match(champname, region, matchtype, item0, item1, item2, item3, item4, item5, matchversion, magicDamageDealtToChampions, highestAchievedSeasonTier, lane, winner) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);',
                                values: [
                                    champNames.convert(file.participants[j].championId),
                                    file.region,
                                    file.queueType,
                                    itemNames.convert(file.participants[j].stats.item0),
                                    itemNames.convert(file.participants[j].stats.item1),
                                    itemNames.convert(file.participants[j].stats.item2),
                                    itemNames.convert(file.participants[j].stats.item3),
                                    itemNames.convert(file.participants[j].stats.item4),
                                    itemNames.convert(file.participants[j].stats.item5),
                                    file.matchVersion.substring(0, 4),
                                    file.participants[j].stats.magicDamageDealtToChampions,
                                    file.participants[j].highestAchievedSeasonTier,
                                    file.participants[j].timeline.lane,
                                    file.participants[j].stats.winner
                                ]
                            };

                        } catch (err) {
                            continue;
                        }
                        
                    }
                    query = client.query(queryConfig);
                }
            }
        }
    }
}

//Cleanse simply deletes a row if the participant has no item slots that include the changed AP items
function cleanse() {
    'use strict';
    var queryConfig, query;
    queryConfig = 'DELETE FROM match WHERE (item0, item1, item2, item3, item4, item5) IS NULL;';
    query = client.query(queryConfig);
    query.on('end', function () { client.end(); });
}


//Run the functions
insert();
cleanse();

