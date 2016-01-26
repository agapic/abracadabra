import os
import requests
import json
import psycopg2
import random
import time
import itertools

def items(cur):
    req = requests.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2")
    if req.status_code != 200 : return
    req = req.json()
    for item in req['data'].itervalues():
        name = item['name']
        if "'" in name: name = name.replace("'", "'\'")
        cur.execute("INSERT INTO item (id, name) VALUES (%s, '%s');"
                    % (item['id'], name))
    return

def champions(cur):
    req = requests.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2")
    if req.status_code != 200 : return
    req = req.json()
    for champion in req['data'].itervalues():
        name = str(champion['name'])
        if "'" in name:
            name = name.replace("'", "''")
        cur.execute("INSERT INTO champion (champion_id, version, name) VALUES (%s, '%s', '%s');"
                    % (champion['id'], req['version'], name))
    return

def main():
    file = open("../config/connection.js")
    line = file.read()
    words = line.split()
    conn_string = (words[5][1:-2])
    conn = psycopg2.connect(conn_string)
    cur = conn.cursor()
    #items(cur)
    champions(cur)
    conn.commit()
    cur.connection.close()

if __name__ == "__main__":
	main()