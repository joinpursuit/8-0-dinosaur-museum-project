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
  //Loop through dinosaurs to check for dinosaurName.
  for (const dino of dinosaurs) {
    if (dino.name === dinosaurName) {
      // if dinosaurName existes loop throug rooms.
      for (const room of rooms) {
        // check if dinosaus array includes dinosaur Id.
        if (room.dinosaurs.includes(dino.dinosaurId)) {
          // return room name if it exiest.
          return room.name;
        }
      } // return error if dinosaurName cannot br found in any room.
      return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
  }
  // return error if dinosaurName cannot br found.
  return `Dinosaur with name '${dinosaurName}' cannot be found.`;
}
// getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, "Parasaurolophus");
/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected to the given room. If a room ID cannot be found, 
 * an error message is returned.
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
// 1. find room with id matching input id
// 2. store room in foundRoom
// 3. if no room found return error
// 4. fetch connectedTo room ids array from foundRoom
// 5. loop through each connected room id and extract corresponding name
// 6. store each name in an array
// 7. return array
function getConnectedRoomNamesById(rooms, id) {
  // the array that will hold where each string is the name of a room connected to the given room.
  const roomNames = [];

  // the variable tha will hold room.
  let foundRoom = "";

  // 1. find room with id matching input id
  for (const room of rooms) {
    if (room.roomId === id) {
      // 2. store room in foundRoom
      foundRoom = room;
      break;
    }
  }
  // 3. if no room found return error
  if (!foundRoom) {
    return `Room with ID of '${id}' could not be found.`;
  }

  // 4. fetch connectedTo room ids array from foundRoom
  const connectRoomIds = foundRoom.connectsTo;

  // 5. loop through each connected room id and extract corresponding name
  for (const id of connectRoomIds) {
    // 6. the variable that will hold room.
    let foundConnectedRoom;

    // 7. find room with room id matching connected room id .
    for (const room of rooms) {
      if (id === room.roomId) {
        //8. Store room in foundConnectedRoom
        foundConnectedRoom = room;
        break;
      }
    }
    //9. return error if room with id doesnt exiset.
    if (!foundConnectedRoom) {
      return `Room with ID of '${id}' could not be found.`;
    }

    //10. store each name in an array
    roomNames.push(foundConnectedRoom.name);
  }

  // 11. return array

  return roomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
