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
    // - iterate through the dinosaurs array to check if the name given exists
    for (let dino of dinosaurs) {
      if (dino.name === dinosaurName) {
        // if dinosaur name exists, then iterate over rooms and check if the room has the dinosaur identifier.
        for (let room of rooms) {
          if (room.dinosaurs.includes(dino.dinosaurId)) {
            // the room has the dinosaur id => return the name of the room.
            return room.name; 
          }
        }
        // if id does not exist in any room then an appropriate message is returned.
        return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
      }
    }
    // - dinosaur name doesn't exist in the dinosaurs array.
  return `Dinosaur with name '${dinosaurName}' cannot be found.`;
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
    // an empty array to hold connected rooms by ids
    let validRoomId = [];
    // an empty array to hold rooms by names
    let connectedRoomNames = [];
    // if the value of the given room id matches roomId, if true, then push connectsTo array into validRoomId array.
    for (const room of rooms) {
        if (room.roomId === id) {
        validRoomId = room.connectsTo;
        }
    }
    // iterate through the rooms array to check if given room id exists in validRoomId array, then push the room name into connectedRoomNames array array.
    for (const room of rooms) {
        if (validRoomId.indexOf(room.roomId) > -1) {
        connectedRoomNames.push(room.name);
        }
    }
      // if no value matching id is found or validRoomId array has "incorrect-id" value. return error.
    if (!validRoomId.length || validRoomId.includes("incorrect-id")) {
        return `Room with ID of 'incorrect-id' could not be found.`;
    
    }
  // return all rooms connected to the given room id.
  return connectedRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
