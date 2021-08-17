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
  let nameOfDino = "";
  let location = "";

  for (const dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      nameOfDino = dino.dinosaurId;
    }
  }
  if (nameOfDino === "")
    return `Dinosaur with name '${dinosaurName}' cannot be found.`; // single line

  for (const room of rooms) {
    if (room.dinosaurs.length !== 0) {
      for (const i2 of room.dinosaurs) {
        if (i2 === nameOfDino) {
          location = room.name;
        }
      }
    }
  }

  if (location === "")
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;

  return location;
}
// getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus")
/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. 
 * If a room ID cannot be found, an error message is returned.
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
  // return an array of room names or an error message
  let toConnected = [];

  for (const room of rooms) {
    // ---------------Loop starts here
    // Look through rooms
    if (room.roomId === id) {
      // IF the inputted id is valid

      for (const i of room.connectsTo) {
        //------------------------------- Inside the loop rooms
        // Loop through element of the array 'connectsto'
        let check = false; // Declare a variable to check i matches with room.roomId later
        for (const room of rooms) {
          // Loop through rooms again to check if i from connectsTo matches with any roomId
          if (i === room.roomId) {
            // Check if i is found in rooms
            toConnected.push(room.name); // IF it is, push room's name to the array
            check = true; // IF it is, reassign check's value to true
          }
        }
        if (!check) return `Room with ID of '${i}' could not be found.`; // IF check is not true, it will return this message
      }
      return toConnected;
    }
  }
  return `Room with ID of '${id}' could not be found.`;
}
// console.log(getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra"));

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
