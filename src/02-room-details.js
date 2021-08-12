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
  let dinoName = '';
  for (let dino of dinosaurs) {
    if (dino.name.includes(dinosaurName)) {
      dinoName = dino.dinosaurId;  
    }
  } 
  // If statement to check for !dinoName, return an error message if the dinosaur cannot be found at all.
  if (!dinoName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  // Return the name of the room where the given dinosaur can be found.

  // Declare a variable to hold the loop results.
  let roomName = '';
  // Create a for..of loop to iterate through the room arrays to find the name of the room for the specified dinosaurName.
  for (let room of rooms) {
    if (room.dinosaurs.includes(dinoName)) {
      return room.name;
    }
  }
  // If statement to return #4 error message when the dinosaur cannot be found in any room
  if (!roomName) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
}

 // RoomByDinosaurName();
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
function getConnectedRoomNamesById(rooms, id) {}
  // Input: array, which contains room objects.
  // // Output: 
  // 1- array of room names, displayed in a string. 
  // 2- IF room ID can't be found, return an error message: `Room with ID of 'incorrect-id' could not be found.` 
//   let roomIdName;
//   // Create a loop to iterate through the array. 
//   for (let room of rooms) {
//     roomIdName[room.roomId] = room.name
//   }
//   if (roomIdName[id]) {
//     return `Room with ID of '${id}' could not be found.`
//   }

// }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
