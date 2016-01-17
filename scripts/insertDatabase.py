import os
import requests
import json
import psycopg2
import random
import time
import itertools
import requests


def append_items(_participant):
    item_list = {}
    for i in xrange(0,5):
        item_list["item" + i] = _participant['stats']['item' + i]
    return json.dumps(item_list)

def main():
    count = 0
    connection = open("../data/database_create/connection.js")
    line = connection.read()
    words = line.split()

    conn_string = (words[5][1:-2])
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()

    time_between_requests = 600/float(500)
    time.sleep(time_between_requests)
    #matchid is called upon frequently through each iteration
    matchid = file.matchId
    cur.execute("INSERT INTO match (id, region, matchType, matchVersion) VALUES (%s, %s, %s, %s);"
                % (matchid, file.region, file.queueType, file.matchVersion[0:4]))

    while count < 10:
        cur.execute("INSERT INTO player (id, name) VALUES (%s, %s);"
                    % (file.participantIdentities[count]['summonerId'],
                       file.participantIdentities[count]['summonerName']))
        count = count + 1
    count = 0
    while count < 2:
        cur.execute("INSERT INTO team (matchid, id, winner) VALUES\
                    (SELECT id FROM match WHERE id=%s, %s, %s);"
                    % (matchid, file.teams[count]['teamId'], file.teams[count]['winner']))
        count = count + 1
    count = 0

    while count < 10:
        #initialize list of all items participant uses
        participant = file.participants[count]
        participant_items = append_items(participant)
        cur.execute("INSERT INTO participants (id, matchid, championid, playerid, magicDamageDealtToChampions,\
                    damageDealtToChampions, items, highestAchievedSeasonTier)\
                    VALUES(%s,\
                    SELECT id FROM match WHERE id = %s,\
                    SELECT id FROM champion WHERE id =%s,\
                    SELECT id FROM player WHERE id = %s,\
                    %s, %s, %s, %s);"

                    % (file.participants[count].participantId,\
                       matchid,\
                       )


    conn.commit()
    cur.connection.close()

if __name__ == "__main__":
	main()