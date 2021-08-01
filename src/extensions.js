const dinosaurs = require("../data/dinosaurs");
const rooms = require("../data/rooms");

/*
  {
    "Late Jurassic": [
      "YLtkN9R37",
      "GGvO1X9Zeh",
      "BFjjLjea-O",
      "iOVNUcv-ww",
      "V53DvdhV2A",
    ],
    "Late Cretaceous": [
      "WHQcpcOj0G",
      "GKl035EYKN",
      "2GglUqKT0G",
      "Pr6kc4Q_Xf",
      "ft5Gs5izdq",
      "wuL4ddBinQ",
    ],
    // ...
  }
*/
//input: Object array
//Output: Object[Object:[array]]
//Could prob include errors for invalid array or missing parameters
function organizeDinosaursByPeriod(dinosaurs){
    let result = {}
    for (let dino of dinosaurs){
        if (!Object.keys(result).includes(`${dino.period}`)){
            result[dino.period] = []
        }
        result[dino.period].push(dino.dinosaurId)
    }
    return result
}

console.log(organizeDinosaursByPeriod(dinosaurs),'\n')


//Input: array of strings
//Output: Names of rooms passed/False
function isConnected(current, next, rooms){
    for (let room of rooms){
        if (room.roomId === current){
            if (room.connectsTo.includes(next)){
                return true
            }
        }
    }
    return false
}

function validateMuseumPath(path, rooms){
    //starting room from id
    let sequence = ''
    let lastRoom
    for (let room of rooms){//this room check could probably also be a helper function
        if (path[0] === room.roomId){
            sequence += room.name
            lastRoom = path[0]
        }
    }
    if (!lastRoom){return 'Invalid room: ' + path[0]}
    for (let i = 1; i < path.length; i++){
        if (!isConnected(path[i-1],path[i],rooms)){
            let flag = false
            for (let room of rooms){
                if (path[i] === room.roomId){
                    sequence += ' -X-> ' +room.name
                    flag = true
                }
            }
            if (flag){//Doesn't work with first index erroe
                return false, 'Invalid path: ' +sequence
            }else{
                return false, 'Invalid room: ' + path[i]
            }
        }else{
            for (let room of rooms){
                if (path[i] === room.roomId){
                    sequence += ' -> ' +room.name
                    lastRoom = path[i]
                }
            }
        }
    }
    return  'Valid Path: ' + sequence
}

const valid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
console.log(validateMuseumPath(valid,rooms),'\n'); //> true

const invalid1 = ["aIA6evTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"];
console.log(validateMuseumPath(invalid1,rooms),'\n'); //> false

const invalid = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];
console.log(validateMuseumPath(invalid,rooms),'\n\n'); //> false


//Input: string or array of strings
//Ouput: string
function ticketExtraDetails(extras, rooms){
    let exRooms = []
    let exDinos = []
    if (Array.isArray(extras)){
        for (room of rooms){
            for (let extra of extras){
                if (room.requiredTicketPermissions.includes(extra)){
                    if (!exRooms.includes(room)){
                        exRooms.push(room)
                        for (let dino of room.dinosaurs){
                            if (!exDinos.includes(dino)){
                                exDinos.push(dino)
                            }
                        }
                    }
                }
            }
        }
    }else{
        for (let room of rooms){
            if (room.requiredTicketPermissions.includes(extras)){
                if (!exRooms.includes(room)){
                    exRooms.push(room)
                    for (let dino of room.dinosaurs){
                        if (!exDinos.includes(dino)){
                            exDinos.push(dino)
                        }
                    }
                }
            }
        }
    }
    if(exDinos.length>0){
        return `If you purchase this extra ticket you will gain access to ${exRooms.length} more ${exRooms.length>1? 'rooms':'room'} and see ${exDinos.length} more dinosaurs!`
    }else{
        return `If you purchase this extra ticket you will gain access to ${exRooms.length} more ${exRooms.length>1? 'rooms':'room'}!`
    }
}

console.log(ticketExtraDetails("education",rooms),'\n');
//> "If you purchase this ticket extra you will gain access to 2 more rooms and see 2 more dinosaurs!

console.log(ticketExtraDetails("terrace",rooms),'\n');
//> "If you purchase this ticket extra you will gain access to 1 more room!

console.log(ticketExtraDetails(["education", "terrace"],rooms));
//> "If you purchase this ticket extra you will gain access to 3 more rooms and see 2 more dinosaurs!

console.log(ticketExtraDetails(['education','terrace','movie'],rooms))