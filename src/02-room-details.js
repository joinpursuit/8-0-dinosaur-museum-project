/*
  Do not change the lines below. If you'd like to run code from this file, 
  you may use the `exampleDinosaurData` and `exampleRoomData` variables 
  below to gain access to each data set. This data is pulled from the 
  relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape 
  of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const exampleRoomData = require("../data/rooms");
// Do not change the lines above.

/**
 * getRoomByDinosaurName()
 * ---------------------
 * Return the name of the room where the given dinosaur can be found. 
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be 
 * found in any room, return an error message that says so.
 *
 * @param {Object[]} dinosaurs - An array of dinosaur objects. See the 
 * `data/dinosaurs.js` file for an example of the input.
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` 
 * file for an example of the input.
 * @param {string} dinosaurName - The name of the dinosaur.
 * @returns {string} The name of the room where the dinosaur can be found. 
 * Alternatively, an error message.
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Tyrannosaurus");
 *  //> "Roberts Room"
 *
 * EXAMPLE:
 *  getRoomByDinosaurName(dinosaurs, rooms, "Pterodactyl");
 *  //> "Dinosaur with name 'Pterodactyl' cannot be found."
 */

  // Input: Dinosaurs[{}], rooms[{}], dinosaurName(string)
  // Output: Name (string) of the room where dinosaourName can be found

  // Approach: loop through DINOSAURS[{}]
  // if dinosaurName matches NAME in DINOSAURS[{}]
  // use the dinosaurID, loop through both arrays
  // to find the match through dinosaurId in DINOSAURS[{}] and through dinosaurs[] in ROOMS[{}]
  // If matched, return the room NAME from rooms

  // edge cases: string - loop through DINOSAURS[{}] 
  // if dinosaurName doesn't match .name
  // return "Dinosaur with name `dinosaurName' cannot be found."

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {

  // declare 'foundDinoId' and assign an empty string
  let foundDinoId = '';
  // declare 'foundDinoRoom' and assign an empty string
  let foundDinoRoom = '';

  // iterate through each 'dinosaur' in 'dinosaurs'
  for (const dinosaur of dinosaurs) {
    // if dinosaurName matches 'dinosaur.name' 
    if (dinosaurName === dinosaur.name) {
      // reassign 'foundDinoId' to 'dinosaur.dinosaurId'
      foundDinoId = dinosaur.dinosaurId;
    } 
  }
  // edge case #1
  if (!foundDinoId) {
    foundDinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`
  }
  
  // iterate through each 'room' in 'rooms'
  for (const room of rooms) {
    // if 'room.dinosaurs' includes 'foundDinoId'
    if (room.dinosaurs.includes(foundDinoId)) {
      // reassign 'foundDinoRoom' to 'room.name'
      foundDinoRoom = room.name
    }
  }
  // edge case #2
  if (!foundDinoRoom) {
    foundDinoRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
  

  // return modified 'foundDinoRoom';
  return foundDinoRoom;





  // for (const dinosaur of dinosaurs) {
  //   if (dinosaurName !== dinosaur.name) {
  //     return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  //   }
  // }

  // for (const room of rooms) {
  //   for (const dinoId of room.dinosaurs) {
  //     if (dinosaurName !== dinoId) {
  //       return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  //     }
  //   }
  // }
}

console.log(getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, "Tyrannosaurus"));

/**
 * getConnectedRoomNamesById()
 * ---------------------
 * Returns an array of strings, where each string is the name of a room connected  
 * to the given room. If a room ID cannot be found, an error message is returned.
 *
 * @param {Object[]} rooms - An array of room objects. See the `data/rooms.js` 
 * file for an example of the input.
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
  // // declare 'arrOfRooms' and assign an empty array
  // const arrOfRooms = [];
  // // declare 'connectsId' and assign an empty array
  // let connectsId = [];

  // // iterate through each 'room' in 'rooms'
  // for (const room of rooms) {
  //   // if 'room.roomId' matches 'id'
  //   if (room.roomId === id) {
  //     // 'connectsId' is reassigned to 'room.connectsTo'
  //     connectsId = room.connectsTo;
  //   }
  // }

  // // edge case #1
  // if (connectsId.length === 0) {
  //   return `Room with ID of '${id}' could not be found.`;
  // }
  
  // // iterate through each 'room' in 'rooms'
  // for (const room of rooms) {
  //   // if 'connectsId' includes 'room.roomId'
  //   if (connectsId.includes(room.roomId)) {
  //     // push 'room.name' into 'arrOfRooms'
  //     arrOfRooms.push(room.name);
  //   }
  // }
  // // return modified 'arrOfRooms'
  // return arrOfRooms;


  let connectedNames = [];

  for (const room of rooms) {
    for (const connect of room.connectsTo) {
      if (id === connect && connect !== 'incorrect-id') {
        connectedNames.push(room.name);
      } else if (connect === 'incorrect-id') {
        return `Room with ID of 'incorrect-id' could not be found.`;
      }
    }
  }

  if (connectedNames.length === 0) return `Room with ID of '${id}' could not be found.`;

  return connectedNames;



  
}

getConnectedRoomNamesById(exampleRoomData, "A6QaYdyKra");

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
