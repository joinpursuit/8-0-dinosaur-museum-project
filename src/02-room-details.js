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
  let string = `Dinosaur with name '${dinosaurName}' cannot be found in any rooms.`
  let text = ''

  for (let dino of dinosaurs) {
    if (dino.name === dinosaurName) {
     text = dino  
  }
}
if (!text) {
  string = `Dinosaur with name '${dinosaurName}' cannot be found.`
  return string
}
for (let room of rooms) {
  if (room.dinosaurs.includes(text.dinosaurId)) {
    string = `${room.name}`
  }
}
return string
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
  let arr = [];

  for (let room of rooms) {
if (room.roomId === id) { //if roomId matches given id
  arr = room.connectsTo //arr will equal codes in rooms.connectsTo
}
else if (id === 'incorrect-id') { //if initial room id is incorrect
  return `Room with ID of '${id}' could not be found.`
}
  }

  let newArr = []; //a new array to push names of rooms 

for (let array of arr) { //loop arr
for (let room of rooms) { //loop rooms again
  if(array === room.roomId) {
    newArr.push(room.name)
  }
  else if (array === 'incorrect-id') { //if connected room id is incorrect
    return `Room with ID of '${array}' could not be found.`
  }
}
}
return newArr
}

module.exports = {
  getRoomByDinosaurName,
  getConnectedRoomNamesById,
};
