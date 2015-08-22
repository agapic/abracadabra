var core = require('../bin/heart.js');

exports.index = function(req, res){
    res.render('index', { title: 'League of Legends API CHALLENGE!' });
}
 
exports.data = function(req, res){

    core.queryAll(function(data) { 
        res.render('data', {dataLump: data});
    })

}
