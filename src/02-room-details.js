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
// returns the name of the room where the dino can be found. 
//   if the dino doesnt exisit in the dino list or in any room return error message

// needs to general and work for other dinosaurs 
// returns an error message for dino cannot be found in any room and at all

// need for of loop to iterate through an object
// if dino name is === to dino name given return 
// for (const dinosaur of rooms){
//   if (dinosaurName !== true){
//     return `Dinosaur with name '${dinosaurName}' cannot be found.`
//   }
// }
// for (const dinosaur of dinosaurs) {
//   if (dinosaurName === dinosaur.name){
//     return 
//   }  
// }

let dinoId;
  let roomName;
  for(const dinosaur of dinosaurs) {
    if(dinosaurName === dinosaur.name) {
      dinoId = dinosaur.dinosaurId;
    } 
  } if (!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  for(const room of rooms) {
    if(room.dinosaurs.includes(dinoId)) {
      roomName = room.name;
    } 
  } if (!roomName){
    return   `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
  return roomName;

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
  // returns an array of stings
  // where each string is the name of a room connected to the given room
  //If a room ID cannot be found, an error message is returned.
  // rooms is an object 
  // id is a string 
  let newRoomArr = [];
  let idCheck = ''
  
  for (const room of rooms){
    for (const cr of room.connectsTo){
      if (cr.length > 10){
        return `Room with ID of '${cr}' could not be found.`
      }
    } if (room.connectsTo.includes(id)){
      newRoomArr.push(room.name)
    } 
  }  for (const room of rooms){
    if (room.roomId === id){
      idCheck = 'Match'
    }
  } if (idCheck !== 'Match'){
    return `Room with ID of '${id}' could not be found.`
  }

  return newRoomArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
