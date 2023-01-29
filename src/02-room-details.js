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
  //2 new var; 1 to get updated if dinoName param is found, other to hold answer if it's not found.
  let dinoNameId = ''
  let notFound = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  //Loop to search for dinoName param and update var to the Id of the dino that is found.
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinoNameId = dinosaurs[i].dinosaurId;
    }
  }
  //Check that allows us to see if the dinoName param was not found and if so, update error message.
  if (dinoNameId === '') {
    notFound = `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  //Loop to search rooms to search for the dinoName param using the Id that we located in previous loop.
  for (let r = 0; r < rooms.length; r++) {
    if (rooms[r].dinosaurs.includes(dinoNameId)) {
      return rooms[r].name;
    }
  }
  return notFound;
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
  //3 empty buckets; 1 to hold connected room Ids based on id param; 1 to use prev arr to find roo names; 1 for error message.
  let roomIdArr = [];
  let roomNameArr = [];
  let error = `Room with ID of '${id}' could not be found.`;
  /**
   * Loop to search rooms for id param and .push connected room array into empty array.
   * Once this is complete, we have a new array that contains the Ids of all rooms that are connected to the room that we were given with the id param.
   * We will use this new array in our next loop.
   */
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      roomIdArr.push(...rooms[i].connectsTo);
    }
  }
  /**
   * Loop to cycle through each rooms object so we can search new roomIDArr to see if it contains the roomId.
   * If our new roomIdArr contains the roomId of rooms[i], then we will push the NAME to our roomNameArr. 
   * Second conditional to check for 'incorrect-id' and return error.
   */
  for (let r = 0; r < rooms.length; r++) {
    if (roomIdArr.includes(rooms[r].roomId)) {
      roomNameArr.push(rooms[r].name);
    } else if (roomIdArr.includes('incorrect-id')) {
      return `Room with ID of 'incorrect-id' could not be found.`;
    }
  }
  // Check to ensure we do not return empty arr.
  if (roomNameArr.length === 0) {
    return error;
  }
  return roomNameArr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
