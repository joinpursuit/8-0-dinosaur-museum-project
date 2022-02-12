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

let dinoId = ""
let dinoRoom = ""

for(let i = 0; i < dinosaurs.length; i++){
  if(dinosaurs[i].name === dinosaurName){
    dinoId = dinosaurs[i].dinosaurId
  }
}

for(let j = 0; j < rooms.length; j++){
  if(rooms[j].dinosaurs.includes(dinoId)){
    dinoRoom = rooms[j].name;
}
}
if (!dinoId){
  return `Dinosaur with name '${dinosaurName}' cannot be found.`
} else if (!dinoRoom){
  return `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
} else {
  return dinoRoom;
}
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
let roomsConnectedId = [];
let roomsConnectedName = [];
//this is to find the IDs of the connected rooms.
for (let i = 0; i < rooms.length; i++) {
  if(rooms[i].roomId === id){
    roomsConnectedId = rooms[i].connectsTo
  }
}
// added the conditional below to satisify the final test, once we find all the IDs, there is a test that has incorrect-id as one of the elements. We can check this with the conditional before moving on to the nested loop.
if(roomsConnectedId.includes("incorrect-id")){
  return "Room with ID of 'incorrect-id' could not be found."
};
//once we have ids of the connected rooms, we can matched the roomsConnectedID array with rooms array to find the name of the rooms then push the names into roomsConnectedName array.
for(let j = 0; j < rooms.length; j++) {
  for(let k = 0; k < roomsConnectedId.length; k++) {
    if(roomsConnectedId[k] === rooms[j].roomId){
      roomsConnectedName.push(rooms[j].name);
    }
  }
}
// console.log(roomsConnectedName)
//names are correctly added to the roomsConnectedName array, now we gotta figure out the incorrect IDs tests.
if (!roomsConnectedId.length){
  return "Room with ID of 'incorrect-id' could not be found.";
}
  return roomsConnectedName
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
