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
  let dino = dinosaurs.find(dino => dino.name === dinosaurName);
  if (dino === undefined) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  let dinoId = dino.dinosaurId;
  let dinoRoom = rooms.find(room => room.dinosaurs.includes(dinoId));
  if (dinoRoom === undefined) {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  return dinoRoom.name;
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
  // loop through rooms array, if room.connectsTo includes id add room.name to newArray
  let connectedRooms = [];
  // let numberOfMatches = 0;

  // Loop through room.connectsTo array and add name by Id 
  // if no room by that id return error message (also if there are no )
  
  // get the room object with the id 
  let room = rooms.find(room => room.roomId === id);

  if (room === undefined) {
    return `Room with ID of '${id}' could not be found.`;
  }

  for (let connectedRoomId of room.connectsTo) {
    let connectedRoom = rooms.find(roomObject => roomObject.roomId === connectedRoomId);
    if (connectedRoom === undefined) {
      return `Room with ID of '${connectedRoomId}' could not be found.`; // change Id to connectedRoomId
    }
    connectedRooms.push(connectedRoom.name);
  }
  return connectedRooms;

  // for (let room of rooms) {
  //   if(room.connectsTo.includes(id)) {
  //     connectedRooms.push(room.name);
  //   }
  // }
  // // Loop to check that connectedRooms's room's names match a name in rooms' array
  // // go through each room in connectedRooms if find === undefined return error message as well
  // for (let connectedRoom of connectedRooms) {
  //   // if (rooms.find(room => room.name === connectedRoom) === undefined) {
  //   //   incorrectConnectedRooms++;
  //   // }
  //   for (let room of rooms) {
  //     if (room.name === connectedRoom) {
  //       numberOfMatches++;
  //     }
  //   }
  // }
  // return connectedRooms.length === 0  || numberOfMatches !== connectedRooms.length ? `Room with ID of '${id}' could not be found.` : connectedRooms;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
