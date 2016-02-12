import os
import requests
import json
import psycopg2

items = open('items.txt')
# champions = open('champions.txt')
types = ['RANKED%', 'NORMAL%']

file = open("../config/connection.js")
line = file.read()
words = line.split()
conn_string = (words[5][1:-2])
conn = psycopg2.connect(conn_string)

def items_by_champion(cur):

    for type in types:
        for item in items:
            print 'Currently on type' + type + 'and item ' + str(item)
            item = item[0:-1]
            cur.execute("SELECT c.name, *\
                FROM  (\
                   SELECT p.champion_id\
                        , count(p.item0 = %s OR NULL)::int2 AS it0tot\
                        , count(p.item0 = %s AND winner=True OR NULL)::int2 AS it0wins\
                        , count(p.item1 = %s OR NULL)::int2 AS it1tot\
                        , count(p.item1 = %s AND winner=True OR NULL)::int2 AS it1wins\
                        , count(p.item2 = %s OR NULL)::int2 AS it2tot\
                        , count(p.item2 = %s AND winner=True OR NULL)::int2 AS it2wins\
                        , count(p.item3 = %s OR NULL)::int2 AS it3tot\
                        , count(p.item3 = %s AND winner=True OR NULL)::int2 AS it3wins\
                        , count(p.item4 = %s OR NULL)::int2 AS it4tot\
                        , count(p.item4 = %s AND winner=True OR NULL)::int2 AS it4wins\
                        , count(p.item5 = %s OR NULL)::int2 AS it5tot\
                        , count(p.item5 = %s AND winner=True OR NULL)::int2 AS it5wins\
                        , mv.matchversion\
                   FROM   matchversion   mv\
                   CROSS  JOIN matchtype mt\
                   JOIN   match          m  USING (matchtype_id, matchversion_id)\
                   JOIN   participant    p  USING (match_id)\
                   WHERE    mt.matchtype LIKE('%s')\
                   GROUP  BY p.champion_id, mv.matchversion\
                   HAVING count(p.item0 = %s OR NULL)::int2 > 6\
                   OR count(p.item1 = %s OR NULL)::int2 > 6\
                   OR count(p.item2 = %s OR NULL)::int2 > 6\
                   OR count(p.item3 = %s OR NULL)::int2 > 6\
                   OR count(p.item4 = %s OR NULL)::int2 > 6\
                   OR count(p.item5 = %s OR NULL)::int2 > 6\
                   ) p\
                JOIN  champion c USING (champion_id);"\
                % (item, item, item, item, item, item, item, item, item, item, item, item, type, item, item, item, item, item, item))
            r = [dict((cur.description[i][0], value) \
                   for i, value in enumerate(row)) for row in cur.fetchall()]
            file = open('../data/query_results/' + type[0:-1].lower() + '_' + str(item) + '_' + 'by_champion.json', 'w+')
            file.write(json.dumps(r))
            file.close()
def main():
    cur = conn.cursor()
    items_by_champion(cur)
    cur.connection.close()





if __name__ == "__main__":
	main()