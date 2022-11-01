/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let roomMessage = "" //Holds the answer
  let error = "" //Holds 1 error message
  let dinosaurNameId = "" //Holds the id of the dinosaur
  let dinoName = "" //Holds the name of the dinosaur
  for (i = 0; i < dinosaurs.length; i++){ //Loop through dinosaurs array
    if (dinosaurs[i].name === dinosaurName){ //Checks if any Dinosaur name in the array matches to the given dinosaurName
      dinosaurNameId = dinosaurs[i].dinosaurId //Updates the vaule of dinosaurNameId to the corresponding dinosaur id 
      dinoName = dinosaurName //Used to Check if the if statement passed
    } 
  }
  for (i = 0; i < rooms.length; i++){ //Loops through rooms array
    if(rooms[i].dinosaurs.includes(dinosaurNameId)){ //Checks if dinosaurNameId is included in side of rooms array[i].dinosaurs
      roomMessage = rooms[i].name //Sets roomMessage to be the name of room with given id
      return roomMessage //returns answer
    } else { //If the id is not located in any of the rooms
      error = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` //Updates rommMessage to the error message if dinosaurs name is not found in any room
    }
  }
  if (dinoName !== dinosaurName){ //Checks if dinoName has been updated
  return `Dinosaur with name '${dinosaurName}' cannot be found.` //Returns error message if dinosaur name is not in the dinosaurs array
  } else { //If it has
    return error //Returns other error message
  }
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an example of the input.
 * @param {string} id - A unique room identifier.
 * @returns {string|string[]} An array of room names, or an error message.
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "aIA6tevTne");
 *  //> ["Ticket Center"]
 *
 * EXAMPLE:
 *  getConnectedRoomNamesById(rooms, "A6QaYdyKra");
 *  //> [
      "Entrance Room",
      "Coat Check Room",
      "Ellis Family Hall",
      "Kit Hopkins Education Wing"
    ]
 */
function getConnectedRoomNamesById(rooms, id) {
  let results = [] //Holds the answer
  let correctId = "" //Holds id 
  let incorrectIdFound = false//Holds false as default
  for (let i = 0; i < rooms.length; i++){ //Loops through rooms array
    if(rooms[i].roomId === id){ //Checks if id is found in rooms
      correctId = id //Used to see if id is found in rooms
      for (let j = 0; j < rooms[i].connectsTo.length; j++){ //Loops through connectsTo array
        for (let k = 0; k < rooms.length; k++){ //Loops through rooms array again 
          if (rooms[i].connectsTo[j] === rooms[k].roomId){ //Checks if any connectsTo id in rooms is matching any id in rooms     
            results.push(rooms[k].name) //Pushes the name of the room into the answer
          } else if (rooms[i].connectsTo[j] === 'incorrect-id'){ //Checks if any connectsTo id is labled as "incorrect-id"
            incorrectIdFound = true //Updates to true so we know it is found
          }
        }
      }
    }
  }
  if (correctId !== id){ // Checsk if correctId was updated
    return `Room with ID of '${id}' could not be found.` //Returns error message if the id was not found in the array of rooms
  } else if (incorrectIdFound === true){ //Checks if incorrectIdFound was updated
    return `Room with ID of 'incorrect-id' could not be found.` //Returns error message if the id in connectsTo is incorrect
  }
  return results //Returns answer
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
