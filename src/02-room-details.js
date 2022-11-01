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
  let dinoFound = false  //   acccumulator
  let dino = ""
  for (let i = 0; i < dinosaurs.length; i++) {       // to loop through all Dino's
    if (dinosaurs[i].name === dinosaurName) {
      dinoFound = true
      dino = dinosaurs[i].dinosaurId
    }
    }
    if (!dinoFound) {
      return `Dinosaur with name '${dinosaurName}' cannot be found.`
    }
    for (let i = 0; i < rooms.length; i++) {       // to loop through all rooms
      if (rooms[i].dinosaurs.includes(dino)) {
        return rooms[i].name  // return name of room dino in.
      }

    }return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }  // end of function



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
  let found = false
  let errorMessage = ""
  for (let i = 0; i < rooms.length; i++) {  // looping through the rooms 
    if (rooms[i].roomId === id){
      found = true
    }
  }
  if (!found) { // guard clause
    return `Room with ID of '${id}' could not be found.`} // returns initial room error message
    let isConnectedRoom = []; // set an empty array
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].roomId === id) {
        isConnectedRoom.push(rooms[i].connectsTo); //returns all connected rooms
      }
    }
   isConnectedRoom = [].concat.apply([], isConnectedRoom)
   for (let i = 0; i < isConnectedRoom.length; i++) {
   let roomFound = rooms.find(room => isConnectedRoom[i] === room.roomId) // find method is going to bring back the first object if evaluated to true -- or will bring back undefined.
   if (!roomFound) {
    return `Room with ID of '${isConnectedRoom[i]}' could not be found.`
    } else {
       isConnectedRoom[i] = roomFound // making sure the room ids are correct gives back the same array
    }
   }
   isConnectedRoom = isConnectedRoom.map(room => room.name)
   return isConnectedRoom//mutability

}   // end of function

    //`Room with ID of 'incorrect-id' could not be found.`


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
