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
// Declaration
  let dinoId = ""

// Main code
  for(let i = 0; i < dinosaurs.length; i++){
    if(dinosaurs[i].name === dinosaurName){ // checking if parameter dinosaur name same as dinosaurs.dinosaurname
        dinoId = dinosaurs[i].dinosaurId
    }
  } // end of for loop

  // Error Message
  if (!dinoId){       // if dinoId falsy then given dinosaur name cant be found
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

// Main code
  for(let j = 0; j < rooms.length; j++){
    if(rooms[j].dinosaurs.includes(dinoId)){ // checking if rooms.dinosaur[] has dinosaur ID same as dinosaurs.dinosaurId
      return `${rooms[j].name}`
    }
  } // end of for loop

// Error message - if dinosaur cant be found in any room
return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`

} // end of function

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
// Declaration
let roomNameArray = []
let roomIdArray = []
let connectedRoomIdArray = []

// Main code
  for(let i = 0; i < rooms.length; i++){
    if(rooms[i].connectsTo.includes(id)){ //  checking given id included inside the connectsTo array, 
      roomNameArray.push(rooms[i].name)   //  if yes then push name of room
      roomIdArray.push(rooms[i].roomId)   //  if yes, then push room Id, roomIdArray  - has all original room id values that passed the condition
    }

    if(rooms[i].roomId === id){                   // checking if the given id is equal to room id
      connectedRoomIdArray = rooms[i].connectsTo  //  push all the connectsTo id of the room
    }
  } //end of for loop

let wrongRoomId = connectedRoomIdArray.filter(checkId => (!roomIdArray.includes(checkId))) // filter the connectedroom array with roomid array to get thats not common to both

//Error Message
if(wrongRoomId.length >= 1){                  // if there is any id inside wrongId array that means there was a element in connected room and not in roomId
  return `Room with ID of '${wrongRoomId}' could not be found.`
}
// Final - Return & Error Message
  return roomNameArray.length === 0 ? `Room with ID of '${id}' could not be found.` : roomNameArray 
} // end of function

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};