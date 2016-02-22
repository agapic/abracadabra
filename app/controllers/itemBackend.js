var env = process.env.NODE_ENV || 'development';

var config = require('../../config/config.js')[env];
// var knex = require('knex');
var fs = require('fs');
var _ = require('lodash');
// var filestr = require('../../config/connection.js');
// var connString = filestr.connection;
// 	var pg = knex({
//   client: 'pg',
//   connection: connString,
//    pool: {
//     min: 0,
//     max: 7
//   }
// });



exports.getItemFiles = function(req, res) {
	var files = fs.readdirSync(__dirname + '/../../public/img/item/');
	return res.json(files);
}

// exports.item = function(req, res, next, id) {
// 	console.log(req.itemId);
// 	req.itemId = id;
// 	next();
// }

exports.getItem = function(req, res) {
	var itemId = req.params.itemId;
	var region = req.params.region || '';
	var type = req.params.type;

	console.log(itemId, region, type);


	var path511 =  region ? 'data/query_results/' + region + '/5-11/' : 'data/query_results/5-11/';
	var file511 = JSON.parse(fs.readFileSync(path511 + '5-11' + '_' + type + '_' + itemId + '.json', 'utf8'));

	var path514 =  region ? 'data/query_results/' + region + '/5-14/' : 'data/query_results/5-14/';
	var file514 = JSON.parse(fs.readFileSync(path514 + '5-14' + '_' + type + '_' + itemId + '.json', 'utf8'));
	//console.log(file514);
	//_.merge(file511, file514);
	//console.log("file511" + JSON.stringify(file511, null, 4));
	//console.log("file514" + JSON.stringify(file514, null, 4));

	//_.omit(file511, 'matchversion')

		_.each(file511, function (champion, key) {
			if(_.filter(file514, _.matches({ 'name': champion.name })).length == 0) {
				file511 = _.without(file511, _.find(file511, {'name': champion.name}));
			}
		})
		_.each(file514, function (champion, key) {
			if(_.filter(file511, _.matches({ 'name': champion.name })).length == 0) {
				file514 = _.without(file514, _.find(file514, {'name': champion.name}));
			}
		})
		_.merge(file511, file514);
		// _.each(file514, function(champion) {
		// 	if(!(_.filter(file511, _.matches({ 'name': champion.name })))) {
		// 		_.pullAll(file514, champion);
		// 	}
		// })

	//console.log(file511);
	//console.log(file514);
	// console.log(_.defaults(file511, file514));
	//console.log(file511);
	//consolidate["5-11"] = file511;
	//consolidate["5-14"] = file514;

	return res.send(file511);
}

// exports.getItem = function(req, res) {
// 	console.log("test");
// 	var itemId = req.params.itemId;
// 	var query = "SELECT c.name, * FROM  (\
// 				   SELECT p.champion_id\
// 				        , count(p.item0 = ? OR NULL)::int2 AS it0\
// 				        , count(p.item1 = ? OR NULL)::int2 AS it1\
// 				        , count(p.item2 = ? OR NULL)::int2 AS it2\
// 				        , count(p.item3 = ? OR NULL)::int2 AS it3\
// 				        , count(p.item4 = ? OR NULL)::int2 AS it4\
// 				        , count(p.item5 = ? OR NULL)::int2 AS it5\
// 				        , mv.matchversion\
// 				   FROM   matchversion   mv\
// 				   CROSS  JOIN matchtype mt\
// 				   JOIN   match          m  USING (matchtype_id, matchversion_id)\
// 				   JOIN   participant    p  USING (match_id)\
// 				   WHERE    mt.matchtype = \'RANKED_SOLO_5x5\'\
// 				   AND    p.winner = True\
// 				   GROUP  BY p.champion_id\
// 				   HAVING count(p.item0 = ? OR NULL)::int2 > 0\
// 				   OR count(p.item1 = ? OR NULL)::int2 > 0\
// 				   OR count(p.item2 = ? OR NULL)::int2 > 0\
// 				   OR count(p.item3 = ? OR NULL)::int2 > 0\
// 				   OR count(p.item4 = ? OR NULL)::int2 > 0\
// 				   OR count(p.item5 = ? OR NULL)::int2 > 0\
// 				   ) p\
// 				JOIN  champion c USING (champion_id)";
// 	var bindings = [itemId, itemId, itemId, itemId, itemId, itemId, itemId,
// 					itemId,itemId,itemId,itemId,itemId ]
// 	return pg.raw('select * from champion').then(function(response){
// 		res.jsonp(response.rows);
// 		Promise.resolve();
// 	}).catch(function (err){
// 		res.status(404).send(err);
// 	});


// };
// 	.then(function(resp) {
// 		// res.send(resp.rows);
// 	}).catch(function(err){
// 		console.log(err);
// 	});
// }
// exports.show = function(req, res) {
