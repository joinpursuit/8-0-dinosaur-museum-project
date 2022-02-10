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
  let str = `Dinosaur with name '${dinosaurName}' cannot be found.`
  for (elm of dinosaurs){
    if (dinosaurName === elm.name){
      for (roomElm of rooms){
        if (roomElm.dinosaurs.includes(elm.dinosaurId)){
          str = roomElm.name
          return str
        } 
      } str = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
    }
  } return str
};
  
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
  // Return an array of Strings.
  // Each string is a name. ie. "Coat Check Room" | but is connected to that "id".
  let save = []
  let arr = []
  let error = `Room with ID of 'incorrect-id' could not be found.`
  for (elm of rooms){
    // If we have the ID
    if (elm.roomId === id){
      for (let i = 0; i < elm.connectsTo.length; i++){
      // This now has all the ConnectTo id's. Even incorrect-id.
      save.push(elm.connectsTo[i])
      }
    } 
  } if (save.length === 0){
    return error
  }
  for (elm2 of rooms){
    for (foo of save){
    if(elm2.roomId === foo){
      arr.push(elm2.name)
    }
  }
  } if (save.length === arr.length){
    return arr
  } else {
    return error
  }
};

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
