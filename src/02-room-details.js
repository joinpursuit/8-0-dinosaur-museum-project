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
  let myDinoId = "";
  // Go through the dinosaurs array
  for (const dino of dinosaurs) {
    // Look for the dinosaurName passed to the function
    if (dino.name === dinosaurName) {
      myDinoId = dino.dinosaurId; // Store the ID of that dinosaur
    }
  }
  if (!myDinoId) {
    // If the dinosaur's name wasn't found...
    return `Dinosaur with name '${dinosaurName}' cannot be found.`; // ...the dinosaur passed to the function is not in the dinosaurs array.
  }

  for (const room of rooms) {
    // Go through each room.
    if (room.dinosaurs.includes(myDinoId)) {
      // If the dinosaurs array in the room includes the dino we're looking for...
      return room.name; // ...return the name of the room.
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`; // The dino is in the dinosaurs array, but not in any room.
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
  let finalRoomArray = []; // Final result array
  let holderArray = []; // Will contain every valid room ID to check against
  // Loop through the rooms
  for (const room of rooms) {
    holderArray.push(room.roomId); // add each room ID to the holder Array
    // If the current room's connected rooms array includes the id passed to the function...
    if (room.connectsTo.includes(id)) {
      finalRoomArray.push(room.name); // ...add its name to our final array.
    }
  }

  // If the id passed to the function isn't in list of valid room IDs, return an error msg
  if (!holderArray.includes(id)) {
    return `Room with ID of '${id}' could not be found.`;
  }

  // Loop through each room
  for (const room of rooms) {
    // Loop through each room's connectsTo array
    for (const connectedRoom of room.connectsTo) {
      // Check each connected room ID to see if it's valid; if it isn't return an error msg
      if (!holderArray.includes(connectedRoom)) {
        return `Room with ID of '${connectedRoom}' could not be found.`;
      }
    }
  }
  return finalRoomArray;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
