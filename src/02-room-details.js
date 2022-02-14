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
 * Return the name of the room where the given dinosaur can be found.
 * return rooms[i].name;
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
 * if (rooms[i][dinosaurs].length !== 0) {
 *
 * }
 * else `Dinosaur with name ${name of dinosaur} cannot be found.`
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
  //created default variables of empty strings
  let roomName = '';
  let dinosaurId = '';
  let unknown = '';
  
  ///loop through dinosaur array
  for (let dinosaur of dinosaurs) {
    //if input dinosaurName is equal to the dinosaur.name value
    if (dinosaurName === dinosaur.name) {
      //update dinosaurId with the ID of the input dinosaur
      dinosaurId = dinosaur.dinosaurId;
      //loop through rooms array
      for (let room of rooms) {
        //if the dinosuarId array includes the found dinosaurId
        if (room['dinosaurs'].includes(dinosaurId)) {
          //update roomName with the name of the room that has the included dinosaurId
          roomName = room.name;
          //return the name of the room
          return roomName;
        }
      }
    }
  }
  //error handling
    //if the dinosaurId is still an empty string after our code ran
    if (dinosaurId === '') {
      //update unknown with error message
      unknown = `Dinosaur with name '${dinosaurName}' cannot be found.`;
    } else {
      //else update unknown with error message
      unknown = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
    }
    //return string of the room name
    return unknown;
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


// Undestand the problem:
//   What are the function inputs?
//    -> rooms: Array of objects where each object represents a museum room.
//        -> Each room object has:
//        -> .name: string, the name of the room
//        -> .roomId: string identifier for the room
//        -> connectsTo: array of roomIds (type string)
//        -> id: string, it's the id of a room

// What will our function output?
//    -> Array of room names || a string that is an error message

// DEVISE A PLAN (happy case)
//  1. Find a room with id === id
//  2. Write down connected room ids (save their state)
//  3. Look at 1st roomn id, find that room.
//  4. Write down 1st room name
//  5. Move on to the next room name , do steps 3-4 again
//  6. Oce we've written down each name, we can give our list to whoever was asking for it.
 */

function getConnectedRoomNamesById(rooms, id) {
  //created default variables
  let connectedRoomNames = []; 
  let connectedRoomsIds = []; 
  let doesRoomExist = false; 
  
  //loop through rooms array
  for (let room of rooms) {
    //check if the roomId is equal to input id
    if (room.roomId === id) {
      //update doesRoomExist to true
      doesRoomExist = true;
      //loop through connectsTo array
      for (let i = 0; i < room.connectsTo.length; i++) {
        //push the found Id elements from the connectsTo array into the connectedRoomsIds array
        connectedRoomsIds.push((room.connectsTo[i]))
      }
    }
  }
  //loop through rooms array
  for (let room of rooms) {
    //loop through connectedRoomsIds array
    for (let connected of connectedRoomsIds) {
      //check each room ID and check if it's equal the elements in the connectedRoomsIds array
      if (room.roomId === connected) {
        //update doesRoomExist to true 
        doesRoomExist = true;
        //The Ids are equal, they are connected, push the name of the room into the connectedRoomNames array
        connectedRoomNames.push(room.name);
      }
    }
  }
  //checks if the id input exists
  if (doesRoomExist === false) {
    //return error message
    return `Room with ID of '${id}' could not be found.`;
  } //checks if each Id has a name. Length for both arrays should be equal.
  else if (connectedRoomNames.length !== connectedRoomsIds.length) {
    //return error message
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
  return connectedRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
