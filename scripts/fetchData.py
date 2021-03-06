import os
import requests
import json
import psycopg2

# champions = open('champions.txt')
def items_by_champion_region():
    versions = ['5.11', '5.14']
    types = ['RANKED%', 'NORMAL%']
    regions = ['BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR']
    for version in versions:
        version_clean = version.replace('.', '')
        for type in types:
            for region in regions:
                items = open('items.txt')
                for item in items:
                    print 'Currently on type' + region + ' ' + type + 'and item ' + str(item)
                    item = item[0:-1]

                    query = db("SELECT c.name, *\
                        FROM  (\
                           SELECT p.champion_id\
                                , count(p.item0 = %s OR NULL)::int2 AS it0tot%s\
                                , count(p.item0 = %s AND winner=True OR NULL)::int2 AS it0wins%s\
                                , count(p.item1 = %s OR NULL)::int2 AS it1tot%s\
                                , count(p.item1 = %s AND winner=True OR NULL)::int2 AS it1wins%s\
                                , count(p.item2 = %s OR NULL)::int2 AS it2tot%s\
                                , count(p.item2 = %s AND winner=True OR NULL)::int2 AS it2wins%s\
                                , count(p.item3 = %s OR NULL)::int2 AS it3tot%s\
                                , count(p.item3 = %s AND winner=True OR NULL)::int2 AS it3wins%s\
                                , count(p.item4 = %s OR NULL)::int2 AS it4tot%s\
                                , count(p.item4 = %s AND winner=True OR NULL)::int2 AS it4wins%s\
                                , count(p.item5 = %s OR NULL)::int2 AS it5tot%s\
                                , count(p.item5 = %s AND winner=True OR NULL)::int2 AS it5wins%s\
                                , mv.matchversion\
                                , r.region\
                           FROM   matchversion   mv\
                           CROSS  JOIN matchtype mt\
                           JOIN   match          m  USING (matchtype_id, matchversion_id)\
                           JOIN   participant    p  USING (match_id)\
                           JOIN   region         r  USING (region_id)\
                           WHERE    mt.matchtype LIKE('%s')\
                           AND mv.matchversion = '%s'\
                           AND r.region        = '%s'\
                           GROUP  BY p.champion_id, mv.matchversion, r.region\
                           HAVING count(p.item0 = %s OR NULL)::int2 > 6\
                           OR count(p.item1 = %s OR NULL)::int2 > 6\
                           OR count(p.item2 = %s OR NULL)::int2 > 6\
                           OR count(p.item3 = %s OR NULL)::int2 > 6\
                           OR count(p.item4 = %s OR NULL)::int2 > 6\
                           OR count(p.item5 = %s OR NULL)::int2 > 6\
                           ) p\
                        JOIN  champion c USING (champion_id);"
                        % (item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean,\
                           item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, type,\
                           version, region, item, item, item, item, item, item))
                    for champ in query:
                        if(champ["it0tot" + version_clean] == 0):
                            champ["it0winrate" + version_clean] = 0
                        else:
                            champ["it0winrate" + version_clean] = float(champ["it0wins" + version_clean]) / champ["it0tot" + version_clean]

                        if(champ["it1tot" + version_clean] == 0):
                            champ["it1winrate" + version_clean] = 0
                        else:
                            champ["it1winrate" + version_clean] = float(champ["it1wins" + version_clean]) / champ["it1tot" + version_clean]

                        if(champ["it2tot" + version_clean] == 0):
                            champ["it2winrate" + version_clean] = 0
                        else:
                            champ["it2winrate" + version_clean] = float(champ["it2wins" + version_clean]) / champ["it2tot" + version_clean]

                        if(champ["it3tot" + version_clean] == 0):
                            champ["it3winrate" + version_clean] = 0
                        else:
                            champ["it3winrate" + version_clean] = float(champ["it3wins" + version_clean]) / champ["it3tot" + version_clean]

                        if(champ["it4tot" + version_clean] == 0):
                            champ["it4winrate" + version_clean] = 0
                        else:
                            champ["it4winrate" + version_clean] = float(champ["it4wins" + version_clean]) / champ["it4tot" + version_clean]

                        if(champ["it5tot" + version_clean] == 0):
                            champ["it5winrate" + version_clean] = 0
                        else:
                            champ["it5winrate" + version_clean] = float(champ["it5wins" + version_clean]) / champ["it5tot" + version_clean]

                    file = open('../data/query_results/' + region + '/' + version.replace('.', '-') + '/' + version.replace('.', '-') +'_' + type[0:-1].lower() + '_' + str(item) + '.json', 'w+')
                    file.write(json.dumps(query))
                    file.close()
                items.close()


