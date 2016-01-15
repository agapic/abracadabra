
import os
import requests
import json
import psycopg2
import random
import time

def main():
    time_between_requests = 600/float(500)
    req_counter = 0
    summoner_id = '31609245'
    read_key = '1d5f1693-a941-4bd9-bcba-8ad09dbb32a2'
    r = requests.get("https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + summoner_id + "?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=" + read_key)
    req_counter += 1
    time.sleep(time_between_requests)
    if(r.status_code != 200):
        return
    r = r.json()
    while True:
        try:
            query_db("UPDATE gold_summoner_id SET summoner_id=summoner_id WHERE summoner_id=%s;" % summoner_id +
                  "INSERT INTO gold_summoner_id (summoner_id) "+
                  "SELECT %s" % summoner_id +
                  "WHERE NOT EXISTS (SELECT 1 FROM challenger_summoner_id WHERE summoner_id=%s);" % summoner_id)
            for i in r["matches"]:
                m_id = i["matchId"]
                query_db("UPDATE gold_match_id SET match_id=match_id WHERE match_id=%s;" % m_id +
                         "INSERT INTO gold_match_id (match_id) "+
                         "SELECT %s" % m_id +
                         "WHERE NOT EXISTS (SELECT 1 FROM challenger_match_id WHERE match_id=%s);" % m_id)

            random_match = str(r["matches"][random.randint(0,r["totalGames"]-1)]["matchId"])
            match_req = requests.get("https://na.api.pvp.net/api/lol/na/v2.2/match/"+random_match+"?api_key=" + read_key)
            time.sleep(time_between_requests)
            if(match_req.status_code != 200):
                continue
            match_req = match_req.json()
            summoner_id = str(match_req["participantIdentities"][random.randint(0,9)]["player"]["summonerId"])
            r = requests.get("https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/" + summoner_id + "?rankedQueues=RANKED_SOLO_5x5&seasons=SEASON2015&api_key=" + read_key)
            if(r.status_code != 200):
                continue
            r = r.json()
            req_counter += 1
            print req_counter
            time.sleep(time_between_requests)
        except TypeError:
            return


def query_db(query):
    #file = open("../data/database_create/connection.js")
    #line = file.read()
    #words = line.split()

    #conn_string = (words[5][1:-2])
    #conn = psycopg2.connect(conn_string)
    conn = psycopg2.connect("postgres://postgres:$31=$1@159.203.43.207:5432/abra")
    cur = conn.cursor()
    cur.execute(query)
    conn.commit()
    cur.connection.close()

if __name__ == "__main__":
    while True:
        main()

