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
  let dinoId;
  for(const dino of dinosaurs) {
    if(dino.name === dinosaurName) {
      dinoId = dino.dinosaurId;
    }
  }
  if(!dinoId) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  for(const room of rooms) {
    for(const element of room.dinosaurs) {
      if(element === dinoId) {
        return room.name;
      }
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
  let arr = [];
  for(const room of rooms) {
    for(const code of room.connectsTo) {
      let checkId;
      for(const i of rooms) {
        if(code === i[`roomId`]) {
          checkId = `Y`;
        }
      }
      if(!checkId) {
        return `Room with ID of '${code}' could not be found.`;
      }
      if(code === id) {
        arr.push(room.name);
      }
    }
  }
  if(arr[0]) {
    return arr;
  } else {
    return `Room with ID of '${id}' could not be found.`;
  }
}

// console.log(getConnectedRoomNamesById(exampleRoomData, "incorrect"))
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
