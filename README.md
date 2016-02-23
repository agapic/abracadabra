#Abracadabra

Website displayed at http://agabra.herokuapp.com

Abracadabra was originally made for Riot Games' API Challenge for the game League of Legends in August 2015. It helps visualize the differences in win rates for items between two patches. On the homepage it states that it analyzes patch 5.11 and 5.14 only. This is true only for now. I have applied to get a production API key from Riot, and once approved, it will be for <i>every single upcoming patch</i>.

![image] (http://agabra.herokuapp.com/img/homepage.png)

# Implementation

The current working version was developed using the "PEAN" stack" (Postgres, Express, Angular, and Nodejs). I've transitioned into deploying it on Heroku now as Dokku was causing more headaches than necessary. 

## Build it

If you're interested in using Abracadabra for your own <i>personal</i> use, you're free to do so.

1. Run `npm install` to get the necessary nodejs modules.
2. Add a file `connection.js` in `/config` with the template shown below. In addition, will need to configure Postgres locally. 
   
  ```var connectionString = process.env.DATABASE_URL || 'postgres://postgres:<your password>@localhost:5432/<your-db-name>';
    exports.connection = connectionString;```
3. Run `insertStaticData.py`, `insertDatabase.py`, and `fetchData.py`. Static items such as champions and items will be inserted into the database followed by the 4 million match records. Finally, `fetchData.py` makes queries to the database and stores them into JSON files for easy access. The data is accessible in query_results. Be sure to change the paths in `insertDatabase.py` as well so that it points to `/data/original_data`. 

In the event that I missed anything -- please don't hesitate to let me know.
 
## Database
![image] (http://agabra.herokuapp.com/img/db_relationships.png)

The database was made in Postgres and indices were created on the tables in order to optimize the queries. I find query optimization to be very important, especially when dealing with large amounts of data.

### Sample queries

#### For item 3285, return a list of all the champions and each of their six item slots for all ranked matches in version 5.14.
Additionally, scrap all champions that have 0 total wins over all slots.

    SELECT c.name, *
    FROM  (
       SELECT p.champion_id
            , count(p.item0 = 3285 OR NULL)::int2 AS it0
            , count(p.item1 = 3285 OR NULL)::int2 AS it1
            , count(p.item2 = 3285 OR NULL)::int2 AS it2
            , count(p.item3 = 3285 OR NULL)::int2 AS it3
            , count(p.item4 = 3285 OR NULL)::int2 AS it4
            , count(p.item5 = 3285 OR NULL)::int2 AS it5
       FROM   matchversion   mv  
       CROSS  JOIN matchtype mt
       JOIN   match          m  USING (matchtype_id, matchversion_id)
       JOIN   participant    p  USING (match_id)
       WHERE  mv.matchversion = '5.14'
       AND    mt.matchtype = 'RANKED_SOLO_5x5'
       AND    p.winner = True
       GROUP  BY p.champion_id
       HAVING count(p.item0 = 3285 OR NULL)::int2 > 0
       OR count(p.item1 = 3285 OR NULL)::int2 > 0
       OR count(p.item2 = 3285 OR NULL)::int2 > 0
       OR count(p.item3 = 3285 OR NULL)::int2 > 0
       OR count(p.item4 = 3285 OR NULL)::int2 > 0
       OR count(p.item5 = 3285 OR NULL)::int2 > 0
       ) p
    JOIN  champion c USING (champion_id);




