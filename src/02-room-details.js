/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const dinosaurs = require("../data/dinosaurs");
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
    let dinoId;
    // create dinoID to hold the value of the matching 
  for (let i = 0; i < dinosaurs.length; i ++){
    // loop through the dinosaurs array 
    if (dinosaurs[i].name === dinosaurName){
    // check through the iteration for a matched value in the names key with the parameter dinosaurName 
        dinoId = dinosaurs[i].dinosaurId
    } // assign the value of the iteratated dinosaurId matches to dinoId, we will later use this value to find what room this dinosaur can be found in. 
  } 
  if (!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  } // if there is no match for the dinoID value, return an error message
  for (let i = 0; i < rooms.length; i ++){
    // loop through rooms
    if (rooms[i].dinosaurs.includes(dinoId)){
      return (rooms[i].name)
    } // we are currently getting the dinosaur's id & that's not what we want. 
      // the requested format is the name of the actual room that the dinosaurs can be found in. 
  }   // this if statement says "if the there is a match between the roomsloop & dinoId, return the ROOM containing the matching dinosaurId"
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
      // return error message if dinosaurName parameter cannot be found
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
// at the end, we want to get the rooms.names value 
// that correlates to the .connectsTo value . 
//  

function getConnectedRoomNamesById(rooms, id) {
  let connectedArr = []
  // create an array that will hold the value of matched id parameter & rooms.id
  let namesArr = []
  // create an array that will hold the value of the names for the matching id 
for (let i = 0; i < rooms.length; i++){
  // loop through the rooms array 
  if (rooms[i].roomId === id){
    connectedArr = (rooms[i].connectsTo)
  } // if the iteration through rooms.Id has a value that matches the id parameter, assign that value to connectedArr
    // connectedArr is giving us the the information we want, but not in the requested format 
    // we are currently getting id's when we want the name of the rooms
    // we will have to loop through again to get the NAMES of the rooms that match our connects.to request
} for (let t = 0; t < rooms.length; t ++){
  // loop through the rooms array. use "t" because "i" has already been used
    if (connectedArr.includes(rooms[t].roomId)){
      // check if the connected array contains matches with rooms.id
   namesArr.push(rooms[t].name)  
    } // if there is a match, push the NAMES of the matching values into the names array
}
if (connectedArr.length === 0){
  return `Room with ID of '${id}' could not be found.`
  // if the connectedArr length is zero, that means nothing was pushed & the there are no matches, give an error message
}
if (connectedArr.length !== namesArr.length){
  return `Room with ID of 'incorrect-id' could not be found.`
  // if the connectedArr length is not the same as the namesArr length, at least one of the values could not be matched
  // give an error message
}
return namesArr;
} // otherwise, if the two arrays match, return the namesArr - giving us the NAMES of the connected rooms. 

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
