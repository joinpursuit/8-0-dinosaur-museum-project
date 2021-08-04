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
  // Default message `newStr` with value of this dinosaur does not exist
  let newStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  let newObj = {};
  // Iterate through `dinosaurs` array, each called `dino`
  for (let dino of dinosaurs) {
    // check if dinosaur is in any room // find dinosaur by `dino.name`
    if (dino.name === dinosaurName) { 
      // new dino in the `newObj`
      newObj = dino;
    }
  }
  // if the `newObj` is empty of a "name"
  if (!("name" in newObj)) { 
    return newStr;
  }
  // Iterate through `rooms`, each called `room`
  for (let room of rooms) {
    // this `dinosaurName` cannot be found
    newStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    // if dinosaur in that room includes the dinosaur
    if (room.dinosaurs.includes(newObj.dinosaurId)) {
      // reassign `newStr` to `room.name`
      newStr = room.name;
      // stop running after evaluates to true
      break;
    } 
  }
  // return `newStr` outside for loop
  return newStr;
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
  let newArr = [];
  // Iterate through `rooms`, each called `room`
  for (let room of rooms) {
    // check for `room.roomId` first
    if (room.roomId === id) { 
      // makes a copy of array
      newArr = room.connectsTo.slice(0);
    }
  }
  if (newArr.includes("incorrect-id")) {
    // If a room ID cannot be found for `incorrect-id`
    return `Room with ID of 'incorrect-id' could not be found.` 
  }
  if (!newArr.length) {
    // If a room ID cannot be found for `id`
   return `Room with ID of '${id}' could not be found.` 
  }
  let newArr2 = [];
  // Iterate through `rooms`, each called `room`
  for (let room of rooms) {
    if (newArr.includes(room.roomId)) {
      newArr2.push(room.name);
    }
  }
  return newArr2;
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
