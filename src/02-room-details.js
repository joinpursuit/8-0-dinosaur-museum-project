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
  let dinoId;

// looping through dinosaurs array; reassigning values for the name and ID to match with the rooms data
  for (let i = 0; i < dinosaurs.length; i++) {
    if(dinosaurs[i].name === dinosaurName){
      dinoId = dinosaurs[i].dinosaurId
    }    
  }

// if the ID of the dinosaur doesn't exist, return error message
  if (!dinoId){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`
  }

// looping through rooms array, adn then looping inside of that with dinosaurs array in order to match the ID of dinosaur between the dinosaurs array and rooms array. 
  for (let j = 0; j < rooms.length; j++) {
    for (let l = 0; l < rooms[j].dinosaurs.length; l++) {
// if the dinosaur ID from the roms array matches the ID from the dinosaurs array, return name of the room.      
      if(rooms[j].dinosaurs[l] === dinoId){
        return rooms[j].name
      }     
    }  
  }
// else if the ID cannot be found, return error message.
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
// assigning new array to push values into  
  let array = [];

// looping through rooms and within that loop, looping through connected rooms to match the room
  for (let i = 0; i < rooms.length; i++) {
    for (let j = 0; j < rooms[i].connectsTo.length; j++) {
    // if the ID exists, push name of room into new array  
      if(rooms[i].connectsTo[j] === id){
        array.push(rooms[i].name)
    }
    //otherwise, return error message if ID doesn't exist
    else if (rooms[i].connectsTo[j] === `incorrect-id`){
      return `Room with ID of 'incorrect-id' could not be found.`
      }
    } 
  }
  //if array has no value, then return error message that room cannot be found.
  if(array.length === 0){
    return `Room with ID of '${id}' could not be found.`
    }  
  // otherwise return name of room  
    return array
  }


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
