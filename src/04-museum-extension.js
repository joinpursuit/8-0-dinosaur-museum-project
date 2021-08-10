/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleDinosaurData`, `exampleRoomData` or `exampleTicketData` variable below to to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
const exampleTicketData = require("../data/tickets");
// Do not change the line above.

/**
 * organizeDinosaursByPeriod()
 * ---------------------
 * Returns an object that will organize all of the dinosaurs by their period key. 
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {string} key - An optional parameter that, when set to a key inside of an individual dinosaur object, will return that value inside of the array instead of the IDs.
 * @returns {Object} An object of keys and values, which depend on the key given.
 *
 * EXAMPLE:
 *  const result = organizeDinosaursByPeriod();
    console.log(result);
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

function organizeDinosaursByPeriod(dinosaurs, key) {
  //1. Default Value and output
  //Handling default statements: 
  //when you don't know if you're given a key value (parameter) 
  //or a key value (parameter) is optional
  //give it a default value, based on the example given in md file 
  // Short-circuiting Code - takes the first truthy OR it's DEFAULT
  
  let objectByPeriod = {}
  
  
  for (let dinosaur of dinosaurs) {
    key = key || Object.keys(dinosaur)[0]
    objectByPeriod[dinosaur.period] = objectByPeriod[dinosaur.period] || []
    objectByPeriod[dinosaur.period].push(dinosaur[key])
      // careful with assigning a single variable as the Objectkeys values
      // having it set up this way means that the reference is the same for each object key, thus giving same result

    } 
  
   return objectByPeriod

}

// console.log(organizeDinosaursByPeriod(exampleDinosaurData, 'name'))


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


function validateMuseumPath(idArray, rooms, key) {
  let result = false
  let newArray = []

  let i = 0
  let index = 0
  while (i < idArray.length) {
    while (index < rooms.length) {
      room = rooms[index]
      if (idArray[i] === room.roomId) {
        i++
        if (room[key]) {
          newArray.push(room[key])
          result = newArray.join(" -> ")
        }
        if (room.connectsTo.includes(idArray[i])) {
          index = 0
          result = true
          break;
        } else if (i === idArray.length - 1 && !room.connectsTo.includes(idArray[i])) {
          return false
        } 
      } else {
      index++
    }
  }
}

  return result
}

// const idArray = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "0eNtkY5WoA"]
//> True 

const idArray = ["aIA6tevTne", "A6QaYdyKra", "L72moIRcrX", "dpQnu5wgaN"];
//> False 

// console.log(validateMuseumPath(idArray, exampleRoomData, 'name'))


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


function perTicketRoom (element, rooms, roomCount) {
  for (let room of rooms) {
    if (room.requiredTicketPermissions.includes(element)) {
      roomCount += 1
      }  
    }
    return roomCount
}

function perTicketDinosaur (element, rooms, dinosaurCount) {
  for (let room of rooms) {
    if (room.requiredTicketPermissions.includes(element)) {
      dinosaurCount += room.dinosaurs.length
    }
  }
  return dinosaurCount
}

let roomCount = 0
let dinosaurCount = 0
let result = ""

function ticketExtraDetails(extraString, rooms) {
  
  if (typeof extraString === 'object' && typeof extraString.length === 'number') {
    extraString.forEach(string => roomCount = perTicketRoom(string, rooms, roomCount))
    extraString.forEach(string => dinosaurCount = perTicketDinosaur(string, rooms, dinosaurCount))
    roomCount === 1 ? roomString = `${roomCount} more room` : roomString = `${roomCount} more rooms` 
    dinosaurCount === 1 ? dinosaurString = `${dinosaurCount} more dinosaur` : dinosaurString = `${dinosaurCount} more dinosaurs` 
    if (dinosaurCount) {
      result = `If you buy this ticket extra, you will have access to ${roomString} and see ${dinosaurString}!`
    } else {
      result = `If you buy this ticket extra, you will have access to ${roomString}!`
    }     
  } else {
    for (let room of rooms) {
      if (room.requiredTicketPermissions.includes(extraString)) {
        roomCount += 1
        roomCount === 1 ? roomString = `${roomCount} more room` : roomString = `${roomCount} more rooms` 
        dinosaurCount += room.dinosaurs.length
        dinosaurCount === 1 ? dinosaurString = `${dinosaurCount} more dinosaur` : dinosaurString = `${dinosaurCount} more dinosaurs` 
        if (dinosaurCount) {
          result = `If you buy this ticket extra, you will have access to ${roomString} and see ${dinosaurString}!`
        } else {
          result = `If you buy this ticket extra, you will have access to ${roomString}!`
        }     
      }
    }
  }


  return result
  
}

// console.log(ticketExtraDetails(['education', 'terrace'], exampleRoomData))
// console.log(ticketExtraDetails('movie', exampleRoomData))
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////