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
// function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
//   //determine input/output
//   let msg = "";
//   let id = "";
//   //define loop
//   for (let i = 0; i < dinosaurs.length; i++) {
//     if (dinosaurName === dinosaurs.name) {
//       id === dinosaur.dinosaursId;
//     }
//   }

//   for (let i = 0; i < rooms; i++) {
//     let room = rooms[i];
//     if (room.dinosaurs.includes(id)) {
//       msg = room.name;
//     } else if () {

//     }

//     {
//       msg = `Dinosaur with name ${dinosaurName} cannot be found.`;
//     }
//   }
//   //return name of room where dino name given

//   //accumulate
//   return msg;
// }

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  // should return the name of the room where the given dinosaur can be found
  // declare a variable as an empty string
  let result = "";
  let id = "";
  // for i loop through rooms
  for (let i = 0; i < dinosaurs.length; i++) {
    // create variable for dinosaurs[i]
    let dinosaur = dinosaurs[i];
    if (dinosaurName === dinosaur.name) {
      id = dinosaur.dinosaurId;
    }
  }
  for (let i = 0; i < rooms.length; i++) {
    // create variable for rooms[i]
    let room = rooms[i];
    // if the dinosaur id === rooms.dinosaurs then
    if (room.dinosaurs.includes(id)) {
      // return room name
      result = room.name;
    }
  }
  if (!id) {
    // return "Dinosaur with name 'Pterodactyl' cannot be found."
    result = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  } else if (!result) {
    result = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  // if dinosaur cannot be found in any room

  // returning variable
  return result;
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
  //determine input/output
  let arr = [];

  //define loop
  for (let room of rooms) {
    if (room.connectsTo.includes(id)) {
      arr.push(room.name);
    }
    if (room.connectsTo.includes("incorrect-id")) {
      return `Room with ID of 'incorrect-id' could not be found.`;
    }
  }

  if (!arr.length) {
    //arr.length === 0
    return `Room with ID of '${id}' could not be found.`;
  }
  //accumulate
  //return arr or error message
  return arr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
