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
  let dinosaurAvailability = `Dinosaur with name '${dinosaurName}' cannot be found.`;

  for (let room of rooms) {
    for (let dinosaur of dinosaurs) {
      // This nested loop goes through the whole dinosaurs array first, for each room, in order to find the dinosaurName there first

      if (dinosaur.name === dinosaurName) {
        // If the dinosaur exists in the dinosaurs array then we can get its ID code and use it to search for it in the rooms array

        dinosaurAvailability = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
        // Reassigns the default statement before even searching in the rooms array in case it can't be found in any room

        if (room.dinosaurs.includes(dinosaur.dinosaurId)) {
          return room.name; // Returns room name if dinosaur is found in rooms array too
        }
      }
    }
  }
  return dinosaurAvailability;
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
  let connectedRooms = []; // Default accumulator value and type for final output array of connected rooms
  let existingRooms = []; // Empty array that will hold all possible rooms

  for (let room of rooms) {
    existingRooms.push(room.roomId);
    // Iterates through all possible rooms and pushes each onto the existingRooms array
    if (room.roomId === id) {
      connectedRooms = room.connectsTo;
      // Iterates through each room and pushes the "rooms.connectsTo" array of the room matching the "id" parameter into the connectedRooms accumulator
    }
  }

  if (!existingRooms.includes(id)) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // Returns error message if "id" parameter does not refer to an existing room

  for (let i = 0; i < connectedRooms.length; ++i) {
    if (!existingRooms.includes(connectedRooms[i])) {
      return `Room with ID of '${connectedRooms[i]}' could not be found.`;
    }
    // Returns error message if any element of the connectedRooms array does not refer to an existing room
    for (let room of rooms) {
      if (connectedRooms[i] === room.roomId) {
        connectedRooms[i] = room.name;
        // Changes the connectedRooms array elemnts from room ID's to actual names
      }
    }
  }
  return connectedRooms;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
