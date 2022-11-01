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
  // declaring variable to represent the id of the inputted dinosaur name
let dinoNameId = "";
// using a for loop to iterate through the dinosaurs array 
  for (let i = 0; i < dinosaurs.length; i++) {
    // using an if statement to determine if the dinosaurName parameter is equal to the value of the name key at index i 
     if (dinosaurName === dinosaurs[i].name) {
      // assigning the value of the dinosaurId key at index i to the dinoNameId variable 
      dinoNameId = dinosaurs[i].dinosaurId
    } 
  } 
  // using an if statement to determine if the dinoNameId variable is falsy 
  if(!dinoNameId) {
    // using a template literal to return an error message referencing the dinosaurName parameter
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  // using a for loop to iterate through the rooms array 
  for (let j = 0; j < rooms.length; j++) {
    // if statement to determine if dinosaurs key at index j includes the value stored in the dinoNameId variable
    if (rooms[j].dinosaurs.includes(dinoNameId)) {
      // returning the value of the name key at index j 
      return rooms[j].name
    }
  }
  // returning an error message referencing the dinosaurName parameter if the function has ran and the inputted dinosaurName paramter could not be found
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
  // declaring a variable to return as the output of the function 
  let connectRoomsArray = [];
  let incorrectId = "";
  // using for loop to iterate through the rooms array 
  for (let i = 0; i < rooms.length; i ++) {
    // if statement to determine if the value of the roomId key at index i is equal to the id parameter
    if (rooms[i].roomId === (id)) {
      // assigning value of connectsTo key at index i to connectRoomsArray variable
      connectRoomsArray = rooms[i].connectsTo
    }
  }
  // if statement with bang operator to determine if value of connectRoomsArray variable is falsy
  if (!connectRoomsArray.length) {
    // returns error message referencing id parameter
    return `Room with ID of '${id}' could not be found.`
  }
  // using for loop to iterate through connectRoomsArray
  for (let j = 0; j < connectRoomsArray.length; j++) {
    // nested for loop to iterate through rooms array
    for (let k = 0; k < rooms.length; k++) {
      // if statement to determine if element at index j in connectRoomsArray is equal to the value of the roomId key at index k im rooms array
      if (connectRoomsArray[j] === rooms[k].roomId) {
        // assigning value of the name key at index k of rooms array to index j of connectRoomsArray
       connectRoomsArray[j] = rooms[k].name
      } 
    }

}
// returning connectRoomsArray variable 
  return connectRoomsArray
}
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
