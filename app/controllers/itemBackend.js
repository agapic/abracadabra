var env = process.env.NODE_ENV || 'development';

var config = require('../../config/config.js')[env];
var knex = require('knex');
var fs = require('fs');
var filestr = require('../../config/connection.js');
var connString = filestr.connection;
	var pg = knex({
  client: 'pg',
  connection: connString,
   pool: {
    min: 0,
    max: 7
  }
});



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
	console.log("test");
	var itemId = req.params.itemId;
	var query = "SELECT c.name, * FROM  (\
				   SELECT p.champion_id\
				        , count(p.item0 = ? OR NULL)::int2 AS it0\
				        , count(p.item1 = ? OR NULL)::int2 AS it1\
				        , count(p.item2 = ? OR NULL)::int2 AS it2\
				        , count(p.item3 = ? OR NULL)::int2 AS it3\
				        , count(p.item4 = ? OR NULL)::int2 AS it4\
				        , count(p.item5 = ? OR NULL)::int2 AS it5\
				   FROM   matchversion   mv\
				   CROSS  JOIN matchtype mt\
				   JOIN   match          m  USING (matchtype_id, matchversion_id)\
				   JOIN   participant    p  USING (match_id)\
				   WHERE  mv.matchversion = \'5.14\'\
				   AND    mt.matchtype = \'RANKED_SOLO_5x5\'\
				   AND    p.winner = True\
				   GROUP  BY p.champion_id\
				   HAVING count(p.item0 = ? OR NULL)::int2 > 0\
				   OR count(p.item1 = ? OR NULL)::int2 > 0\
				   OR count(p.item2 = ? OR NULL)::int2 > 0\
				   OR count(p.item3 = ? OR NULL)::int2 > 0\
				   OR count(p.item4 = ? OR NULL)::int2 > 0\
				   OR count(p.item5 = ? OR NULL)::int2 > 0\
				   ) p\
				JOIN  champion c USING (champion_id)";
	var bindings = [itemId, itemId, itemId, itemId, itemId, itemId, itemId,
					itemId,itemId,itemId,itemId,itemId ]
	return pg.raw(query, bindings).then(function(resp) {
		return resp.rows;
	}).then(function(rows) {
		console.log("rows");
		res.jsonp(rows);
		Promise.resolve();
	}).catch(function(err){
		console.log(err);
	});
}
// exports.show = function(req, res) {
