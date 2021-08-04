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
 * If the dinosaur does not exist in the `dinosaurs` list or cannot be found in any room, return an error message that says so.
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
//Psuedocode getRoomByDinosaurName----------
// use a loop on the dinosaurs array to find the dinoId that corresponds to the given dinoName
// if no matching dinoId is found in the dino array, return the appropriate error message
// use for loop on the rooms array to see which room the target dino is located in based on its dinoId
// if no matching room is found on the rooms array, return the appropriate ...
 
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
    let dinoId = ''; // now saved variable in 1st for loop
    let dinoNotInRm = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
      
      for(let i = 0; i < dinosaurs.length; i++){    // loop thru dinosaurs
        if(dinosaurs[i].name === dinosaurName){
          dinoId = dinosaurs[i];
        }
      }
      if(!dinoId) return `Dinosaur with name '${dinosaurName}' cannot be found.`;   // if dinoName cannot be found at all
    
      for(let i= 0; i < rooms.length; i++){        // loop thru rooms
        if(rooms[i].dinosaurs.includes(dinoId.dinosaurId)){
          dinoId = rooms[i].name;
          return dinoId;
    } 
  }
  return dinoNotInRm;
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

  // Psuedocode getConnectedRoomNamesbyId ---------------------
  // loop through 'rooms checking for a matching roomId === id. If none match, error message w/
  // incorrect id {id} needs to be returned. For a match, store the 'connectsTo' array of Ids in a new array.
  // Similarly, is there a way to store only all of the roomIds somwehow
  //Loop through the 'connectsTo Ids to see if any are included in or match to all of the roomIds. If they do, 
  // 1. Store the 'name' of the correct 'roomId' in a new array and return - MAYBE using the data structure storing BOTH the roomIds 
  // and names ... OR 2. Replace the 'connectsTo' Id w/ coinciding rooms names. If a 'connectsTo' id
  // is incorrect, or does not match any other roomIds, return the error message with the incorrect id {connectsTo}.

function getConnectedRoomNamesById(rooms, id) {
  let foundConnectedRm;
  let roomNamesandIds = [];

  for(let room of rooms){                               // loop thru rooms to find a roomId match
    if(room.roomId === id){
      foundConnectedRm = room.connectsTo;               // if found = room.connectsTo
    }
  }
  if(!foundConnectedRm){                                //if 'inital' rm not found, return error message
    return `Room with ID of 'incorrect-id' could not be found.`;
  }
    for(let roomId of foundConnectedRm){                // loop thru connectsTo to see if any matches roomId
      for(let room of rooms){
        if(room.roomId === roomId){
          roomNamesandIds.push(room.name);
        }
      }
    }
    if(foundConnectedRm.length !== roomNamesandIds.length){
      return `Room with ID of 'incorrect-id' could not be found.`;
    }
    return roomNamesandIds;
  }
        

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
