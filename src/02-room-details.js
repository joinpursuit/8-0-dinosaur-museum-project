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
  // Create a variable that will be assigned the object whose name matches the given parameter for dinosaurName or be assigned false if there is not a match
  let dinoObj = dinosaurs.find(dinoEle => dinoEle.name === dinosaurName);
  // Return an error message if dinoObj is false
  if (!dinoObj) {return `Dinosaur with name '${dinosaurName}' cannot be found.`; }
  // Assign the dinosaurId of dinoObj.dinosaurId to a new variable
  let dinoId = dinoObj.dinosaurId;

  // Find and return the object inside of the rooms array that has the same id as dinoName otherwise return an error message
  let room = rooms.find(roomEle => roomEle.dinosaurs.includes(dinoId));
  return room ? room.name : `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
  // Variable that will contain the names of the rooms that are connected
  let connectedArr = [];
  // Variable that will contain every rooms object's roomId
  let roomIdArr = [];
 
  // Loop through the rooms array and push every roomId into the roomIdArr variable
  for (let room of rooms) {
    roomIdArr.push(room.roomId);
    // Push the names of the rooms that contain the parameter id in the room.connectsTo array into the arr array
    if (room.connectsTo.includes(id)) {
      connectedArr.push(room.name);
    }
  }
  // Loop through each room object and then loop through each object's connectsTo array and return an error message if every element in the connects to array exists in the roomIdArr array
  for (let room of rooms) {
    for (let ele of room.connectsTo){
      if (!roomIdArr.includes(ele)) {
        return `Room with ID of 'incorrect-id' could not be found.`;
      }
    }    
  }
  
  // Return an error message if arr is empty otherwise return arr
  return connectedArr.length === 0 ? `Room with ID of '${id}' could not be found.` : connectedArr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};


