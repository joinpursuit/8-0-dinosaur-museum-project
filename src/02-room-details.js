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

  let theId = ""; // a string expected,

  for ( let dino of dinosaurs) { // I am sooooo happy to have found this way of getting through an array, super simple i love it. this is definining individual indexes of the dinosaurs loop, and making loop go through the entire array 

    if (dino.name === dinosaurName){ // if the specific key name of rando index in dinosaurs array is strictly equal to the provided dinosaur name 

      theId = dino.dinosaurId; // then the string required will be redefined to equal the dinosaur Id of that specific index 
    }
  }

  if (theId !== ""){ 

    for (let room of rooms){ // another loop to go through the array of rooms 

      if (room.dinosaurs.includes(theId)){ // if TheId is included in the dinosaurs array of the rooms array 
        return room.name; // then the name of that particular room is to be returned 
      }
    }
  }
  else{ // otherwise 

    return `Dinosaur with name '${dinosaurName}' cannot be found.` // the error code that it cannot be found in that room is to be returned 
  }

  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.` // if all if statements are false, then the dinosaur cannot be found anywhere 
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
  let roomNames = [] //definind array to be returned 

  for (let room of rooms) { // loop to go through each index of the rooms array 
    if (room.roomId === id) { // if specific room id of room does not strictly equal the id provided 
      roomNames.push(room.name) // then the name of the room to be pushed into the array 
    }

    else {
      roomNames = `Room with ID of 'incorrect-id' could not be found.` // else error code to be returned 
    }

  } return roomNames // returning array requested 
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
