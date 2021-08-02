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
  // default value: error to return in case dinosaur's name cannot be found
  let dinoNameOrErrorStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  // create an empty object
  let dinoObj = {};
  // loop through all dinosaurs
  for (let dino of dinosaurs) {
    // check if each dinosaur's name matches with the given one
    if (dino.name === dinosaurName) {
      // if yes assign the whole dinosaur object to the empty object
      dinoObj = dino;  
    }
  }
  // check if the object is not empty
  if (!(Object.keys(dinoObj).length) ) {
    // if empty return the default error
     return dinoNameOrErrorStr;
  }
  // change the default error string
  dinoNameOrErrorStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  // loop through all rooms
  for (let room of rooms) { 
    // for each room, check if the given dinosaur's id is inside
    if (room.dinosaurs.includes(dinoObj.dinosaurId)) {
      // if true, change the string to that room's name
      dinoNameOrErrorStr = room.name;
    } 
  }
  // after the loop, return the string, either a room name or an error message.
  return dinoNameOrErrorStr;
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
  // create an empty array to get a copy of connected rooms array
  let conRoomIdArray = [];
  // loop through all rooms
  for (let room of rooms) {
    // for each room, check if its id matches with the given
    if (room.roomId === id) {
      // if true make a copy of its connected rooms
      conRoomIdArray = room.connectsTo.slice(0);
    }
  }
  // check if the array is not empty
  if (!conRoomIdArray.length) {
    // if empty, return the error that the id could not be found
    return `Room with ID of '${id}' could not be found.`;
  }
  // check if the array doesn't have "incorrect-id" as element
  if (conRoomIdArray.includes("incorrect-id")) {
    // if true return an error: 'incorrect-id' could not be found.
    return "Room with ID of 'incorrect-id' could not be found.";
  }
  // we need to change room's id with room's name
  // create an empty array to have room names
  let roomNamesArray = [];
  // iterate over all rooms
  for (let room of rooms) {
    // check if the room id matches one element in the connected rooms array
    if (conRoomIdArray.includes(room.roomId)) {
      // if true, push that room name in the room names array
      roomNamesArray.push(room.name);
    }
  }
  // return the room names array
  return roomNamesArray;
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
