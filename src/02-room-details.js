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
  // Making a dino variable.
  let dino = ``
  for (let i = 0; i < dinosaurs.length; i++) {
    // Seeing if the dinosaur's name matches the one in the list.
    if (dinosaurs[i].name === dinosaurName) {
      // Turning the dino variable into the matched dinosaur.
      dino = dinosaurs[i]
    }
  }
  // Return an error message if the dinosaur cannot be found at all.
  if (!dino) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  for (let i = 0; i < rooms.length; i++) {
    // Seeing if the room has the dinosaur you're looking for.
    if (rooms[i].dinosaurs.includes(dino.dinosaurId)) {
      // Return the name of the room where the given dinosaur can be found.
      return rooms[i].name;
    }
  }
  // Return an error message if the dinosaur cannot be found in any room.
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
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
  // Making a new empty object.
  let nameAndId = {}
  for (let room of rooms) {
    nameAndId[room.roomId] = room.name
}
if (!nameAndId[id]) {
  // If initial room ID is incorrect, should return an error message.
  return `Room with ID of '${id}' could not be found.`
}
// Making a new empty array
let roomNames = []
for (let room of rooms) {
  // Seeing if room id match.
  if (room.roomId === id) {
    for (let nextRoom of room.connectsTo) {
      // Making a variable for connected room.
      let roomName = nameAndId[nextRoom]
      // If the connected room exist push it to the array.
      if (roomName) {
        roomNames.push(roomName)
      } else {
        // If connected room ID is incorrect, should return an error message.
        return `Room with ID of '${nextRoom}' could not be found.`
      }
    }
  }
}
// Return the names of all rooms connected to the given room by ID.
return roomNames
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
