#<a href = "http://abra.agapic.xyz">abracadabra</a>

Website displayed at http://abra.agapic.xyz

Abracadabra was originally made for Riot Games' API Challenge for the game League of Legends. However, due to the unfortunate circumstances that it was started late, the final version was unable to be released in time for the deadline. As such, it is more of an experiment of my own to learn Node.js, Postgres, and Handlebars.js. In addition, I dealt with the common headaches faced when working with async javascript (this was my first time using javascript essentially), and gained a deeper understanding as to how important it is to choose the right tool for the job. 

With respect to the application itself, Abracadabra [a pun on magic damage] analyzes two major gameplay aspects for League of Legends: champion winrates for the sixteen relevant magic items that were changed in a major patch [5.11-5.14], and damage/winrate statistics for each champion. You can filter by region and by ranked/normal. One neat aspect of the application is that it visually displays WHEN the items were bought, thus bringing some form of temporal analysis into the picture. I found this important, as it provides an even deeper understanding of the effects.

<h4>What is Abracadabra?</h4>

Simple. Abracadabra is a League of Legends application that analyzes gameplay changes over 2 major patches. It was made with <b>Node.js, Postgres, Python, Handlebars, Express, and Async. </b>  Specifically, it analyzes the ability power items (or <b>magic</b> items, hence abracadabra) that were changed between patches 5.11 and 5.14. The inspiration came from Riot Games' (which owns League of Legends) API challenge 2.0. I had only learned about the challenge just a few days before the deadline, so I wasn't able to get the final product ready by then. Despite this, I continued hacking away at it. 
<br>

There were many headaches involved with the making of this app, mainly with the async nature of Javascript/Node. But, you live and learn. There were things that needed to be done synchronously in this application, and rather than having a pentillion callbacks, I decided to just hack a quick python script together, and voila. You learn how important it is to have the right tool for the right job at your exposure.
<br>

<h4>Features</h4>
A quick rundown on the features:

<b>`items`</b> lets you select from the 16 major ability power items that were changed. You can filter by region or game type and it shows the data visually for champions in order of the largest difference in winrate. In addition, it shows <em>the winrate for each individual item slot on a given champion</em>.

<b>`damage`</b> This page has an emphasis on magic damage difference over the patches, and winrate difference over the patches. Each column is sortable simply by clicking on the header.

<h4>Future Improvements</h4>

Ideally, I would like to get this working for <em>every</em> item, rather than just ability power items. With that said, I think it would be really neat if I could roll this application out on every patch, since the process is quite easy to do since I've set up all the necessary overhead. I would just need to find a way to generate the necessary sample size for matches (unless Riot provides, of course)


