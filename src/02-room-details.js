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
 // Find the dinosaur with the given name in the dinosaurs array
 const findDino = dinosaurs.find(dino => dinosaurName === dino.name);
 
 // If no dinosaur is found, returns an error message
 if (!findDino) {
   return `Dinosaur with name '${dinosaurName}' cannot be found.`;
 }
 
 // Find the room that contains the dinosaur with the found dinosaurId
 const findRoom = rooms.find(room => room.dinosaurs.includes(findDino.dinosaurId));
 
 // If a room is found, returns the name of the room
 if (findRoom) {
   return `${findRoom.name}`;
 } else {
   // If no room is found, returns an error message
   return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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
function getConnectedRoomNamesById(rooms, id) {
  // Function to get the names of connected rooms based on the provided rooms and ID

    // Array to store the names of connected rooms
    const connectedRoomsById = [];
  
    // Find the room with the provided ID in the array of rooms
    const findRoomById = rooms.find(room => id === room.roomId);
  
    // If the room with the provided ID is not found, returns an error message
    if (!findRoomById) {
      return `Room with ID of '${id}' could not be found.`
    }
  
    // Loops through each ID in the filtered findRoomById.connectsTo array of the found room
    for (const conIds of findRoomById.connectsTo) {
  
      // Find the room with the current connected ID in the array of rooms
      const connectedRooms = rooms.find(room => conIds === room.roomId);
  
      // If the connected room is found, add its name to the array
      if (connectedRooms)  {
        connectedRoomsById.push(connectedRooms.name);
      } else {
        // If the connected room is not found, returns an error message
        return `Room with ID of 'incorrect-id' could not be found.`
      }
    }
    
    // Returns the array of connected room names
    return connectedRoomsById;
  }


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
