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
  let dinoId = "";  //Declare empty string to set to dinosaurId later
  let didNotFind = ""; //Declare empty string for when a match to dinosaurName is not found
  for (const dinosaur of dinosaurs) {
    //If the given dinosaur name equals the input dinosaurName
    if (dinosaur.name === dinosaurName) {
      dinoId = dinosaur.dinosaurId; //Set dinoId value to the given dinosaurId
      //Loop through rooms array
      for (const room of rooms) {
        //If the given room['dinosaurs'] array includes dinoId
        if (room["dinosaurs"].includes(dinoId)) {
          return room.name; //Return the given room name
        }
      }
    }
  }
  //If dinoId remains an empty string after looping, a match was never found for the input dinosaurName so it does not exist, update didNotFind string
  if (dinoId === "") {
    didNotFind = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  } else {
    //If no room name was never returned, the input dinosuaurName was never found in rooms array
    didNotFind = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  return didNotFind;
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
  let connectedRooms = []; //Declare empty array where connected rooms id numbers will be stored
  let connectedRoomNames = []; //Declare empty array where connected rooms names will be stored
  let doesInputExist = false; //Declare boolean that will later check if input id exists, begins as false

  //Loop through rooms array. The purpose of this loop is to get connected room by id number
  for (const room of rooms) {
    //If the given room id matches id input, input exists in the array
    if (room.roomId === id) {
      //change doesInputExist to true
      doesInputExist = true;
      //Iterate through 'connectsTo' key/array of the given room
      for (let i = 0; i < room.connectsTo.length; i++) {
        //Push given room id to connectedRooms
        connectedRooms.push(room.connectsTo[i]);
      }
    }
  }
  //Loop through rooms array. The purpose of this loop is to get connected rooms by name
  for (const room of rooms) {
    //Loop through connectedRooms array 
    for (const connected of connectedRooms) {
      //if the given room object id name in rooms is equal to the connected room id name
      if (room.roomId === connected) {
        //Push connected room id name to connectedRoomNames array
        connectedRoomNames.push(room.name);
      }
    }
  }
  //If doesInputExist remains false, id input does not exist in rooms array
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
