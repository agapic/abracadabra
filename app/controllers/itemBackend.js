var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.js')[env];
var knex = require('knex')({});
var fs = require('fs');

exports.getItemFiles = function(req, res) {
	var files = fs.readdirSync(__dirname + '/../../public/img/item/');
	return res.json(files);
}
// exports.show = function(req, res) {

	
// 	knex.raw('select
// 	sum(case when participant.item0 = '3285' then 1 else 0 end) as it0,
// 	sum(case when participant.item1 = '3285' then 1 else 0 end) as it1,
// 	sum(case when participant.item2 = '3285' then 1 else 0 end) as it2,
// 	sum(case when participant.item3 = '3285' then 1 else 0 end) as it3,
// 	sum(case when participant.item4 = '3285' then 1 else 0 end) as it4,
// 	sum(case when participant.item5 = '3285' then 1 else 0 end) as it5
// 	from participant
// 	inner join champion
// 	on champion.id = participant.championid
// 	inner join team
// 	on team.matchid = participant.matchid and team.id = participant.teamid
// 	inner join match
// 	on match.id = participant.matchid
// 	where (champion.name = \'Annie\' and team.winner = \'True\' and matchversion = \'5.14\'')
// 	}
