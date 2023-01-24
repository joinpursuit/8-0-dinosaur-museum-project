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
  //Create variable to hold the dino's ID
  let dinoId = "";

  //Iterate through dinos to find matching name.
  for (dino of dinosaurs){

    //End the loop if a match is found.
    if (dino.name === dinosaurName){

      //Set the dinoId variable to that of the match.
      dinoId = dino.dinosaurId;
      break;
    }
  }

  //Add check for errors.
  if (dinoId!==""){

    //Iterate through rooms.
    for (let room of rooms){

      //Check if dinosaur is in room.
      if (room.dinosaurs.includes(dinoId)){
        return room.name;
      }
    }
  }
  else{

    //Returns error if dinosaur can't be found in original dino list.
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

  //Error for if the dinosaur can't be found in any room.
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
  //Array to store ids of connected rooms.
  let connectedRoomIds = [];

  //Array to store IDs of all rooms.
  let allRoomIds = [];

  //Array to store names of connected rooms.
  let connectedRoomNames = [];

  //Iterate through rooms, saving IDs, and checking for a match.
  for (room of rooms){
    allRoomIds.push(room.roomId);
    if (room.roomId === id){
      connectedRoomIds = room.connectsTo;
    }
  }

  //Returns error for no match to room.
  if (connectedRoomIds.length===0){
    return `Room with ID of '${id}' could not be found.`
  }
  else{

    //Iterate through connected rooms.
    for (let connectID of connectedRoomIds){

      //If the connected id isn't found among the existing ones, return an error
      if (!allRoomIds.includes(connectID)){
        return `Room with ID of '${connectID}' could not be found.`
      }
      else{

        //Save the room names to the actual results array.
        for (room of rooms){
          if (room.roomId===connectID){
            connectedRoomNames.push(room.name);
          }
        }
      }
    }
  }

  //Final answer!
  return connectedRoomNames;
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
