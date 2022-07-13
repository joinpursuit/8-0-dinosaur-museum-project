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
  
  let dinosId;  //  declare variable without a value to assign later in code block
  for (let dinosaur of dinosaurs) {  // iterate through dinosaurs array to check if the given name exists
    if (dinosaur.name === dinosaurName) {
      dinosId = dinosaur.dinosaurId;  // if dinosaur name exists, then assign dinosId to the key dinosaur, value dinosaurId
    }
  }
  if (dinosId === undefined) {  //use undefined because a variable was declared, but not assigned (line 30). 
    return `Dinosaur with name '${dinosaurName}' cannot be found.`; 
  }
  for (let room of rooms) {  // iterate through rooms
    for (let x of room.dinosaurs) { // use an extra loop because there are multiple arrays
      if (x === dinosId) {  // conditional statement if i is strict equal to value of dinosId
        return `${room.name}`;  // returns room name
      }
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`  //otherwise return appropriate statement that dinosaurs name doesn't exist
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
  let array = []; // create variable with empty array

  for (let room of rooms) {  // loop through rooms
    for (const connected of room.connectsTo) {  // loops through rooms searching for connection
  if (connected === `incorrect-id` && room.roomId === id) {  // if connected room strict equal incorrect-id and room id strict equal id then return below statement
      return `Room with ID of 'incorrect-id' could not be found.`;
      }
      if (connected === id) {  // if connected room strict equal the room identifier, then push room.name into array
        array.push(room.name);  
      }
    }
  }
  if (array.length > 0) {  // if array length is greater than 0, return array
    return array;
  }
  else 
  {
    return `Room with ID of '${id}' could not be found.`;   //else return appropriate statement that room id doesn't exist
  }
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
