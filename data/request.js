/*How the code needs to be structured:

1) There are two patch versions to choose from: 5.11 and 5.14. In each version, there are json files for each region that have match history data.
2) The match history data needs to be used to send a request to Riot's API.

*/
/* In the meantime, I have two JSON files, one from NA 5.14 Ranked and the other from NA 5.11 Ranked. Need to compare a variety of statistics. 
Potential functions: 
getAverageItemPurchaseTimeBefore()
getAverageItemPurchaseTimeAfter()
getDamageDealtBefore()
getDamageDealtAfter()

create a variable with a list of the AP item changes (go to patch notes)\

We want to see which champions benefited the most from this, and which champions didn't. As such we will have to find their respective winrates.

*/

var request = require('request');
var express = require('express');
var app = express()

var region = 'na'

//app.set('port', (process.env.PORT || 32794))
//app.use(express.static(__dirname + '/public'))


var fs = require('fs');
//var matchIds = require('../5.14/RANKED_SOLO/NA.json'); //change the JSON file to each region respectively. A complete list has been commented out for convenience
//var matchIds = require('../5.14/RANKED_SOLO/BR.json');
var matchIds = require('../5.11/RANKED_SOLO/'+region+'.json');
//var matchIds = require('../5.14/RANKED_SOLO/EUW.json');
//var matchIds = require('../5.14/RANKED_SOLO/KR.json');
//var matchIds = require('../5.14/RANKED_SOLO/LAN.json');
//var matchIds = require('../5.14/RANKED_SOLO/LAS.json');
//var matchIds = require('../5.14/RANKED_SOLO/OCE.json');
//var matchIds = require('../5.14/RANKED_SOLO/RU.json');
//var matchIds = require('../5.14/RANKED_SOLO/TR.json');
//var matchIds = require('../5.14/NORMAL_5X5/BR.json');
//var matchIds = require('../5.14/NORMAL_5X5/EUNE.json');
//var matchIds = require('../5.14/NORMAL_5X5/EUW.json');
//var matchIds = require('../5.14/NORMAL_5X5/KR.json');
//var matchIds = require('../5.14/NORMAL_5X5/LAN.json');
//var matchIds = require('../5.14/NORMAL_5X5/LAS.json');
//var matchIds = require('../5.14/NORMAL_5X5/OCE.json');
//var matchIds = require('../5.14/NORMAL_5X5/RU.json');
//var matchIds = require('../5.14/NORMAL_5X5/TR.json');


for(i = 0; i < 1; i++){
    request.get("https://"+region+".api.pvp.net/api/lol/"+region+"/v2.2/match/"+ matchIds[i] + "?includeTimeline=true&api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2", function(err, apiResponse, body) {
var str = JSON.stringify(body);
        
        fs.writeFile('./5.11/RANKED_SOLO/'+region+'/'+i+'.json', JSON.parse(str), function(err) {
    })
    })
}



/*
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})*/
       
        
