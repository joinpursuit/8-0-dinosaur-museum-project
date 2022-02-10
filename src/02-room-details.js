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
  let dinosaurExist = false; //assume dinosaur no exist
  let roomExist = false; // assume room not exist
  let id = "";
  let roomName = "";

  //iterate through the dinosaurs array, looking for the given dinosaurName
  for (let dinosaur of dinosaurs) {
    if (dinosaur.name === dinosaurName) {
      dinosaurExist = true;
      id = dinosaur.dinosaurId; //if dinosaur exist, store it's id
      break;
    }
  }

  //if given dinosaurName not exist in the dinosaurs array, return error
  if (!dinosaurExist) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  //iterate through the rooms array
  for (let room of rooms) {
    //iterate through the dinosaurs array inside the room object
    for (let dinosaurId of room.dinosaurs) {
      //if the dinosaur exist in the room
      if (dinosaurId === id) {
        roomExist = true;
        roomName = room.name;
        break;
      }
    }
  }

  //if room exist, then return the room name, otherwise return an error message
  if (roomExist) {
    return roomName;
  } else {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
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
  let connectedRooms = []; //rooms connected to the given room id
  let roomIdFound = false; //assume the given room id not exist
  let allRoomIds = []; //stores all room's id

  //iterate through rooms array
  for (let room of rooms) {
    //looking for the room with the given room id
    if (room.roomId === id) {
      roomIdFound = true;
      //store the rooms id where the given room connects to
      connectedRooms = room.connectsTo;
    }
    allRoomIds.push(room.roomId); //store all room's id
  }

  //if the given roomId not exist, return an error message.
  if (!roomIdFound) {
    return `Room with ID of '${id}' could not be found.`;
  }

  //test for connected room exist
  for (let connectedRoom of connectedRooms) {
    if (!allRoomIds.includes(connectedRoom)) {
      return `Room with ID of '${connectedRoom}' could not be found.`;
    }
  }

  //convert connected room id to connected room names;
  let result = [];
  for (let room of rooms) {
    if (connectedRooms.includes(room.roomId)) {
      result.push(room.name);
    }
  }

  return result;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
