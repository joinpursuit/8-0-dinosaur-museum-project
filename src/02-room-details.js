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
  let dinoRoom = ''
  for (let i = 0; i < dinosaurs.length; i++) {// start of for loop
    if (dinosaurs[i].name === dinosaurName) {//check the name of the index and see if it's similar to what they provided
      dinoRoom = dinosaurs[i].dinosaurId //dinoRoom equaled to dinosaurId
      break;
    }
  }
  for (let i = 0; i < rooms.length; i++) {//start of for loop
    for (let j = 0; j < rooms[i].dinosaurs.length; j++) {//nested loop to compare index i(rooms) and new index j(dino)
      if (rooms[i].dinosaurs[j] === dinoRoom) {// compare if rooms[i] and dino[j] is equal to dinoRoom.
        return rooms[i].name
      }
    }
  }
  if (dinoRoom === '') {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`// stating that dinoRoom is equal to empty string, return Dino with name cannot be found/cannot be found in any rooms.
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
  let Arr1 = []
  let Arr2 = []
  for (let i = 0; i < rooms.length; i++) {//start of for loop
    if (rooms[i].roomId === id) {
      Arr1 = rooms[i].connectsTo
    }//end of if statement
  }//end of for loop
  for (let i = 0; i < Arr1.length; i++) {//start of 2nd for loop
    for (let j = 0; j < rooms.length; j++) {//start of 3rd for loop
      if (rooms[j].roomId === Arr1[i]) {
        Arr2.push(rooms[j].name)
      }
    }//end of 3rd for loop
  }//end of 2nd for loop
  if (Arr1.length === 0) {
    return `Room with ID of '${id}' could not be found.`
  } else if (Arr1.length !== Arr2.length) {
    return `Room with ID of 'incorrect-id' could not be found.`
  } 
  return Arr2
} 

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
