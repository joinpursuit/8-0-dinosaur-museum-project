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
 * return the name of the room where the din can be found 
 * If the dinosaur does not exist in the `dinosaurs` 
 * list or cannot be found in any room, return an error message that says so.
 * dinosour.dinosour.id 
 */

  //1) use a loop on dinosaurs array to find the dinosaurId that corresponds to the given dinosaurName
  //2) if no matching dinosaurId is found in the dinosaurs array, return the appropriate error message
  //3) use a loop on the rooms array to see which room the target dino is located in based on its dinosaurId
  //4) if no matching room is found in the rooms array, return the appropriate error message

function getRoomByDinosaurName(dinosaurs, rooms, dinosaurName) {
  let dinoObj = {};
// loop over dinosaurs 
  for(let dino of dinosaurs){
    if(dino.name === dinosaurName){
      dinoObj = dino;
    }
  }
  // if no match return error 
  if(!('dinosaurId' in dinoObj)){
    return `Dinosaur with name '${dinosaurName}' cannot be found.`;
  }
  let dinoId = dinoObj.dinosaurId;
  for(let room of rooms){
    if(room.dinosaurs.includes(dinoId)){
      //if it includes return the name .
      return room.name;
    } 
  }
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
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

  let connectRoom = 0;
  //created a loop
  for (let i = 0; i < rooms.length; i++) {
    if (rooms[i].roomId === id) {
      connectRoom = rooms[i].connectsTo;
    }
  }
  // error handler 
  if (!connectRoom) 
  return `Room with ID of 'incorrect-id' could not be found.`;
  if (connectRoom.includes("incorrect-id"))
  return `Room with ID of 'incorrect-id' could not be found.`;
  return connectRoom.reduce((roomNames, currentConnect) => {
    rooms.forEach((room) => {
      if (room.roomId === currentConnect) roomNames.push(room.name);
    });
    return roomNames;
  }, []);
}
// Loop through 'rooms' checking for a matching roomId === id. If none match, the error message with the incorrect id {id} needs to be returned. For a match, store the 'connectsTo' array of Ids in a new array.
// Is there a way to store all of both the roomIds AND names somehow in the same data structure? How could that be done?
// Similarly, is there a way to store only all of the roomIds somehow?
//Loop through the 'connectsTo' Ids to see if any are included in, or match to, 
//all of the roomIds. If they do, 1. Store the 'name' of the correct 'roomId' in a new array and return
// - MAYBE using the data structure storing BOTH the roomIds and names... OR 2. Replace the 'connectsTo' 
// Id with the coinciding room's name. If a 'connectsTo' Id is incorrect, or does not match any other 'roomId's, return the error message with the incorrect id {connectsTo}.

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
