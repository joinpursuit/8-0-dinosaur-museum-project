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
  // declare variable for the found dinosaurId
let foundID = ''
  // declare variable for found room name
let roomName = ''
  // iterate through array of dinosaurs
  for (let dino of dinosaurs){
    // conditional statement checking if dino name = given name
    if (dino.name === dinosaurName){
      // assign empty string to hold dinosaurId
      foundID = dino.dinosaurId
    }
  }
  // conditional statement checking if dinoId isn't found
  if(!foundID){
    // return error message
    return `Dinosaur with name '${dinosaurName}' cannot be found.`}
    // iterate through rooms array
  for (let room of rooms){
    // conditional checking if room.dinosaurs includes foundId
    if (room.dinosaurs.includes(foundID)){
      // assign empty string to hold room name
      roomName = room.name
    }
} 
  // conditional statement checking if room name isn't found
  if (!roomName){
    // return error message
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`}
    // return room name
   return roomName
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
  // declare variable for empty array
let arr = [];
// declare variable for found room
let foundRoom;
// declare variable for connected rooms
let foundConnectedRoom;
// iterate through array of rooms
for (const room of rooms) {
  // conditional statement checking if roomId matches given Id
  if (room.roomId === id) { 
    // assign empty variable to be true
      foundRoom = true
      // iterate through array of connected rooms
for (const connectedRoom of room.connectsTo) {
  // iterate through array of rooms
  for (const connected of rooms) {
    // assign empty variable to be false
    foundConnectedRoom = false
    // conditional statement checking if roomId matches connected rooms
  if (connected.roomId === connectedRoom) {
    // reassign variable for connected rooms to true
    foundConnectedRoom = true
    // push names connected to empty array 
      arr.push(connected.name) 
      // break to stop array 
        break;       
        }
      }
    }
  }
}
// conditional checking if found room || connected rooms are false
  if (!foundRoom || !foundConnectedRoom) {
    // reassigning error message (string)
    arr = `Room with ID of 'incorrect-id' could not be found.`
  }
  // return output
    return arr
}

getConnectedRoomNamesById(exampleRoomData, "aIA6tevTne")

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
