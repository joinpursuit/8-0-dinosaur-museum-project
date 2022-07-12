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
  //create variable to match id
  let dinoId = "";
  //create variable to return if dino isn't found
  let notFound = "";
  //create loop to iterate thru dinosaurs 
  for (let i = 0; i < dinosaurs.length; i ++){
  if (dinosaurName === dinosaurs[i].name){
    //reassign dinoid to match the dino
  dinoId = dinosaurs[i].dinosaurId; 
  } 
}
//creat loop to iterate thru rooms
  for (let j = 0; j < rooms.length; j ++){
if (rooms[j].dinosaurs.includes(dinoId)){
return rooms[j].name;
  } else {
    //error message if dinos are not found in rooms
    notFound = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  }
} 
//error message if the dino is not found at all
if (!dinoId){
  notFound = `Dinosaur with name '${dinosaurName}' cannot be found.`;
}
  return notFound;
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
  //create empty array to return the ids and another array for the conversion into the names of the rooms
  let arr = [];
  let conv = [];
for (let i = 0; i < rooms.length; i ++){
 //if the id matches
if(id === rooms[i].roomId){
  //arr and rooms connected array would be the same
  arr = rooms[i].connectsTo;
} 
} 
//if the id didnt match a room or the arr is empty, send error message
  if (arr.includes("incorrect-id") || !arr.length){
return "Room with ID of 'incorrect-id' could not be found."
}
//if the id is included in the arr
 for (let j = 0; j < rooms.length; j ++){
    if (arr.includes(rooms[j].roomId)){
      conv.push(rooms[j].name)
    }
 }
//return the converted names of the rooms
return conv;
}


module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
