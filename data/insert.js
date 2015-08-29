var pg = require('pg');
var fs = require('fs');
var champNames = require('./champNames');
var itemNames = require('./itemNames');
var regions = require('./regions');
var fileConnector = require('./connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);
client.connect();

var matchTypes = ['NORMAL_5X5', 'RANKED_SOLO']
var patchVersions = ['5.11','5.14']





function insert(){
    
    for(g = 0; g < patchVersions.length; g++){
        for(h = 0; h < matchTypes.length; h++){
            for(i = 0; i < regions.regionList().length; i++){
                for(k = 0; k < 4; k++){
                    var file = require('./' + patchVersions[g]+'/'+matchTypes[h]+'/'+regions.regionList()[i]+'/'+k+'.json'); //yes, this is hardcoded as it isn't really a problem given the requirements

                    for(j = 0; j < file.participants.length; j++){
                        console.log(patchVersions[g])
                        console.log(matchTypes[h])
                        console.log(regions.regionList()[i])
                        console.log(file.participants.length);
                        try{
                            var queryConfig = {
                                text: 'INSERT INTO match(champName, region, matchType, item0, item1, item2, item3, item4, item5, matchVersion, magicDamageDealtToChampions, highestAchievedSeasonTier, lane, winner) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);',
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
                                    file.matchVersion.substring(0,4), 
                                    file.participants[j].stats.magicDamageDealtToChampions,
                                    file.participants[j].highestAchievedSeasonTier,
                                    file.participants[j].timeline.lane,
                                    file.participants[j].stats.winner
                                    ]
                                }
         
                            var query = client.query(queryConfig);
                            }catch (err) {
                                continue; 
                            }
                            
                    }
                }
            }
        }
    }
                    

query.on('end', function() { client.end(); });
}

function cleanse(){
    var queryConfig = 'DELETE FROM match WHERE (item0, item1, item2, item3, item4, item5) IS NULL;'
    var query = client.query(queryConfig);
    query.on('end', function() { client.end(); });
}

//insert();
cleanse();

