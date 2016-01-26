import os
import requests
import json
import psycopg2
import random
import time
import itertools
import requests

connection = open("../config/connection.js")
line = connection.read()
words = line.split()
conn_string = (words[5][1:-2])
conn = psycopg2.connect(conn_string)
cur = conn.cursor()

def insert_data(_file):
    try:
        matchversion = _file['matchVersion'][0:4]
        matchtype = _file['queueType']
        region = _file['region']
        count = 0
        matchid = _file['matchId']
        cur.execute("INSERT INTO matchversion (matchversion) SELECT ('%s')\
                     WHERE NOT EXISTS (SELECT * FROM matchversion WHERE matchversion='%s');"
                     % (matchversion, matchversion))
        cur.execute("INSERT INTO matchtype (matchtype) SELECT ('%s')\
                     WHERE NOT EXISTS (SELECT * FROM matchtype WHERE matchtype='%s');"
                     % (matchtype, matchtype))
        cur.execute("INSERT INTO region (region) SELECT ('%s')\
                     WHERE NOT EXISTS (SELECT * FROM region WHERE region='%s');"
                     % (region, region))
        conn.commit()
        cur.execute("INSERT INTO match (match_id, region_id, matchtype_id, matchversion_id) VALUES\
                   (%s,\
                   (SELECT region_id FROM region WHERE region='%s'),\
                   (SELECT matchtype_id FROM matchtype WHERE matchtype='%s'),\
                   (SELECT matchversion_id FROM matchversion WHERE matchversion='%s'));"
                   % (matchid, region, matchtype, matchversion))
        # Add player table in later -- using old API currently
        # while count < 10:
        #     cur.execute("INSERT INTO player (id, name) VALUES (%s, %s);"
        #                 % (_file['participantIdentities'][count]['player']['summonerId'],
        #                    _file['participantIdentities'][count]['player']['summonerName']))
        #     count = count + 1
        # count = 0

        while count < 10:
            #initialize list of all items participant uses
            participant = _file['participants'][count]
            cur.execute("INSERT INTO participant (champion_id, match_id, magic_damage_dealt_to_champions,\
                        damage_dealt_to_champions, item0, item1, item2, item3, item4, item5, winner, highestAchievedSeasonTier) VALUES\
                        ((SELECT champion_id FROM champion WHERE champion_id = %s),\
                               (SELECT match_id FROM match WHERE match_id = %s),\
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, '%s');"
                        % (participant['championId'],\
                           matchid,\
                           participant['stats']['magicDamageDealtToChampions'],\
                           participant['stats']['totalDamageDealtToChampions'],\
                           participant['stats']['item0'],\
                           participant['stats']['item1'],\
                           participant['stats']['item2'],\
                           participant['stats']['item3'],\
                           participant['stats']['item4'],\
                           participant['stats']['item5'],\
                           participant['stats']['winner'],\
                           participant['highestAchievedSeasonTier']))
            count = count + 1
        conn.commit()
    except:
        cur.execute('ROLLBACK;');
        return

def main():
    match_count = 0
    for root, subFolders, files in os.walk("/home/abra_data/"):
        for f in files:
            file = open(os.path.join(root,f))
            print root, f
            insert_data(json.load(file))
            match_count = match_count + 1
            print "Currently on match " + `match_count`
            file.close()

    conn.close()
if __name__ == "__main__":
	main()