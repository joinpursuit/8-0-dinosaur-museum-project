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
  let foundRoom = false
  let foundId = false
  // Declared variables and iterating through the dinosaurs array
  // Equaling/comparing dino.name to dinosaurName 
  //Declared a variable for dino.dinosaurId called foundId
  for (const dino of dinosaurs) {
    if(dino.name === dinosaurName) {
      foundId = dino.dinosaurId
      //Iterating through rooms array
      //Then compare current foundId using .includes
      for (const room of rooms) {
        if (room.dinosaurs.includes(foundId)) {
          foundRoom = room.name
          //Assigning foundRoom to room.name
        }
      }
    }
  }
  //Utlized the if else condtion to print the message
  if(!foundId) {
    foundRoom = `Dinosaur with name '${dinosaurName}' cannot be found.`
  } else if (!foundRoom) {
    foundRoom = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  }
  return foundRoom;
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
  let getRoom = [];
  //Declared an empty array
  let foundRoom = false;
  let foundConnected;
  //Utilizing two for of loops and the first one is iterating through rooms called room and called connected
  //Compare current room.roomId to id
  for (const room of rooms) {
    if (room.roomId === id) {
       foundRoom = true
  for (const connectedRoom of room.connectsTo) {
  for (const connected of rooms) {
       foundConnected = false
    if (connected.roomId === connectedRoom) {
       foundConnected = true
       getRoom.push(connected.name)
       //Push connected.name into newArray
        break;
        }
       }
      }
      break;
    }
  } // Used the not and Or operator to meet this conditon and run the message.
   if (!foundRoom || !foundConnected) {
    getRoom = `Room with ID of 'incorrect-id' could not be found.`
  }
  return getRoom;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
