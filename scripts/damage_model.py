from __future__ import division

import psycopg2
import sys
import pprint
import json
import time

def main():

    regions = ["('%')","('%BR')", "('%EUNE')", "('%EUW')", "('%KR')", "('%LAN')", "('%LAS')", "('%NA')", "('%OCE')", "('%RU')", "('%TR')"]
    patches = ["('%5.11%')","('%5.14%')"]
    game_modes = ["('%RANKED%')","('%NORMAL%')"]
    for game_mode in game_modes:
        print game_mode
        for patch in patches:
            print patch
            for region in regions:
                damageQuery = query_db("select champname, sum(magicdamagedealttochampions) from match WHERE matchversion LIKE "+patch+" AND region LIKE "+region+" AND matchtype LIKE "+game_mode+" GROUP BY champname ORDER BY sum DESC")
                gamesQuery = query_db("select champname, count(*) from match WHERE matchversion LIKE "+patch+" AND region LIKE "+region+" AND matchtype LIKE "+game_mode+" GROUP BY champname")
                winnerQuery = query_db("select champname, count(*) from match WHERE matchversion LIKE "+patch+" AND region LIKE "+region+" AND matchtype LIKE "+game_mode+" AND winner=true GROUP BY champname")
                for i in damageQuery:
                    for j in gamesQuery:
                        if(j['champname'] == i['champname']):
                            if(patch=="('%5.11%')"):
                                i['gamesBefore'] = j['count']
                            elif(patch=="('%5.14%')"):
                                i['gamesAfter'] = j['count']
                    for wins in winnerQuery:
                        if(wins['champname'] == i['champname']):
                            if(patch=="('%5.11%')"):
                                i['gamesBeforeWins'] = wins['count']
                                i['gamesBeforeWinrate'] = format(float(i['gamesBeforeWins'])/(i['gamesBefore'])*100, '.2f')
                            elif(patch=="('%5.14%')"):
                                i['gamesAfterWins'] = wins['count']
                                i['gamesAfterWinrate'] = format(float(i['gamesAfterWins'])/(i['gamesAfter'])*100, '.2f')

                damageFile = open('../data/database_query_results/damage/'+patch[5:7]+game_mode[3:-3]+region[3:len(region)-2]+'.json', 'w+')
                damageFile.write(json.dumps(damageQuery))
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