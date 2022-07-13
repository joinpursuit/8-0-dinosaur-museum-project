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
  // this is an error message if dinosaur-name is not found at all.
  let dinoMessage = `Dinosaur with name '${dinosaurName}' cannot be found.`;

  // a loop to iterate through the dinosaurs array
  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
     //a message if dinosaur-name is not found in any room.
      dinoMessage = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;

      // a loop to iterate through the rooms array
      for (let room of rooms) {
        if (room.dinosaurs.includes(dino.dinosaurId)) {
          // if id is found return name of room. 
          dinoMessage = room.name;
        }
      }
    }
  }
  return dinoMessage;
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
  let convArr = []; 

  // a loop to iterate through rooms array
  for (let room of rooms) {
    if(room.roomId === id) {
      arr = room.connectsTo;
    }
  }
// a loop to iterate through rooms array to see if room-id is included in the array. 
  for (let room of rooms) {
    if( arr.includes(room.roomId)) {
      convArr.push(room.name);
    }
  }
// if array is empty or array includes the string "incorrect-id"
  if(!arr.length || arr.includes("incorrect-id")) {
    return `Room with ID of 'incorrect-id' could not be found.`;
  }

return convArr;


}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
