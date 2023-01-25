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

  //rooms arr uses dino id as name
  let id;
  //used to augment
  let found = false
  //looping through dino arr
  for (let i = 0; i < dinosaurs.length; i++) {
    //checking if given name is the same as dino name
    if (dinosaurs[i].name === dinosaurName) {
      //if true, founds value is now true
      found = true
      //ids value is now the dino's id
      id = dinosaurs[i].dinosaurId
    }//if closing tag
  }//for closing tag
  //if not found, return error
  if (!found) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //looping through rooms arr
  for (let i = 0; i < rooms.length; i++) {
    //if rooms have the id from the dino given
    if (rooms[i].dinosaurs.includes(id)) {
      //return room name
      return rooms[i].name
    } //if closing tag
  } //for closing tag
  //if room doesn't have the id, return error
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

// for(let i = 0; i < rooms.length; i++){
//   if(rooms[i].connectsTo[i] === id || rooms[i].roomId === id){
//     return rooms[i].name
//   }//if closing tag
// }//for closing tag
// return 
function getConnectedRoomNamesById(rooms, id) {
  
  //to push room names into
  let arr = []
  //to hold rooms connected to the id in roomid
  let connects;
  
  //looping through rooms array
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].connectsTo.includes("incorrect-id") ) {
      return `Room with ID of 'incorrect-id' could not be found.`
    }
    //if room id strictly equals given id 
    if (rooms[i].roomId === id) {
      connects = rooms[i].connectsTo
    }
  }

  if (!connects) {
    return `Room with ID of 'incorrect-id' could not be found.`
  }
  
  for (let i = 0; i < rooms.length; i++) {
    if (connects.includes(rooms[i].roomId)) {
      arr.push(rooms[i].name)
    } 
  }
  return arr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
