import os
import requests
import json
import psycopg2
import random
import time
import itertools

# def items(cur):
#     req = requests.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/item?api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2")
#     if req.status_code != 200 : return
#     req = req.json()
#     for item in req['data'].itervalues():
#         name = item['name']
#         if "'" in name: name = name.replace("'", "'\'")
#         cur.execute("INSERT INTO item (item_id, name) VALUES (%s, '%s');"
#                     % (item['id'], name))
#     return
#
# def champions(cur):
#     req = requests.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=1d5f1693-a941-4bd9-bcba-8ad09dbb32a2")
#     if req.status_code != 200 : return
#     req = req.json()
#     for champion in req['data'].itervalues():
#         name = str(champion['name'])
#         if "'" in name:
#             name = name.replace("'", "''")
#         cur.execute("INSERT INTO champion (champion_id, version, name) VALUES (%s, '%s', '%s');"
#                     % (champion['id'], req['version'], name))
#     return

def main():
    champions = open("champions.txt")
    for champ in champions:
        champ = champ[0:-1]
        str = "select c.name , item.name, item.item_id    , count(p.item0 = #\
     OR NULL)::int2 AS it0     , count(p.item1 = #\
     OR NULL)::int2 AS it1      , count(p.item2 = #\
     OR NULL)::int2 AS it2      , count(p.item3 = #\
     OR NULL)::int2 AS it3      , count(p.item4 = #\
     OR NULL)::int2 AS it4      , count(p.item5 = #\
     OR NULL)::int2 AS it5      from participant p\
       JOIN champion c using (champion_id)\n\
       JOIN item on item.item_id = #\n\
       WHERE c.name = \'?\'\n\
       GROUP BY c.name, item.name, item.item_id"
        str = str.replace("?", champ)

        file = open("items.txt")
        newFile = open('sanitize_by_champion/' + champ + ".txt", "w+")
        query = ''
        for line in file:
            query = query + "\nUNION ALL\n" + str.replace("#", line)
        newFile.write(query)
        newFile.close()




    # file = open("../config/connection.js")
    # line = file.read()
    # words = line.split()
    # conn_string = (words[5][1:-2])
    # conn = psycopg2.connect(conn_string)
    # cur = conn.cursor()
    # items(cur)
    # #champions(cur)
    # conn.commit()
    # cur.connection.close()

if __name__ == "__main__":
	main()