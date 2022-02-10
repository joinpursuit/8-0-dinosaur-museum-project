/*
  Do not change the lines below. If you'd like to run code from this file, you may use the `exampleDinosaurData` and `exampleRoomData` variables below to gain access to each data set. This data is pulled from the relevant files in the `data/` directory.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.
*/
const exampleDinosaurData = require("../data/dinosaurs");
const rooms = require("../data/rooms");
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

//Function is asking to return the STRING: Room where the dino is found
//return the STRING: .... if dino does not exist
//return the STRING: .... if dino does not have a room

//find out if dinosaurName is within Dinosaur.js
//if dinosaurName is not there we return
// Dinosaur with name ${Pterodactyl} cannot be found.
//if dinosaurName exist then we need to capture dinosaurID (need a variable = dinoID)

//We need to look (loop) through room.js to find the room that has the dinoID in rooms[index].dinosaurs

//Look through (loop) dinosaur array of each room
//if we find the dinoID return the STRING: rooms[j].name
//if we don't find dinoID return the STRING: Dinosaur with name ${dinosaurName} cannot be found in any rooms.

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoID;
  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].name === dinosaurName) {
      dinoID = dinosaurs[i].dinosaurId;
    }
  }
  if (!dinoID) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for (let j = 0; j < rooms.length; j++) {
    if (rooms[j].dinosaurs.includes(dinoID)) {
      return rooms[j].name;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}

//   let dinoName = [];
//   let iD
//   let result;
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurs[i].name !== dinosaurName) {
//       console.log(dinoName);
//       result = `Dinosaur with name '${dinosaurName}' cannot be found.`;
//     } else if (dinosaurs[i].name === dinosaurName)
//       iD = dinosaurs[i].dinosaurId
//       dinoName.push(dinosaurs[i].dinosaurId);
//     for (let j = 0; j < rooms.length; j++) {
//       if()
//     }
//   }
// }

// for (let i = 0; i < dinosaurs.length; i++) {
//   let iD;
//   for (let j = 0; j < rooms.length; j++) {
//     if (dinosaurs[i].name === dinosaurName) {
//       iD = dinosaurs[i].dinosaurId;
//       if (rooms[j].dinosaurs.includes(iD)) {
//         return rooms[j].name;
//       } else {
//         return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
//       }
//     } else {
//       return `Dinosaur with name '${dinosaurName}' cannot be found.`;
//     }
//   }
// }
// let sentence;
// let iD;
// for (let i = 0; i < dinosaurs.length; i++) {
//   for (let j = 0; j < rooms.length; j++) {
//     //console.log(dinosaurs[i].name === dinosaurName);
//     if (dinosaurs[i].name === dinosaurName) {
//       iD = dinosaurs[i].dinosaurId;
//       //console.log(iD);
//       if (rooms[j].dinosaurs.includes(iD)) {
//         //console.log(rooms[j].dinosaurs.includes(iD));
//         sentence = rooms[j].name;
//       }
//     } else {
//       sentence = `Dinosaur with name '${dinosaurName}' cannot be found.`;
//     }
//   }
// }
// return sentence;

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
  let connectsTo;
  let roomNames = [];
  let roomDecoder = {};

  // Compares the id given to the each room id in the object room.js
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      // Sets varible equal to the Array of rooms room[i] is connected too
      connectsTo = rooms[i].connectsTo;
    }
    roomDecoder[rooms[i].roomId] = rooms[i].name;
    console.log(roomDecoder);
  }
  if (connectsTo === undefined) {
    return `Room with ID of '${id}' could not be found.`;
  }
  for (let j = 0; j < connectsTo.length; j++) {
    if (roomDecoder[connectsTo[j]]) {
      roomNames.push(roomDecoder[connectsTo[j]]);
    } else {
      return `Room with ID of '${connectsTo[j]}' could not be found.`;
    }
  }
  return roomNames;
}

//Check if room exist
//

//   let roomsConnected = [];
//   let roomName
//   let roomObj = {}
//   for(let i = 0;  i < rooms.length; i++){
//     if(rooms[i].roomId === id){
//       roomObj = rooms[i]
//     }
//   }

//   for (let i = 0; i < rooms.length; i++) {

//     if (rooms[i].roomId === id) {
//       for (let j = 0; j < rooms[i].connectsTo.length; j++) {
//         let connectsToRoom = rooms[i].name[j];
//         for (let i = 0; i < rooms.length; i++) {
//           if (rooms[i].roomId.includes(connectsToRoom)) {
//             roomsConnected.push(rooms[i].name);
//           }
//         }
//       }
//     }

//   }
//   return roomsConnected;
// }

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
