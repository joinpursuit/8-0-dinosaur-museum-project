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
 
  let string = `Dinosaur with name '${dinosaurName}' cannot be found.`
    
    for (let dino of dinosaurs) { // look in the dinosaur file
     if (dino.name === dinosaurName) { //if dino name is dinosaurname
      for (let room of rooms) { // loop in rooms to find dinosaur name
        for (let dinoroom of room.dinosaurs) { // loop in room.dinosaur b/c its array 
          if (dinoroom === dino.dinosaurId) { // if room.dinosaur exist than return the name
            return room.name
          }
        } 
      } string = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`//error message dino is not fround in any rooms
     }
    }return string // error message of dinosaur never exist in at all 
  }
console.log(getRoomByDinosaurName(exampleRoomData))


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
  
  let array = []
  let found = false
  for (let room of rooms) {  
    if (room.roomId.includes(id)){  // if room.id have id 
    for (let one of room.connectsTo) { //loop it to room connect
      found = true  // if it exist 
     for (let room of rooms) { //loop to room again
       if (one === room.roomId){ //check if room connect have room id
         array.push(room.name)// push array of room.name
         found = false // if doesn't exist then return error message
       }
     } if (found) { //if it room connect cant be found return error mesage
      return `Room with ID of '${one}' could not be found.` 
    }
    } return array //return the array 
    } 
  }return `Room with ID of '${id}' could not be found.` // if room doesnt exst in any room return error message
  
}

console.log(getConnectedRoomNamesById(exampleRoomData))


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};

