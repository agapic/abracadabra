module.exports = {
    convert: function champIdToName(number){
        var champs = {
        "35":"Shaco",
        "36":"DrMundo",
        "33":"Rammus",
        "34":"Anivia",
        "37":"Sona",
        "38":"Kassadin",
        "154":"Zac",
        "43":"Karma",
        "42":"Corki",
        "40":"Janna",
        "201":"Braum",
        "24":"Jax",
        "25":"Morgana",
        "26":"Zilean",
        "27":"Singed",
        "28":"Evelynn",
        "3":"Galio",
        "161":"Velkoz",
        "1":"Annie",
        "7":"Leblanc",
        "30":"Karthus",
        "32":"Amumu",
        "31":"Chogath",
        "4":"TwistedFate",
        "9":"FiddleSticks",
        "8":"Vladimir",
        "19":"Warwick",
        "17":"Teemo",
        "16":"Soraka",
        "13":"Ryze",
        "12":"Alistar",
        "20":"Nunu",
        "105":"Fizz",
        "103":"Ahri",
        "99":"Lux",
        "101":"Xerath",
        "96":"KogMaw",
        "90":"Malzahar",
        "10":"Kayle",
        "89":"Leona",
        "79":"Gragas",
        "117":"Lulu",
        "78":"Poppy",
        "115":"Ziggs",
        "112":"Viktor",
        "113":"Sejuani",
        "111":"Nautilus",
        "432":"Bard",
        "245":"Ekko",
        "82":"Mordekaiser",
        "81":"Ezreal",
        "84":"Akali",
        "85":"Kennen",
        "69":"Cassiopeia",
        "127":"Lissandra",
        "68":"Rumble",
        "72":"Skarner",
        "74":"Heimerdinger",
        "75":"Nasus",
        "76":"Nidalee",
        "134":"Syndra",
        "57":"Maokai",
        "55":"Katarina",
        "63":"Brand",
        "268":"Azir",
        "267":"Nami",
        "60":"Elise",
        "131":"Diana",
        "61":"Orianna",
        "143":"Zyra",
        "45":"Veigar",
        "44":"Taric",
        "53":"Blitzcrank",
        "54":"Malphite",
        "50":"Swain"
    }
        if(number === "inject"){
            return Object.keys(champs).length;       
        }
        
        if(number === "champList"){
            return champs;
        }
       
        if(!champs[number]){
            throw error;
        }
        else{
    return champs[number];
        }
    }
    
    
};

