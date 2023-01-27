/*
  Do not change the lines below. If you'd like to run code from this file, you may use the 
  `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains 
  the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. If the dinosaur does not
 * exist in the `dinosaurs` list or cannot be found in any room, return an error message that 
 * says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the `data/dinosaurs.js` file
 * for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an 
 * example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. Alternatively, an 
 * error message.
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
  // Creates a new string to be changed
  let dinoId = '';
  // Iterates through the dinosaurs array of objects
  for (let i = 0; i < dinosaurs.length; i++) {
    // If the given dinosaur name is found in the current dinosaur
    if (dinosaurs[i].name == dinosaurName) {
      // Set dinoId to be equal to the current dinosaur's ID
      dinoId = dinosaurs[i].dinosaurId;
    }
  }

  // If dinoId is unchanged
  if (dinoId === '') {
    // The given dinosaur name did not match, so returns error message
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  // Iterates through rooms array of objects
  for (let j = 0; j < rooms.length; j++) {
    // If the dinosaur's ID is in the current room's list of dinosaurs
    // Used .includes instead of a nested for loop for simplicity
    if (rooms[j].dinosaurs.includes(dinoId)) {
      // Returns the name of the current room
      return rooms[j].name;
    }
    // for (let x = 0; x < rooms[j].dinosaurs.length; x++) {
    //   if (dinoId == rooms[j].dinosaurs[x]) {
    //     return rooms[j].name;
    //   }
    // }
  }

  // If the previous condition was not met, then the dinosaur did not match with any room. 
  // Returns corresponding error message
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given 
 * room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` file for an 
 * example of the input.
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
  // Creates empty array to be filled with names of rooms that connect to the room that corresponds to the given ID
  const connectingRooms = [];

  // Iterates through the rooms array of objects
  for (let i = 0; i < rooms.length; i++) {
    // If the current room's ID matches with the given ID
    if (rooms[i].roomId == id) {
      // Iterates through the array of room IDs that connect to the current room
      for (let j = 0; j < rooms[i].connectsTo.length; j++) {
        // Iterates through the rooms array again to match room IDs
        for (let x = 0; x < rooms.length; x++) {
          // If room IDs match
          if (rooms[i].connectsTo[j] == rooms[x].roomId) {
            // Adds the name of the current room to the array of connecting rooms
            connectingRooms.push(rooms[x].name);
          }
        }
        
      }
      // If the length of the array of connecting rooms' IDs is not equal to the length of the array of connecting rooms' names
      if (rooms[i].connectsTo.length !== connectingRooms.length) {
        // Returns corresponding error message
        return `Room with ID of 'incorrect-id' could not be found.`;
      }

      // Returns array of names of connecting rooms
      return connectingRooms;
    }
  }
  // If the first condition was not met, returns corresponding error message
  return `Room with ID of '${id}' could not be found.`;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
