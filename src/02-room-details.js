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

//creating a helper function to just get the dino.dinosaurId.
function findDinoId(name, dinos) {
  let id = "";

  for (let dino of dinos) {
    if (dino.name === name) {
      id = dino.dinosaurId;
    }
  }
  return id;
}

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  //creating an variable with an error as its default value.
  let roomName = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;

  //if the Dinosaur name cannot be found return an error message.
  if (!findDinoId(dinosaurName, dinosaurs)) {
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  //creating a  loop to loop through my rooms.dinosaurs.
  for (let i = 0; i < rooms.length; i++) {
    let room = rooms[i].dinosaurs;
    let name = rooms[i].name;

    //if the room with the id is found i want to get the name.
    if (room.includes(findDinoId(dinosaurName, dinosaurs))) {
      roomName = name;
    }
  }
  //return the room name
  return roomName;
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
  // Im going to crate a new variable that its going to hold what all the rooms that that id connects too
  let idArr = [];
  let nameArr = [];

  // Im going to loop though all of the rooms to check that the id matches.
  for (let room of rooms) {
    // if the id matches im going to re-asign my created variable to the array of connected rooms that it has.
    if (room.roomId === id) {
      idArr = room.connectsTo;
    }
  } // Then im going to loop throught my new variable and try to compare the id that it has in it to the rooms id so i could get the names of the rooms.
  if (!idArr.length) {
    return `Room with ID of '${id}' could not be found.`;
  }
  // looping through the rooms array
  for (let room of rooms) {
    //looping through my ids array
    for (let tag of idArr) {
      //checking if any given tag is the same as any given roomId
      if (tag === room.roomId) {
        nameArr.push(room.name);
      }
    }
  }
  //if my id arrays length and my names array length is not the same, i know they are not the same.
  if(idArr.length !== nameArr.length){
    return `Room with ID of 'incorrect-id' could not be found.`
  }

  return nameArr;
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
