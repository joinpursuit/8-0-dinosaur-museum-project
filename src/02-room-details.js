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
  let name;  // will store my dino Id in this var later on.
  // looping through my "dinosaurs" object.
  // checking if the "dinosaurName" is strictly equals to the dino at index i.
  // if yes assign the Id of that dino to my var "name".
  for (let i = 0; i < dinosaurs.length; i++) {
    if(dinosaurName === dinosaurs[i].name){
      name = dinosaurs[i].dinosaurId;
    }
  }
  // return an error message if "name" does not exist.
  if (!name) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  // looping through the "rooms" array of object.
  // looping through the dinosaurs object at each rooms index [j].
  // check if it equals to the "name".
  // if yes return that name.
  for (let j = 0; j < rooms.length; j++) {
    for (let k = 0; k < rooms[j].dinosaurs.length; k++) {
      if(rooms[j].dinosaurs[k] === name) {
        return rooms[j].name;
      }
    }
  }
  // if dino name exist, but is not in any rooms, return this string.
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
  let arr = []; // will push rooms name in this empty array later on.
  // looping through array of object "rooms".
  // then looping through the array "connectsTo" that exist inside of the "rooms" object.
  // check if an index at connectsTo matches the "id".
  // if yes, push it in the empty array.
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].connectsTo.length; j++) {
      if (rooms[i].connectsTo[j] === id) {
        arr.push(rooms[i].name);
      }
      // if the id = 'incorrect-id', return that as a string error message.
      else if (rooms[i].connectsTo[j] === 'incorrect-id') {
        return `Room with ID of 'incorrect-id' could not be found.`;
      }
    }
  }
  // if no name that matches the id gets push in the empty arr(if arr is still empty after looping through the whole array)
  // return a string that says the id is not found.
  if (arr.length === 0) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // return arr contening the name of rooms that matches the id.
  return arr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
