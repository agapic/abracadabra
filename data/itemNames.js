module.exports = {
    convert: function itemIdToName(number){
        var items = {
            "1026":"Blasting Wand",
            "1058":"Needlessly Large Rod",
            "3089":"Rabadon\'s Deathcap",
            "3157":"Zhonya\'s Hourglass",
            "3285":"Luden\'s Echo",
            "3116":"Rylai\'s Crystal Scepter",
            "3003":"Archangel\'s Staff",
            "3040":"Seraph\'s Embrace",
            "3027":"Rod of Ages",
            "3136":"Haunting Guise",
            "3151":"Liandry\'s Torment",
            "3135":"Void Staff",
            "3115":"Nashor\'s Tooth",
            "3152":"Will of the Ancients",
            "3165":"Morellonomicon",
            "3174":"Athene\'s Holy Grail"
        }
        return items[number];    
    }
}