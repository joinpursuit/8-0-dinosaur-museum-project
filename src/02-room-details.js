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
 *
 */

// This function determines what room a dinosaur is in
// Declare a variable and assign it to an empty string
// Create a guard statement if no dinasourName & no dinosaurName in any room
// Create a for loop that goes through dinosaurs
// Create an if statement to determine if the dinosaur inputted name is equal to the name in dinosaur object
// Create another for loop to go through each room
// Create an if statement to determine if the dinosaur id matches the same id in the rooms object
// If so, add that room name to variable dinoRoom
// Return the variable dinoRoom
// WHY ISN"T THIS WORKING????

// Declare a variable and assign it to dinosaur's id
//

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoRoom = "";
  let noDino = "";

  for (let i = 0; i < dinosaurs.length; i++) {
    const dino = dinosaurs[i];
    if (dino.name === dinosaurName) {
      noDino = dino.dinosaurId;
      for (let a = 0; a < rooms.length; a++) {
        const room = rooms[a];
        if (room.dinosaurs.includes(dino.dinosaurId)) {
          //console.log(room.dinosaurs);
          dinoRoom = room.name;
        }
      }
    }
  }
  if (noDino === "") {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  if (dinoRoom === "") {
    return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
  return dinoRoom;
}

getRoomByDinosaurName(exampleDinosaurData, exampleRoomData, "Pterodactyl");

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

// This function will determine the name of the room connected to the given room
// Declare a variable and assign it to an empty array
// Create a for loop that loops through each room
// IF the room ID cannot be found, return an error message
// Refer to the test

function getConnectedRoomNamesById(rooms, id) {
  let emptyArr = [];
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    if (room.roomId.includes(id)) {
      emptyArr = room.connectsTo;
    }
    for (let a = 0; a < rooms.length; a++) {
      const string = rooms[a];
      if (string.connectsTo.includes(string.roomId)) {
        emptyArr = string.name;
      } else if (id !== string.roomId) {
        return `Room with ID of 'incorrect-id' could not be found.`;
      } else id !== string.connectsTo;
      {
        return `Room with ID of 'incorrect-id' could not be found.`;
      }
    }
  }
  return emptyArr;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
