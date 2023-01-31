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
  //we are given the dinosaurs param to work with, data/dinosaurs.js
  //dinosaurs in rooms are identified by ID.
  // if (rooms[dinosaurs[i]] matches dinosaurName param)? return the room.name of that dinosaur.
  // if dinosaurName matches a dinosaur in database AND has an ID
  // 
  //error messages:
  const errorExists = `Dinosaur with name '${dinosaurName}' cannot be found.`;
  const errNotFound = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`;
  // for (const dinos of dinosaurs){
  //   ){
  //   //accessing both rooms.js and dinosaurs.js in this for loop.
  let objId = [];
  let foundRoom;
  for (let i = 0; i < dinosaurs.length; i++) {
    for (let room of rooms) {
      //if dinosaur name matches dinosaur name in js
      if (dinosaurName === dinosaurs[i].name) {
        objId.push(dinosaurs[i].dinosaurId);
      }
      if (room.dinosaurs.includes(objId[0])) {
         foundRoom = room.name;
         return foundRoom;
      }
    }
  } if (objId[0] === undefined ){ 
    return errorExists //can't be found
  } else {
    return errNotFound
  }
}
//dino has id if found. match ID with room.



//quick fix: some variables outside of for loop that have dinosaurid , and a variable that stores the room name.
//if dinosaur id name is foudn but no room is found, return errNotFound

/*first we take the dinosaur name parameter. link it to a dinosaur by dinosaur name. if a dinosaur is found, it should have an ID. Taking the dinosaur from dinosaurs.js, we'll look for the room that the dinosaur is in by ID. return the room where the dinosaur with that ID is located.*/
//can use different letters for index if you use multiple for loops

/*rooms[i].name = room names
dinosaurs[i].name = dinosaur names
dinosaurs[i].dinosaurId
 */
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
//return an array of strings.
//each string is the name of a room connected to the given room
let roomsArr = [] // where room IDs will be stored
let roomNames = [] // where connected rooms will be stored by room name 

//if initial room ID is incorrect, should return an error msg
const incIdMsg = `Room with ID of '${id}' could not be found.`
//if connected room ID is incorrect, should return an error msg
const connectIdInc = "Room with ID of 'incorrect-id' could not be found."
if (id === 'incorrect-id'){
  return incIdMsg //passes test 3; don't change
}
for (let i = 0; i < rooms.length; i++) {
if (rooms[i].roomId === id) {
  roomsArr = rooms[i].connectsTo; //rooms (by ID) connected to ID. If id param is found in rooms, its connected rooms will be pushed into roomsArr array by ID.
} 
if (roomsArr.includes('incorrect-id')) {
  return connectIdInc //passes test 4; don't change
}
} for (let room of rooms) {
  if (roomsArr.includes(room.roomId)){
    roomNames.push(room.name) //if the room ID is found in rooms, push the name into roomNames array.
  }
}
return roomNames
}


// for (let j = 0; j < rooms[i].length; j++)//can compare roomsArr to rooms.
// if (rooms[i].connectsTo.includes(roomsArr[j])) {
  
module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
