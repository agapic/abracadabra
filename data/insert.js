var pg = require('pg');
var fs = require('fs');
var champNames = require('./champNames');
var itemNames = require('./itemNames');
var fileConnector = require('./connection.js');
var connectionString = fileConnector.connection;
var client = new pg.Client(connectionString);
client.connect();

var region = 'na'


function insert(){
for(i = 0; i < 1; i++){

    var file = require('./5.14/NORMAL_5X5/'+region+'/'+1+'.json'); //yes, this is hardcoded as it isn't really a problem given the requirements

    for(j = 0; j < file.participants.length; j++){
        try{
        var queryConfig = {
            text: 'INSERT INTO match(champName, region, matchType, item0, item1, item2, item3, item4, item5, matchVersion, magicDamageDealtToChampions, highestAchievedSeasonTier, lane) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);',
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
                file.participants[j].timeline.lane
                ]
            }
         
    
        var query = client.query(queryConfig);
        }catch (err) {
            continue; 
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

insert();
cleanse();

