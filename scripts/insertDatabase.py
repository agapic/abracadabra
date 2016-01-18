import os
import requests
import json
import psycopg2
import random
import time
import itertools
import requests

def connection(query):
    connection = open("../data/database_create/connection.js")
    line = connection.read()
    words = line.split()
    conn_string = (words[5][1:-2])
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()
    cur.execute(query);
    conn.commit()
    conn.close()

def insert_data(_file):
    count = 0
    matchid = _file['matchId']
    connection("INSERT INTO match (id, region, matchType, matchVersion) VALUES (%s, '%s', '%s', '%s');"
                % (matchid, _file['region'], _file['queueType'], _file['matchVersion'][0:4]))
    # Add player table in later -- using old API currently
    # while count < 10:
    #     cur.execute("INSERT INTO player (id, name) VALUES (%s, %s);"
    #                 % (_file['participantIdentities'][count]['player']['summonerId'],
    #                    _file['participantIdentities'][count]['player']['summonerName']))
    #     count = count + 1
    # count = 0
    while count < 2:
        connection("INSERT INTO team (matchid, id, winner) VALUES\
                    ((SELECT id FROM match WHERE id=%s), %s, '%s');"
                    % (matchid, _file['teams'][count]['teamId'], _file['teams'][count]['winner']))
        count = count + 1
    count = 0

    while count < 10:
        #initialize list of all items participant uses
        participant = _file['participants'][count]
        connection("INSERT INTO participant (id, matchid, championid, teamid, magicDamageDealtToChampions,\
                    damageDealtToChampions, item0, item1, item2, item3, item4, item5, highestAchievedSeasonTier)\
                    VALUES(%s,\
                    (SELECT id FROM match WHERE id = %s),\
                    (SELECT id FROM champion WHERE id = %s),\
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, '%s');"
                    % (participant['participantId'],\
                       matchid,\
                       participant['championId'],\
                       participant['teamId'],\
                       participant['stats']['magicDamageDealtToChampions'],\
                       participant['stats']['totalDamageDealtToChampions'],\
                       participant['stats']['item0'],\
                       participant['stats']['item1'],\
                       participant['stats']['item2'],\
                       participant['stats']['item3'],\
                       participant['stats']['item4'],\
                       participant['stats']['item5'],\
                       participant['highestAchievedSeasonTier']))
        count = count + 1
def main():
    file_handles = []
    try:
        for root, subFolders, files in os.walk("D:\league_5.115.14_data"):
            for f in files:
                file_handles.append(open(os.path.join(root, f)))
                insert_data(json.load(file_handles[-1]))
    finally:
        for fh in file_handles:
            fh.close()

if __name__ == "__main__":
	main()