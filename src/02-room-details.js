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
  let dinosaurId = "";

  for (let dinosaur of dinosaurs) {
    if (dinosaurName === dinosaur.name) {
      dinosaurId = dinosaur.dinosaurId;
      break;
    }
  }
  if (!dinosaurId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  } // Validates existance of dinosaurName in dinosaurs array

  for (let room of rooms) {
    if (room.dinosaurs.includes(dinosaurId)) {
      return room.name;
    } // Validates existance of dinosaurName in the first room where it is encountered and returns that room name
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
} // If dinosaurName is not found in any room it returns this error message

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
  let connectedRooms = [];

  function roomValidator(rooms, id) {
    let existingRooms = [];
    for (let room of rooms) {
      existingRooms.push(room.roomId);
    }
    if (!existingRooms.includes(id)) {
      return `Room with ID of '${id}' could not be found.`;
    }

    for (let room of rooms) {
      if (id === room.roomId) {
        connectedRooms = room.connectsTo;
      }
      for (let connectedRoom of connectedRooms) {
        if (!existingRooms.includes(connectedRoom)) {
          return `Room with ID of '${connectedRoom}' could not be found.`;
        }
      }
    }
  }
  // Validates whether the id parameter is an existing room of the rooms array
  // If it exists then validates that its connected rooms also exist within the rooms array
  const validator = roomValidator(rooms, id);
  if (validator) {
    return validator;
  }

  function createConnectedRoomNamesArray(rooms, id) {
    for (let room of rooms) {
      if (id === room.roomId) {
        connectedRooms = room.connectsTo;
      }
    }
    for (let i = 0; i < connectedRooms.length; ++i) {
      for (let room of rooms) {
        if (connectedRooms[i] === room.roomId) {
          connectedRooms[i] = room.name;
        }
      }
    }
    return connectedRooms;
  }
  // Creates an area of the connected rooms to the specified room
  // Changes the elements in the cretaed array from codes to names
  connectedRooms = createConnectedRoomNamesArray(rooms, id);

  return connectedRooms;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
