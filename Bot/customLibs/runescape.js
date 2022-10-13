const fetch = require('node-fetch')
const fs = require('fs')

const ITEM_ID_PATH = "./res/osrsItemIDs.json"
const BASE_URL = "http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item="

module.exports = {
    GetPrice : function (itemName) {
        let itemID =  GetItemID(itemName)
        console.log(itemName + " --> " + itemID)
        var returnJSON = {}

        if (itemID == -1) {
            return new Promise(() => {return -1})
        }

        let itemGETurl = BASE_URL + itemID
        return fetch(itemGETurl, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            returnJSON = { 
                "price" : data["item"]["current"]["price"],
                "trend" : data["item"]["today"]["trend"]
            }
            return returnJSON
        })
        .catch((error) => {
            console.error("Error Communicating to OSRS GE API\nERROR: " + error)
            return returnJSON
        })
    }
}

function GetItemID (itemName) {
    jsonStr_itemIDs = fs.readFileSync(ITEM_ID_PATH)
    json_itemIDs = JSON.parse(jsonStr_itemIDs)

    for (var i = 0; i < json_itemIDs.length; i++) {
        if (json_itemIDs[i]["name"].toUpperCase() === itemName.toUpperCase()) {
            return json_itemIDs[i]["id"]
        }
    }
    return -1
}