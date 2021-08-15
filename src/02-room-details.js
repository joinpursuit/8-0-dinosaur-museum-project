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
function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoObj;

  for(let i=0; i<dinosaurs.length; i++){
    if(dinosaurs[i].name === dinosaurName){
      dinoObj = dinosaurs[i];
    }
  }
  if(!dinoObj){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }

  for(let i=0; i<rooms.length; i++){
    if(rooms[i].dinosaurs.includes(dinoObj.dinosaurId)){
      return rooms[i].name;
    }
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
}

// use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName

// if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message

// use a loop on the rooms array to see which room the target dino is located in based on its dinosaur id

// if no matching room is found in the rooms arrray, return the appropriate error message
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
  // let connectedRoomsIds = [];

  // for(let room of rooms){
  //   if(room.roomId === id){
  //     connectedRoomsIds = room.connectsTo.slice(0);
  //   }
  // }
  // if(!connectedRoomsIds.length){
  //   return `Room with ID of '${id}' could not be found.`
  // }
  // if(connectedRoomsIds.includes("incorrect-id")){
  //   return `Room with ID of 'incorrect-id' counld not be found.`
  // }
  let roomNamesAndIds={};
  for (let room of rooms){
    roomNamesAndIds[room.roomId]=room.name;
  }
  if(!roomNamesAndIds[id]){
    return `Room with ID of '${id}' could not be found.`;
  }
  let adjRoomNames =[];
  for(let room of rooms){
    if(room.roomId === id){
      for(let adjRoomId of room.connectsTo){
        let adjRoomName = roomNamesAndIds[adjRoomId];
        if (adjRoomName){
          adjRoomNames.push(adjRoomName)
        } else {
          return `Room with ID of '${adjRoomId}' could not be found.`
        }
      }
    }
  }
  return adjRoomNames
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
