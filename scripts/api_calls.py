import os, os.path
import requests
import json

def main():
    dirname = os.path.dirname
    for root, _, files in os.walk("D:\\5.14"):
        for f in files:
            print f
            fullpath = os.path.join(root, f)
            print fullpath
            if os.path.getsize(fullpath) < 3 * 1024:
                matchId = open('D:\\abracadabra\\5.14\\'+os.path._abspath_split(root)[2][1]+'\\'+os.path._abspath_split(root)[2][2]+'.json')
                for i,line in enumerate(matchId):
                    if (i == int(f.split('.')[0])+1):
                        if(line[-3:-2]==","):
                            line = line[0:-3]
                            keyfile = open('../data/api_key.txt')
                            key = keyfile.read()
                        r = requests.get("https://"+(os.path._abspath_split(root)[2][2]).lower()+".api.pvp.net/api/lol/"+(os.path._abspath_split(root)[2][2]).lower()+"/v2.2/match/"+ line + "?api_key=" + key + '"')
                        if(r.status_code == 200):
                            file = open(fullpath, 'w+')
                            file.write(r.content)
                            file.close()
                            break





if __name__ == "__main__":
	main()