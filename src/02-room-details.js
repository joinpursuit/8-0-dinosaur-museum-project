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
  // loop through dinosaurs
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      // loop rooms
      for (let room of rooms) {
        // loop room.dinosaurs
        for (let id of room.dinosaurs) {
          if (id === dinosaurs[i].dinosaurId) {
            // return where dino can be found
            return room.name;
          }
        }
      }
      // return if dino is no on dinosaurs array or can not be found in any room, error msg
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found.`;
}
getRoomByDinosaurName(exampleDinosaurData, exampleRoomData);

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
  // return array of names that connect to the given room
  // if room cant be found, error
  let arrNames = [];
  let connectId = [];
  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i];
    if (room.roomId === id) {
      connectId.push(...room.connectsTo);
      for (let id of connectId) {
        for (let room of rooms) {
          if (id === room.roomId) {
            arrNames.push(room.name);
          }
        }
      }
    }
  }
  if (arrNames.length !== connectId.length) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
  if (arrNames.length === 0) {
    return `Room with ID of '${id}' could not be found.`;
  }
  return arrNames;
}
getConnectedRoomNamesById(exampleRoomData);

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
