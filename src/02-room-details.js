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
  let foundRoom = "";
  let dinoId = "";
  let didNotFindStr = "";
  for (const dinosaur of dinosaurs) {
    if (dinosaur.name === dinosaurName) {
      dinoId = dinosaur.dinosaurId;
      for (const room of rooms) {
        if (room["dinosaurs"].includes(dinoId)) {
          foundRoom = room.name;
          return foundRoom;
        }
      }
    }
  }
  if (dinoId === "") {
    didNotFindStr = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  } else {
    didNotFindStr = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  return didNotFindStr;
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
  let connectedRooms = []; //array where connected rooms id numbers will be stored
  let connectedRoomNames = []; //array where connected rooms names will be stored
  let doesInputExist = false; //boolean that will later check if input id exists

  //iterate through rooms array. The purpose of this loop is to get connected room by id number
  for (const room of rooms) {
    //if the given room id matches id input, Input exists in the array
    if (room.roomId === id) {
      //change doesInputExist to true
      doesInputExist = true;
      //iterate through 'connectsTo' key/array of the given room
      for (let i = 0; i < room.connectsTo.length; i++) {
        //pushes given room id to connectedRomos
        connectedRooms.push(room.connectsTo[i]);
      }
    }
  }
  //iterate through rooms array. The purpose of this loop is to get connected room by name
  for (const room of rooms) {
    //iterate through connectedRooms array
    for (const connected of connectedRooms) {
      //if the given room object id name in rooms is equal to the connected room id name
      if (room.roomId === connected) {
        //push connected room id name to connectedRoomNames array
        doesRoomExist = true;
        connectedRoomNames.push(room.name);
      }
    }
  }
  //if doesInputExist remains false, id input does not exist in rooms array
  //else if not every id found in connectedRooms has a "name", it has not been found in rooms array and does not exist
  if (doesInputExist === false) {
    return `Room with ID of '${id}' could not be found.`;
  } else if (connectedRoomNames.length != connectedRooms.length) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
  return connectedRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
