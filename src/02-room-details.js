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
  for (let dino of dinosaurs) {
    if (dinosaurName == dino.name) {
      //then check to see if it's in a room
      for (let room of rooms) {
        //loop through the rooms, looking at dinosaurs
        if (room.dinosaurs.includes(dino.dinosaurId)) {
          return room.name;
        }
      }
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
  }
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
  let roomba = [];
  let foundRoom = false;

  let realRooms = [];
  let hallOfMirrors = [];

  //Build the arrays for later comparison
  for (let room of rooms) {
    for (hallway of room.connectsTo) {
      if (!hallOfMirrors.includes(hallway)) {
        hallOfMirrors.push(hallway);
      }
    }
  }  

  //Go through the rooms and connectors looking for basic match
  for (let room of rooms) {
    realRooms.push(room.roomId);
    if (room.roomId.includes(id)) {
      foundRoom = true;
      for (connectors of room.connectsTo) {
        for (let room2 of rooms) {
          if (room2.roomId.includes(connectors)) {
            roomba.push(room2.name);
          }
        }
      }
    }
  }

  //Sort the arrays for comparison
  realRooms.sort();
  hallOfMirrors.sort();

  //For if we never the room
  if (!foundRoom) {
    return `Room with ID of '${id}' could not be found.`;
  }

  if (realRooms.length != hallOfMirrors.length) {
    //Then this means that the number of rooms and potential connectors is off, and this is bad. It's a museum, not a fun house.
    //Compare the two arrays, and pull the odd man out... out.
    if (realRooms.length > hallOfMirrors.length) {
      for (let i = 0; i < hallOfMirrors.length; i++) {
        if (realRooms[i] != hallOfMirrors[i]) {
          return `Room with ID of '${realRooms[i]}' could not be found`;
        }
      }
    } else {
      for (let i = 0; i < realRooms.length; i++) {
        if (hallOfMirrors[i] != realRooms[i]) {
          return `Room with ID of '${hallOfMirrors[i]}' could not be found.`;
        }
      }
    }
  }
  //Everything's cool
  return roomba;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