def items_by_champion():
    versions = ['5.11', '5.14']
    types = ['RANKED%', 'NORMAL%']
    #regions = ['BR', 'EUNE', 'EUW', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR']
    for version in versions:
        version_clean = version.replace('.', '')
        for type in types:
     #       for region in regions:
                items = open('items.txt')
                for item in items:
                    print 'Currently on type' + type + 'and item ' + str(item)
                    item = item[0:-1]

                    query = db("SELECT c.name, *\
                        FROM  (\
                           SELECT p.champion_id\
                                , count(p.item0 = %s OR NULL)::int2 AS it0tot%s\
                                , count(p.item0 = %s AND winner=True OR NULL)::int2 AS it0wins%s\
                                , count(p.item1 = %s OR NULL)::int2 AS it1tot%s\
                                , count(p.item1 = %s AND winner=True OR NULL)::int2 AS it1wins%s\
                                , count(p.item2 = %s OR NULL)::int2 AS it2tot%s\
                                , count(p.item2 = %s AND winner=True OR NULL)::int2 AS it2wins%s\
                                , count(p.item3 = %s OR NULL)::int2 AS it3tot%s\
                                , count(p.item3 = %s AND winner=True OR NULL)::int2 AS it3wins%s\
                                , count(p.item4 = %s OR NULL)::int2 AS it4tot%s\
                                , count(p.item4 = %s AND winner=True OR NULL)::int2 AS it4wins%s\
                                , count(p.item5 = %s OR NULL)::int2 AS it5tot%s\
                                , count(p.item5 = %s AND winner=True OR NULL)::int2 AS it5wins%s\
                                , mv.matchversion\
                           FROM   matchversion   mv\
                           CROSS  JOIN matchtype mt\
                           JOIN   match          m  USING (matchtype_id, matchversion_id)\
                           JOIN   participant    p  USING (match_id)\
                           WHERE    mt.matchtype LIKE('%s')\
                           AND mv.matchversion = '%s'\
                           GROUP  BY p.champion_id, mv.matchversion\
                           HAVING count(p.item0 = %s OR NULL)::int2 > 6\
                           OR count(p.item1 = %s OR NULL)::int2 > 6\
                           OR count(p.item2 = %s OR NULL)::int2 > 6\
                           OR count(p.item3 = %s OR NULL)::int2 > 6\
                           OR count(p.item4 = %s OR NULL)::int2 > 6\
                           OR count(p.item5 = %s OR NULL)::int2 > 6\
                           ) p\
                        JOIN  champion c USING (champion_id);"
                        % (item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean,\
                           item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, item, version_clean, type,\
                           version, item, item, item, item, item, item))
                    for champ in query:
                        if(champ["it0tot" + version_clean] == 0):
                            champ["it0winrate" + version_clean] = 0
                        else:
                            champ["it0winrate" + version_clean] = float(champ["it0wins" + version_clean]) / champ["it0tot" + version_clean]

                        if(champ["it1tot" + version_clean] == 0):
                            champ["it1winrate" + version_clean] = 0
                        else:
                            champ["it1winrate" + version_clean] = float(champ["it1wins" + version_clean]) / champ["it1tot" + version_clean]

                        if(champ["it2tot" + version_clean] == 0):
                            champ["it2winrate" + version_clean] = 0
                        else:
                            champ["it2winrate" + version_clean] = float(champ["it2wins" + version_clean]) / champ["it2tot" + version_clean]

                        if(champ["it3tot" + version_clean] == 0):
                            champ["it3winrate" + version_clean] = 0
                        else:
                            champ["it3winrate" + version_clean] = float(champ["it3wins" + version_clean]) / champ["it3tot" + version_clean]

                        if(champ["it4tot" + version_clean] == 0):
                            champ["it4winrate" + version_clean] = 0
                        else:
                            champ["it4winrate" + version_clean] = float(champ["it4wins" + version_clean]) / champ["it4tot" + version_clean]

                        if(champ["it5tot" + version_clean] == 0):
                            champ["it5winrate" + version_clean] = 0
                        else:
                            champ["it5winrate" + version_clean] = float(champ["it5wins" + version_clean]) / champ["it5tot" + version_clean]

                    file = open('../data/query_results/' + version.replace('.', '-') + '/' + version.replace('.', '-') +'_' + type[0:-1].lower() + '_' + str(item) + '.json', 'w+')
                    file.write(json.dumps(query))
                    file.close()
                items.close()
def db(query):
    file = open("../config/connection.js")
    line = file.read()
    words = line.split()
    conn_string = (words[5][1:-2])
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()
    cur.execute(query)
    r = [dict((cur.description[i][0], value) \
        for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.connection.close()
    return r

def main():
    items_by_champion_region()





if __name__ == "__main__":
	main()