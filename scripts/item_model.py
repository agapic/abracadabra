#!/usr/bin/python
import itertools
import psycopg2
import sys
import pprint
import json
import time
 
def main():

    items = ["'%Archangel%'","'%Ages%'","'%Rylai%'","'%Athene%'", "'%Blasting%'","'%Guise%'","'%Torment%'","'%Luden%'","'%Morello%'",
             "'%Nashor%'","'%Needlessly%'","'%Deathcap%'","'%Seraph%'","'%Void%'","'%Ancients%'","'%Hourglass%'"]

    regions = ["('%')","('%BR')", "('%EUNE')", "('%EUW')", "('%KR')", "('%LAN')", "('%LAS')", "('%NA')", "('%OCE')", "('%RU')", "('%TR')"]
    patches = ["('%5.14%')"]
    game_modes = ["('%RANKED%')","('%NORMAL%')","('%')"]
    for game_mode in game_modes:
        print game_mode
        for patch in patches:
            print patch
            for region in regions:
                print region
                for item in items:
                    itemQuery = query_db("select champname, count(*) AS amountbought from match m where m::text LIKE "+item+"AND matchversion LIKE "+patch+" AND region LIKE "+region+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    winnerQuery = query_db("select champname, count(*) as totalitemwins from match m where m::text LIKE "+item+" AND winner=true AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND region LIKE "+region+"GROUP BY champname")
                    item0Query = query_db("select champname, count(*) AS item0amount from match where item0 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item0WinnerQuery = query_db("select champname, count(*) AS item0wins from match where item0 LIKE "+item+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    item1Query = query_db("select champname, count(*) AS item1amount from match where item1 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item1WinnerQuery = query_db("select champname, count(*) AS item1wins from match where item1 LIKE "+item+"  AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    item2Query = query_db("select champname, count(*) AS item2amount from match where item2 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item2WinnerQuery = query_db("select champname, count(*) AS item2wins from match where item2 LIKE "+item+"  AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    item3Query = query_db("select champname, count(*) AS item3amount from match where item3 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item3WinnerQuery = query_db("select champname, count(*) AS item3wins from match where item3 LIKE "+item+"  AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    item4Query = query_db("select champname, count(*) AS item4amount from match where item4 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item4WinnerQuery = query_db("select champname, count(*) AS item4wins from match where item4 LIKE "+item+"  AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    item5Query = query_db("select champname, count(*) AS item5amount from match where item5 LIKE "+item+" AND region LIKE "+region+" AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                    item5WinnerQuery = query_db("select champname, count(*) AS item5wins from match where item5 LIKE "+item+"AND matchversion LIKE "+patch+" AND matchtype LIKE "+game_mode+" AND winner=true AND region LIKE "+region+" GROUP BY champname")
                    queryCollection = [winnerQuery,item0Query,item0WinnerQuery,item1Query,item1WinnerQuery,item2Query,item2WinnerQuery,item3Query,item3WinnerQuery,item4Query,item4WinnerQuery,item5Query,item5WinnerQuery]
                    for i in itemQuery:
                        for k in queryCollection:
                            for j in k:
                                if(i['champname'] in j['champname']):
                                    for counter in range(0,6):
                                        if k == winnerQuery:
                                            i['totalitemwins'] = j['totalitemwins']
                                            i['totalitemlosses'] = i['amountbought'] - i['totalitemwins']
                                        elif k == eval('item'+str(counter)+'Query'):
                                            i['item'+str(counter)+'amount']= j['item'+str(counter)+'amount']
                                        elif k == eval('item'+str(counter)+'WinnerQuery'):
                                            i['item'+str(counter)+'wins']= j['item'+str(counter)+'wins']
                                            i['item'+str(counter)+'losses'] = i['item'+str(counter)+'amount'] - i['item'+str(counter)+'wins']
                                    break
                    file = open('../bin/stats/items/'+patch[5:7]+game_mode[3:-3]+region[3:len(region)-2]+item[2:len(item)-2]+'.json', 'w+')
                    file.write(json.dumps(itemQuery))
            print "Done!\n"


def query_db(query):
    file = open("../data/database_create/connection.js")
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


 
if __name__ == "__main__":
	start_time = time.time()
	main()
        print("--- %s seconds ---" % (time.time() - start_time))