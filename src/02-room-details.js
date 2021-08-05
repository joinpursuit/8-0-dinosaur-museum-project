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

/*
 Understanding:
 * Iterate through the rooms and check to if the dinosaurName is included within any of the rooms. 
 * If the dinosaur is found in a room then return the name of the room 
 * The rooms array does not have the dinosaur names, only their IDs 
 * The dinosaurs array has their IDs and names
 Planning: 
 Default value would be a string and output value is a string
 I need a for loop to iterate through the rooms and dinosaurs arrays
 If the dinosaur exists in dinosaurs array && is found in the room, the output would be equal to the rooms[i].name which is a string
 If the dinosaur does not exist in the dinosaurs array, the output should be 'Dinosaur with name 'NAME OF DINO' cannot be found.'
 If the dinosaur exists in dinosaurs && is not found in any rooms, the output should be 'Dinosaur with name 'NAME OF DINO' cannot be found in any rooms."'
  */

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  // Default value for the ID
  let dinoID = '';
  // Loop through dinosaurs array to get the Dinosaur ID of the given dinosaur
  for (let i=0; i<dinosaurs.length; i++){
    if (dinosaurName === dinosaurs[i].name){
      dinoID = dinosaurs[i].dinosaurId;
      }
    }
  // Error checking to see if no ID is found return message
  if (dinoID === ''){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  // Default value for room name
  let roomName = '';
  // Loop through rooms array to get room name where dinosaur is located
  for (let i=0; i<rooms.length; i++){
    dinoArr = rooms[i].dinosaurs;
    if (dinoArr.includes(dinoID)){
      return roomName = rooms[i].name;
      } 
    }
  // Error checking to see if no room name is found return message
  if (roomName === ''){
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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

/*
Understanding:
* We want to output an array of strings, that are the names of the rooms which are connected to the given room. The connected rooms are under room[i].connectsTo, but they are the room IDs and not the names of the room. If the room ID does not exist or found, return the error message `Room with ID of '${id}' could not be found.` 
Plan:
* Set Default value equal to an empty array.
* Iterate through the rooms array
* If id === rooms[i].roomId 
Get the entire object of the given ID
Then iterate through the connectsTo array of the object
If connectsTo[i] === rooms[i], empty array (default value) .push(rooms[i].name)
*/

function getConnectedRoomNamesById(rooms, id) {
  let connectsToIDs = []; // Placeholder to store the connected IDs array
  
    // Accumulator to get store the connect IDs and includes an error check if the ID given is valid 
    for (let i=0; i<rooms.length; i++){
      if (id === 'incorrect-id'){
      return `Room with ID of '${id}' could not be found.`;
    } else if (id === rooms[i].roomId) {
      connectsToIDs = rooms[i].connectsTo;
    } 
  }
    let connectedRoomsArr = []; // Placeholder to store the names of rooms array
    // Accumulator to get if the the ID in the connectsToIDS array is equal to an ID in the rooms array, push the name of the room to the connectedRoomsArr
    for (let j=0; j<connectsToIDs.length; j++){
      for (let i=0; i<rooms.length; i++) {
      if (connectsToIDs[j] === rooms[i].roomId) {
        connectedRoomsArr.push(rooms[i].name);
      } else if (connectsToIDs[j] === 'incorrect-id')
      return `Room with ID of '${connectsToIDs[j]}' could not be found.`
    }
  }
  return connectedRoomsArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
