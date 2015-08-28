var request = require('request');
var express = require('express');
var deasync = require('deasync');
var app = express()

var region = 'tr'

var fs = require('fs');

var matchIds = require('../5.14/RANKED_SOLO/'+region+'.json');
    function writeFile(region,i,body){
        console.log("WRITING  " + i + " : " + body.matchId);
         fs.writeFile('./5.14/RANKED_SOLO/'+region+'/'+i+'.json', JSON.parse(body))
    }
var i;
for(i=0; i < 4; i++){
    var str;
    request.get("https://"+region+".api.pvp.net/api/lol/"+region+"/v2.2/match/"+ matchIds[i] + "?includeTimeline=true&api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2",function(err, apiResponse, body) {
str = JSON.stringify(body);

    })

                while(str === undefined){
        require('deasync').runLoopOnce();
    }
        writeFile(region, i, str);
        str = undefined;
    
}
